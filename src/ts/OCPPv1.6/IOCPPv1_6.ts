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

// Only OCPP Charging Station initiated messages!

//#region OCPP Messages

export interface AuthorizeRequest {
    idTag:                      IdToken
}

export interface BootNotificationRequest {
    chargePointVendor:          string,
    chargePointModel:           string,
    chargePointSerialNumber?:   string,
    chargeBoxSerialNumber?:     string,
    firmwareVersion?:           string,
    iccid?:                     string,
    imsi?:                      string,
    meterType?:                 string,
    meterSerialNumber?:         string
}

export interface DataTransferRequest {
    vendorId:                   VendorId,
    messageId?:                 string,
                                // OCPP CSE: A string, JSON object, or JSON array
    data?:                      string | { [key: string]: any } | any[]
}

export interface DiagnosticsStatusNotificationRequest {
    status:                     DiagnosticsStatus
}

export interface FirmwareStatusNotificationRequest {
    status:                     FirmwareStatus
}

export interface HeartBeatRequest {
}

export interface LogStatusNotificationRequest {
    status:                     UploadLogStatus,
    requestId:                  RequestId
}

export interface MeterValuesRequest {
    connectorId:                ConnectorId,
    transactionId:              TransactionId,
    meterValue:                 MeterValue[]
}

export interface SecurityEventNotificationRequest {
    type:                       SecurityEvent,
    timestamp:                  Timestamp,
    techInfo?:                  string
}

export interface SignCertificateRequest {
    csr:                        string
}

export interface SignedFirmwareStatusNotificationRequest {
    status:                     FirmwareStatus
}

export interface StartTransactionRequest {
    connectorId:                ConnectorId,
    idTag:                      IdToken,
    timestamp:                  Timestamp,
    meterStart:                 MeteringValue,
    reservationId?:             ReservationId
}

export interface StatusNotificationRequest {
    connectorId:                ConnectorId,
    status:                     ChargePointStatus,
    errorCode:                  ChargePointErrorCode,
    info?:                      string,
    timestamp?:                 Timestamp,
    vendorId?:                  VendorId,
    vendorErrorCode?:           string;
}

export interface StopTransactionRequest {
    transactionId:              TransactionId,
    timestamp:                  Timestamp,
    meterStop:                  MeteringValue,
    idTag?:                     IdToken,
    reason?:                    StopReason,
    transactionData?:           MeterValue[]
}

//#endregion

//#region Complex Data Structures

export interface MeterValue {
    timestamp:                  Timestamp,
    sampledValue:               SampledValue[]
}

export interface SampledValue {
    value:                      string,
    context:                    ReadingContext,
    format:                     ValueFormat,
    measurand:                  Measurand,
    phase?:                     Phase,
    location?:                  MeteringLocation,
    unit?:                      UnitOfMeasure
}

//#endregion

//#region Types

// Currently just for clarity
type IdToken                = string;
type VendorId               = string;
type RequestId              = number;
type Timestamp              = string;
type ConnectorId            = number;
type TransactionId          = number;
type MeteringValue          = number;
type ReservationId          = number;

type DiagnosticsStatus      = "Idle"         |
                              "Uploaded"     |
                              "UploadFailed" |
                              "Uploading"    |
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

type UploadLogStatus        = "BadMessage"            |
                              "Idle"                  |
                              "NotSupportedOperation" |
                              "PermissionDenied"      |
                              "Uploaded"              |
                              "UploadFailure"         |
                              "Uploading"             |
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

type ValueFormat            = "Raw" |
                              "SignedData";

type Measurand              = "Current.Export"                  |
                              "Current.Import"                  |
                              "Current.Offered"                 |
                              "Energy.Active.Export.Register"   |
                              "Energy.Active.Import.Register"   |
                              "Energy.Reactive.Export.Register" |
                              "Energy.Reactive.Import.Register" |
                              "Energy.Active.Export.Interval"   |
                              "Energy.Active.Import.Interval"   |
                              "Energy.Reactive.Export.Interval" |
                              "Energy.Reactive.Import.Interval" |
                              "Frequency"                       |
                              "Power.Active.Export"             |
                              "Power.Active.Import"             |
                              "Power.Factor"                    |
                              "Power.Offered"                   |
                              "Power.Reactive.Export"           |
                              "Power.Reactive.Import"           |
                              "RPM"                             |
                              "SoC"                             |
                              "Temperature"                     |
                              "Voltage"                         |
                               string;

type Phase                  = "L1"    |
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

type MeteringLocation       = "Body"   |
                              "Cable"  |
                              "EV"     |
                              "Inlet"  |
                              "Outlet" |
                               string;

type UnitOfMeasure          = "Celsius"    |
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

type SecurityEvent          = "FirmwareUpdated"                     |
                              "FailedToAuthenticateAtCentralSystem" |
                              "CentralSystemFailedToAuthenticate"   |
                              "SettingSystemTime"                   |
                              "StartupOfTheDevice"                  |
                              "ResetOrReboot"                       |
                              "SecurityLogWasCleared"               |
                              "ReconfigurationOfSecurityParameters" |
                              "MemoryExhaustion"                    |
                              "InvalidMessages"                     |
                              "AttemptedReplayAttacks"              |
                              "TamperDetectionActivated"            |
                              "InvalidFirmwareSignature"            |
                              "InvalidFirmwareSigningCertificate"   |
                              "InvalidCentralSystemCertificate"     |
                              "InvalidChargePointCertificate"       |
                              "InvalidTLSVersion"                   |
                              "InvalidTLSCipherSuite"               |
                              string;

type ChargePointStatus      = "Available"     |
                              "Preparing"     |
                              "Charging"      |
                              "SuspendedEV"   |
                              "SuspendedEVSE" |
                              "Finishing"     |
                              "Reserved"      |
                              "Faulted"       |
                              "Unavailable"   |
                               string;

type ChargePointErrorCode   = "ConnectorLockFailure" |
                              "EVCommunicationError" |
                              "GroundFailure"        |
                              "HighTemperature"      |
                              "InternalError"        |
                              "LocalListConflict"    |
                              "NoError"              |
                              "OtherError"           |
                              "OverCurrentFailure"   |
                              "OverVoltage"          |
                              "PowerMeterFailure"    |
                              "PowerSwitchFailure"   |
                              "ReaderFailure"        |
                              "ResetFailure"         |
                              "UnderVoltage"         |
                              "WeakSignal"           |
                               string;

type StopReason             = "EmergencyStop"  |
                              "EVDisconnected" |
                              "HardReset"      |
                              "Local"          |
                              "Other"          |
                              "PowerLoss"      |
                              "Reboot"         |
                              "Remote"         |
                              "SoftReset"      |
                              "UnlockCommand"  |
                              "DeAuthorized"   |
                               string;

//#endregion

//#region Internal Data Structures

export enum ConfigurationKeyAccessRights
{
    ReadWrite,
    ReadOnly,
    WriteOnly
}

export enum ConfigurationKeyRequired
{
    Required,
    Optional
}

export enum ConfigurationKeyTypes
{
    Boolean,
    Integer,
    String,
    CSL
}

export enum ConfigurationKeyUnits
{
    Times,
    Seconds,
    Percentage,
    Wh
}

export interface IConfigurationKey {
    key:            string
    value:          string
    readonly:       boolean
}

export interface IConfigurationValue {

    Value:          string
    Type:           ConfigurationKeyTypes
    Required:       ConfigurationKeyRequired
    AccessRights:   ConfigurationKeyAccessRights
    Description:    string

    updateValue(newValue: string): void;

}

//#endregion
