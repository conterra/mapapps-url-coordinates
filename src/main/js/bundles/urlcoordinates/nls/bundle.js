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
module.exports = {
    root: {
        bundleName: "URL Coordinates",
        bundleDescription: "This bundle is used to pass a coordinate to map.apps at start.",
        errors: {
            emptyCoordinates: "Parameter Error: showCoord was passed as URL parameter but the value ist empty.",
            malformedCoordinates: "Parameter Error: showCoord was passed as URL parameter but the coordinate tuple is malformed.",
            missingWKID: "Parameter Warning: showCoord was passed as URL parameter but the WKID is missing. Applying default.",
            coordinateNaN: "Value Error: A provided coordinate value cannot be read as number.",
            coordinateExceedsXLimit: "Value Error: The provided x value exceeds the limits of",
            coordinateExceedsYLimit: "Value Error: The provided y value exceeds the limits of",

            wkidNaN: "Value Error: The provided WKID value cannot be read as number.",
            wkidExceedsLowerLimit: "Value Error: The provided WKID is too short.",
            wkidExceedsUpperLimit: "Value Error: The provided WKID is too long."
        }
    },
    de: true
};
