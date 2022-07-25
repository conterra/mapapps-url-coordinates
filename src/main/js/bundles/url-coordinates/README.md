# dn_urlcoordinates
The Url Coordinates Bundle allows you to add a coordinate definition to the app URL, which will be applied on startup.

**Requirement: map.apps 4.13.0**

## Usage
1. Add the bundle "dn_urlcoordinates" to your app.
2. Configure the bundle in your app.
3. Add a coordinate definition to your app URL. Examples:
   1. (without verboseInput): showCoord=51.96251,7.62519,4326
   2. (with verboseInput): showCoord=(x = 51.96251, y = 7.62519, WKID = 4326)

## Configuration Reference
Default
```json
"bundles": {
    "dn_urlcoordinates": {
        "Config": {
            "verboseInput": true,
            "validateInput": false,
            "enableLoggerFeedback": true,
            "highlightCenter": true,
            "highlighterSymbol": null,
            "highlighterTimeout": 0
        }
    },
    // [... addtional bundle configurations ...]
}
```
Custom Highlight Marker
```json
"bundles": {
    "dn_urlcoordinates": {
        "Config": {
            "verboseInput": true,
            "validateInput": false,
            "enableLoggerFeedback": true,
            "highlightCenter": true,
            "highlighterSymbol": {
                "type": "simple-marker",
                "color": [
                    0,
                    255,
                    255,
                    0.25
                ],
                "size": 16,
                "outline": {
                    "color": [
                        0,
                        255,
                        255,
                        1
                    ],
                    "width": 2
                }
            },
            "highlighterTimeout": 0
        }
    },
    // [... addtional bundle configurations ...]
}
```
| Property             | Type      | Possible Values       | Default           | Description                                                                                                                                                                       |
|----------------------|-----------|-----------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| verboseInput         | Boolean   | `true` or `false`     | `true`            | Determines whether verbose input is allowed. If true inputs such as showCoord=(x = 51.96251, y = 7.62519, WKID = 4326) can be parsed. If false, such an input cannot be used.     |
| validateInput        | Boolean   | `true` or `false`     | `true`            | Determines whether the input value of showCoord will be validated.                                                                                                                |
| enableLoggerFeedback | Boolean   | `true` or `false`     | `true`            | Determines whether the user will be provided feedback if the input of showCoord is unusable.                                                                                      |
| highlightCenter      | Boolean   | `true` or `false`     | `true`            | Determines whether the center defined in showCoord will be highlighted with a marker.                                                                                             |
| highlighterSymbol    | Object    | `Object` or `null`    | Red marker symbol | Definition of an Esri.MarkerSymbol to highlight the center of the map.                                                                                                            |
| highlighterTimeout   | Number    | any Integer >= 0      | 0                 | Time in milliseconds until the marker is removed automatically. If 0 marker will not be removed                                                                                   |
