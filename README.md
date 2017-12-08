## BamlWeather

## Baml Weather App

A simple Weather App borrows more than a few ideas from common weather portals.

### Structure
* AngularJs4 Client project, build with Angular CLI & VS Code
* .NET Core 2 Server Project, built using Visual Studio 2017

### Also
* Third party OpenWeather


### To run (suck puppies)

Server: 
    * Load and Update Nuget dependencies
    * Start Ctrl F5

Client:
    * Update Node Modules (Npm install)
    * Open console to ..\client\baml_weather and run the cmd 'ng serve' (add '--port <port-number>' to run a port other than 4200)


### Configurable Settings
Server:
OpenWeatherTheMap settings is in the appsettings.json file in the Server project. Add relevant key and url to run from other than the (limited) Free API.

Client:
Base URL address for the service can be set at ..client\baml-weather\src\assets\environment.json
### 