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


export class OutgoingMessages {

    private static readonly ocppVersion:    string = "OCPP v1.6";


    //#region Certificates

    // SignCertificate

    //#endregion

    //#region Charging

    // Authorize
    // SendMeterValues
    // SendStartTransactionNotification
    // SendStatusNotification
    // SendStopTransactionNotification

    //#endregion

    //region Common

    // TransferData

    //#endregion

    //#region Firmware

    public static SendBootNotification(properties: HTMLDivElement) : messages.BootNotificationRequest
    {

        const bootNotificationRequest: messages.BootNotificationRequest = {
            chargePointVendor:        (properties?.querySelector('input[name="chargePointVendor"]')        as HTMLInputElement). value,
            chargePointModel:         (properties?.querySelector('input[name="chargePointModel"]')         as HTMLInputElement). value,
            chargePointSerialNumber:  (properties?.querySelector('input[name="chargePointSerialNumber"]')  as HTMLInputElement)?.value || undefined,
            chargeBoxSerialNumber:    (properties?.querySelector('input[name="chargeBoxSerialNumber"]')    as HTMLInputElement)?.value || undefined,
            firmwareVersion:          (properties?.querySelector('input[name="firmwareVersion"]')          as HTMLInputElement)?.value || undefined,
            iccid:                    (properties?.querySelector('input[name="ICCId"]')                    as HTMLInputElement)?.value || undefined,
            imsi:                     (properties?.querySelector('input[name="IMSI"]')                     as HTMLInputElement)?.value || undefined,
            meterType:                (properties?.querySelector('input[name="meterType"]')                as HTMLInputElement)?.value || undefined,
            meterSerialNumber:        (properties?.querySelector('input[name="meterSerialNumber"]')        as HTMLInputElement)?.value || undefined
        }

        return bootNotificationRequest;

    }

    public static SendHeartbeat(properties: HTMLDivElement) : messages.HeartBeatRequest
    {

        const heartBeatRequest: messages.HeartBeatRequest = { }

        return heartBeatRequest;

    }

    // SendFirewareStatusNotification
    // SendSignedFirmwareStatusNotification

    //#endregion

    //#region Monitoring

    // SendDiagnosticsStatusNotification
    // SendLogStatusNotification
    // SendSecurityEventNotification

    //#endregion

}
