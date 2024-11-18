/*
 * Copyright 2018-2023 GraphDefined GmbH <achim.friedland@graphdefined.com>
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

import * as types            from '../../Types';
import * as complex          from '../../Complex';
import * as componentConfig  from '../ComponentConfig';


export class QRCodePaymentsCtrlr {

    public EVSE:           complex.EVSE        | null = null;
    public enabled:        boolean             | null = null;
    public urlTemplate:    types.URL           | null = null;
    public validityTime:   types.TimeSpan      | null = null;
    public hashAlgorithm:  types.HashAlgorithm | null = null;
    public sharedSecret:   string              | null = null;
    public length:         types.Integer       | null = null;
    public encoding:       string              | null = null; //types.Encoding,
    public qrCodeQuality:  string              | null = null;
    public signature:      string              | null = null;

    public instance:       string              | null = null;
    public customData:     complex.ICustomData | null = null;


    constructor(EVSE?:           complex.EVSE,
                enabled?:        boolean,
                urlTemplate?:    types.URL,
                validityTime?:   types.TimeSpan,
                hashAlgorithm?:  types.HashAlgorithm,
                sharedSecret?:   string,
                length?:         types.Integer,
                encoding?:       string, //types.Encoding,
                qrCodeQuality?:  string,
                signature?:      string,

                instance?:       string,
                customData?:     complex.ICustomData) {

        this.EVSE           = EVSE          ?? null;
        this.enabled        = enabled       ?? null;
        this.urlTemplate    = urlTemplate   ?? null;
        this.validityTime   = validityTime  ?? null;
        this.hashAlgorithm  = hashAlgorithm ?? null;
        this.sharedSecret   = sharedSecret  ?? null;
        this.length         = length        ?? null;
        this.encoding       = encoding      ?? null;
        this.qrCodeQuality  = qrCodeQuality ?? null;
        this.signature      = signature     ?? null;
        this.instance       = instance      ?? null;
        this.customData     = customData    ?? null;

    }

}
