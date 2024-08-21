@echo off
cmake --build .
set /P continue=Do you want to attempt to open the Executeable? (Y/[n]) 
if /I "%continue%" neq "Y" goto end

echo: 
echo: 

.\\Debug\\SimpleAccountSystem.exe

echo: 
echo: 
pause

:END
endlocal