/*
 * Copyright 2014-2023 GraphDefined GmbH <achim.friedland@graphdefined.com>
 * This file is part of ChargingStation <https://github.com/OpenChargingCloud/ChargingStation>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

///<reference path="OCPPChargingStation.ts" />

class chargingStationApp {

    //#region Data

    private readonly ocppChargingStationProxy:  OCPPChargingStation;
    private readonly LogView:                   HTMLDivElement;

    //#endregion

    constructor()
    {

        this.ocppChargingStationProxy  = new OCPPChargingStation((t) => this.writeToScreen(t));

        this.LogView                   = document.querySelector("#logView") as HTMLDivElement;

    }

    private writeToScreen(message: string|Element) {

        if (typeof message === 'string')
            this.LogView.insertAdjacentHTML("afterbegin",
                                            "<p>" + message + "</p>");

        else
            this.LogView.insertAdjacentElement("afterbegin",
                                               document.createElement('p').
                                                        appendChild(message));

    }

 }
