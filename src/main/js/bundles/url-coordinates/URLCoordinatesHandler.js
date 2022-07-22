/*
 * Copyright (C) 2022 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Point from "esri/geometry/Point";

export default class URLCoordinatesHandler {

    /**
     * decodeURLParameter()
     * This function is called automatically and provides the parameters defined in the URL
     *
     * @param params parameters defined in the URL
     */
    decodeURLParameter(params) {
        const props = this._properties;
        const i18n = this._i18n.get();
        const coordsParam = params.showCoord;

        // if "showCoord=" is found in url params use logic of this bundle to handle input values
        if (coordsParam) {

            let splitCoords;
            // determines whether showCoord values can be verbose to allow easier readability of input
            if (props.verboseInput) {
                const cleanedCoords = this._cleanInput(coordsParam);
                splitCoords = cleanedCoords.split(",");
            } else {
                splitCoords = coordsParam.split(",");
            }

            // filter syntactically wrong showCoord values
            if (splitCoords.length === 1) {
                if (splitCoords[0] === "") {
                    throw new Error(i18n.errors.emptyCoordinates);
                } else {
                    throw new Error(i18n.errors.malformedCoordinates);
                }
            } else {
                this._validateInputs(splitCoords);
                this._applyInputsToMap(splitCoords, props.highlightCenter);
            }
        }
    }

    /**
     * _cleanInput()
     * Function used to remove characters from input String added for better readability
     * This includes: (, ), °, prefixes and labels
     *
     * @param input Value of showCoord extracted from URL
     *
     * @returns String of input without filtered characters
     * @private
     */
    _cleanInput(input) {
        let cleanedInput = input.replaceAll("(", "");
        cleanedInput = cleanedInput.replaceAll(")", "");
        cleanedInput = cleanedInput.replaceAll("°", "");
        cleanedInput = cleanedInput.replaceAll(" ", "");
        cleanedInput = cleanedInput.replaceAll("x:", "");
        cleanedInput = cleanedInput.replaceAll("x=", "");
        cleanedInput = cleanedInput.replaceAll("y:", "");
        cleanedInput = cleanedInput.replaceAll("y=", "");
        cleanedInput = cleanedInput.replaceAll("WKID=", "");
        cleanedInput = cleanedInput.replaceAll("WKID:", "");

        return cleanedInput;
    }

    /**
     * _validateInputs()
     * Wrapper method to validate both coordinate values and WKID with separate validation methods
     *
     * @param splitCoords Array of showCoord values split at ","
     *
     * @private
     */
    _validateInputs(splitCoords) {
        splitCoords.forEach((value, index) => {
            if (index <= 1) {
                this._validateCoordinateValue(value, index);
            }
            if (index === 2) {
                this._validateWkidValue(value);
            }
        });
    }

    /**
     * _validateCoordinateValue()
     * Method used to validate coordinate values.
     * Validation criteria:
     *      1. Must be a number
     *      2. Must be within numerical ranges appropriate for latitude/longitude
     *
     * @param coordinateValue String containing coordinate value extracted vom showCoord URL parameter
     * @param index Integer used to determine whether x/long or y/lat coordinate is being validated
     *
     * @private
     */
    _validateCoordinateValue(coordinateValue, index) {
        const i18n = this._i18n.get();
        const coordFloat = parseFloat(coordinateValue);

        // check whether the coordinate is a number
        if (isNaN(coordFloat)) {
            throw new Error(i18n.errors.coordinateNaN);
        }

        // check whether the coordinate matches the necessary ranges
        switch (index) {
            case 0:
                if (!(coordFloat >= -180 && coordFloat <= 180)) {
                    throw new Error(i18n.errors.coordinateExceedsLongitudeLimit);
                }
                break;
            case 1:
                if (!(coordFloat >= -90 && coordFloat <= 90)) {
                    throw new Error(i18n.errors.coordinateExceedsLatitudeLimit);
                }
                break;
        }
    }

    /**
     * _validateWkidValue()
     * Method used to validate WKID values.
     * Validation criteria:
     *      1. Must be a number
     *      2. Must have between 4 and 5 digits
     *
     * @param wkidValue String containing WKID value extracted vom showCoord URL parameter
     *
     * @private
     */
    _validateWkidValue(wkidValue) {
        const i18n = this._i18n.get();
        const wkidInt = parseInt(wkidValue);

        // check whether WKID is a number
        if (isNaN(wkidInt)) {
            throw new Error(i18n.errors.wkidNaN);
        }

        // check whether the number of digits meets requirements
        if (!(wkidValue.length >= 4 && wkidValue.length <= 5)) {
            if (wkidValue.length < 4) {
                throw new Error(i18n.errors.wkidExceedsLowerLimit);
            } else {
                throw new Error(i18n.errors.wkidExceedsUpperLimit);
            }
        }
    }

    /**
     * _applyInputsToMap()
     * Method used to apply the given showCoord parameters to the map
     *
     * @param splitCoords Array of showCoord values split at ","
     * @param highlightCenter Boolean to determine whether a highlight marker will be drawn at center
     *
     * @private
     */
    _applyInputsToMap(splitCoords, highlightCenter) {
        const highlighter = this._highlighter;

        // calculate new map center with given coordinates (and WKID if applicable)
        const URLCenter = this._getCenterFromURL(splitCoords);

        // get view, set center and apply highlighting to center
        this._getView().then(view => {
            view.center = URLCenter;
            if (highlightCenter) {
                highlighter.highlight({
                    geometry: URLCenter
                });
            }
        });
    }

    /**
     * _getCenterFromURL()
     * Helper function used to construct Point from coordinated defined in showCoord URL parameter
     *
     * @param splitCoords Array of showCoord values split at ","
     *
     * @returns {__esri.Point} to be used as new center of the view
     * @private
     */
    _getCenterFromURL(splitCoords) {
        let URLCenter;

        // case: no WKID defined
        if (splitCoords.length <= 2) {
            URLCenter = new Point({
                latitude: splitCoords[0],
                longitude: splitCoords[1]
            });
        }
        // case: WKID defined
        else {
            URLCenter = new Point({
                latitude: splitCoords[0],
                longitude: splitCoords[1],
                wkid: splitCoords[2]
            });
        }

        return URLCenter;
    }

    /**
     * _getView()
     * Helper function used to access view
     *
     * @returns {Promise<esri.mapView>} Promise to be resolved to the view
     * @private
     */
    _getView() {
        const mapWidgetModel = this._mapWidgetModel;

        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                mapWidgetModel.watch("view", ({value: view}) => {
                    resolve(view);
                });
            }
        });
    }
}
