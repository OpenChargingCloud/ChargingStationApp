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

// Currently just for clarity
export type IdToken2                 = string;
export type VendorId                 = string;
export type Certificate              = string;
export type RequestId                = number;
export type EMAId                    = string;
export type EVSEId                   = number;
export type ISO15118SchemaVersion    = string;
export type EXIData                  = string;
export type Timestamp                = string;
export type Integer                  = number;
export type ChargingScheduleId       = string;
export type PriceScheduleId          = number;
export type Currency                 = string;
export type Language                 = string;
export type PriceAlgorithm           = string;
export type TaxRuleId                = number;
export type SalesTariffId            = string;
export type DisplayMessageId         = number;
export type LanguageId               = string;
export type ConnectorId              = number;
export type TransactionId            = number;
export type PercentageInt            = number;
export type EventId                  = number;
export type Serverity                = number;
export type VariableMonitoringId     = number;
export type Severity                 = number;
export type ChargingProfileId        = number;
export type ReservationId            = number;
export type RemoteStartId            = number;

export type IdTokenType              = "Central"         |
                                       "eMAID"           |
                                       "EVCCID"          |
                                       "ISO14443"        |
                                       "ISO15693"        |
                                       "KeyCode"         |
                                       "Local"           |
                                       "MacAddress"      |
                                       "NEMA"            |
                                       "NoAuthorization" |
                                        string;

export type HashAlgorithm            = "SHA256" |
                                       "SHA384" |
                                       "SHA512" |
                                        string;

export type BootReason               = "ApplicationReset" |
                                       "FirmwareUpdate"   |
                                       "LocalReset"       |
                                       "PowerUp"          |
                                       "RemoteReset"      |
                                       "ScheduledReset"   |
                                       "Triggered"        |
                                       "Watchdog"         |
                                        string;

export type ChargingLimitSource      = "EMS"   |
                                       "Other" |
                                       "SO"    |
                                       "CSO"   |
                                        string;

export type FirmwareStatus           = "Downloaded"                |
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

export type CertificateAction        = "Install" |
                                       "Update"  |
                                        string;

export type UploadLogStatus          = "BadMessage"            |
                                       "Idle"                  |
                                       "NotSupportedOperation" |
                                       "PermissionDenied"      |
                                       "Uploaded"              |
                                       "UploadFailure"         |
                                       "Uploading"             |
                                       "AcceptedCanceled"      |
                                        string;

export type ReadingContext           = "Interruption.Begin" |
                                       "Interruption.End"   |
                                       "Other"              |
                                       "Sample.Clock"       |
                                       "Transaction.Begin"  |
                                       "Transaction.End"    |
                                       "Trigger"            |
                                       "Sample.Periodic"    |
                                        string;
 
 export type ValueFormat             = "Raw" |
                                       "SignedData";
 
 export type Measurand               = "Current.Export"                  |
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
 
 export type Phase                   = "L1"    |
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
 
 export type MeteringLocation        = "Body"   |
                                       "Cable"  |
                                       "EV"     |
                                       "Inlet"  |
                                       "Outlet" |
                                        string;
 
 export type UnitOfMeasure           = "Celsius"    |
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

export type ChargingRateUnit         = "A" |
                                       "W" |
                                        string;

export type CostKind                 = "CarbonDioxideEmission"         |
                                       "RelativePricePercentage"       |
                                       "RenewableGenerationPercentage" |
                                        string;

export type MessagePriority          = "AlwaysFront" |
                                       "InFront"     |
                                       "NormalCycle" |
                                        string;

export type MessageFormat            = "ASCII" |
                                       "HTML"  |
                                       "URI"   |
                                       "UTF8"  |
                                        string;

export type MessageState             = "Charging"    |
                                       "Faulted"     |
                                       "Idle"        |
                                       "Unavailable" |
                                        string;

export type EnergyTransferMode       = "DC"               |
                                       "AC_single_phase"  |
                                       "AC_two_phase"     |
                                       "AC_three_phase"   |
                                        string;

export type EventTrigger             = "Alerting" |
                                       "Delta"    |
                                       "Periodic" |
                                        string;

export type EventNotificationType    = "HardWiredNotification" |
                                       "HardWiredMonitor"      |
                                       "PreconfiguredMonitor"  |
                                       "CustomMonitor"         |
                                        string;

export type MonitorType              = "UpperThreshold"       |
                                       "LowerThreshold"       |
                                       "Delta"                |
                                       "Periodic"             |
                                       "PeriodicClockAligned" |
                                        string;

export type AttributeType            = "Actual" |
                                       "Target" |
                                       "MinSet" |
                                       "MaxSet" |
                                        string;

export type MutabilityType           = "ReadOnly"  |
                                       "WriteOnly" |
                                       "ReadWrite" |
                                        string;

export type VariableDataType         = "ReadOnly"  |
                                       "WriteOnly" |
                                       "ReadWrite" |
                                        string;

export type PublishFirmwareStatus    = "Idle"              |
                                       "DownloadScheduled" |
                                       "Downloading"       |
                                       "Downloaded"        |
                                       "Published"         |
                                       "DownloadFailed"    |
                                       "DownloadPaused"    |
                                       "InvalidChecksum"   |
                                       "ChecksumVerified"  |
                                       "PublishFailed"     |
                                        string;

export type ChargingProfilePurpose   = "ChargingStationExternalConstraints" |
                                       "ChargePointMaxProfile"              |
                                       "TxProfile"                          |
                                       "TxDefaultProfile"                   |
                                        string;

export type ChargingProfileKind      = "Absolute"  |
                                       "Recurring" |
                                       "Relative"  |
                                        string;

export type RecurrencyKind           = "Daily"  |
                                       "Weekly" |
                                        string;

export type ReservationUpdateStatus  = "Expired" |
                                       "Removed" |
                                        string;

export type SecurityEvent            = "FirmwareUpdated"                     |
                                       "FailedToAuthenticateAtCSMS"          |
                                       "CSMSFailedToAuthenticate"            |
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
                                       "InvalidCSMSCertificate"              |
                                       "InvalidChargePointCertificate"       |
                                       "InvalidTLSVersion"                   |
                                       "InvalidTLSCipherSuite"               |
                                        string;

export type CertificateType          = "ChargingStationCertificate" |
                                       "V2GCertificate"             |
                                        string;

export type ConnectorStatus          = "Available"   |
                                       "Occupied"    |
                                       "Reserved"    |
                                       "Unavailable" |
                                       "Faulted"     |
                                        string;

export type TransactionEvent         = "Started" |
                                       "Updated" |
                                       "Ended"   |
                                        string;

export type TriggerReason            = "Authorized"           |
                                       "CablePluggedIn"       |
                                       "ChargingRateChanged"  |
                                       "ChargingStateChanged" |
                                       "Deauthorized"         |
                                       "EnergyLimitReached"   |
                                       "EVCommunicationLost"  |
                                       "EVConnectTimeout"     |
                                       "MeterValueClock"      |
                                       "MeterValuePeriodic"   |
                                       "TimeLimitReached"     |
                                       "Trigger"              |
                                       "UnlockCommand"        |
                                       "StopAuthorized"       |
                                       "EVDeparted"           |
                                       "EVDetected"           |
                                       "RemoteStop"           |
                                       "RemoteStart"          |
                                       "AbnormalCondition"    |
                                       "SignedDataReceived"   |
                                       "ResetCommand"         |
                                        string;

export type ChargingState            = "Charging"      |
                                       "EVConnected"   |
                                       "SuspendedEV"   |
                                       "SuspendedEVSE" |
                                       "Idle"          |
                                        string;

export type StopTransactionReason    = "DeAuthorized"       |
                                       "EmergencyStop"      |
                                       "EnergyLimitReached" |
                                       "EVDisconnected"     |
                                       "GroundFault"        |
                                       "ImmediateReset"     |
                                       "Local"              |
                                       "LocalOutOfCredit"   |
                                       "MasterPass"         |
                                       "Other"              |
                                       "OvercurrentFault"   |
                                       "PowerLoss"          |
                                       "PowerQuality"       |
                                       "Reboot"             |
                                       "Remote"             |
                                       "SOCLimitReached"    |
                                       "StoppedByEV"        |
                                       "TimeLimitReached"   |
                                       "Timeout"            |
                                        string;




export type OperationalStatus              = "Inoperative" |                           // Charging Station is not available for charging.
                                             "Operative";                              // Charging Station is available for charging.

export type ChangeAvailabilityStatus       = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected" |                              // Request has not been accepted and will not be executed.
                                             "Scheduled";                              // Request has been accepted and will be executed when transaction(s) in progress have finished.



export type ResetStatus                    = "Accepted" |                              // Command will be executed.
                                             "Rejected" |                              // Command will not be executed.
                                             "Scheduled";                              // Reset command is scheduled, Charging Station is busy with a process that cannot be
                                                                                       // interrupted at the moment. Reset will be executed when process is finished.

export type ResetType                      = "Immediate" |                             // Immediate reset of the Charging Station or EVSE.
                                             "OnIdle"   |                              // Delay reset until no more transactions are active.
                                             "ImmediateAndResume";                     // Immediate reset and resume transaction(s) afterwards.




export type DeleteCertificateStatus        = "Accepted" |                              // Normal successful completion (no errors).
                                             "Failed" |                                // Processing failure.
                                             "NotFound";                               // Requested resource not found.

export type GetCertificateIdUse            = "V2GRootCertificate" |                    // Use for certificate of the ISO 15118 V2G Root.
                                             "MORootCertificate" |                     // Use for certificate from an eMobility Service provider. To support PnC charging with contracts from service providers that not derived their certificates from the V2G root.
                                             "CSMSRootCertificate" |                   // Root certificate for verification of the CSMS certificate.
                                             "V2GCertificateChain" |                   // ISO 15118 V2G certificate chain (excluding the V2GRootCertificate).
                                             "ManufacturerRootCertificate" |           // Root certificate for verification of the Manufacturer certificate.
                                             "OEMRootCertificate" |                    // v2.1 OEM root certificate for 2-way TLS with EV.
                                             string;

export type GetInstalledCertificateStatus  = "Accepted" |                              // Normal successful completion (no errors).
                                             "NotFound";                               // Requested certificate not found.

export type InstallCertificateUse          = "V2GRootCertificate" |                    // Use for certificate of the ISO 15118 V2G Root. A V2G Charging Station Certificate MUST be derived from one of the installed V2GRootCertificate certificates.
                                             "MORootCertificate" |                     // Use for certificate from an eMobility Service provider. To support PnC charging with contracts from service providers that not derived their certificates from the V2G root.
                                             "ManufacturerRootCertificate" |           // Root certificate for verification of the Manufacturer certificate.
                                             "CSMSRootCertificate" |                   // Root certificate, used by the CA to sign the CSMS and Charging Station certificate.
                                             "OEMRootCertificate" |                    // v2.1 OEM root certificate for 2-way TLS with EV.
                                             string;

export type InstallCertificateStatus       = "Accepted" |                              // The installation of the certificate succeeded.
                                             "Rejected" |                              // The certificate is invalid and/or incorrect OR the CSO tries to install more certificates than allowed.
                                             "Failed";                                 // The certificate is valid and correct, but there is another reason the installation did not succeed.

