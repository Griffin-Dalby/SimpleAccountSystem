# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

# If CMAKE_DISABLE_SOURCE_CHANGES is set to true and the source directory is an
# existing directory in our source tree, calling file(MAKE_DIRECTORY) on it
# would cause a fatal error, even though it would be a no-op.
if(NOT EXISTS "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-src")
  file(MAKE_DIRECTORY "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-src")
endif()
file(MAKE_DIRECTORY
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-build"
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix"
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/tmp"
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/src/curl-populate-stamp"
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/src"
  "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/src/curl-populate-stamp"
)

set(configSubDirs Debug)
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/src/curl-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "C:/Users/Griff/OneDrive/Desktop/Projects/SimpleAccountSystem/cpp/build/_deps/curl-subbuild/curl-populate-prefix/src/curl-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
