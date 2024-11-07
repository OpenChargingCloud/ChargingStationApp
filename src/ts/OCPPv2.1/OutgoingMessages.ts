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

import * as Interfaces  from '../Interfaces';
import * as IOCPPv2_1   from './IOCPPv2_1';


export class OutgoingMessages {

    private static ocppVersion: string = "OCPP v2.1";

    //#region Monitoring

    static SendBootNotificationRequest(RequestDivElement:  HTMLDivElement,
                                       commandsDiv:        HTMLDivElement,
                                       sendRequest:        Interfaces.SendRequestDelegate,
                                       showException:      Interfaces.ShowExceptionDelegate
                                    )
    {

        const bootNotificationRequestDiv = commandsDiv.querySelector("#BootNotificationRequest") as HTMLDivElement;

        try
        {

            const properties = bootNotificationRequestDiv?.querySelector('div.properties.OCPPv1_6') as HTMLDivElement;

            // const bootNotificationRequest: IOCPPv2_1.BootNotificationRequest = {
            //     chargePointVendor:        (properties?.querySelector('input[name="chargePointVendor"]')        as HTMLInputElement). value,
            //     chargePointModel:         (properties?.querySelector('input[name="chargePointModel"]')         as HTMLInputElement). value,
            //     chargePointSerialNumber:  (properties?.querySelector('input[name="chargePointSerialNumber"]')  as HTMLInputElement)?.value || undefined,
            //     chargeBoxSerialNumber:    (properties?.querySelector('input[name="chargeBoxSerialNumber"]')    as HTMLInputElement)?.value || undefined,
            //     firmwareVersion:          (properties?.querySelector('input[name="firmwareVersion"]')          as HTMLInputElement)?.value || undefined,
            //     iccid:                    (properties?.querySelector('input[name="ICCId"]')                    as HTMLInputElement)?.value || undefined,
            //     imsi:                     (properties?.querySelector('input[name="IMSI"]')                     as HTMLInputElement)?.value || undefined,
            //     meterType:                (properties?.querySelector('input[name="meterType"]')                as HTMLInputElement)?.value || undefined,
            //     meterSerialNumber:        (properties?.querySelector('input[name="meterSerialNumber"]')        as HTMLInputElement)?.value || undefined
            // }

            // sendRequest("BootNotification", bootNotificationRequest);

        }
        catch (ex) {
            showException(ex, "SendBootNotificationRequest", this.ocppVersion);
        }

    }

    //#endregion

    //#region Monitoring

    //#endregion

}
