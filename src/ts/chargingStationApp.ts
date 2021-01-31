/*
 * Copyright (c) 2021 GraphDefined GmbH <achim.friedland@graphdefined.com>
 * This file is part of Chargy Desktop App <https://github.com/OpenChargingCloud/ChargingStation>
 *
 * Licensed under the Affero GPL license, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.gnu.org/licenses/agpl.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

///<reference path="OCPPv1_6.ts" />

class chargingStationApp {

    //#region Data

    private readonly proxyOCPPv1_6:  OCPPv1_6;
    private readonly LogView:        HTMLDivElement;

    //#endregion

    constructor()
    {

        this.proxyOCPPv1_6  = new OCPPv1_6((t) => this.writeToScreen(t));

        this.LogView        = document.querySelector("#logView") as HTMLDivElement;

    }

    private writeToScreen(message: string) {

        this.LogView.insertAdjacentHTML("afterbegin",
                                       "<p>" + message + "</p>");

    }

 }
