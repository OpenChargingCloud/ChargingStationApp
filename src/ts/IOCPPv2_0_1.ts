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

export interface AuthorizeRequest {
    idToken:                        IdToken;
    certificate?:                   Certificate;
    iso15118CertificateHashData?:   OCSPRequestData[];
    customData?:                    ICustomData;
}

export interface BootNotificationRequest {
    chargingStation:                ChargingStation;
    reason:                         BootReason;
    customData?:                    ICustomData;
}

export interface ClearedChargingLimitRequest {
    chargingLimitSource:            ChargingLimitSource;
    evseId?:                        EVSEId;
    customData?:                    ICustomData;
}

export interface DataTransferRequest {
    customData?:                    ICustomData;
}

export interface HeartBeatRequest {
    customData?:                    ICustomData;
}


// Complex Data Structures

export interface IdToken {
    idToken:                        IdToken2;
    type:                           IdTokenType;
    additionalInfo:                 AdditionalInfo[];
}

export interface AdditionalInfo {
    additionalIdToken:              IdToken2;
    type:                           string;
    customData?:                    ICustomData;
}

export interface ICustomData {
    vendorId:                       VendorId;
    [key: string]:                  any;
}

export interface OCSPRequestData {
    hashAlgorithm:                  HashAlgorithm;
    issuerNameHash:                 string;
    issuerKeyHash:                  string;
    serialNumber:                   string;
    responderURL:                   URL;
    customData?:                    ICustomData;
}

export interface ChargingStation {
    model:                          string;
    vendorName:                     string;
    serialNumber?:                  string;
    modem?:                         Modem;
    firmwareVersion?:               string;
    customData?:                    ICustomData;

}
export interface Modem {
    iccid?:                         string;
    imsi?:                          string;
    customData?:                    ICustomData;
}



// Types

// Currently just for clarity
type IdToken2               = string;
type VendorId               = string;
type Certificate            = string;
type RequestId              = number;
type Timestamp              = string;
type EVSEId                 = number;
type ConnectorId            = number;
type TransactionId          = number;
type MeteringValue          = number;
type ReservationId          = number;

type IdTokenType            = "Central"         |
                              "eMAID"           |
                              "ISO14443"        |
                              "ISO15693"        |
                              "KeyCode"         |
                              "Local"           |
                              "MacAddress"      |
                              "NoAuthorization" |
                               string;

type HashAlgorithm          = "SHA256" |
                              "SHA384" |
                              "SHA512" |
                               string;

type BootReason             = "ApplicationReset" |
                              "FirmwareUpdate"   |
                              "LocalReset"       |
                              "PowerUp"          |
                              "RemoteReset"      |
                              "ScheduledReset"   |
                              "Triggered"        |
                              "Watchdog"         |
                               string;

type ChargingLimitSource    = "EMS"   |
                              "Other" |
                              "SO"    |
                              "CSO"   |
                               string;


