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

import * as interfaces  from '../Interfaces';
import * as messages    from './Messages';
import * as complex     from './Complex';


export class OutgoingMessages {

    private static readonly ocppVersion:    string = "OCPP v2.1";


    private static ParseCustomData(CustomData?: string | null): complex.ICustomData|undefined
    {

        if (CustomData == null)
            return undefined;

        let customData = null;

        try
        {

            const json = JSON.parse(CustomData);

            if (json.hasOwnProperty('vendorId'))
                return json;

        } catch { }

        return undefined;

    }



    //#region Firmware

    public static SendBootNotification(properties: HTMLDivElement) : messages.BootNotificationRequest
    {

        const ChargingStation  = (properties?.     querySelector('div[name="chargingStation"]')  as HTMLDivElement);
        const Modem            = (ChargingStation?.querySelector('div[name="modem"]')            as HTMLDivElement);

        const bootNotificationRequest: messages.BootNotificationRequest = {
            chargingStation: {
                model:            (ChargingStation?.                      querySelector('input[name="model"]')            as HTMLInputElement). value,
                vendorName:       (ChargingStation?.                      querySelector('input[name="vendorName"]')       as HTMLInputElement). value,
                serialNumber:     (ChargingStation?.                      querySelector('input[name="serialNumber"]')     as HTMLInputElement)?.value || undefined,
                modem: {
                    iccid:        (Modem?.                                querySelector('input[name="ICCID"]')            as HTMLInputElement)?.value || undefined,
                    imsi:         (Modem?.                                querySelector('input[name="ISMI"]')             as HTMLInputElement)?.value || undefined,
                    customData:    this.ParseCustomData((Modem?.          querySelector('input[name="customData"]')       as HTMLInputElement). value),
                },
                firmwareVersion:  (ChargingStation?.                      querySelector('input[name="firmwareVersion"]')  as HTMLInputElement)?.value || undefined,
                customData:        this.ParseCustomData((ChargingStation?.querySelector('input[name="customData"]')       as HTMLInputElement). value),
            },
            reason:               (properties?.                           querySelector('select[name="reason"]')          as HTMLInputElement). value,
            customData:            this.ParseCustomData((properties?.     querySelector('input[name="customData"]')       as HTMLInputElement). value),
        }

        return bootNotificationRequest;

    }

    public static SendHeartbeat(properties: HTMLDivElement) : messages.HeartBeatRequest
    {

        const heartBeatRequest: messages.HeartBeatRequest = {
            customData:  this.ParseCustomData((properties?.querySelector('input[name="customData"]') as HTMLInputElement).value),
        }

        return heartBeatRequest;

    }

    //#endregion

    //#region Monitoring

    //#endregion

}
