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
    idToken:                        IdToken,
    certificate?:                   Certificate,
    iso15118CertificateHashData?:   OCSPRequestData[],
    customData?:                    ICustomData
}

export interface BootNotificationRequest {
    chargingStation:                ChargingStation,
    reason:                         BootReason,
    customData?:                    ICustomData
}

export interface ClearedChargingLimitRequest {
    chargingLimitSource:            ChargingLimitSource,
    evseId?:                        EVSEId,
    customData?:                    ICustomData
}

export interface DataTransferRequest {
    vendorId:                       VendorId,
    messageId?:                     string,
    data?:                          any,
    customData?:                    ICustomData
}

export interface FirmwareStatusNotificationRequest {
    status:                         FirmwareStatus,
    requestId?:                     RequestId,
    customData?:                    ICustomData
}

export interface Get15118EVCertificateRequest {
    iso15118SchemaVersion:          ISO15118SchemaVersion,
    action:                         CertificateAction,
    exiRequest:                     EXIData,
    customData?:                    ICustomData
}

export interface GetCertificateStatusRequest {
    ocspRequestData:                OCSPRequestData,
    customData?:                    ICustomData
}

export interface HeartBeatRequest {
    customData?:                    ICustomData
}

export interface LogStatusNotificationRequest {
    status:                         UploadLogStatus,
    requestId:                      RequestId,
    customData?:                    ICustomData
}

export interface MeterValuesRequest {
    evseId:                         EVSEId,
    meterValue:                     MeterValue[],
    customData?:                    ICustomData
}







// Complex Data Structures

export interface IdToken {
    idToken:                        IdToken2,
    type:                           IdTokenType,
    additionalInfo:                 AdditionalInfo[],
}

export interface AdditionalInfo {
    additionalIdToken:              IdToken2,
    type:                           string,
    customData?:                    ICustomData,
}

export interface ICustomData {
    vendorId:                       VendorId,
    [key: string]:                  any,
}

export interface OCSPRequestData {
    hashAlgorithm:                  HashAlgorithm,
    issuerNameHash:                 string,
    issuerKeyHash:                  string,
    serialNumber:                   string,
    responderURL:                   URL,
    customData?:                    ICustomData,
}

export interface ChargingStation {
    model:                          string,
    vendorName:                     string,
    serialNumber?:                  string,
    modem?:                         Modem,
    firmwareVersion?:               string,
    customData?:                    ICustomData,

}
export interface Modem {
    iccid?:                         string,
    imsi?:                          string,
    customData?:                    ICustomData,
}

export interface MeterValue {
    timestamp:                  Timestamp,
    sampledValue:               SampledValue[],
    customData?:                ICustomData
}

export interface SampledValue {
    value:                      string,
    context:                    ReadingContext,
    format:                     ValueFormat,
    measurand:                  Measurand,
    phase?:                     Phase,
    location?:                  MeteringLocation,
    signedMeterValue?:          SignedMeterValue[],
    unit?:                      UnitsOfMeasure,
    customData?:                ICustomData
}

export interface SignedMeterValue {
    signedMeterData:            string,
    signingMethod:              string,
    encodingMethod:             string,
    publicKey:                  string,
    customData?:                ICustomData
}

export interface UnitsOfMeasure {
    unit:                       UnitOfMeasure,
    multiplier:                 Integer,
    customData?:                ICustomData
}



// Types

// Currently just for clarity
type IdToken2               = string;
type VendorId               = string;
type Certificate            = string;
type RequestId              = number;
type EVSEId                 = number;
type ISO15118SchemaVersion  = string;
type EXIData                = string;
type Timestamp              = string;
type Integer                = number;
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

type FirmwareStatus         = "Downloaded"                |
                              "DownloadFailed"            |
                              "Downloading"               |
                              "DownloadScheduled"         |
                              "DownloadPaused"            |
                              "Idle"                      |
                              "InstallationFailed"        |
                              "Installing"                |
                              "Installed"                 |
                              "InstallRebooting"          |
                              "InstallScheduled"          |
                              "InstallVerificationFailed" |
                              "InvalidSignature"          |
                              "SignatureVerified"         |
                               string;

type CertificateAction      = "Install" |
                              "Update"  |
                               string;

type UploadLogStatus        = "BadMessage"            |
                              "Idle"                  |
                              "NotSupportedOperation" |
                              "PermissionDenied"      |
                              "Uploaded"              |
                              "UploadFailure"         |
                              "Uploading"             |
                              "AcceptedCanceled"      |
                               string;

type ReadingContext         = "Interruption.Begin" |
                              "Interruption.End"   |
                              "Other"              |
                              "Sample.Clock"       |
                              "Transaction.Begin"  |
                              "Transaction.End"    |
                              "Trigger"            |
                              "Sample.Periodic"    |
                               string;
 
 type ValueFormat           = "Raw" |
                              "SignedData";
 
 type Measurand             = "Current.Export"                  |
                              "Current.Import"                  |
                              "Current.Offered"                 |
                              "Energy.Active.Export.Register"   |
                              "Energy.Active.Import.Register"   |
                              "Energy.Reactive.Export.Register" |
                              "Energy.Reactive.Import.Register" |
                              "Energy.Active.Export.Interval"   |
                              "Energy.Active.Import.Interval"   |
                              "Energy.Active.Net"               |
                              "Energy.Reactive.Export.Interval" |
                              "Energy.Reactive.Import.Interval" |
                              "Energy.Reactive.Net"             |
                              "Energy.Apparent.Import"          |
                              "Energy.Apparent.Export"          |
                              "Energy.Apparent.Net"             |
                              "Power.Active.Export"             |
                              "Power.Active.Import"             |
                              "Power.Reactive.Export"           |
                              "Power.Reactive.Import"           |
                              "Power.Factor"                    |
                              "Power.Offered"                   |
                              "Frequency"                       |
                              "Voltage"                         |
                              "SoC"                             |
                               string;
 
 type Phase                 = "L1"    |
                              "L2"    |
                              "L3"    |
                              "N"     |
                              "L1_N"  |
                              "L2_N"  |
                              "L3_N"  |
                              "L1_L2" |
                              "L2_L3" |
                              "L3_L1" |
                               string;
 
 type MeteringLocation      = "Body"   |
                              "Cable"  |
                              "EV"     |
                              "Inlet"  |
                              "Outlet" |
                               string;
 
 type UnitOfMeasure         = "Celsius"    |
                              "Fahrenheit" |
                              "Wh"         |
                              "kWh"        |
                              "varh"       |
                              "kvarh"      |
                              "Watts"      |
                              "kW"         |
                              "VoltAmpere" |
                              "kVA"        |
                              "var"        |
                              "kvar"       |
                              "Amperes"    |
                              "Voltage"    |
                              "Kelvin"     |
                              "Percent"    |
                               string;

