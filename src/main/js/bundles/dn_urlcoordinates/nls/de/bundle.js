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
    bundleName: "URL Koordinaten",
    bundleDescription: "Dieses Bundle wird genutzt um map.apps zum Start Koordinaten mitzugeben.",
    errors: {
        emptyCoordinates: "Parameter Error: showCoord wurde als URL Parameter angegeben, aber der Wert ist leer.",
        malformedCoordinates: "Parameter Error: showCoord wurde als URL Parameter angegeben, aber das Koordinaten-Tupel ist inkorrekt formatiert.",
        missingWKID: "Parameter Warning: showCoord wurde als URL Parameter angegeben, aber es konnte keine WKID gefunden werden. Nutze Standardwert.",
        coordinateNaN: "Value Error: Eine der angegeben Koordinaten kann nicht als Zahl interpretiert werden.",
        coordinateExceedsXLimit: "Value Error: Der angegebene x Wert liegt nicht im Wertebereich von",
        coordinateExceedsYLimit: "Value Error: Der angegebene y Wert liegt nicht im Wertebereich von",

        wkidNaN: "Value Error: Die angegebene WKID kann nicht als Zahl interpretiert werden.",
        wkidExceedsLowerLimit: "Value Error: Die angegebene WKID ist zu kurz.",
        wkidExceedsUpperLimit: "Value Error: TDie angegebene WKID ist zu lang."
    }
};
