#include <iostream>
#include <fstream>
#include <limits>
#include <string>

#include <cpr/cpr.h>
#include <color.hpp>
#include <json.hpp>

using json = nlohmann::json;

int main(int, char**){

    // INITALIZATION PROCESS
    std::cout << dye::green("[Init]") << " Initalizing..." << std::endl;
    std::cout << dye::green("[Init]") << " Gathering Settings..." << std::endl;

    json settings;
    std::ifstream settings_file("./settings.json");
    if (settings_file.good()) {
        // Read Settings
        settings = json::parse(settings_file);
        std::cout << dye::light_green("[Init]") << " Found settings.json!" << std::endl;
    } else {
        // Create settings
        std::cout << dye::light_yellow("[Init]") << " Failed to locate settings.json!" << std::endl;

        // Get port
        int port;
        std::string line;
        std::cout << dye::green("[Init]") << " What port should be used? " << hue::light_aqua;
        while (std::getline(std::cin, line)) {
            port = NULL;

            std::stringstream ss(line);
            if ((ss >> port && ss.eof()) && (port <= 65535 && port > 0 && ss.eof())) { break; }

            std::cout << "\x1b[1A" << "\x1b[2K" << hue::white;
            std::cout << dye::red("[Init] ") << ((port&&(port>65535||port<1)) ? "Port number cannot be larger than 65535 or lower than one." : "Only numbers are allowed for ports.") << std::endl;
            std::cout << dye::green("[Init]") << " What port should be used? " << hue::light_aqua;
        }
        std::cout << hue::white;

        // Compile JSON object
        std::cout << dye::green("[Init]") << " Writing settings.json..." << std::endl;

        json json_object = {
            {"port", port}
        };

        // Write settings
        std::ofstream settings_file("./settings.json");
        settings_file << json_object.dump();
        settings_file.close();

        settings = json_object;
        std::cout << dye::light_green("[Init]") << " Wrote settings.json." << std::endl;
    }

    std::cout << dye::green("[Init]") << " Contacting API... (@ http:/localhost:" << settings["port"] << "/)" << std::endl;
    cpr::Response res = cpr::Get(cpr::Url{"http://localhost:", std::to_string(static_cast<int>(settings["port"]))});
    if (res.status_code != 200) {
        std::cout << dye::red("[Init]") << " Contacting API " << dye::white_on_red("FAILED!") << " Make sure the server is running properly." << std::endl;
        return 0;
    }

    std::cout << dye::light_green("[Init]") << " Contacted API successfully!" << std::endl;
}
