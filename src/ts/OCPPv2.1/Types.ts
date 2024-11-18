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

// Predefined strings are preferred over Enums, because Enums are not extensible at runtime!
// Unit types are preferred over raw primitive types to avoid confusion and errors!

export type Identifier                     = string;
export type IdToken                        = string;
export type VendorId                       = string;
export type MessageId                      = string;
export type RequestId                      = number;
export type EMAId                          = string;
export type EVSEId                         = number;
export type DERControlId                   = string;
export type ConnectorId                    = number;
export type TransactionId                  = number;
export type ChargingProfileId              = number;
export type TariffId                       = string;
export type MonitoringId                   = number;
export type StreamId                       = number;
export type ISO15118SchemaVersion          = string;
export type EXIData                        = string;
export type Timestamp                      = string;
export type Integer                        = number;
export type Seconds                        = number;
export type Decimal                        = number;
export type Volt                           = number;
export type Ampere                         = number;
export type VoltAmpere                     = number;
export type VoltAmpereReactive             = number;
export type Watt                           = number;
export type WattHour                       = number;
export type Siemens                        = number;
export type Hertz                          = number;
export type Currency                       = string;
export type Percentage                     = number;
export type Language                       = string;
export type ChargingScheduleId             = string;
export type PriceScheduleId                = number;
export type PriceAlgorithm                 = string;
export type TaxRuleId                      = number;
export type SalesTariffId                  = string;
export type ReceiptId                      = string;
export type DisplayMessageId               = number;
export type LanguageId                     = string;
export type EventId                        = number;
export type VariableMonitoringId           = number;
export type ListVersion                    = number;
export type ReservationId                  = number;
export type RemoteStartId                  = number;
export type TimeSpan                       = number;  // Time in seconds
export type TimeOfDay                      = string;  // Local time: 23:51; 24h format with leading zeros; Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
export type LocalDate                      = string;  // Local time: 2015-12-24; Valid from this day (inclusive); Regex: ([12][0-9]+{3}+)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
export type PEMCertificate                 = string;
export type PEMCertificateChain            = string;
export type URL                            = string;
export type PostalCode                     = string;
export type VATNumber                      = string;
export type CSVs                           = string;
export type i18nString                     = string;


export type APNAuthentication
    = "PAP"  |                                          // Password Authentication Protocol
      "CHAP" |                                          // Challenge Handshake Authentication Protocol
      "NONE" |                                          // No authentication
      "AUTO";                                           // Sequentially try CHAP, PAP, NONE.

export type AttributeType
    = "Actual" |                                        // The actual value of the variable.
      "Target" |                                        // The target value for this variable.
      "MinSet" |                                        // The minimal allowed value for this variable
      "MaxSet";                                         // The maximum allowed value for this variable

export type AuthorizationStatus
    = "Accepted"          |                             // Identifier is allowed for charging.
      "Blocked"           |                             // Identifier has been blocked. Not allowed for charging.
      "ConcurrentTx"      |                             // Identifier is already involved in another transaction and multiple transactions are not allowed.
                                                        // (Only relevant for the response to a TransactionEventRequest(eventType=Started).)
      "Expired"           |                             // Identifier has expired. Not allowed for charging.
      "Invalid"           |                             // Identifier is invalid. Not allowed for charging.
      "NoCredit"          |                             // Identifier is valid, but EV Driver doesn’t have enough credit to start charging. Not allowed for charging.
      "NotAllowedTypeEV"  |                             // Identifier is valid, but not allowed to charge at this type of EVSE.
      "NotAtThisLocation" |                             // Identifier is valid, but not allowed to charge at this location.
      "NotAtThisTime"     |                             // Identifier is valid, but not allowed to charge at this location at this time.
      "Unknown";                                        // Identifier is unknown. Not allowed for charging.

export type AuthorizeCertificateStatus
    = "Accepted"               |                        // Positive response.
      "SignatureError"         |                        // Signature error.
      "CertificateExpired"     |                        // If the contract certificate in the AuthorizeRequest is expired.
      "CertificateRevoked"     |                        // If the Charging Station or CSMS determine (via a CRL or OCSP response) that the contract certificate in the AuthorizeRequest is marked as revoked.
      "NoCertificateAvailable" |                        // If the Charging Station or CSMS does not have the contract certificate in the AuthorizeRequest available.
      "CertChainError"         |                        // If the contract certificate contained in the AuthorizeRequest message is not valid.
      "ContractCancelled";                              // If the EMAID provided by EVCC is invalid, unknown, expired or blocked.

export type BatterySwapEvent
    = "BatteryIn" |                                     // Battery is inserted.
      "BatteryOut";                                     // Battery is removed.

export type BootReason
    = "ApplicationReset" |                              // The Charging Station rebooted due to an application error.
      "FirmwareUpdate"   |                              // The Charging Station rebooted due to a firmware update.
      "LocalReset"       |                              // The Charging Station rebooted due to a local reset command.
      "PowerUp"          |                              // The Charging Station powered up and registers itself with the CSMS.
      "RemoteReset"      |                              // The Charging Station rebooted due to a remote reset command.
      "ScheduledReset"   |                              // The Charging Station rebooted due to a scheduled reset command.
      "Triggered"        |                              // Requested by the CSMS via a TriggerMessage.
      "Unknown"          |                              // The boot reason is unknown.
      "Watchdog"         |                              // The Charging Station rebooted due to an elapsed watchdog timer.
       string;

export type CancelReservationStatus
    = "Accepted" |                                      // Reservation for the identifier has been cancelled.
      "Rejected";                                       // Reservation could not be cancelled, because there is no reservation active for the identifier.

export type CertificateAction
    = "Install" |                                       // Install the provided certificate
      "Update"  |                                       // Update the provided certificate.
       string;

export type CertificateSignedStatus
    = "Accepted" |                                      // Signed certificate is valid.
      "Rejected";                                       // Signed certificate is invalid.

export type CertificateSigningUse
    = "ChargingStationCertificate" |                    // Client side certificate used by the Charging Station to connect the the CSMS.
      "V2GRootCertificate"         |                    // Use for certificate for 15118 connections. This means that the certificate should be derived from the V2G root.
       string;

export type ChangeAvailabilityStatus
    = "Accepted" |                                      // Request has been accepted and will be executed.
      "Rejected" |                                      // Request has not been accepted and will not be executed.
      "Scheduled";                                      // Request has been accepted and will be executed when transaction(s) in progress have finished.

export type ChargingProfileKind
    = "Absolute"  |                                     // Schedule periods are relative to a fixed point in time defined in the schedule.
                                                        // This requires that startSchedule is set to a starting point in time.
      "Recurring" |                                     // The schedule restarts periodically at the first schedule period. To be most useful, this requires that
                                                        // startSchedule is set to a starting point in time.
      "Relative"  |                                     // Charging schedule periods should start when the EVSE is ready to deliver energy. i.e. when the EV driver is
                                                        // authorized and the EV is connected. When a ChargingProfile is received for a transaction that is already
                                                        // charging, then the charging schedule periods should remain relative to the PowerPathClosed moment.
                                                        // No value for startSchedule should be supplied.
      "Dynamic"   |                                     // (2.1) The schedule consists of only one charging schedule period, which is updated dynamically by CSMS.
       string;

export type ChargingProfilePurpose
    = "ChargingStationExternalConstraints" |            // Additional constraints from an external source (e.g. an EMS) that will be incorporated into a local power
                                                        // schedule. When applied to evse.Id = 0 it sets a limit to the entire Charging Station.
                                                        // Note: In OCPP 2.0.1 this purpose was only allowed on evse.Id = 0. In OCPP 2.1 it can be set to an individual EVSE.
      "ChargePointMaxProfile"              |            // Configuration for the maximum power or current available for an entire Charging Station.
      "TxDefaultProfile"                   |            // Default profile that can be configured in the Charging Station. When a new transaction is started, this profile
                                                        // SHALL be used, unless it was a transaction that was started by a RequestStartTransactionRequest with a
                                                        // ChargingProfile that is accepted by the Charging Station.
      "TxProfile"                          |            // Profile with constraints to be imposed by the Charging Station on the current transaction, or on a new
                                                        // transaction when this is started via a RequestStartTransactionRequest with a ChargingProfile. A profile with
                                                        // this purpose SHALL cease to be valid when the transaction terminates.
      "PriorityCharging"                   |            // (2.1) This profile is used in place of a Tx(Default)Profile, when priority charging is requested, either locally on
                                                        // Charging Station or via a request from CSMS.
      "LocalGeneration"                    |            // (2.1) This profile adds capacity from local generation. Its capacity is added on top of other charging profiles.
       string;

export type ChargingProfileStatus
    = "Accepted" |                                      // Request has been accepted and will be executed.
      "Rejected";                                       // Request has not been accepted and will not be executed.

export type ChargingRateUnit
    = "W" |                                             // Watts (power). This is the TOTAL allowed charging power. If used for AC Charging, the phase current should
                                                        // be calculated via: Current per phase = Power / (Line Voltage * Number of Phases). The "Line Voltage" used in
                                                        // the calculation is not the measured voltage, but the set voltage for the area (hence, 230 of 110 volt). The
                                                        // "Number of Phases" is the numberPhases from the ChargingSchedulePeriod. It is usually more convenient to
                                                        // use this for DC charging. Note that if numberPhases in a ChargingSchedulePeriod is absent, 3 SHALL be assumed.
      "A";                                              // Amperes (current). The amount of Ampere per phase, not the sum of all phases. It is usually more
                                                        // convenient to use this for AC charging.

export type ChargingState
    = "EVConnected"   |                                 // There is a connection between EV and EVSE, in case the protocol used between EV and the Charging Station
                                                        // can detect a connection, the protocol needs to detect this for the state to become active. The connection
                                                        // can either be wired or wireless.
      "Charging"      |                                 // The contactor of the Connector is closed and energy is flowing to between EVSE and EV.
      "SuspendedEV"   |                                 // When the EV is connected to the EVSE and the EVSE is offering energy but the EV is not taking any energy.
      "SuspendedEVSE" |                                 // When the EV is connected to the EVSE but the EVSE is not offering energy to the EV, e.g. due to a smart
                                                        // charging restriction, local supply power constraints, or when charging has stopped because of the
                                                        // authorization status in the response to a transactionEventRequest indicating that charging is not allowed etc.
      "Idle"          |                                 // There is no connection between EV and EVSE.
       string;

export type ClearCacheStatus
    = "Accepted" |                                      // Command has been executed.
      "Rejected";                                       // Command has not been executed.

export type ClearChargingProfileStatus
    = "Accepted" |                                      // Request has been accepted and will be executed.
      "Unknown";                                        // No Charging Profile(s) were found matching the request.

export type ClearMessageStatus
    = "Accepted" |                                      // Request successfully executed: message cleared.
      "Unknown"  |                                      // Given message (based on the id) not known.
      "Rejected";                                       // (2.1) Request could not be executed.

export type ClearMonitoringStatus
    = "Accepted" |                                      // Monitor successfully cleared.
      "Rejected" |                                      // Clearing of monitor rejected.
      "NotFound";                                       // Monitor Id is not found.

export type ComponentCriterion
    = "Active"    |                                     // Components that are active, i.e. having Active = 1
      "Available" |                                     // Components that are available, i.e. having Available = 1
      "Enabled"   |                                     // Components that are enabled, i.e. having Enabled = 1
      "Problem";                                        // Components that reported a problem, i.e. having Problem = 1

export type ConnectorStatus
    = "Available"   |                                   // When a Connector becomes available for a new User (Operative)
      "Occupied"    |                                   // When a Connector becomes occupied, so it is not available for a new EV driver. (Operative)
      "Reserved"    |                                   // When a Connector becomes reserved as a result of ReserveNow command (Operative)
      "Unavailable" |                                   // When a Connector becomes unavailable as the result of a Change Availability command or an event upon
                                                        // which the Charging Station transitions to unavailable at its discretion. Upon receipt of ChangeAvailability
                                                        // message command, the status MAY change immediately or the change MAY be scheduled. When
                                                        // scheduled, StatusNotification SHALL be send when the availability change becomes effective (Inoperative)
      "Faulted"     |                                   // When a Connector (or the EVSE or the entire Charging Station it belongs to) has reported an error and is not
                                                        // available for energy delivery. (Inoperative).
       string;

export type ControlMode
    = "ScheduledControl" |                              // Scheduled control mode, EVSE provides up to three schedules for EV to choose from. EV follows the selected schedule.
      "DynamicControl";                                 // Dynamic control mode, EVSE executes a single schedule by sending setpoints to EV at every interval.

export type  CostDimensionType
    = "Energy"       |                                  // Total amount of energy (dis-)charged during this charging period, defined in Wh (kiloWatt-hours).
                                                        // When negative, more energy was feed into the grid then charged into the EV.
      "MaxCurrent"   |                                  // Sum of the maximum current over all phases, reached during this charging period, defined in A (Ampere).
      "MinCurrent"   |                                  // Sum of the minimum current over all phases, reached during this charging period, when negative, current has flowed from
                                                        // the EV to the grid. Defined in A (Ampere).
      "MaxPower"     |                                  // Maximum power reached during this charging period: defined in W (Watt).
      "MinPower"     |                                  // Minimum power reached during this charging period: defined in W (Watt), when negative, the power has flowed from the EV
                                                        // to the grid.
      "IdleTIme"     |                                  // Time not charging during this charging period: defined in seconds.
      "ChargingTime" |                                  // Time charging during this charging period: defined in seconds.
       string;

export type CostKind
    = "CarbonDioxideEmission"         |                 // Absolute value. Carbon Dioxide emissions, in grams per kWh.
      "RelativePricePercentage"       |                 // Relative value. Percentage of renewable generation within total generation.
      "RenewableGenerationPercentage" |                 // Relative value. Price per kWh, as percentage relative to the maximum price stated in any of all tariffs indicated to the EV.
       string;

export type CustomerInformationStatus
    = "Accepted" |                                      // The Charging Station accepted the message.
      "Rejected" |                                      // When the Charging Station is in a state where it cannot process this request.
      "Invalid";                                        // In a request to the Charging Station no reference to a customer is included.

export type DataType
    = "string" |                                        // This variable is of the type string.
      "decimal" |                                       // This variable is of the type decimal.
      "integer" |                                       // This variable is of the type integer.
      "dateTime" |                                      // DateTime following the [RFC3339] specification.
      "boolean" |                                       // This variable is of the type boolean.
      "OptionList" |                                    // Supported/allowed values for a single choice, enumerated, text variable.
      "SequenceList" |                                  // Supported/allowed values for an ordered sequence variable.
      "MemberList";                                     // Supported/allowed values for a mathematical set variable.

export type DataTransferStatus
    = "Accepted" |                                      // Message has been accepted and the contained request is accepted.
      "Rejected" |                                      // Message has been accepted but the contained request is rejected.
      "UnknownMessageId" |                              // Message could not be interpreted due to unknown messageId string.
      "UnknownVendorId";                                // Message could not be interpreted due to unknown vendorId string.

export type DayOfWeek
    = "Monday"    |                                     // Monday
      "Tuesday"   |                                     // Tuesday
      "Wednesday" |                                     // Wednesday
      "Thursday"  |                                     // Thursday
      "Friday"    |                                     // Friday
      "Saturday"  |                                     // Saturday
      "Sunday";                                         // Sunday

export type DeleteCertificateStatus
    = "Accepted" |                                      // Normal successful completion (no errors).
      "Failed"   |                                      // Processing failure.
      "NotFound";                                       // Requested resource not found.

export type DERControlType
    = "EnterService"            |                       // Enter Service parameters setting
      "FreqDroop"               |                       // Frequency droop settings
      "FreqWatt"                |                       // Frequency-Watt curve
      "FixedPFAbsorb"           |                       // Fixed power factor when absorbing power setting
      "FixedPFInject"           |                       // Fixed power factor when injecting power setting
      "FixedVar"                |                       // Fixed reactive power setpoint
      "Gradients"               |                       // Gradient settings
      "HFMustTrip"              |                       // High Frequency Must Trip curve
      "HFMayTrip"               |                       // High Frequency May Trip curve (ride-through)
      "HVMustTrip"              |                       // High Voltage Must Trip curve
      "HVMomCess"               |                       // High Voltage Momentary Cessation curve
      "HVMayTrip"               |                       // High Voltage May Trip curve (ride-through)
      "LimitMaxDischarge"       |                       // Limit discharge power to percentage of rated discharge power
      "LFMustTrip"              |                       // Low Frequency Must Trip curve
      "LVMustTrip"              |                       // Low Voltage Must Trip curve
      "LVMomCess"               |                       // Low Voltage Momentary Cessation curve
      "LVMayTrip"               |                       // Low Voltage May Trip curve (ride-through)
      "PowerMonitoringMustTrip" |                       // Power Monitoring curve according to VDE-AR-N 4105 section 5.5.2
      "VoltVar"                 |                       // Volt-Var curve
      "VoltWatt"                |                       // Volt-Watt curve
      "WattPF"                  |                       // Watt-PowerFactor curve
      "WattVar"                |                        // Watt-Var curve
       string;

export type DERControlStatus
    = "Accepted"    |                                   // Operation successful.
      "Rejected"    |                                   // Operation failed.
      "Unsupported" |                                   // Type of DER setting or curve is not supported.
      "NotFound";                                       // Type or Id in clear/get request was not found.

export type DERUnit
    = "Not_Applicable" |                                // No unit applicable (e.g. for ride-through curves)
      "PctMaxW"        |                                // Percentage of configured active power
      "PctMaxVar"      |                                // Percentage of configured reactive power
      "PctWAvail"      |                                // Percentage of available reserve active power
      "PctVarAvail"    |                                // Percentage of available reserve reactive power
      "PctEffectiveV"  |                                // Percentage of effective voltage
       string;

export type DisplayMessageStatus
    = "Accepted"                  |                     // Request to display message accepted.
      "NotSupportedMessageFormat" |                     // None of the formats in the given message are supported.
      "Rejected"                  |                     // Request cannot be handled.
      "NotSupportedPriority"      |                     // The given MessagePriority not supported for displaying messages by Charging Station.
      "NotSupportedState"         |                     // The given MessageState not supported for displaying messages by Charging Station.
      "UnknownTransaction"        |                     // Given Transaction not known/ongoing.
      "LanguageNotSupported"      |                     // (2.1) Message contains one or more languages that are not supported by Charging Station.
       string;

export type EnergyTransferMode
    = "AC_single_phase"  |                              // AC single phase charging according to IEC 62196.
      "AC_two_phase"     |                              // AC two phase charging according to IEC 62196.
      "AC_three_phase"   |                              // AC three phase charging according to IEC 62196.
      "DC"               |                              // DC charging.
      "AC_BPT"           |                              // (2.1) AC bidirectional (no DER control), ISO 15118-20
      "AC_BPT_DER"       |                              // (2.1) AC bidirectional with DER control, ISO 15118-20 (amendment to -20)
      "AC_DER"           |                              // (2.1) AC charging-only with DER control, ISO 15118-20 (amendment to -20)
                                                        //       "Note: at time of writing (July 2024) not yet defined for ISO 15118-20.
      "DC_BPT"           |                              // (2.1) DC bidirectional power transfer, ISO 15118-20
      "DC_ACDP"          |                              // (2.1) DC via ACDP connector (pantograph), ISO 15118-20
      "DC_ACDP_BPT"      |                              // (2.1) DC bidirectional via ACDP connector (pantograph), ISO 15118-20
      "WPT"              |                              // (2.1) Wireless power transfer, ISO 15118-20
       string;

export type EventNotificationType
    = "HardWiredNotification" |                         // The software implemented by the manufacturer triggered a hardwired notification.
      "HardWiredMonitor"      |                         // Triggered by a monitor, which is hardwired by the manufacturer.
      "PreconfiguredMonitor"  |                         // Triggered by a monitor, which is preconfigured by the manufacturer.
      "CustomMonitor"         |                         // Triggered by a monitor, which is set with the setvariablemonitoringrequest message by the Charging Station Operator.
       string;

export type EventTrigger
    = "Alerting" |                                      // Monitored variable has passed a Lower or Upper Threshold. Also used as trigger type for a HardwiredNotification.
      "Delta"    |                                      // Delta Monitored Variable value has changed by more than specified amount.
      "Periodic" |                                      // Periodic Monitored Variable has been sampled for reporting at the specified interval.
       string;

export type EVSEKind
    = "AC" |                                            // AC charging station.
      "DC";                                             // DC charging station.

export type FirmwareStatus
    = "Downloaded"                |                     // Intermediate state. New firmware has been downloaded by Charging Station.
      "DownloadFailed"            |                     // Failure end state. Charging Station failed to download firmware.
      "Downloading"               |                     // Intermediate state. Firmware is being downloaded.
      "DownloadScheduled"         |                     // Intermediate state. Downloading of new firmware has been scheduled.
      "DownloadPaused"            |                     // Intermediate state. Downloading has been paused.
      "Idle"                      |                     // Charging Station is not performing firmware update related tasks. Status Idle SHALL only be used as in a
                                                        // FirmwareStatusNotificationRequest that was triggered by TriggerMessageRequest.
      "InstallationFailed"        |                     // Failure end state. Installation of new firmware has failed.
      "Installing"                |                     // Intermediate state. Firmware is being installed.
      "Installed"                 |                     // Successful end state. New firmware has successfully been installed in Charging Station.
      "InstallRebooting"          |                     // Intermediate state. If sent before installing the firmware, it indicates the Charging Station is about to reboot
                                                        // to start installing new firmware.
                                                        // If sent after installing the new firmware, it indicates the Charging Station has finished installing, but requires
                                                        // a reboot to activate the new firmware, which will be done automatically when idle.
                                                        // This status MAY be omitted if a reboot is an integral part of the installation and cannot be reported
                                                        // separately.
      "InstallScheduled"          |                     // Intermediate state. Installation of the downloaded firmware is scheduled to take place on installDateTime
                                                        // given in UpdateFirmware request.
      "InstallVerificationFailed" |                     // Failure end state. Verification of the new firmware (e.g. using a checksum or some other means) has failed
                                                        // and installation will not proceed. (Final failustate)
      "InvalidSignature"          |                     // Failure end state. The firmware signature is not valid.
      "SignatureVerified"         |                     // Intermediate state. Provide signature successfully verified.
       string;

export type GenericDeviceModelStatus
    = "Accepted" |                                      // Request has been accepted and will be executed.
      "Rejected" |                                      // Request has not been accepted and will not be executed.
      "NotSupported" |                                  // The content of the request message is not supported.
      "EmptyResultSet";                                 // If the combination of received criteria result in an empty result set.

export type GenericStatus
    = "Accepted" |                                      // Request has been accepted and will be executed.
      "Rejected";                                       // Request has not been accepted and will not be executed.

export type GetCertificateIdUse
    = "V2GRootCertificate"          |                   // Use for certificate of the ISO 15118 V2G Root.
      "MORootCertificate"           |                   // Use for certificate from an eMobility Service provider. To support PnC charging with contracts from service providers
                                                        // that not derived their certificates from the V2G root.
      "CSMSRootCertificate"         |                   // Root certificate for verification of the CSMS certificate.
      "V2GCertificateChain"         |                   // ISO 15118 V2G certificate chain (excluding the V2GRootCertificate).
      "ManufacturerRootCertificate" |                   // Root certificate for verification of the Manufacturer certificate.
      "OEMRootCertificate"          |                   // v2.1 OEM root certificate for 2-way TLS with EV.
       string;

export type GetCertificateStatus
    = "Accepted" |                                      // Successfully retrieved the OCSP certificate status.
      "Failed";                                         // Failed to retrieve the OCSP certificate status.

export type GetChargingProfileStatus
    = "Accepted" |                                      // Normal successful completion (no errors).
      "NoProfiles";                                     // No ChargingProfiles found that match the information in the GetChargingProfilesRequest.

export type GetDisplayMessagesStatus
    = "Accepted" |                                      // Request accepted, there are Display Messages found that match all the requested criteria.
                                                        // The Charging Station will send NotifyDisplayMessagesRequest messages to report the
                                                        // requested Display Messages.
      "Unknown";                                        // No messages found that match the given criteria.

export type GetInstalledCertificateStatus
    = "Accepted" |                                      // Normal successful completion (no errors).
      "NotFound";                                       // Requested certificate not found.

export type GetVariableStatus
    = "Accepted"         |                              // Variable successfully set.
      "Rejected"         |                              // Request is rejected.
      "UnknownComponent" |                              // Component is not known.
      "UnknownVariable"  |                              // Variable is not known.
      "NotSupportedAttributeType";                      // The AttributeType is not supported.

export type GridEventFault
    = "CurrentImbalance" |                              // Current imbalance detected
      "LocalEmergency"   |                              // A local emergency detected
      "LowInputPower"    |                              // Low input power detected
      "OverCurrent"      |                              // Overcurrent detected
      "OverFrequency"    |                              // Over frequency detected
      "OverVoltage"      |                              // Over voltage detected
      "PhaseRotation"    |                              // Phase rotation detected
      "RemoteEmergency"  |                              // A remote emergency detected
      "UnderFrequency"   |                              // Under frequency detected
      "UnderVoltage"     |                              // Under voltage detected
      "VoltageImbalance" |                              // Voltage imbalance detected
       string;

export type HashAlgorithm
    = "SHA256" |                                        // SHA-256 hash algorithm.
      "SHA384" |                                        // SHA-384 hash algorithm.
      "SHA512" |                                        // SHA-512 hash algorithm.
       string;

export type InstallCertificateStatus
    = "Accepted" |                                      // The installation of the certificate succeeded.
      "Rejected" |                                      // The certificate is invalid and/or incorrect OR the CSO tries to install more certificates than allowed.
      "Failed";                                         // The certificate is valid and correct, but there is another reason the installation did not succeed.

export type InstallCertificateUse
    = "V2GRootCertificate"          |                   // Use for certificate of the ISO 15118 V2G Root. A V2G Charging Station Certificate MUST be derived from one of the
                                                        // installed V2GRootCertificate certificates.
      "MORootCertificate"           |                   // Use for certificate from an eMobility Service provider. To support PnC charging with contracts from service providers
                                                        // that not derived their certificates from the V2G root.
      "ManufacturerRootCertificate" |                   // Root certificate for verification of the Manufacturer certificate.
      "CSMSRootCertificate"         |                   // Root certificate, used by the CA to sign the CSMS and Charging Station certificate.
      "OEMRootCertificate"          |                   // v2.1 OEM root certificate for 2-way TLS with EV.
       string;

export type IslandingDetection
    = "NoAntiIslandingSupport" |                        // No anti-island detection supported
      "RoCoF"                  |                        // RoCoF - Rate of Change of Frequency
      "UVP_OVP"                |                        // Under/over voltage (UVP/OVP)
      "UFP_OFP"                |                        // Under/over frequency (UFP/OFP)
      "VoltageVectorShift"     |                        // Voltage Vector Shift
      "ZeroCrossingDetection"  |                        // Zero Crossing Detection
      "OtherPassive"           |                        // Other passive anti-island detection method supported
      "ImpedanceMeasurement"   |                        // Impedance measurement
      "ImpedanceAtFrequency"   |                        // Impedance detection at a specific frequency
      "SlipModeFrequencyShift" |                        // Slip-mode frequency shift
      "SandiaFrequencyShift"   |                        // Frequency bias/Sandia frequency shift
      "SandiaVoltageShift"     |                        // Sandia voltage shift
      "FrequencyJump"          |                        // Frequency jump
      "RCLQFactor"             |                        // RCL Q factor
      "OtherActive"            |                        // Other active anti-island detection method supported
       string;

export type ISO15118EVCertificateStatus
    = "Accepted" |                                      // exiResponse included. This is no indication whether the update was successful,
                                                        // just that the message was processed properly.
      "Failed";                                         // Processing of the message was not successful, no exiResponse included.

 export type MeteringLocation
    = "Body"     |                                      // Measurement inside body of Charging Station (e.g. Temperature).
      "Cable"    |                                      // Measurement taken from cable between EV and Charging Station.
      "EV"       |                                      // Measurement taken by EV.
      "Inlet"    |                                      // For the Charging Station (evseId = 0): measurement at network ("grid") inlet connection of the station. For
                                                        // measurements with evseId > 0, these are measurements taken at the EVSE inlet (This can be useful for a DC charger).
      "Outlet"   |                                      // Measurement at a Connector. Default value.
      "Upstream" |
       string;

export type LogType
    = "DiagnosticsLog"   |                              // This contains the field definition of a diagnostics log file.
      "SecurityLog"      |                              // Sent by the CSMS to the Charging Station to request that the Charging Station uploads the security log.
      "DataCollectorLog" |                              // (2.1) The log of sampled measurements from the DataCollector component.
       string;

export type LogStatus
    = "Accepted" |                                      // Accepted this log upload. This does not mean the log file is uploaded is successfully,
                                                        // the Charging Station will now start the log file upload.
      "Rejected" |                                      // Log update request rejected.
      "AcceptedCanceled";                               // Accepted this log upload, but in doing this has canceled an ongoing log file upload.

 export type Measurand
    = "Current.Export"                                | // Instantaneous current flow from EV.
      "Current.Export.Offered"                        | // (2.1) Maximum current EV is offered to export. Min(EV, EVSE)
      "Current.Export.Minimum"                        | // (2.1) Minimum current EV can discharge with. Max(EV, EVSE)
      "Current.Import"                                | // Instantaneous current flow to EV.
      "Current.Import.Offered"                        | // (2.1) Maximum current offered to EV.
      "Current.Import.Minimum"                        | // (2.1) Minimum current EV can be charged with. Max(EV, EVSE).
      "Current.Offered"                               | // Maximum current offered to EV. Synonymous to Current.Import.Offered.
      "Display.PresentSOC"                            | // (2.1) Current state of charge of the EV battery.
      "Display.MinimumSOC"                            | // (2.1) Minimum State of Charge EV needs after charging of the EV battery the EV to keep throughout the charging
                                                        // session.
      "Display.TargetSOC"                             | // (2.1) Target State of Charge of the EV battery EV needs after charging.
      "Display.MaximumSOC"                            | // (2.1) The SOC at which the EV will prohibit any further charging.
      "Display.RemainingTimeToMinimumSOC"             | // (2.1) The remaining time it takes to reach the minimum SOC. It is communicated as the offset in seconds
                                                        // from the point in time this value was received from EV.
      "Display.RemainingTimeToTargetSOC"              | // (2.1) The remaining time it takes to reach the TargetSOC. It is communicated as the offset in seconds from
                                                        // the point in time this value was received from EV.
      "Display.RemainingTimeToMaximumSOC"             | // (2.1) The remaining time it takes to reach the maximum SOC. It is communicated as the offset in seconds
                                                        // from the point in time this value was received from EV.
      "Display.ChargingComplete"                      | // (2.1) Indication if the charging is complete from EV point of view (value = 1).
      "Display.BatteryEnergyCapacity"                 | // (2.1) The calculated amount of electrical Energy in Wh stored in the battery when the displayed SOC equals 100 %.
      "Display.InletHot"                              | // (2.1) Inlet temperature too high to accept specific operating condition.
      "Energy.Active.Export.Interval"                 | // Absolute amount of "active electrical energy" (Wh or kWh) exported (to the grid) during an associated time
                                                        // "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration values
                                                        // (in seconds) for ClockAlignedDataInterval and TxnMeterValueSampleInterval.
      "Energy.Active.Export.Register"                 | // Numerical value read from the "active electrical energy" (Wh or kWh) register of the (most authoritative)
                                                        // electrical meter measuring energy exported (to the grid).
      "Energy.Active.Import.Interval"                 | // Absolute amount of "active electrical energy" (Wh or kWh) imported (from the grid supply) during an
                                                        // associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration
                                                        // configuration values (in seconds) for ClockAlignedDataInterval and TxnMeterValueSampleInterval.
      "Energy.Active.Import.Register"                 | // Numerical value read from the "active electrical energy" (Wh or kWh) register of the (most authoritative)
                                                        // electrical meter measuring energy imported (from the grid supply).
      "Energy.Active.Import.CableLoss"                | // (2.1) Calculated energy loss after energy meter. Will be reset to 0 at start of transaction. Unit is Wh.
      "Energy.Active.Import.LocalGeneration.Register" | // (2.1) Cumulative amount of imported energy that was from local generation. Value will be cumulative during
                                                        // a transaction, but is allowed to be reset to 0 at start of a transaction.
      "Energy.Active.Net"                             | // Numerical value read from the “net active electrical energy" (Wh or kWh) register.
      "Energy.Active.Setpoint.Interval"               | // (2.1) Energy during interval when Setpoint would be followed exactly, as calculated by Charging Station.
                                                        // Relevant when Setpoint changes frequently during an interval as result of LocalLoadBalancing or
                                                        // LocalFrequencyControl. Can be negative if energy was exported.
      "Energy.Apparent.Export"                        | // Numerical value read from the "apparent electrical export energy" (VAh or kVAh) register.
      "Energy.Apparent.Import"                        | // Numerical value read from the "apparent electrical import energy" (VAh or kVAh) register.
      "Energy.Apparent.Net"                           | // Numerical value read from the "apparent electrical energy" (VAh or kVAh) register.
      "Energy.Reactive.Export.Interval"               | // Absolute amount of "reactive electrical energy" (varh or kvarh) exported (to the grid) during an associated
                                                        // time "interval", specified by a Metervalues ReadingContext, and applicable interval duration configuration
                                                        // values (in seconds) for ClockAlignedDataInterval and TxnMeterValueSampleInterval.
      "Energy.Reactive.Export.Register"               | // Numerical value read from the "reactive electrical energy" (varh or kvarh) register of the (most authoritative)
                                                        // electrical meter measuring energy exported (to the grid).
      "Energy.Reactive.Import.Interval"               | // Absolute amount of "reactive electrical energy" (varh or kvarh) imported (from the grid supply) during an
                                                        // associated time "interval", specified by a Metervalues ReadingContext, and applicable interval duration
                                                        // configuration values (in seconds) for ClockAlignedDataInterval and TxnMeterValueSampleInterval.
      "Energy.Reactive.Import.Register"               | // Numerical value read from the "reactive electrical energy" (varh or kvarh) register of the (most authoritative)
                                                        // electrical meter measuring energy imported (from the grid supply).
      "Energy.Reactive.Net"                           | // Numerical value read from the “net reactive electrical energy" (varh or kvarh) register.
      "EnergyRequest.Target"                          | // (2.1) Energy to requested state of charge.
      "EnergyRequest.Minimum"                         | // (2.1) Energy to minimum allowed state of charge.
      "EnergyRequest.Maximum"                         | // (2.1) Energy to maximum allowed state of charge.
      "EnergyRequest.Minimum.V2X"                     | // (2.1) Energy to minimum state of charge for cycling (V2X) activity. Positive value means that current state of
                                                        // charge is below V2X range.
      "EnergyRequest.Maximum.V2X"                     | // (2.1) Energy to maximum state of charge for cycling (V2X) activity. Negative value means that current state of
                                                        // charge is above V2X range.
      "EnergyRequest.Bulk"                            | // (2.1) Energy to end of bulk charging.
      "Frequency"                                     | // Instantaneous reading of powerline frequency
      "Power.Active.Export"                           | // Instantaneous active power exported by EV. (W or kW)
      "Power.Active.Import"                           | // Instantaneous active power imported by EV. (W or kW)
      "Power.Active.Setpoint"                         | // (2.1) Power setpoint for charging or discharging (negative for discharging), that should be followed as close as
                                                        // possible.
      "Power.Active.Residual"                         | // (2.1) Difference between the given charging setpoint and the actual power measured. Can be negatove.
      "Power.Export.Minimum"                          | // (2.1) Minimum power the EV can be discharged with. Max(EV, EVSE)
      "Power.Export.Offered"                          | // (2.1) Power offered to EV for discharging. Min(EV, EVSE)
      "Power.Factor"                                  | // Instantaneous power factor of total energy flow
      "Power.Import.Offered"                          | // (2.1) Power offered to EV for charging. Min(EV, EVSE)
      "Power.Import.Minimum"                          | // (2.1) Minimum power the EV can be charged with. Max(EV, EVSE)
      "Power.Offered"                                 | // Maximum power offered to EV. Synonymous to Power.Import.Offered.
      "Power.Reactive.Export"                         | // Instantaneous reactive power exported by EV. (var or kvar)
      "Power.Reactive.Import"                         | // Instantaneous reactive power imported by EV. (var or kvar)
      "SoC"                                           | // State of charge of charging vehicle in percentage
      "Voltage"                                       | // Instantaneous DC or AC RMS supply voltage. For location = Inlet and evseId = 0: voltage at charging station
                                                        // grid connection. For_ location_ = Outlet and evseId > 0: voltage at EVSE outlet towards the EV.
      "Voltage.Minimum"                               | // (2.1) Minimum voltage the EV can be charged or discharged with. Max(EV, EVSE)
      "Voltage.Maximum"                               | // (2.1) Maximum voltage the EV can be charged or discharged with. Min(EV, EVSE)
       string;

export type MessageFormat
    = "ASCII"  |                                        // Message content is ASCII formatted, only 7-bit printable ASCII allowed.
      "HTML"   |                                        // Message content is HTML formatted.
      "URI"    |                                        // Message content is URI that Charging Station should download and use to display.
                                                        // for example a HTML page to be shown in a web-browser.
      "UTF8"   |                                        // Message content is UTF-8 formatted.
      "QRCode" |                                        // Message content is a text (usually a URL) that Charging Station will display as a QR code on the display.
                                                        // Note: this is not a dynamic QR code and should not be used for payments.
       string;

export type MessagePriority
    = "AlwaysFront" |                                   // Show this message always in front. Highest priority, don’t cycle with other messages. When a newer
                                                        // message with this MessagePriority is received, this message is replaced. No Charging Station own message
                                                        // may override this message.
      "InFront"     |                                   // Show this message in front of the normal cycle of messages. When more messages with this priority are to
                                                        // be shown, they SHALL be cycled.
      "NormalCycle" |                                   // Show this message in the cycle of messages.
       string;

export type MessageState
    = "Charging"    |                                   // Message only to be shown while the Charging Station is charging.
      "Faulted"     |                                   // Message only to be shown while the Charging Station is in faulted state.
      "Idle"        |                                   // Message only to be shown while the Charging Station is idle (no transaction active).
      "Unavailable" |                                   // Message only to be shown while the Charging Station is in unavailable state.
      "Suspending"  |                                   // Message only to be shown when Charging Station (or EV) is suspending the charging during a transaction.
      "Discharging" |                                   // Message only to be shown while the EV is discharging.
       string;

export type MessageTrigger
    = "BootNotification" |                              // To trigger BootNotification.
      "LogStatusNotification" |                         // To trigger LogStatusNotification.
      "FirmwareStatusNotification" |                    // To trigger FirmwareStatusNotification.
      "Heartbeat" |                                     // To trigger Heartbeat.
      "MeterValues" |                                   // To trigger MeterValues.
      "SignChargingStationCertificate" |                // To trigger a SignCertificate with typeOfCertificate: ChargingStationCertificate.
      "SignV2GCertificate" |                            // To trigger a SignCertificate with typeOfCertificate: V2GCertificate
      "SignV2G20Certificate" |                          // (2.1) Same as SignV2GCertificate, but this triggers Charging Station explicitly to only sign
                                                        // V2G certificate for ISO 15118-20.
      "StatusNotification" |                            // To trigger StatusNotification.
      "TransactionEvent" |                              // To trigger TransactionEvent.
      "SignCombinedCertificate" |                       // To trigger a SignCertificate with typeOfCertificate: ChargingStationCertificate AND
                                                        // V2GCertificate
      "PublishFirmwareStatusNotification" |             // To trigger PublishFirmwareStatusNotification.
      "CustomTrigger" |                                 // (2.1) To trigger the message referred to in customTrigger field
       string;

export type MobilityNeedsMode
    = "EVCC" |                                          // Only EV determines min/target SOC and departure time.
      "EVCC_SECC";                                      // Charging station or CSMS may also update min/target SOC and departure time.

export type MonitorType
    = "UpperThreshold"       |                          // Triggers an event notice when the actual value of the Variable rises above monitorValue.
      "LowerThreshold"       |                          // Triggers an event notice when the actual value of the Variable drops below monitorValue.
      "Delta"                |                          // Triggers an event notice when the actual value has changed more than plus or minus monitorValue since the
                                                        // time that this monitor was set or since the last time this event notice was sent, whichever was last. For
                                                        // variables that are not numeric, like boolean, string or enumerations, a monitor of type Delta will trigger an
                                                        // event notice whenever the variable changes, regardless of the value of monitorValue.
      "Periodic"             |                          // Triggers an event notice every monitorValue seconds interval, starting from the time that this monitor was set.
      "PeriodicClockAligned" |                          // Triggers an event notice every monitorValue seconds interval, starting from the nearest clock-aligned interval
                                                        // after this monitor was set. For example, a monitorValue of 900 will trigger event notices at 0, 15, 30 and 45
                                                        // minutes after the hour, every hour.
      "TargetDelta"          |                          // Triggers an event notice when the actual value differs from the target value more than plus or minus
                                                        // monitorValue since the time that this monitor was set or since the last time this event notice was sent,
                                                        // whichever was last. Behavior of this type of monitor for a variable that is not numeric, is not defined.
                                                        // Example: when target = 100, monitorValue = 10, then an event is triggered when actual < 90 or actual > 110.
      "TargetDeltaRelative"  |                          // (2.1) Triggers an event notice when the actual value differs from the target value more than plus or minus
                                                        // (monitorValue * target value) since the time that this monitor was set or since the last time this event notice
                                                        // was sent, whichever was last. Behavior of this type of monitor for a variable that is not numeric, is not
                                                        // defined.
                                                        // Example: when target = 100, monitorValue = 0.1, then an event is triggered when actual < 90 or actual > 110.
       string;

export type MonitoringBase
    = "All"            |                                // Activate all pre-configured monitors.
      "FactoryDefault" |                                // Activate the default monitoring settings as recommended by the manufacturer.
                                                        // This is a subset of all preconfigured monitors.
      "HardWiredOnly"  |                                // Clears all custom monitors and disables all pre-configured monitors.
       string;

export type MonitoringCriterion
    = "ThresholdMonitoring" |                           // Report variables and components with a monitor of type UpperThreshold or LowerThreshold.
      "DeltaMonitoring"     |                           // Report variables and components with a monitor of type Delta.
      "PeriodicMonitoring"  |                           // Report variables and components with a monitor of type Periodic or PeriodicClockAligned.
       string;

export type MutabilityType
    = "ReadOnly"  |                                     // This variable is read-only.
      "WriteOnly" |                                     // This variable is write-only.
      "ReadWrite";                                      // This variable is read-write.

export type NotifyAllowedEnergyTransferStatus
    = "Accepted" |                                      // Request has been accepted.
      "Rejected";                                       // Request has been rejected. Should not occur, unless there are some technical problems.

export type NotifyCRLStatus
    = "Available" |                                     // A CRL is available in given location.
      "Unavailable";                                    // No CRL is available.

export type NotifyEVChargingNeedsStatus
    = "Accepted"   |                                    // A schedule will be provided momentarily.
      "Rejected"   |                                    // Service not available. No charging profile can be provided.
      "Processing" |                                    // The CSMS is gathering information to provide a schedule.
      "NoChargingProfile";                              // (2.1) CSMS will not provide a charging profile at this time. CS should not wait for it.

export type OCPPInterface
    = "Wired0"    |                                     // Use wired connection 0
      "Wired1"    |                                     // Use wired connection 1
      "Wired2"    |                                     // Use wired connection 2
      "Wired3"    |                                     // Use wired connection 3
      "Wireless0" |                                     // Use wireless connection 0
      "Wireless1" |                                     // Use wireless connection 1
      "Wireless2" |                                     // Use wireless connection 2
      "Wireless3" |                                     // Use wireless connection 3
      "Any"       |                                     // (2.1) Use any interface.
       string;

export type OCPPTransport
    = "SOAP" |                                          // Use HTTP-SOAP for transport of OCPP PDU’s.
      "JSON" |                                          // Use JSON over HTTP WebSockets for transport of OCPP PDU’s.
       string;

export type OCPPVersion
    = "OCPP12"  |                                       // OCPP v1.2
      "OCPP15"  |                                       // OCPP v1.5
      "OCPP16"  |                                       // OCPP v1.6,   websocket subprotocol: ocpp1.6
    //"OCPP20"  |                                       // No longer in use. The OCPP 2.0 release of OCPP has been withdrawn. The value OCPP20 is treated as OCPP2.0.1.
      "OCPP201" |                                       // OCPP v2.0.1, websocket subprotocol: ocpp2.0.1
      "OCPP21"  |                                       // OCPP v2.1,   websocket subprotocol: ocpp2.1
       string;

export type OperationalStatus
    = "Inoperative" |                                   // Charging Station is not available for charging.
      "Operative"   |                                   // Charging Station is available for charging.
       string;

export type OperationMode
    = "Idle"               |                            // Minimize energy consumption by having the EV either on standby or in sleep.
      "ChargingOnly"       |                            // Classic charging or smart charging mode. (default)
      "CentralSetpoint"    |                            // Control of setpoint by CSMS or some secondary actor that relays through the CSMS.
      "ExternalSetpoint"   |                            // Control of setpoint by an external actor directly on the Charging Station.
      "ExternalLimits"     |                            // Control of (dis)charging limits by an external actor on the Charging Station.
      "CentralFrequency"   |                            // Frequency support with control by CSMS or some secondary actor that relays through the CSMS.
      "LocalFrequency"     |                            // Frequency support with control in the Charging Station.
      "LocalLoadBalancing" |                            // Load-balancing performed by the Charging Station.
       string;

export type PaymentStatus
    = "Settled"  |                                      // Settled successfully by the PSP.
      "Canceled" |                                      // No billable part of the OCPP transaction, cancelation sent to the PSP.
      "Rejected" |                                      // Rejected by the PSP.
      "Failed";                                         // Sent after the final attempt that fails due to communication problems.

 export type Phase
    = "L1"    |                                         // Measured on L1
      "L2"    |                                         // Measured on L2
      "L3"    |                                         // Measured on L3
      "N"     |                                         // Measured on Neutral
      "L1_N"  |                                         // Measured on L1 with respect to Neutral conductor
      "L2_N"  |                                         // Measured on L2 with respect to Neutral conductor
      "L3_N"  |                                         // Measured on L3 with respect to Neutral conductor
      "L1_L2" |                                         // Measured between L1 and L2
      "L2_L3" |                                         // Measured between L2 and L3
      "L3_L1" |                                         // Measured between L3 and L1
       string;

export type PowerDuringCessation
    = "Active" |                                        // Active power
      "Reactive";                                       // Reactive power

export type PreconditioningStatus
    = "Unknown"         |                               // No information available on the status of preconditioning.
      "Ready"           |                               // The battery is preconditioned and ready to react directly on a given setpoint for charging (and discharging when available).
      "NotReady"        |                               // Busy with preconditioning the BMS. When done will move to status Ready.
      "Preconditioning";                                // The battery is not preconditioned and not able to directly react to given setpoint.

export type PriorityChargingStatus
    = "Accepted" |                                      // Request has been accepted.
      "Rejected" |                                      // Request has been rejected.
      "NoProfile";                                      // No priority charging profile present.

export type PublishFirmwareStatus
    = "Idle"              |                             // No firmware download is ongoing.
      "DownloadScheduled" |                             // Intermediate state. Downloading of new firmware has been scheduled.
      "Downloading"       |                             // Intermediate state. Firmware is being downloaded.
      "Downloaded"        |                             // Intermediate state. New firmware has been downloaded by Charging Station.
      "Published"         |                             // The firmware has been successfully published.
      "DownloadFailed"    |                             // Failure end state. Charging Station failed to download firmware.
      "DownloadPaused"    |                             // Intermediate state. Downloading has been paused.
      "InvalidChecksum"   |                             // Failure end state. The firmware checksum is not matching.
      "ChecksumVerified"  |                             // Intermediate state. The Firmware checksum is successfully verified.
      "PublishFailed"     |                             // Publishing the new firmware has failed.
       string;

export type ReadingContext
    = "Interruption.Begin" |                            // Value taken at start of interruption.
      "Interruption.End"   |                            // Value taken when resuming after interruption.
      "Other"              |                            // Value for any other situations.
      "Sample.Clock"       |                            // Value taken at clock aligned interval.
      "Transaction.Begin"  |                            // Value taken as periodic sample relative to start time of transaction.
      "Transaction.End"    |                            // Value taken at start of transaction.
      "Trigger"            |                            // Value taken at end of transaction.
      "Sample.Periodic"    |                            // Value taken in response to TriggerMessageRequest.
       string;

export type StopTransactionReason
    = "DeAuthorized"              |                     // The transaction was stopped because of the authorization status in the response to a transactionEventRequest.
      "EmergencyStop"             |                     // Emergency stop button was used.
      "EnergyLimitReached"        |                     // EV charging session reached a locally enforced maximum energy transfer limit.
      "EVDisconnected"            |                     // Disconnecting of cable, vehicle moved away from inductive charge unit.
      "GroundFault"               |                     // A GroundFault has occurred.
      "ImmediateReset"            |                     // A Reset(Immediate) command was received.
      "Local"                     |                     // The transaction was stopped using a token that belongs to the MasterPassGroupId.
      "LocalOutOfCredit"          |                     // Stopped locally on request of the EV Driver at the Charge Point. This is a regular termination of a transaction.
                                                        // Examples: presenting an IdToken tag, pressing a button to stop.
      "MasterPass"                |                     // A local credit limit enforced through the Charge Point has been exceeded.
      "Other"                     |                     // Any other reason.
      "OvercurrentFault"          |                     // A larger than intended electric current has occurred.
      "PowerLoss"                 |                     // Complete loss of power.
      "PowerQuality"              |                     // Quality of power too low, e.g. voltage too low/high, phase imbalance, etc.
      "Reboot"                    |                     // A locally initiated reset/reboot occurred. (for instance watchdog kicked in).
      "Remote"                    |                     // Stopped remotely on request of the CSMS. This is a regular termination of a transaction.
                                                        // Examples: termination using a smartphone app, exceeding a (non local) prepaid credit.
      "SOCLimitReached"           |                     // Electric vehicle has reported reaching a locally enforced maximum battery State of Charge (SOC).
      "StoppedByEV"               |                     // The transaction was stopped by the EV.
      "TimeLimitReached"          |                     // EV charging session reached a locally enforced time limit.
      "Timeout"                   |                     // EV not connected within timeout.
      "ReqEnergyTransferRejected" |                     // (2.1) CSMS cannot accept the requested energy transfer type.
       string;

export type RecurrencyKind
    = "Daily"  |                                        // The schedule restarts every 24 hours, at the same time as in the startSchedule.
      "Weekly" |                                        // The schedule restarts every 7 days, at the same time and day-of-the-week as in the startSchedule.
       string;

export type RegistrationStatus
    = "Accepted" |                                      // Charging Station is accepted by the CSMS.
      "Pending"  |                                      // CSMS is not yet ready to accept the Charging Station. CSMS may send messages to retrieve information or prepare
                                                        // the Charging Station.
      "Rejected";                                       // Charging Station is not accepted by CSMS. This may happen when the Charging Station id is not known by CSMS.

export type ReportBase
    = "ConfigurationInventory" |                        // A (configuration) report that lists all Components/Variables that can be set by the operator.
      "FullInventory"          |                        // A (full) report that lists everything except monitoring settings.
      "SummaryInventory"       |                         // A (summary) report that lists Components/Variables relating to the Charging Station’s current
                                                        // charging availability, and to any existing problem conditions.
                                                        // For the Charging Station Component:
                                                        //   - AvailabilityState.
                                                        // For each EVSE Component:
                                                        //   - AvailabilityState.
                                                        // For each Connector Component:
                                                        //   - AvailabilityState (if known and different from EVSE).
                                                        // For all Components in an abnormal State:
                                                        //   - Active (Problem, Tripped, Overload, Fallback) variables.
                                                        //   - Any other diagnostically relevant Variables of the Components.
                                                        //   - Include TechCode and TechInfo where available.
                                                        // All monitored Component.Variables in Critical or Alert state shall also be included.
                                                        //   - Charging Stations that do not have Monitoring implemented are NOT REQUIRED to include Connector
                                                        // Availability, monitoring alerts, and MAY limit problem reporting detail to just the active Problem boolean
                                                        // Variable.
       string;

export type RequestStartStopStatus
    = "Accepted" |                                      // Command will be executed.
      "Rejected";                                       // Command will not be executed.

export type ReservationUpdateStatus
    = "Expired"       |                                 // The reservation is expired.
      "Removed"       |                                 // The reservation is removed.
      "NoTransaction" |                                 // (2.1) The reservation was used, but no transaction was started.
       string;

export type ReserveNowStatus
    = "Accepted" |                                      // Reservation has been made.
      "Faulted"  |                                      // Reservation has not been made, because evse, connectors or specified connector are in a faulted state.
      "Occupied" |                                      // Reservation has not been made. The evse or the specified connector is occupied.
      "Rejected" |                                      // Reservation has not been made. Charging Station is not configured to accept reservations.
      "Unavailable";                                    // Reservation has not been made, because evse, connectors or specified connector are in an unavailable state.

export type ResetType
    = "Immediate"          |                            // Immediate reset of the Charging Station or EVSE.
      "OnIdle"             |                            // Delay reset until no more transactions are active.
      "ImmediateAndResume" |                            // (2.1) Immediate reset and resume transaction(s) afterwards.
       string;

export type ResetStatus
    = "Accepted" |                                      // Command will be executed.
      "Rejected" |                                      // Command will not be executed.
      "Scheduled";                                      // Reset command is scheduled, Charging Station is busy with a process that cannot be
                                                        // interrupted at the moment. Reset will be executed when process is finished.

export type SendLocalListStatus
    = "Accepted" |                                      // Local Authorization List successfully updated.
      "Failed"   |                                      // Failed to update the Local Authorization List.
      "VersionMismatch";                                // Version number in the request for a differential update is less or equal then version number of current list.

export type SetMonitoringStatus
    = "Accepted"               |                        // Monitor successfully set.
      "UnknownComponent"       |                        // Component is not known.
      "UnknownVariable"        |                        // Variable is not known.
      "UnsupportedMonitorType" |                        // Requested monitor type is not supported.
      "Rejected"               |                        // Request is rejected.
      "Duplicate"              |                        // A monitor already exists for the given type/severity combination.
       string;

export type SetNetworkProfileStatus
    = "Accepted" |                                      // Setting new data successful.
      "Rejected" |                                      // Setting new data rejected.
      "Failed";                                         // Setting new data failed.

export type SetVariableStatus
    = "Accepted"                  |                     // Variable successfully set.
      "Rejected"                  |                     // Request is rejected.
      "UnknownComponent"          |                     // Component is not known.
      "UnknownVariable"           |                     // Variable is not known.
      "NotSupportedAttributeType" |                     // The AttributeType is not supported.
      "RebootRequired"            |                     // A reboot is required.
       string;

export type TariffKind
    = "DefaultTariff" |                                 // Default tariff.
      "UserTariff"    |                                 // User tariff.
       string;

export type TariffStatus
    = "Accepted"              |                         // Tariff has been accepted.
      "Rejected"              |                         // Tariff has been rejected. More info in statusInfo.
      "TooManyElements"       |                         // Tariff has too many elements and cannot be processed.
      "ConditionNotSupported" |                         // A condition is not supported, or conditions are not supported at all.
      "NoTariff"              |                         // No tariff for EVSE of IdToken (ClearDefault/UserTariff)
      "TariffInUse"           |                         // Tariff is currently in use (ClearDefault/UserTariff)
      "TxNotFound"            |                         // Transaction does not exist or has already ended (ChangeTransactionTariff)
      "NoCurrencyChange"      |                         // Cannot change currency during a transaction (ChangeTransactionTariff)
       string;

export type TransactionEvent
    = "Started" |                                       // First event of a transaction.
      "Updated" |                                       // Transaction event in between 'Started' and 'Ended'.
      "Ended"   |                                       // Last event of a transaction.
       string;

export type TriggerMessageStatus
    = "Accepted" |                                      // Requested message will be sent.
      "Rejected" |                                      // Requested message will not be sent.
      "NotImplemented";                                 // Requested message cannot be sent because it is either not implemented or unknown.

export type TriggerReason
    = "AbnormalCondition"    |                          // An Abnormal Error or Fault Condition has occurred.
      "Authorized"           |                          // Charging is authorized, by any means. Might be an RFID, or other authorization means.
      "CablePluggedIn"       |                          // Cable is plugged in and EVDetected.
      "ChargingRateChanged"  |                          // Rate of charging changed by more than LimitChangeSignificance by an external actor (e.g. an EMS).
      "ChargingStateChanged" |                          // Charging State changed.
      "CostLimitReached"     |                          // (2.1) Maximum cost has been reached, as defined by transactionLimit.maxCost.
      "Deauthorized"         |                          // The transaction was stopped because of the authorization status in the response to a transactionEventRequest.
      "EnergyLimitReached"   |                          // Maximum energy of charging reached as defined by transactionLimit.maxEnergy.
      "EVCommunicationLost"  |                          // Communication with EV lost, for example: cable disconnected.
      "EVConnectTimeout"     |                          // EV not connected before the connection is timed out.
      "EVDeparted"           |                          // EV departed. For example: When a departing EV triggers a parking bay detector.
      "EVDetected"           |                          // EV detected. For example: When an arriving EV triggers a parking bay detector.
      "LimitChanged"         |                          // (2.1) Limit of cost/time/energy for transaction has changed.
      "MeterValueClock"      |                          // Needed to send a clock aligned meter value
      "MeterValuePeriodic"   |                          // Needed to send a periodic meter value
      "OperationModeChanged" |                          // (2.1) V2X operation mode has changed (at start of a new charging schedule period).
      "RemoteStart"          |                          // A RequestStartTransactionRequest has been sent.
      "RemoteStop"           |                          // A RequestStopTransactionRequest has been sent.
      "ResetCommand"         |                          // CSMS sent a Reset Charging Station command.
      "RunningCost"          |                          // (2.1) Trigger used when TranactionEvent is sent (only) to report a running cost update.
      "SignedDataReceived"   |                          // Signed data is received from the energy meter.
      "SoCLimitReached"      |                          // (2.1) State of charge limit has been reached, as defined by transactionLimit.maxSoC.
      "StopAuthorized"       |                          // An EV Driver has been authorized to stop charging. For example: By swiping an RFID card.
      "TariffChanged"        |                          // (2.1) Tariff for transaction has changed.
      "TimeLimitReached"     |                          // Maximum time of charging reached, as defined by transactionLimit.maxTime.
      "Trigger"              |                          // Requested by the CSMS via a TriggerMessageRequest.
      "TxResumed"            |                          // (2.1) Transaction has resumed after reset or power outage.
      "UnlockCommand"        |                          // CSMS sent an Unlock Connector command.
       string;

export type UnlockStatus
    = "Unlocked" |                                      // Connector has successfully been unlocked.
      "UnlockFailed";                                   // Failed to unlock the connector.

export type UnpublishFirmwareStatus
    = "DownloadOngoing" |                               // Intermediate state. Firmware is being downloaded.
      "NoFirmware"      |                               // There is no published file.
      "Unpublished";                                    // Successful end state. Firmware file no longer being published.

export type UpdateType
    = "Differential" |                                  // Indicates that the current Local Authorization List must be updated with the values in this message.
      "Full";                                           // Indicates that the current Local Authorization List must be replaced by the values in this message.
  
export type UpdateFirmwareStatus
    = "Accepted"           |                            // Accepted this firmware update request. This does not mean the firmware update is successful, the Charging
      "Station"            |                            // will now start the firmware update process.
      "Rejected"           |                            // Firmware update request rejected.
      "AcceptedCanceled"   |                            // Accepted this firmware update request, but in doing this has canceled an ongoing firmware update.
      "InvalidCertificate" |                            // The certificate is invalid.
      "RevokedCertificate";                             // Failure end state. The Firmware Signing certificate has been revoked.

export type UploadLogStatus
    = "BadMessage"            |                         // A badly formatted packet or other protocol incompatibility was detected.
      "Idle"                  |                         // The Charging Station is not uploading a log file. Idle SHALL only be used when the message was triggered
                                                        // by a TriggerMessageRequest.
      "NotSupportedOperation" |                         // The server does not support the operation.
      "PermissionDenied"      |                         // Insufficient permissions to perform the operation.
      "Uploaded"              |                         // File has been uploaded successfully.
      "UploadFailure"         |                         // Failed to upload the requested file.
      "Uploading"             |                         // File is being uploaded.
      "AcceptedCanceled"      |                         // On-going log upload is canceled and new request to upload log has been accepted.
       string;

export type VPNType
    = "IKEv2" |                                         // IKEv2 VPN
      "IPSec" |                                         // IPSec VPN
      "L2TP"  |                                         // L2TP VPN
      "PPTP";                                           // PPTP VPN






// -------------------------------------------------------------------------------------------------------------------

export enum SeverityLevel {
    Danger          = 0,
    HardwareFailure = 1,
    SystemFailure   = 2,
    Critical        = 3,
    Error           = 4,
    Alert           = 5,
    Warning         = 6,
    Notice          = 7,
    Informational   = 8,
    Debug           = 9
}

export interface SeverityData {
    severity:        SeverityLevel;
    description:     string;
    actionRequired:  boolean;
}

export const severityDescriptions: Record<SeverityLevel, SeverityData> = {
    [SeverityLevel.Danger]: {
        severity: SeverityLevel.Danger,
        description: "Indicates lives are potentially in danger. Urgent attention is needed and action should be taken immediately.",
        actionRequired: true
    },
    [SeverityLevel.HardwareFailure]: {
        severity: SeverityLevel.HardwareFailure,
        description: "Indicates that the Charging Station is unable to continue regular operations due to Hardware issues. Action is required.",
        actionRequired: true
    },
    [SeverityLevel.SystemFailure]: {
        severity: SeverityLevel.SystemFailure,
        description: "Indicates that the Charging Station is unable to continue regular operations due to software or minor hardware issues. Action is required.",
        actionRequired: true
    },
    [SeverityLevel.Critical]: {
        severity: SeverityLevel.Critical,
        description: "Indicates a critical error. Action is required.",
        actionRequired: true
    },
    [SeverityLevel.Error]: {
        severity: SeverityLevel.Error,
        description: "Indicates a non-urgent error. Action is required.",
        actionRequired: true
    },
    [SeverityLevel.Alert]: {
        severity: SeverityLevel.Alert,
        description: "Indicates an alert event. Default severity for any type of monitoring event.",
        actionRequired: true
    },
    [SeverityLevel.Warning]: {
        severity: SeverityLevel.Warning,
        description: "Indicates a warning event. Action may be required.",
        actionRequired: false
    },
    [SeverityLevel.Notice]: {
        severity: SeverityLevel.Notice,
        description: "Indicates an unusual event. No immediate action is required.",
        actionRequired: false
    },
    [SeverityLevel.Informational]: {
        severity: SeverityLevel.Informational,
        description: "Indicates a regular operational event. May be used for reporting, measuring throughput, etc. No action is required.",
        actionRequired: false
    },
    [SeverityLevel.Debug]: {
        severity: SeverityLevel.Debug,
        description: "Indicates information useful to developers for debugging, not useful during operations.",
        actionRequired: false
    }
};






// -------------------------------------------------------------------------------------------------------------------
// Defined within the OCPP v2.1 appendix
// -------------------------------------------------------------------------------------------------------------------

export type SecurityEvent
    = "FirmwareUpdated"                     |
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

 export type UnitOfMeasure
    = "Celsius"    |
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


// OCPP predefined string types

export type IdTokenType
    = "Central"         |
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

export type ChargingLimitSource
    = "EMS"   |
      "Other" |
      "SO"    |
      "CSO"   |
       string;

export type ConnectorType
    = "cCCS1"           |                               // Combined Charging System 1 (captive cabled) a.k.a. Combo 1
      "cCCS2"           |                               // Combined Charging System 2 (captive cabled) a.k.a. Combo 2
      "cChaoJi"         |                               // ChaoJi (captive cabled) a.k.a. CHAdeMO 3.0
      "cG105"           |                               // JARI G105-1993 (captive cabled) a.k.a. CHAdeMO (captive cabled)
      "cGBT-DC"         |                               // GB/T 20234.3 DC connector (captive cabled)
      "cLECCS"          |                               // Light Equipment Combined Charging System IS17017 (captive cabled)
      "cMCS"            |                               // Megawatt Charging System (captive cabled)
      "cNACS"           |                               // North American Charging Standard (captive cabled)
      "cNACS-CCS1"      |                               // Tesla MagicDock with built-in NACS to CCS1 adapter
      "cTesla"          |                               // Tesla Connector (captive cabled)
      "cType1"          |                               // IEC62196-2 Type 1 connector (captive cabled) a.k.a. J1772
      "cType2"          |                               // IEC62196-2 Type 2 connector (captive cabled) a.k.a. Mennekes connector
      "cUltraChaoJi"    |                               // Ultra-ChaoJi for megawatt charging
      "s309-1P-16A"     |                               // 16A 1 phase IEC60309 socket
      "s309-1P-32A"     |                               // 32A 1 phase IEC60309 socket
      "s309-3P-16A"     |                               // 16A 3 phase IEC60309 socket
      "s309-3P-32A"     |                               // 32A 3 phase IEC60309 socket
      "sBS1361"         |                               // UK domestic socket a.k.a. 13Amp
      "sCEE-7-7"        |                               // CEE 7/7 16A socket. May represent 7/4 and 7/5 a.k.a Schuko
      "sType2"          |                               // IEC62196-2 Type 2 socket a.k.a. Mennekes connector
      "sType3"          |                               // IEC62196-2 Type 3 socket a.k.a. Scame
      "wInductive"      |                               // Wireless inductively coupled connection (generic)
      "wResonant"       |                               // Wireless resonant coupled connection (generic)
      "Other1PhMax16A"  |                               // Other single phase (domestic) sockets not mentioned above, rated at no more
                                                        // than 16A. CEE7/17, AS3112, NEMA 5-15, NEMA 5-20, JISC8303, TIS166, SI 32,
                                                        // CPCS-CCC, SEV1011, etc.
      "Other1PhOver16A" |                               // Other single phase sockets not mentioned above (over 16A)
      "Other3Ph"        |                               // Other 3 phase sockets not mentioned above. NEMA14-30, NEMA14-50.
      "Pan"             |                               // Pantograph connector
      "Undetermined"    |                               // Yet to be determined (e.g. before plugged in)
      "Unknown"         |                               // Unknown/not determinable
       string;





// -------------------------------------------------------------------------------------------------------------------
// Should be a predefined string!
// -------------------------------------------------------------------------------------------------------------------

export type TaxRateType
    = "Federal"|                                        // Federal tax rate.
      "State"  |                                        // State tax rate.
       string;
