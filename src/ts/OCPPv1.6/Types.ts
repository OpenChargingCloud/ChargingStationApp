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
export type VendorId                       = string;
export type RequestId                      = number;
export type Timestamp                      = string;
export type Integer                        = number;
export type ConnectorId                    = number;
export type TransactionId                  = number;
export type ChargingProfileId              = number;
export type MeteringValue                  = number;
export type ReservationId                  = number;
export type Seconds                        = number;
export type ListVersion                    = number;
export type PEMCertificate                 = string;
export type PEMCertificateChain            = string;
export type URL                            = string;


export type AuthorizationStatus            = "Accepted" |                              // Identifier is allowed for charging.
                                             "Blocked"  |                              // Identifier has been blocked. Not allowed for charging.
                                             "Expired"  |                              // Identifier has expired. Not allowed for charging.
                                             "Invalid"  |                              // Identifier is unknown. Not allowed for charging.
                                             "ConcurrentTx";                           // Identifier is already involved in another transaction and multiple transactions are not allowed. (Only relevant for a StartTransaction.req.)

export type AvailabilityStatus             = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected" |                              // Request has not been accepted and will not be executed.
                                             "Scheduled";                              // Request has been accepted and will be executed when transaction(s) in progress have finished.

export type AvailabilityType               = "Inoperative" |                           // Charge point is not available for charging.
                                             "Operative";                              // Charge point is available for charging.

export type CancelReservationStatus        = "Accepted" |                              // Reservation for the identifier has been cancelled.
                                             "Rejected";                               // Reservation could not be cancelled, because there is no reservation active for the identifier.

export type ChargePointErrorCode           = "ConnectorLockFailure" |                  // Failure to lock or unlock connector.
                                             "EVCommunicationError" |                  // Communication failure with the vehicle, might be Mode 3 or other communication protocol problem.
                                                                                       // This is not a real error in the sense that the Charge Point doesn’t need to go to the faulted state. Instead, it should go to the SuspendedEVSE state.
                                             "GroundFailure"        |                  // Ground fault circuit interrupter has been activated.
                                             "HighTemperature"      |                  // Temperature inside Charge Point is too high.
                                             "InternalError"        |                  // Error in internal hard- or software component.
                                             "LocalListConflict"    |                  // The authorization information received from the Central System is in conflict with the LocalAuthorizationList.
                                             "NoError"              |                  // No error to report.
                                             "OtherError"           |                  // Other type of error. More information in vendorErrorCode.
                                             "OverCurrentFailure"   |                  // Over current protection device has tripped.
                                             "OverVoltage"          |                  // Voltage has risen above an acceptable level.
                                             "PowerMeterFailure"    |                  // Failure to read electrical/energy/power meter.
                                             "PowerSwitchFailure"   |                  // Failure to control power switch.
                                             "ReaderFailure"        |                  // Failure with idTag reader.
                                             "ResetFailure"         |                  // Unable to perform a reset.
                                             "UnderVoltage"         |                  // Voltage has dropped below an acceptable level.
                                             "WeakSignal"           |                  // Wireless communication device reports a weak signal.
                                              string;

export type ChargePointStatus              = "Available"     |                         // When a Connector becomes available for a new user (Operative).
                                             "Preparing"     |                         // When a Connector becomes no longer available for a new user but there is no ongoing Transaction (yet).
                                                                                       // Typically a Connector is in preparing state when a user presents a tag, inserts a cable or a vehicle occupies the parking bay (Operative)
                                             "Charging"      |                         // When the contactor of a Connector closes, allowing the vehicle to charge (Operative)
                                             "SuspendedEV"   |                         // When the EV is connected to the EVSE but the EVSE is not offering energy to the EV,
                                                                                       // e.g. due to a smart charging restriction, local supply power constraints, or as the
                                                                                       // result of StartTransaction.conf indicating that charging is not allowed etc. (Operative)
                                             "SuspendedEVSE" |                         // When the EV is connected to the EVSE and the EVSE is offering energy but the EV is not taking any energy. (Operative)
                                             "Finishing"     |                         // When a Transaction has stopped at a Connector, but the Connector is not yet available for a new user,
                                                                                       // e.g. the cable has not been removed or the vehicle has not left the parking bay (Operative)
                                             "Reserved"      |                         // When a Connector becomes reserved as a result of a Reserve Now command (Operative)
                                             "Unavailable"   |                         // When a Connector becomes unavailable as the result of a Change Availability command or an event upon
                                                                                       // which the Charge Point transitions to unavailable at its discretion. Upon receipt of a
                                                                                       // Change Availability command, the status MAY change immediately or the change MAY be scheduled.
                                                                                       // When scheduled, the Status Notification shall be send when the availability change becomes effective (Inoperative).
                                             "Faulted"       |                         // When a Charge Point or connector has reported an error and is not available for energy delivery . (Inoperative).
                                              string;  

export type ChargingProfileKindType        = "Absolute" |                              // Schedule periods are relative to a fixed point in time defined in the schedule.
                                             "Recurring" |                             // The schedule restarts periodically at the first schedule period.
                                             "Relative";                               // Schedule periods are relative to a situation-specific start point (such as the start of a Transaction)
                                                                                       // that is determined by the charge point.

export type ChargingProfilePurposeType     = "ChargePointMaxProfile" |                 // Configuration for the maximum power or current available for an entire Charge Point.
                                             "TxDefaultProfile"      |                 // Default profile *that can be configured in the Charge Point. When a new transaction is
                                                                                       // started, this profile SHALL be used, unless it was a transaction that was started by a
                                                                                       // RemoteStartTransaction.req with a ChargeProfile that is accepted by the Charge Point.
                                             "TxProfile";                              // Profile with constraints to be imposed by the Charge Point on the current transaction,
                                                                                       // or on a new transaction when this is started via a RemoteStartTransaction.req with a
                                                                                       // ChargeProfile. A profile with this purpose SHALL cease to be valid when the transaction terminates.

export type ChargingProfileStatus          = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected" |                              // Request has not been accepted and will not be executed.
                                             "NotSupported";                           // Charge Point indicates that the request is not supported

export type ChargingRateUnitType           = "W" |                                     // Watts (power). This is the TOTAL allowed charging power.
                                                                                       // If used for AC Charging, the phase current should be calculated via:
                                                                                       // Current per phase = Power / (Line Voltage * Number of Phases).
                                                                                       // The "Line Voltage" used in the calculation is not the measured voltage, but the
                                                                                       // set voltage for the area (hence, 230 of 110 volt).
                                                                                       // The "Number of Phases" is the numberPhases from the ChargingSchedulePeriod.
                                                                                       // It is usually more convenient to use this for DC charging.
                                                                                       // Note that if numberPhases in a ChargingSchedulePeriod is absent, 3 SHALL be assumed.
                                             "A";                                      // Amperes (current). The amount of Ampere per phase, not the sum of all phases.
                                                                                       // It is usually more convenient to use this for AC charging.

export type ClearCacheStatus               = "Accepted" |                              // Command has been executed.
                                             "Rejected";                               // Command has not been executed.

export type ClearChargingProfileStatus     = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Unknown";                                // No Charging Profile(s) were found matching the request.

export type ConfigurationStatus            = "Accepted" |                              // Configuration key is supported and setting has been changed.
                                             "Rejected" |                              // Configuration key is supported, but setting could not be changed.
                                             "RebootRequired" |                        // Configuration key is supported and setting has been changed, but change will be available after reboot (Charge Point will not reboot itself)
                                             "NotSupported";                           // Configuration key is not supported.

export type DataTransferStatus             = "Accepted" |                              // Message has been accepted and the contained request is accepted.
                                             "Rejected" |                              // Message has been accepted but the contained request is rejected.
                                             "UnknownMessageId" |                      // Message could not be interpreted due to unknown messageId string.
                                             "UnknownVendorId";                        // Message could not be interpreted due to unknown vendorId string.

export type DiagnosticsStatus              = "Idle"         |                          // Charge Point is not performing diagnostics related tasks. Status Idle SHALL only be used
                                                                                       // as in a DiagnosticsStatusNotification.req that was triggered by a TriggerMessage.req
                                             "Uploaded"     |                          // Diagnostics information has been uploaded.
                                             "UploadFailed" |                          // Uploading of diagnostics failed.
                                             "Uploading"    |                          // File is being uploaded.
                                              string;  

export type FirmwareStatus                 = "Downloaded"                |             // [Intermediate] New firmware has been downloaded by Charge Point.
                                             "DownloadFailed"            |             // [Failure]      Charge Point failed to download firmware.
                                             "Downloading"               |             // [Intermediate] Firmware is being downloaded.
                                             "DownloadScheduled"         |             // [Intermediate] Downloading of new firmware has been scheduled.
                                             "DownloadPaused"            |             // [Intermediate] Downloading has been paused.
                                             "Idle"                      |             //                Charge Point is not performing firmware update related tasks.
                                                                                       //                Status Idle SHALL only be used as in a FirmwareStatusNotification.req that was triggered by a TriggerMessage.req
                                             "InstallationFailed"        |             // [Failure]      Installation of new firmware has failed.
                                             "Installing"                |             // [Intermediate] Firmware is being installed.
                                             "Installed"                 |             // [Successful]   New firmware has successfully been installed in Charge Point.
                                             "InstallRebooting"          |             // [Intermediate] Charge Point is about to reboot to activate new firmware.
                                                                                       //                This status MAY be omitted if a reboot is an integral part of the installation and cannot be reported separately
                                             "InstallScheduled"          |             // [Intermediate] Installation of the downloaded firmware is scheduled to take place on installDateTime given in SignedUpdateFirmware.req.
                                             "InstallVerificationFailed" |             // [Failure]      Verification of the new firmware (e.g. using a checksum or some other means) has failed and installation will not proceed.
                                             "InvalidSignature"          |             // [Failure]      The firmware signature is not valid.
                                             "SignatureVerified"         |             // [Intermediate] Provide signature successfully verified.
                                              string;

export type GetCompositeScheduleStatus     = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected";                               // Request has not been accepted and will not be executed.

export type IdToken                        = string;                                   // CiString20

export type MeteringLocation               = "Body"   |                                // Measurement inside body of Charge Point (e.g. Temperature).
                                             "Cable"  |                                // Measurement taken from cable between EV and Charge Point.
                                             "EV"     |                                // Measurement taken by EV.
                                             "Inlet"  |                                // Measurement at network (“grid”) inlet connection.
                                             "Outlet" |                                // Measurement at a Connector. Default value.
                                             string;

export type Measurand                      = "Current.Export"                  |       // Instantaneous current flow from EV.
                                             "Current.Import"                  |       // Instantaneous current flow to EV.
                                             "Current.Offered"                 |       // Maximum current offered to EV.
                                             "Energy.Active.Export.Register"   |       // Numerical value read from the "active electrical energy" (Wh or kWh) register of the (most authoritative) electrical meter measuring energy exported (to the grid).
                                             "Energy.Active.Import.Register"   |       // Numerical value read from the "active electrical energy" (Wh or kWh) register of the (most authoritative) electrical meter measuring energy imported (from the grid supply).
                                             "Energy.Reactive.Export.Register" |       // Numerical value read from the "reactive electrical energy" (VARh or kVARh) register of the (most authoritative) electrical meter measuring energy exported (to the grid).
                                             "Energy.Reactive.Import.Register" |       // Numerical value read from the "reactive electrical energy" (VARh or kVARh) register of the (most authoritative) electrical meter measuring energy imported (from the grid supply).
                                             "Energy.Active.Export.Interval"   |       // Absolute amount of "active electrical energy" (Wh or kWh) exported (to the grid) during an associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration values (in seconds) for "ClockAlignedDataInterval" and "MeterValueSampleInterval".
                                             "Energy.Active.Import.Interval"   |       // Absolute amount of "active electrical energy" (Wh or kWh) imported (from the grid supply) during an associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration values (in seconds) for "ClockAlignedDataInterval" and "MeterValueSampleInterval".
                                             "Energy.Reactive.Export.Interval" |       // Absolute amount of "reactive electrical energy" (VARh or kVARh) exported (to the grid) during an associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration values (in seconds) for "ClockAlignedDataInterval" and "MeterValueSampleInterval".
                                             "Energy.Reactive.Import.Interval" |       // Absolute amount of "reactive electrical energy" (VARh or kVARh) imported (from the grid supply) during an associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration values (in seconds) for "ClockAlignedDataInterval" and "MeterValueSampleInterval".
                                             "Frequency"                       |       // Instantaneous reading of powerline frequency. NOTE: OCPP 1.6 does not have a UnitOfMeasure for frequency, the UnitOfMeasure for any SampledValue with measurand: Frequency is Hertz.
                                             "Power.Active.Export"             |       // Instantaneous active power exported by EV. (W or kW)
                                             "Power.Active.Import"             |       // Instantaneous active power imported by EV. (W or kW)
                                             "Power.Factor"                    |       // Instantaneous power factor of total energy flow
                                             "Power.Offered"                   |       // Maximum power offered to EV
                                             "Power.Reactive.Export"           |       // Instantaneous reactive power exported by EV. (var or kvar)
                                             "Power.Reactive.Import"           |       // Instantaneous reactive power imported by EV. (var or kvar)
                                             "RPM"                             |       // Fan speed in RPM
                                             "SoC"                             |       // State of charge of charging vehicle in percentage
                                             "Temperature"                     |       // Temperature reading inside Charge Point.
                                             "Voltage"                         |       // Instantaneous AC RMS supply voltage
                                              string;  

export type MessageTrigger                 = "BootNotification" |                      // To trigger a BootNotification request.
                                             "DiagnosticsStatusNotification" |         // To trigger a DiagnosticsStatusNotification request.
                                             "FirmwareStatusNotification" |            // To trigger a FirmwareStatusNotification request.
                                             "Heartbeat" |                             // To trigger a Heartbeat request.
                                             "MeterValues" |                           // To trigger a MeterValues request.
                                             "SignChargePointCertificate" |            // To trigger a SignCertificate.req with certificateType: ChargePointCertificate.
                                             "StatusNotification";                     // To trigger a StatusNotification request.

export type Phase                          = "L1"    |                                 // Measured on L1
                                             "L2"    |                                 // Measured on L2
                                             "L3"    |                                 // Measured on L3
                                             "N"     |                                 // Measured on Neutral
                                             "L1_N"  |                                 // Measured on L1 with respect to Neutral conductor
                                             "L2_N"  |                                 // Measured on L2 with respect to Neutral conductor
                                             "L3_N"  |                                 // Measured on L3 with respect to Neutral conductor
                                             "L1_L2" |                                 // Measured between L1 and L2
                                             "L2_L3" |                                 // Measured between L2 and L3
                                             "L3_L1" |                                 // Measured between L3 and L1
                                              string;  

export type ReadingContext                 = "Interruption.Begin" |                    // Value taken at start of interruption.
                                             "Interruption.End"   |                    // Value taken when resuming after interruption.
                                             "Other"              |                    // Value for any other situations.
                                             "Sample.Clock"       |                    // Value taken at clock aligned interval.
                                             "Sample.Periodic"    |                    // Value taken as periodic sample relative to start time of transaction.
                                             "Transaction.Begin"  |                    // Value taken at start of transaction.
                                             "Transaction.End"    |                    // Value taken at end of transaction.
                                             "Trigger"            |                    // Value taken in response to a TriggerMessage.req.
                                             string;

export type StopReason                     = "DeAuthorized"  |                         // The transaction was stopped because of the authorization status in a StartTransaction.conf
                                             "EmergencyStop" |                         // Emergency stop button was used.
                                             "EVDisconnected" |                        // Disconnecting of cable, vehicle moved away from inductive charge unit.
                                             "HardReset" |                             // A hard reset command was received.
                                             "Local" |                                 // Stopped locally on request of the user at the Charge Point. This is a regular termination
                                                                                       // of a transaction. Examples: presenting an RFID tag, pressing a button to stop.
                                             "Other" |                                 // Any other reason.
                                             "PowerLoss" |                             // Complete loss of power.
                                             "Reboot" |                                // A locally initiated reset/reboot occurred. (for instance watchdog kicked in)
                                             "Remote" |                                // Stopped remotely on request of the user. This is a regular termination of a transaction.
                                                                                       // Examples: termination using a smartphone app, exceeding a (non local) prepaid credit.
                                             "SoftReset" |                             // A soft reset command was received.
                                             "UnlockCommand" |                         // The cable was unlocked.
                                             string;

export type RecurrencyKindType             = "Daily" |                                 // The schedule restarts every 24 hours, at the same time as in the startSchedule.
                                             "Weekly";                                 // The schedule restarts every 7 days, at the same time and day-of-the-week as in the startSchedule.

export type RegistrationStatus             = "Accepted" |                              // Charge point is accepted by Central System.
                                             "Pending"  |                              // Central System is not yet ready to accept the Charge Point.
                                                                                       // Central System may send messages to retrieve information or prepare the Charge Point.
                                             "Rejected";                               // Charge point is not accepted by Central System. This may happen when the Charge Point id is not known by Central System.

export type RemoteStartStopStatus          = "Accepted" |                              // Command will be executed.
                                             "Rejected";                               // Command will not be executed.

export type ReservationStatus              = "Accepted" |                              // Reservation has been made.
                                             "Faulted"  |                              // Reservation has not been made, because connectors or specified connector are in a faulted state.
                                             "Occupied" |                              // Reservation has not been made. All connectors or the specified connector are occupied.
                                             "Rejected" |                              // Reservation has not been made. Charge Point is not configured to accept reservations.
                                             "Unavailable";                            // Reservation has not been made, because connectors or specified connector are in an unavailable state.

export type ResetStatus                    = "Accepted" |                              // Command will be executed.
                                             "Rejected";                               // Command will not be executed.

export type ResetType                      = "Hard" |                                  // Restart (all) the hardware, the Charge Point is not required to gracefully stop ongoing
                                                                                       // transaction. If possible the Charge Point sends a StopTransaction.req for previously
                                                                                       // ongoing transactions after having restarted and having been accepted by the Central System
                                                                                       // via a BootNotification.conf. This is a last resort solution for a not correctly functioning
                                                                                       // Charge Point, by sending a "hard" reset, (queued) information might get lost.
                                             "Soft";                                   // Stop ongoing transactions gracefully and sending StopTransaction.req for every ongoing
                                                                                       // transaction. It should then restart the application software (if possible, otherwise
                                                                                       // restart the processor/controller).

export type TriggerMessageStatus           = "Accepted" |                              // Requested notification will be sent.
                                             "Rejected" |                              // Requested notification will not be sent.
                                             "NotImplemented";                         // Requested notification cannot be sent because it is either not implemented or unknown.

export type UnitOfMeasure                  = "Wh"         |                            // Watt-hours (energy). Default.
                                             "kWh"        |                            // kiloWatt-hours (energy).
                                             "varh"       |                            // Var-hours (reactive energy).
                                             "kvarh"      |                            // kilovar-hours (reactive energy).
                                             "Watts"      |                            // Watts (power).
                                             "kW"         |                            // kiloWatts (power)
                                             "VA"         |                            // VoltAmpere (apparent power).
                                             "kVA"        |                            // kiloVolt Ampere (apparent power)
                                             "var"        |                            // Vars (reactive power)
                                             "kvar"       |                            // kilovars (reactive power).
                                             "A"          |                            // Amperes (current).
                                             "V"          |                            // Voltage (r.m.s. AC).
                                             "Celsius"    |                            // Degrees (temperature).
                                             "Fahrenheit" |                            // Degrees (temperature).
                                             "K"          |                            // Degrees Kelvin (temperature).
                                             "Percent"    |                            // Percentage.
                                              string;

export type UnlockStatus                   = "Unlocked"   |                            // Connector has successfully been unlocked.
                                             "UnlockFailed" |                          // Failed to unlock the connector: The Charge Point has tried to unlock the connector and has detected that the connector is still locked or the unlock mechanism failed.
                                             "NotSupported";                           // Charge Point has no connector lock, or ConnectorId is unknown.

export type UpdateStatus                   = "Accepted" |                              // Local Authorization List successfully updated.
                                             "Failed"   |                              // Failed to update the Local Authorization List.
                                             "NotSupported" |                          // Update of Local Authorization List is not supported by Charge Point
                                             "VersionMismatch";                        // Version number in the request for a differential update is less or equal then version number of current list.

export type UpdateType                     = "Differential" |                          // Indicates that the current Local Authorization List must be updated with the values in this message.
                                             "Full";                                   // Indicates that the current Local Authorization List must be replaced by the values in this message.

export type ValueFormat                    = "Raw" |                                   // Data is to be interpreted as integer/decimal numeric data.
                                             "SignedData";                             // Data is represented as a signed binary data block, encoded as hex data.


// Security Extensions

export type SecurityEvent                  = "FirmwareUpdated"                     |   // [Critical] The Charge Point firmware is updated.
                                             "FailedToAuthenticateAtCentralSystem" |   // The authentication credentials provided by the Charge Point were rejected by the Central System.
                                             "CentralSystemFailedToAuthenticate"   |   // The authentication credentials provided by the Central System were rejected by the Charge Point.
                                             "SettingSystemTime"                   |   // [Critical] The system time on the Charge Point was changed.
                                             "StartupOfTheDevice"                  |   // [Critical] The Charge Point has booted.
                                             "ResetOrReboot"                       |   // [Critical] The Charge Point was rebooted or reset.
                                             "SecurityLogWasCleared"               |   // [Critical] The security log was cleared.
                                             "ReconfigurationOfSecurityParameters" |   // Security parameters, such as keys or the security profile used, were changed.
                                             "MemoryExhaustion"                    |   // [Critical] The Flash or RAM memory of the Charge Point is getting full.
                                             "InvalidMessages"                     |   // The Charge Point has received messages that are not valid OCPP messages, if signed messages, signage invalid/incorrect.
                                             "AttemptedReplayAttacks"              |   // The Charge Point has received a replayed message (other than the Central System trying to resend a message because it there was for example a network problem).
                                             "TamperDetectionActivated"            |   // [Critical] The physical tamper detection sensor was triggered.
                                             "InvalidFirmwareSignature"            |   // The firmware signature is not valid.
                                             "InvalidFirmwareSigningCertificate"   |   // The certificate used to verify the firmware signature is not valid.
                                             "InvalidCentralSystemCertificate"     |   // The certificate that the Central System uses was not valid or could not be verified.
                                             "InvalidChargePointCertificate"       |   // The certificate sent to the Charge Point using the SignCertificate.conf message is not a valid certificate.
                                             "InvalidTLSVersion"                   |   // The TLS version used by the Central System is lower than 1.2 and is not allowed by the security specification.
                                             "InvalidTLSCipherSuite";                  // The Central System did only allow connections using TLS cipher suites that are not allowed by the security specification.

export type CertificateSignedStatus        = "Accepted" |                              // Signed certificate is valid.
                                             "Rejected";                               // Signed certificate is invalid.

export type CertificateStatus              = "Accepted" |                              // The installation of the certificate succeeded.
                                             "Failed"   |                              // The certificate is valid and correct, but there is another reason the installation did not succeed.
                                             "Rejected";                               // The certificate is invalid and/or incorrect OR the CPO tries to install more certificates than allowed.

export type CertificateUse                 = "CentralSystemRootCertificate" |          // Root certificate, used by the CA to sign the Central System and Charge Point certificate.
                                             "ManufacturerRootCertificate" |           // Root certificate, used by the CA to sign the Manufacturer certificate.
                                             string;

export type DeleteCertificateStatus        = "Accepted" |                              // Normal successful completion (no errors).
                                             "Failed" |                                // Processing failure.
                                             "NotFound";                               // Requested resource not found.

export type GenericStatus                  = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected";                               // Request has not been accepted and will not be executed.

export type GetInstalledCertificateStatus  = "Accepted" |                              // Normal successful completion (no errors).
                                             "NotFound";                               // Requested certificate not found.

export type HashAlgorithm                  = "SHA256" |                                // SHA-256 hash algorithm.
                                             "SHA384" |                                // SHA-384 hash algorithm.
                                             "SHA512";                                 // SHA-512 hash algorithm.

export type LogType                        = "DiagnosticsLog" |                        // Diagnostic log.
                                             "SecurityLog";                            // Security log.

export type LogStatus                      = "Accepted" |                              // Accepted this log upload. This does not mean the log file is uploaded is successfully, the Charge Point will now start the log file upload.
                                             "Rejected" |                              // Log update request rejected.
                                             "AcceptedCanceled";                       // Accepted this log upload, but in doing this has canceled an ongoing log file upload.

export type UpdateFirmwareStatus           = "Accepted" |                              // Accepted this firmware update request. This does not mean the firmware update is successful, the Charge Point will now start the firmware update process.
                                             "Rejected" |                              // Firmware update request rejected.
                                             "AcceptedCanceled" |                      // Accepted this firmware update request, but in doing this has canceled an ongoing firmware update.
                                             "InvalidCertificate" |                    // The certificate is invalid.
                                             "RevokedCertificate";                     // Failure end state. The Firmware Signing certificate has been revoked.

export type UploadLogStatus                = "BadMessage" |                            // A badly formatted packet or other protocol incompatibility was detected.
                                             "Idle" |                                  // The Charge Point is not uploading a log file. Idle SHALL only be used when the message was triggered by a ExtendedTriggerMessage.req.
                                             "NotSupportedOperation" |                 // The server does not support the operation.
                                             "PermissionDenied" |                      // Insufficient permissions to perform the operation.
                                             "Uploaded" |                              // File has been uploaded successfully.
                                             "UploadFailure" |                         // Failed to upload the requested file.
                                             "Uploading";                              // File is being uploaded.

