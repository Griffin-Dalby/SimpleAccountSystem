cmake_minimum_required(VERSION 3.30)
project(SimpleAccountSystem VERSION 1.0)
add_executable(SimpleAccountSystem main.cpp)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include(FetchContent)
FetchContent_Declare(cpr GIT_REPOSITORY https://github.com/libcpr/cpr.git
                         GIT_TAG 340acc5cdad624b9398827eec2832fe2fd05f966) # Replace with your desired git commit from: https://github.com/libcpr/cpr/releases
FetchContent_MakeAvailable(cpr)

target_link_libraries(SimpleAccountSystem PUBLIC cpr::cpr)

add_custom_command(TARGET SimpleAccountSystem POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        "${PROJECT_SOURCE_DIR}/build/_deps/cpr-build/cpr/Debug/cpr.dll"
        $<TARGET_FILE_DIR:SimpleAccountSystem>)

add_custom_command(TARGET SimpleAccountSystem POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        "${PROJECT_SOURCE_DIR}/build/_deps/curl-build/lib/Debug/libcurl-d.dll"
        $<TARGET_FILE_DIR:SimpleAccountSystem>)

target_include_directories(SimpleAccountSystem PRIVATE ${PROJECT_SOURCE_DIR}/ext/include)