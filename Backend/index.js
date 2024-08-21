/* Simple Account System Backend Entry Script
   Griffin E. Dalby, 8/17/24

   This Program will initalize a simple API, allowing us to register clients, log them in, all while having simple exploit protection.
*/ console.clear()

// Imports
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')

const colors = require('colors')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')

// Settings
if (!fs.existsSync('./settings.json')) {
    fs.writeFileSync('./settings.json', JSON.stringify({
        port: 7178,
    }, null, 4))
    console.log(`${colors.cyan('[Initalization]')} Generated settings.json!`)
}

const settings = JSON.parse(fs.readFileSync('./settings.json'))

/* Initalization
   This section is just going to attempt to initalize our Backend.
*/
// Variables
// Functions
// Section
console.log(`${colors.cyan('[Initalization]')} Starting Server... (Port: ${settings.port})`)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(settings.port, () => {
    console.log(`${colors.cyan('[Initalization]')} Successfully Started Server! (Port: ${settings.port})`)
})

/* SQL Server
   This section will establish connection with our SQL server.
*/
// Variables
// Functions
// Section

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) { return console.error(err.message) }
    console.log(`${colors.cyan('[Initalization]')} Connected to SQL Database, Initalizing it for use.`)
}) // Select Database

db.serialize(() => {
    db.run(`CREATE TABLE accounts (
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        PRIMARY KEY (username)
        );`, (err) => {
            if (err) {
                console.log(colors.red(`${colors.bold('[ERROR]')} Creating account table Failed! (${err.message})`))
                process.exit()
            }
        })
        .run(`INSERT INTO accounts
            VALUES ("Admin", "masterkey")`, (err) => {
                if (err) {
                    console.log(colors.red(`${colors.bold('[ERROR]')} Adding admin account Failed! (${err.message})`))
                    process.exit()
                }
            })
        .each('SELECT * FROM accounts', (err, row) => {
            if (err) {
                console.log(colors.red(`${colors.bold('[ERROR]')} Testing accounts table Failed! (${err.message})`))
                process.exit()
            }

            console.log(`${colors.cyan(`[Initalization]`)} Successfuly Initalized Database! Establishing Routes.`)
        }) 
}) // Initalize the Database

/* Routing
   This section will establish the Routes for our Backend Server.
*/
// Variables
// Functions
// Section

/* Status Check
   This route will allow the Frontend to verify the API.
*/
app.get('/', (req, res) => {
    console.log("Request at /")
    res.sendStatus(200)
})

/* Register Account
   This route will Register an account with a specified username and password.
*/
app.post('/account/register', async (req, res) => {
    // Request
    const Username = req.body.Username,
          Password = req.body.Password

    // Attempt to Register
    console.log(`${colors.green('[Server]')} Recieved account register request!
         Username: ${Username}`)
    
    db.serialize(() => {
        db.get(`SELECT * FROM accounts WHERE username="${Username}"`, async (err, row) => {
            if (row) {
                console.log(`${colors.green('[Server]')} Account with Username "${Username}" already exists!`)

                res.sendStatus(409)
                return
            }

            await bcrypt.hash(Password, 10, function(err, HashedPassword) {
                if (err) {
                    console.error(err.message)
                    res.sendStatus(400)
                    return
                }
                
                db.run(`INSERT INTO accounts
                    VALUES ("${Username}", "${HashedPassword}")`, (err) => {
                        if (err) {
                            console.log(colors.red(`${colors.bold('[ERROR]')} Registering player failed! (${err.message})`))
                            
                            res.sendStatus(500)
                            return
                        } else {
                            console.log(`${colors.green('[Server]')} Account created with Username: "${Username}"!`)
                            res.sendStatus(200)
                        }
                    })
            })

            
        })
    })
})

/* Log In to an Account
   This route will Log a User into their account.
*/
app.get('/account/login', (req, res) => {
    // Request
    const Username = req.body.Username,
          Password = req.body.Password

    // Attempt to Log In
    // Attempt to Register
    console.log(`${colors.green('[Server]')} Recieved account log in request!
         Username: ${Username}`)
    
    db.serialize(() => {
        db.get(`SELECT * FROM accounts WHERE username="${Username}"`, async (err, row) => {
            if (!row) {
                console.log(`${colors.green('[Server]')} Account with Username "${Username}" doesn't exists!`)

                res.sendStatus(404)
                return
            }

            bcrypt.hash(Password, 10, function(err, HashedPassword) {
                if (err) {
                    console.error(err)
                    res.sendStatus(400)
                    return
                }
                
                bcrypt
                    .compare(Password, row.password)
                    .then(PasswordValid => {
                        // LOG IN.
                        res.sendStatus(PasswordValid ? 200 : 401)
                    })
                    .catch(err => console.error(err.message))
            })
        })
    })
})