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

// OCPP Messages

export interface BootNotificationRequest {
    chargingStation:            IChargingStation;
    reason:                     BootReason;
    customData?:                ICustomData;
}

export interface HeartBeatRequest {
    customData?:                ICustomData;
}



// Complex Data Structures

export interface ICustomData {
    vendorId:                   string;
    [key: string]:              any;
}

export interface IChargingStation {
    model:                      string;
    vendorName:                 string;
    serialNumber?:              string;
    modem?:                     IModem;
    firmwareVersion?:           string;
    customData?:                ICustomData;

}
export interface IModem {
    iccid?:                     string;
    imsi?:                      string;
    customData?:                ICustomData;
}



// Types

// Currently just for clarity
type IdToken                = string;
type VendorId               = string;
type RequestId              = number;
type Timestamp              = string;
type EVSEId                 = number;
type ConnectorId            = number;
type TransactionId          = number;
type MeteringValue          = number;
type ReservationId          = number;

type BootReason             = "ApplicationReset" |
                              "FirmwareUpdate"   |
                              "LocalReset"       |
                              "PowerUp"          |
                              "RemoteReset"      |
                              "ScheduledReset"   |
                              "Triggered"        |
                              "Watchdog"         |
                               string;




