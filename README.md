# Url Coordinates
The Url Coordinates Bundle allows you to add a coordinate definition to the app URL, which will be applied on startup.

![Screenshot App](https://github.com/conterra/mapapps-url-coordinates/blob/master/screenshot.JPG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_urlcoordinates/index.html?showCoord=51.96251,7.62519,4326

## Build
![example workflow](https://github.com/conterra/mapapps-url-coordinates/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)

## Installation Guide
**Requirements:**
- map.apps 4.13.0 or later

Simply add the bundle "dn_urlcoordinates" to your app.

[dn_printingenhanced Documentation](https://github.com/conterra/mapapps-url-coordinates/tree/master/src/main/js/bundles/dn_urlcoordinates)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
   Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
