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
export type TimeOfDay                      = string;  // Local time: 23:51; 24h format with leading zeros; Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
export type LocalDate                      = string;  // Local time: 2015-12-24; Valid from this day (inclusive); Regex: ([12][0-9]+{3}+)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
export type PEMCertificate                 = string;
export type PEMCertificateChain            = string;
export type URL                            = string;
export type PostalCode                     = string;
export type VATNumber                      = string;


export type GenericStatus                  = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected";                               // Request has not been accepted and will not be executed.

export type AuthorizationStatus            = "Accepted" |                              // Identifier is allowed for charging.
                                             "Blocked" |                               // Identifier has been blocked. Not allowed for charging.
                                             "ConcurrentTx" |                          // Identifier is already involved in another transaction and multiple transactions are not allowed.
                                                                                    // (Only relevant for the response to a TransactionEventRequest(eventType=Started).)
                                             "Expired" |                               // Identifier has expired. Not allowed for charging.
                                             "Invalid" |                               // Identifier is invalid. Not allowed for charging.
                                             "NoCredit" |                              // Identifier is valid, but EV Driver doesn’t have enough credit to start charging. Not allowed for charging.
                                             "NotAllowedTypeEV" |                      // Identifier is valid, but not allowed to charge at this type of EVSE.
                                             "NotAtThisLocation" |                     // Identifier is valid, but not allowed to charge at this location.
                                             "NotAtThisTime" |                         // Identifier is valid, but not allowed to charge at this location at this time.
                                             "Unknown";                                // Identifier is unknown. Not allowed for charging.

export type AuthorizeCertificateStatus     = "Accepted" |                              // Positive response.
                                             "SignatureError" |                        // Signature error.
                                             "CertificateExpired" |                    // If the contract certificate in the AuthorizeRequest is expired.
                                             "CertificateRevoked" |                    // If the Charging Station or CSMS determine (via a CRL or OCSP response) that the contract certificate in the AuthorizeRequest is marked as revoked.
                                             "NoCertificateAvailable" |                // If the Charging Station or CSMS does not have the contract certificate in the AuthorizeRequest available.
                                             "CertChainError" |                        // If the contract certificate contained in the AuthorizeRequest message is not valid.
                                             "ContractCancelled";                      // If the EMAID provided by EVCC is invalid, unknown, expired or blocked.

export type BatterySwapEvent               = "BatteryIn" |                             // Battery is inserted.
                                             "BatteryOut";                             // Battery is removed.

export type RegistrationStatus             = "Accepted" |                              // Charging Station is accepted by the CSMS.
                                             "Pending" |                               // CSMS is not yet ready to accept the Charging Station. CSMS may send messages to retrieve information or prepare the Charging Station.
                                             "Rejected";                               // Charging Station is not accepted by CSMS. This may happen when the Charging Station id is not known by CSMS.

export type CancelReservationStatus        = "Accepted" |                              // Reservation for the identifier has been cancelled.
                                             "Rejected";                               // Reservation could not be cancelled, because there is no reservation active for the identifier.

export type CertificateSigningUse          = "ChargingStationCertificate" |            // Client side certificate used by the Charging Station to connect the the CSMS.
                                             "V2GRootCertificate";                     // Use for certificate for 15118 connections. This means that the certificate should be derived from the V2G root.

export type CertificateSignedStatus        = "Accepted" |                              // Signed certificate is valid.
                                             "Rejected";                               // Signed certificate is invalid.

export type TaxRateType                    = "Federal"|                                // Federal tax rate.
                                             "State" |                                 // State tax rate.
                                              string;

export type DayOfWeek                      = "Monday" |                                // Monday
                                             "Tuesday" |                               // Tuesday
                                             "Wednesday" |                             // Wednesday
                                             "Thursday" |                              // Thursday
                                             "Friday" |                                // Friday
                                             "Saturday" |                              // Saturday
                                             "Sunday";                                 // Sunday

export type EVSEKind                       = "AC" |                                    // AC charging station.
                                             "DC";                                     // DC charging station.

export type TariffKind                     = "DefaultTariff" |                         // Default tariff.
                                             "UserTariff";                             // User tariff.

export type TariffStatus                   = "Accepted" |                              // Tariff has been accepted.
                                             "Rejected" |                              // Tariff has been rejected. More info in statusInfo.
                                             "TooManyElements" |                       // Tariff has too many elements and cannot be processed.
                                             "ConditionNotSupported" |                 // A condition is not supported, or conditions are not supported at all.
                                             "NoTariff" |                              // No tariff for EVSE of IdToken (ClearDefault/UserTariff)
                                             "TariffInUse" |                           // Tariff is currently in use (ClearDefault/UserTariff)
                                             "TxNotFound" |                            // Transaction does not exist or has already ended (ChangeTransactionTariff)
                                             "NoCurrencyChange";                       // Cannot change currency during a transaction (ChangeTransactionTariff)

export type ClearCacheStatus               = "Accepted" |                              // Command has been executed.
                                             "Rejected";                               // Command has not been executed.

export type ClearChargingProfileStatus     = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Unknown";                                // No Charging Profile(s) were found matching the request.

export type ClearDisplayMessageStatus      = "Accepted" |                              // Request successfully executed: message cleared.
                                             "Unknown" |                               // Given message (based on the id) not known.
                                             "Rejected";                               // (2.1) Request could not be executed.

export type ClearMonitoringStatus          = "Accepted" |                              // Monitor successfully cleared.
                                             "Rejected" |                              // Clearing of monitor rejected.
                                             "NotFound";                               // Monitor Id is not found.

export type CustomerInformationStatus      = "Accepted" |                              // The Charging Station accepted the message.
                                             "Rejected" |                              // When the Charging Station is in a state where it cannot process this request.
                                             "Invalid";                                // In a request to the Charging Station no reference to a customer is included.

export type DataTransferStatus             = "Accepted" |                              // Message has been accepted and the contained request is accepted.
                                             "Rejected" |                              // Message has been accepted but the contained request is rejected.
                                             "UnknownMessageId" |                      // Message could not be interpreted due to unknown messageId string.
                                             "UnknownVendorId";                        // Message could not be interpreted due to unknown vendorId string.

export type ISO15118EVCertificateStatus    = "Accepted" |                              // exiResponse included. This is no indication whether the update was successful,
                                                                                       // just that the message was processed properly.
                                             "Failed";                                 // Processing of the message was not successful, no exiResponse included.

export type ReportBase                     = "ConfigurationInventory" |                // A (configuration) report that lists all Components/Variables that can be set by the operator.
                                             "FullInventory" |                         // A (full) report that lists everything except monitoring settings.
                                             "SummaryInventory";                       // A (summary) report that lists Components/Variables relating to the Charging Station’s current
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

export type GenericDeviceModelStatus       = "Accepted" |                              // Request has been accepted and will be executed.
                                             "Rejected" |                              // Request has not been accepted and will not be executed.
                                             "NotSupported" |                          // The content of the request message is not supported.
                                             "EmptyResultSet";                         // If the combination of received criteria result in an empty result set.

export type GetCertificateStatus           = "Accepted" |                              // Successfully retrieved the OCSP certificate status.
                                             "Failed";                                 // Failed to retrieve the OCSP certificate status.

export type GetChargingProfileStatus       = "Accepted" |                              // Normal successful completion (no errors).
                                             "NoProfiles";                             // No ChargingProfiles found that match the information in the GetChargingProfilesRequest.

export type OperationMode                  = "Idle" |                                  // Minimize energy consumption by having the EV either on standby or in sleep.
                                             "ChargingOnly" |                          // Classic charging or smart charging mode. (default)
                                             "CentralSetpoint" |                       // Control of setpoint by CSMS or some secondary actor that relays through the CSMS.
                                             "ExternalSetpoint" |                      // Control of setpoint by an external actor directly on the Charging Station.
                                             "ExternalLimits" |                        // Control of (dis)charging limits by an external actor on the Charging Station.
                                             "CentralFrequency" |                      // Frequency support with control by CSMS or some secondary actor that relays through the CSMS.
                                             "LocalFrequency" |                        // Frequency support with control in the Charging Station.
                                             "LocalLoadBalancing";                     // Load-balancing performed by the Charging Station.

export type DERControlType
    = "EnterService" |                          // Enter Service parameters setting
      "FreqDroop" |                             // Frequency droop settings
      "FreqWatt" |                              // Frequency-Watt curve
      "FixedPFAbsorb" |                         // Fixed power factor when absorbing power setting
      "FixedPFInject" |                         // Fixed power factor when injecting power setting
      "FixedVar" |                              // Fixed reactive power setpoint
      "Gradients" |                             // Gradient settings
      "HFMustTrip" |                            // High Frequency Must Trip curve
      "HFMayTrip" |                             // High Frequency May Trip curve (ride-through)
      "HVMustTrip" |                            // High Voltage Must Trip curve
      "HVMomCess" |                             // High Voltage Momentary Cessation curve
      "HVMayTrip" |                             // High Voltage May Trip curve (ride-through)
      "LimitMaxDischarge" |                     // Limit discharge power to percentage of rated discharge power
      "LFMustTrip" |                            // Low Frequency Must Trip curve
      "LVMustTrip" |                            // Low Voltage Must Trip curve
      "LVMomCess" |                             // Low Voltage Momentary Cessation curve
      "LVMayTrip" |                             // Low Voltage May Trip curve (ride-through)
      "PowerMonitoringMustTrip" |               // Power Monitoring curve according to VDE-AR-N 4105 section 5.5.2
      "VoltVar" |                               // Volt-Var curve
      "VoltWatt" |                              // Volt-Watt curve
      "WattPF" |                                // Watt-PowerFactor curve
      "WattVar";                                // Watt-Var curve

export type DERControlStatus
    = "Accepted" |                              // Operation successful.
      "Rejected" |                              // Operation failed.
      "Unsupported" |                           // Type of DER setting or curve is not supported.
      "NotFound";                               // Type or Id in clear/get request was not found.

export type DERUnit
    = "Not_Applicable" |                        // No unit applicable (e.g. for ride-through curves)
      "PctMaxW" |                               // Percentage of configured active power
      "PctMaxVar" |                             // Percentage of configured reactive power
      "PctWAvail" |                             // Percentage of available reserve active power
      "PctVarAvail" |                           // Percentage of available reserve reactive power
      "PctEffectiveV";                          // Percentage of effective voltage

export type PowerDuringCessation
    = "Active" |                                // Active power.
      "Reactive";                               // Reactive power.

export type GetDisplayMessageStatus
    = "Accepted" |                              // Request accepted, there are Display Messages found that match all the requested criteria.
                                                // The Charging Station will send NotifyDisplayMessagesRequest messages to report the
                                                // requested Display Messages.
      "Unknown";                                // No messages found that match the given criteria.

export type LogType
    = "DiagnosticsLog" |                        // This contains the field definition of a diagnostics log file.
      "SecurityLog" |                           // Sent by the CSMS to the Charging Station to request that the Charging Station uploads the security log.
      "DataCollectorLog";                       // (2.1) The log of sampled measurements from the DataCollector component.

export type LogStatus
    = "Accepted" |                              // Accepted this log upload. This does not mean the log file is uploaded is successfully,
                                                // the Charging Station will now start the log file upload.
      "Rejected" |                              // Log update request rejected.
      "AcceptedCanceled";                       // Accepted this log upload, but in doing this has canceled an ongoing log file upload.

export type MonitoringCriterion
    = "ThresholdMonitoring" |                   // Report variables and components with a monitor of type UpperThreshold or LowerThreshold.
      "DeltaMonitoring" |                       // Report variables and components with a monitor of type Delta.
      "PeriodicMonitoring";                     // Report variables and components with a monitor of type Periodic or PeriodicClockAligned.

export type ComponentCriterion
    = "Active" |                                // Components that are active, i.e. having Active = 1
      "Available" |                             // Components that are available, i.e. having Available = 1
      "Enabled" |                               // Components that are enabled, i.e. having Enabled = 1
      "Problem";                                // Components that reported a problem, i.e. having Problem = 1

export type AttributeType
    = "Actual" |                                // The actual value of the variable.
      "Target" |                                // The target value for this variable.
      "MinSet" |                                // The minimal allowed value for this variable
      "MaxSet";                                 // The maximum allowed value for this variable

export type GetVariableStatus
    = "Accepted" |                              // Variable successfully set.
      "Rejected" |                              // Request is rejected.
      "UnknownComponent" |                      // Component is not known.
      "UnknownVariable" |                       // Variable is not known.
      "NotSupportedAttributeType";              // The AttributeType is not supported.

export type NotifyAllowedEnergyTransferStatus
    = "Accepted" |                              // Request has been accepted.
      "Rejected";                               // Request has been rejected. Should not occur, unless there are some technical problems.

export type NotifyCRLStatus
    = "Available" |                             // A CRL is available in given location.
      "Unavailable";                            // No CRL is available.

export type GridEventFault
    = "CurrentImbalance" |                      // Current imbalance detected
      "LocalEmergency" |                        // A local emergency detected
      "LowInputPower" |                         // Low input power detected
      "OverCurrent" |                           // Overcurrent detected
      "OverFrequency" |                         // Over frequency detected
      "OverVoltage" |                           // Over voltage detected
      "PhaseRotation" |                         // Phase rotation detected
      "RemoteEmergency" |                       // A remote emergency detected
      "UnderFrequency" |                        // Under frequency detected
      "UnderVoltage" |                          // Under voltage detected
      "VoltageImbalance";                       // Voltage imbalance detected

export type PaymentStatus
    = "Settled" |                               // Settled successfully by the PSP.
      "Canceled" |                              // No billable part of the OCPP transaction, cancelation sent to the PSP.
      "Rejected" |                              // Rejected by the PSP.
      "Failed";                                 // Sent after the final attempt that fails due to communication problems.

export type ChargingProfileStatus
    = "Accepted" |                              // Request has been accepted and will be executed.
      "Rejected";                               // Request has not been accepted and will not be executed.

export type RequestStartStopStatus
    = "Accepted" |                              // Command will be executed.
      "Rejected";                               // Command will not be executed.

export type ConnectorType
    = "cCCS1" |                                // Combined Charging System 1 (captive cabled) a.k.a. Combo 1
      "cCCS2" |                                // Combined Charging System 2 (captive cabled) a.k.a. Combo 2
      "cChaoJi" |                              // ChaoJi (captive cabled) a.k.a. CHAdeMO 3.0
      "cG105" |                                // JARI G105-1993 (captive cabled) a.k.a. CHAdeMO (captive cabled)
      "cGBT-DC" |                              // GB/T 20234.3 DC connector (captive cabled)
      "cLECCS" |                               // Light Equipment Combined Charging System IS17017 (captive cabled)
      "cMCS" |                                 // Megawatt Charging System (captive cabled)
      "cNACS" |                                // North American Charging Standard (captive cabled)
      "cNACS-CCS1" |                           // Tesla MagicDock with built-in NACS to CCS1 adapter
      "cTesla" |                               // Tesla Connector (captive cabled)
      "cType1" |                               // IEC62196-2 Type 1 connector (captive cabled) a.k.a. J1772
      "cType2" |                               // IEC62196-2 Type 2 connector (captive cabled) a.k.a. Mennekes connector
      "cUltraChaoJi" |                         // Ultra-ChaoJi for megawatt charging
      "s309-1P-16A" |                          // 16A 1 phase IEC60309 socket
      "s309-1P-32A" |                          // 32A 1 phase IEC60309 socket
      "s309-3P-16A" |                          // 16A 3 phase IEC60309 socket
      "s309-3P-32A" |                          // 32A 3 phase IEC60309 socket
      "sBS1361" |                              // UK domestic socket a.k.a. 13Amp
      "sCEE-7-7" |                             // CEE 7/7 16A socket. May represent 7/4 and 7/5 a.k.a Schuko
      "sType2" |                               // IEC62196-2 Type 2 socket a.k.a. Mennekes connector
      "sType3" |                               // IEC62196-2 Type 3 socket a.k.a. Scame
      "wInductive" |                           // Wireless inductively coupled connection (generic)
      "wResonant" |                            // Wireless resonant coupled connection (generic)
      "Other1PhMax16A" |                       // Other single phase (domestic) sockets not mentioned above, rated at no more
                                               // than 16A. CEE7/17, AS3112, NEMA 5-15, NEMA 5-20, JISC8303, TIS166, SI 32,
                                               // CPCS-CCC, SEV1011, etc.
      "Other1PhOver16A" |                      // Other single phase sockets not mentioned above (over 16A)
      "Other3Ph" |                             // Other 3 phase sockets not mentioned above. NEMA14-30, NEMA14-50.
      "Pan" |                                  // Pantograph connector
      "Undetermined" |                         // Yet to be determined (e.g. before plugged in)
      "Unknown" |                              // Unknown/not determinable
       string;

export type ReserveNowStatus
    = "Accepted" |                             // Reservation has been made.
      "Faulted" |                              // Reservation has not been made, because evse, connectors or specified connector are in a faulted state.
      "Occupied" |                             // Reservation has not been made. The evse or the specified connector is occupied.
      "Rejected" |                             // Reservation has not been made. Charging Station is not configured to accept reservations.
      "Unavailable";                           // Reservation has not been made, because evse, connectors or specified connector are in an unavailable state.

export type UpdateType
    = "Differential" |                         // Indicates that the current Local Authorization List must be updated with the values in this message.
      "Full";                                  // Indicates that the current Local Authorization List must be replaced by the values in this message.

export type SendLocalListStatus
    = "Accepted" |                             // Local Authorization List successfully updated.
      "Failed"   |                             // Failed to update the Local Authorization List.
      "VersionMismatch";                       // Version number in the request for a differential update is less or equal then version number of current list.

export type DisplayMessageStatus
    = "Accepted" |                             // Request to display message accepted.
      "NotSupportedMessageFormat" |            // None of the formats in the given message are supported.
      "Rejected" |                             // Request cannot be handled.
      "NotSupportedPriority" |                 // The given MessagePriority not supported for displaying messages by Charging Station.
      "NotSupportedState" |                    // The given MessageState not supported for displaying messages by Charging Station.
      "UnknownTransaction" |                   // Given Transaction not known/ongoing.
      "LanguageNotSupported";                  // (2.1) Message contains one or more languages that are not supported by Charging Station.

export type MonitoringBase
    = "All" |                                  // Activate all pre-configured monitors.
      "FactoryDefault" |                       // Activate the default monitoring settings as recommended by the manufacturer.
                                               // This is a subset of all preconfigured monitors.
      "HardWiredOnly";                         // Clears all custom monitors and disables all pre-configured monitors.

export type OCPPVersion
    = "OCPP12"  |                              // OCPP v1.2
      "OCPP15"  |                              // OCPP v1.5
      "OCPP16"  |                              // OCPP v1.6,   websocket subprotocol: ocpp1.6
    //"OCPP20"  |                              // No longer in use. The OCPP 2.0 release of OCPP has been withdrawn. The value OCPP20 is treated as OCPP2.0.1.
      "OCPP201" |                              // OCPP v2.0.1, websocket subprotocol: ocpp2.0.1
      "OCPP21"  |                              // OCPP v2.1,   websocket subprotocol: ocpp2.1
       string;

export type OCPPTransport
    = "SOAP" |                                 // Use HTTP-SOAP for transport of OCPP PDU’s.
      "JSON";                                  // Use JSON over HTTP WebSockets for transport of OCPP PDU’s.

export type OCPPInterface
    = "Wired0" |                               // Use wired connection 0
      "Wired1" |                               // Use wired connection 1
      "Wired2" |                               // Use wired connection 2
      "Wired3" |                               // Use wired connection 3
      "Wireless0" |                            // Use wireless connection 0
      "Wireless1" |                            // Use wireless connection 1
      "Wireless2" |                            // Use wireless connection 2
      "Wireless3" |                            // Use wireless connection 3
      "Any";                                   // (2.1) Use any interface.

export type VPNType
    = "IKEv2" |                                // IKEv2 VPN
      "IPSec" |                                // IPSec VPN
      "L2TP"  |                                // L2TP VPN
      "PPTP";                                  // PPTP VPN

export type APNAuthentication
    = "PAP" |                                  // Password Authentication Protocol
      "CHAP" |                                 // Challenge Handshake Authentication Protocol
      "NONE" |                                 // No authentication
      "AUTO";                                  // Sequentially try CHAP, PAP, NONE.

export type SetNetworkProfileStatus
    = "Accepted" |                             // Setting new data successful.
      "Rejected" |                             // Setting new data rejected.
      "Failed";                                // Setting new data failed.

export type SetMonitoringStatus
    = "Accepted" |                             // Monitor successfully set.
      "UnknownComponent" |                     // Component is not known.
      "UnknownVariable" |                      // Variable is not known.
      "UnsupportedMonitorType" |               // Requested monitor type is not supported.
      "Rejected" |                             // Request is rejected.
      "Duplicate";                             // A monitor already exists for the given type/severity combination.

export type SetVariableStatus
    = "Accepted" |                             // Variable successfully set.
      "Rejected" |                             //  Request is rejected.
      "UnknownComponent" |                     // Component is not known.
      "UnknownVariable" |                      //  Variable is not known.
      "NotSupportedAttributeType" |            // The AttributeType is not supported.
      "RebootRequired";                        // A reboot is required.

export type PreconditioningStatus
    = "Unknown" |                              // No information available on the status of preconditioning.
      "Ready" |                                // The battery is preconditioned and ready to react directly on a given setpoint for charging (and discharging when available).
      "NotReady" |                             // Busy with preconditioning the BMS. When done will move to status Ready.
      "Preconditioning";                       // The battery is not preconditioned and not able to directly react to given setpoint.

export type  CostDimensionType
    = "Energy" |                               // Total amount of energy (dis-)charged during this charging period, defined in Wh (kiloWatt-hours).
                                               // When negative, more energy was feed into the grid then charged into the EV.
      "MaxCurrent" |                           // Sum of the maximum current over all phases, reached during this charging period, defined in A (Ampere).
      "MinCurrent" |                           // Sum of the minimum current over all phases, reached during this charging period, when negative, current has flowed from
                                               // the EV to the grid. Defined in A (Ampere).
      "MaxPower" |                             // Maximum power reached during this charging period: defined in W (Watt).
      "MinPower" |                             // Minimum power reached during this charging period: defined in W (Watt), when negative, the power has flowed from the EV
                                               // to the grid.
      "IdleTIme" |                             // Time not charging during this charging period: defined in seconds.
      "ChargingTime";                          // Time charging during this charging period: defined in seconds.

export type MessageTrigger
    = "BootNotification" |                     // To trigger BootNotification.
      "LogStatusNotification" |                // To trigger LogStatusNotification.
      "FirmwareStatusNotification" |           // To trigger FirmwareStatusNotification.
      "Heartbeat" |                            // To trigger Heartbeat.
      "MeterValues" |                          // To trigger MeterValues.
      "SignChargingStationCertificate" |       // To trigger a SignCertificate with typeOfCertificate: ChargingStationCertificate.
      "SignV2GCertificate" |                   // To trigger a SignCertificate with typeOfCertificate: V2GCertificate
      "SignV2G20Certificate" |                 // (2.1) Same as SignV2GCertificate, but this triggers Charging Station explicitly to only sign
                                               // V2G certificate for ISO 15118-20.
      "StatusNotification" |                   // To trigger StatusNotification.
      "TransactionEvent" |                     // To trigger TransactionEvent.
      "SignCombinedCertificate" |              // To trigger a SignCertificate with typeOfCertificate: ChargingStationCertificate AND
                                               // V2GCertificate
      "PublishFirmwareStatusNotification" |    // To trigger PublishFirmwareStatusNotification.
      "CustomTrigger" |                        // (2.1) To trigger the message referred to in customTrigger field
       string;

export type TriggerMessageStatus
    = "Accepted" |                             // Requested message will be sent.
      "Rejected" |                             // Requested message will not be sent.
      "NotImplemented";                        // Requested message cannot be sent because it is either not implemented or unknown.

export type UnlockStatus
    = "Unlocked" |                             // Connector has successfully been unlocked.
      "UnlockFailed";                          // Failed to unlock the connector.

export type UnpublishFirmwareStatus
    = "DownloadOngoing" |                      // Intermediate state. Firmware is being downloaded.
      "NoFirmware" |                           // There is no published file.
      "Unpublished";                           // Successful end state. Firmware file no longer being published.

export type UpdateFirmwareStatus
    = "Accepted" |                             // Accepted this firmware update request. This does not mean the firmware update is successful, the Charging
      "Station" |                              // will now start the firmware update process.
      "Rejected" |                             // Firmware update request rejected.
      "AcceptedCanceled" |                     // Accepted this firmware update request, but in doing this has canceled an ongoing firmware update.
      "InvalidCertificate" |                   // The certificate is invalid.
      "RevokedCertificate";                    // Failure end state. The Firmware Signing certificate has been revoked.

export type PriorityChargingStatus
    = "Accepted" |                             // Request has been accepted.
      "Rejected" |                             // Request has been rejected.
      "NoProfile";                             // No priority charging profile present.

export type IslandingDetection
    = "NoAntiIslandingSupport" |               // No anti-island detection supported
      "RoCoF" |                                // RoCoF - Rate of Change of Frequency
      "UVP_OVP" |                              // Under/over voltage (UVP/OVP)
      "UFP_OFP" |                              // Under/over frequency (UFP/OFP)
      "VoltageVectorShift" |                   // Voltage Vector Shift
      "ZeroCrossingDetection" |                // Zero Crossing Detection
      "OtherPassive" |                         // Other passive anti-island detection method supported
      "ImpedanceMeasurement" |                 // Impedance measurement
      "ImpedanceAtFrequency" |                 // Impedance detection at a specific frequency
      "SlipModeFrequencyShift" |               // Slip-mode frequency shift
      "SandiaFrequencyShift" |                 // Frequency bias/Sandia frequency shift
      "SandiaVoltageShift" |                   // Sandia voltage shift
      "FrequencyJump" |                        // Frequency jump
      "RCLQFactor" |                           // RCL Q factor
      "OtherActive";                           // Other active anti-island detection method supported
    






export type IdTokenType                 = "Central"         |
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

export type HashAlgorithm               = "SHA256" |
                                          "SHA384" |
                                          "SHA512" |
                                           string;

export type BootReason                  = "ApplicationReset" |
                                          "FirmwareUpdate"   |
                                          "LocalReset"       |
                                          "PowerUp"          |
                                          "RemoteReset"      |
                                          "ScheduledReset"   |
                                          "Triggered"        |
                                          "Watchdog"         |
                                           string;

export type ChargingLimitSource         = "EMS"   |
                                          "Other" |
                                          "SO"    |
                                          "CSO"   |
                                           string;

export type FirmwareStatus              = "Downloaded"                |
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

export type CertificateAction           = "Install" |
                                          "Update"  |
                                           string;

export type UploadLogStatus             = "BadMessage"            |
                                          "Idle"                  |
                                          "NotSupportedOperation" |
                                          "PermissionDenied"      |
                                          "Uploaded"              |
                                          "UploadFailure"         |
                                          "Uploading"             |
                                          "AcceptedCanceled"      |
                                           string;

export type ReadingContext              = "Interruption.Begin" |
                                          "Interruption.End"   |
                                          "Other"              |
                                          "Sample.Clock"       |
                                          "Transaction.Begin"  |
                                          "Transaction.End"    |
                                          "Trigger"            |
                                          "Sample.Periodic"    |
                                           string;

 export type ValueFormat                = "Raw" |
                                          "SignedData";

 export type Measurand                  = "Current.Export"                  |
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

 export type Phase                      = "L1"    |
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

 export type MeteringLocation           = "Body"   |
                                          "Cable"  |
                                          "EV"     |
                                          "Inlet"  |
                                          "Outlet" |
                                           string;

 export type UnitOfMeasure              = "Celsius"    |
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

export type ChargingRateUnit            = "A" |
                                          "W" |
                                           string;

export type CostKind                    = "CarbonDioxideEmission"         |
                                          "RelativePricePercentage"       |
                                          "RenewableGenerationPercentage" |
                                           string;

export type MessagePriority             = "AlwaysFront" |
                                          "InFront"     |
                                          "NormalCycle" |
                                           string;

export type MessageFormat               = "ASCII" |
                                          "HTML"  |
                                          "URI"   |
                                          "UTF8"  |
                                           string;

export type MessageState                = "Charging"    |
                                          "Faulted"     |
                                          "Idle"        |
                                          "Unavailable" |
                                           string;

export type EnergyTransferMode          = "DC"               |
                                          "AC_single_phase"  |
                                          "AC_two_phase"     |
                                          "AC_three_phase"   |
                                           string;

export type EventTrigger                = "Alerting" |
                                          "Delta"    |
                                          "Periodic" |
                                           string;

export type EventNotificationType       = "HardWiredNotification" |
                                          "HardWiredMonitor"      |
                                          "PreconfiguredMonitor"  |
                                          "CustomMonitor"         |
                                           string;

export type MonitorType                 = "UpperThreshold"       |
                                          "LowerThreshold"       |
                                          "Delta"                |
                                          "Periodic"             |
                                          "PeriodicClockAligned" |
                                           string;

export type MutabilityType              = "ReadOnly"  |
                                          "WriteOnly" |
                                          "ReadWrite" |
                                           string;

export type VariableDataType            = "ReadOnly"  |
                                          "WriteOnly" |
                                          "ReadWrite" |
                                           string;

export type PublishFirmwareStatus       = "Idle"              |
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