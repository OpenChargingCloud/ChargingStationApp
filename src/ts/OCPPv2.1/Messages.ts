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

import * as types   from './Types';
import * as complex from './Complex';
import * as exp from 'constants';


export interface AdjustPeriodicEventStreamRequest {
    id:                                 types.  Integer,                        // Unique identifier of the event stream to adjust.
    params:                             complex.PeriodicEventStreamParams,      // Updated rate of sending data
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AdjustPeriodicEventStreamResponse {
    status:                             types.  GenericStatus,                  // Status of operation.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AFRRSignalRequest {
    timestamp:                          types.  Timestamp,                      // Time when signal becomes active.
    signal:                             types.  Integer,                        // Value of signal in v2xSignalWattCurve.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AFRRSignalResponse {
    status:                             types.  GenericStatus,                  // Status of operation.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AuthorizeRequest {
    idToken:                            complex.IdToken,                        // This contains the identifier that needs to be authorized.
    certificate?:                       types.  PEMCertificate,                 // The X.509 certificate chain presented by EV and encoded in PEM format.
                                                                                // Order of certificates in chain is from leaf up to (but excluding) root certificate.
                                                                                // Only needed in case of central contract validation when Charging Station cannot validate
                                                                                // the contract certificate.
    iso15118CertificateHashData?:       Array<complex.OCSPRequestData>,         // Contains the information needed to verify the EV Contract Certificate via OCSP.
                                                                                // Not needed if certificate is provided.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AuthorizeResponse {
    idTokenInfo:                        complex.IdTokenInfo,                    // This contains information about authorization status, expiry and group id.
    certificateStatus?:                 types.  AuthorizeCertificateStatus,     // Status of the certificate.
    allowedEnergyTransfer?:             Array<types.EnergyTransferMode>,        // (2.1) List of allowed energy transfer modes the EV can choose from. If omitted this defaults to charging only.
    transactionLimit?:                  complex.TransactionLimit,               // (2.1) Maximum cost/energy/time limit allowed for this token.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface BatterySwapRequest {
    eventType:                          types.  BatterySwapEvent,               // Battery in/out.
    requestId:                          types.  RequestId,                      // RequestId to correlate BatteryIn/Out events and optional RequestBatterySwapRequest.
    idToken:                            complex.IdToken,                        // Id token of EV Driver.
    batteryData:                        Array<complex.BatteryData>,             // Info on batteries inserted or taken out.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface BatterySwapResponse {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface BootNotificationRequest {
    chargingStation:                    complex.ChargingStation,                // Contains information about the Charging Station.
    reason:                             types.  BootReason,                     // This contains the reason for sending this message to the CSMS.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface BootNotificationResponse {
    status:                             types.  RegistrationStatus,             // This contains whether the Charging Station has been registered within the CSMS.
    currentTime:                        types.  Timestamp,                      // This contains the CSMS’s current time.
    interval:                           types.  Seconds,                        // When Status is Accepted, this contains the heartbeat interval in seconds.
                                                                                // If the CSMS returns something other than Accepted, the value of the interval
                                                                                // field indicates the minimum wait time before sending a next BootNotification request.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CancelReservationRequest {
    reservationId:                      types.ReservationId,                    // The identifier of the reservation to be cancelled.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CancelReservationResponse {
    status:                             types.CancelReservationStatus,          // This indicates whether the cancellation was successful.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CertificateSignedRequest {
    certificateChain:                   types.PEMCertificateChain               // The signed PEM encoded X.509 certificate. This SHALL also contain the necessary sub CA
                                                                                // certificates, when applicable. The order of the bundle follows the certificate chain,
                                                                                // starting from the leaf certificate.
                                                                                // The Configuration Variable MaxCertificateChainSize can be used to limit the maximum size
                                                                                // of this field.
    certificateType?:                   types.  CertificateSigningUse,          // The type of certificate that is signed.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CertificateSignedResponse {
    status:                             types.  CertificateSignedStatus,        // Returns whether certificate signing has been accepted, otherwise rejected.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ChangeAvailabilityRequest {
    operationalStatus:                  types.  OperationalStatus,              // This contains the type of availability change that the Charging Station should perform.
    evse?:                              complex.EVSE,                           // Contains Id’s to designate a specific EVSE/connector by index numbers.
                                                                                // When omitted, the message refers to the Charging Station as a whole.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ChangeAvailabilityResponse {
    status:                             types.  ChangeAvailabilityStatus,       // This indicates whether the Charging Station is able to perform the availability change.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ChangeTransactionTariffRequest {
    transactionId:                      types.  TransactionId,                  // The identifier of the transaction for which the tariff should be changed.
    tariff:                             complex.Tariff,                         // New tariff to use for transaction.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ChangeTransactionTariffResponse {
    status:                             types.  TariffStatus,                   // Status of the operation.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearCacheRequest {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearCacheResponse {
    status:                             types.  ClearCacheStatus,               // Accepted if the Charging Station has executed the request, otherwise rejected.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearChargingProfileRequest {
    chargingProfileId?:                 types.  Integer,                        // The Id of the charging profile to clear.
    chargingProfileCriteria?:           complex.ChargingProfileCriteria,        // Specifies the charging profile.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearChargingProfileResponse {
    status:                             types.  ClearChargingProfileStatus,
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearDisplayMessageRequest {
    id:                                 types.  Integer,                        // Id of the message that SHALL be removed from the Charging Station.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearDisplayMessageResponse {
    status:                             types.  ClearDisplayMessageStatus,      // Returns whether the Charging Station has been able to remove the message.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearedChargingLimitRequest {
    chargingLimitSource:                types.  ChargingLimitSource,            // Source of the charging limit.
    evseId?:                            types.  EVSEId,                         // The id of the EVSE.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearedChargingLimitResponse {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearTariffsRequest {
    tariffIds?:                         Array<types.TariffId>,                  // List of tariff Ids to clear. When absent clears all tariffs.
    tariffKind?:                        types.  TariffKind,                     // When present only clear tariffs of this kind.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearTariffsResponse {
    clearTariffsResult:                 Array<complex.ClearTariffsResult>,      // Result of the operation. 
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearVariableMonitoringRequest {
    id:                                 Array<types.  Integer>,                 // List of the monitors to be cleared, identified by there Id.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClearVariableMonitoringResponse {
    clearMonitoringResult:              Array<complex.ClearMonitoringResult>,   // List of status per monitor.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClosePeriodicEventStreamRequest {
    id:                                 types.  Integer,                        // Unique identifier of the event stream to close.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface ClosePeriodicEventStreamResponse {
    status:                             types.  GenericStatus,                  // Status of operation.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CostUpdatedRequest {
    totalCost:                          types.  Decimal,                        // Current total cost, based on the information known by the CSMS, of the transaction including taxes.
                                                                                // In the currency configured with the configuration Variable: [Currency]
    transactionId:                      types.  TransactionId,                  // Transaction Id of the transaction the current cost are asked for.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CustomerInformationRequest {
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    report:                             boolean,                                // Flag indicating whether the Charging Station should return NotifyCustomerInformationRequest messages containing information about the customer referred to.
    clear:                              boolean,                                // Flag indicating whether the Charging Station should clear all information about the customer referred to.
    customerIdentifier:                 string,                                 // A (e.g. vendor specific) identifier of the customer this request refers to. This field contains a
                                                                                // custom identifier other than IdToken and Certificate. One of the possible identifiers (customerIdentifier,
                                                                                // customerIdToken or customerCertificate) should be in the request message.
    idToken?:                           complex.IdToken,                        // The IdToken of the customer this request refers to. One of the possible identifiers (customerIdentifier,
                                                                                // customerIdToken or customerCertificate) should be in the request message.
    customerCertificate?:               complex.CertificateHashData,            // The Certificate of the customer this request refers to. One of the possible identifiers
                                                                                // (customerIdentifier, customerIdToken or customerCertificate) should be in the request message.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface CustomerInformationResponse {
    status:                             types.  CustomerInformationStatus,      // Indicates whether the request was accepted.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface DataTransferRequest {
    vendorId:                           types.  VendorId,                       // This identifies the Vendor specific implementation.
    messageId?:                         types.  MessageId,                      // May be used to indicate a specific message or implementation.
    data?:                              any,                                    // Data without specified length or format. This needs to be decided by both parties (Open to implementation).
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface DataTransferResponse {
    status:                             types.  DataTransferStatus,             // This indicates whether the data transfer was successful.
    data?:                              any,                                    // Data without specified length or format, in response to request.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface DeleteCertificateRequest {
    certificateHashData:                complex.CertificateHashData             // Indicates the certificate of which deletion is requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface DeleteCertificateResponse {
    status:                             types.DeleteCertificateStatus           // Charging Station indicates if it can process the request.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface FirmwareStatusNotificationRequest {
    status:                             types.  FirmwareStatus,                 // This contains the progress status of the firmware installation.
    requestId?:                         types.  RequestId,                      // The request id that was provided in the UpdateFirmwareRequest that started this firmware update.
                                                                                // This field is mandatory, unless the message was triggered by a TriggerMessageRequest AND there
                                                                                // is no firmware update ongoing.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface FirmwareStatusNotificationResponse {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface Get15118EVCertificateRequest {
    iso15118SchemaVersion:              types.  ISO15118SchemaVersion,          // Schema version currently used for the 15118 session between EV and Charging Station.
                                                                                // Needed for parsing of the EXI stream by the CSMS.
    action:                             types.  CertificateAction,              // Defines whether certificate needs to be installed or updated.
    exiRequest:                         types.  EXIData,                        // (2.1) Raw CertificateInstallationReq request from EV, Base64 encoded.
                                                                                // Extended to support ISO 15118-20 certificates. The minimum supported length is 11000.
                                                                                // If a longer exiRequest is supported, then the supported length must be communicated in variable
                                                                                // OCPPCommCtrlr.FieldLength["Get15118EVCertificateRequest.exiRequest" ].
    maximumContractCertificateChains?:  types.  Integer,                        // (2.1) Required during ISO 15118-20 session. Maximum number of contracts that EV wants to install.
    prioritizedEMAIDs?:                 Array<types.  EMAId>,                   // (2.1) List or EMAIDs for which contract certificates must be requested first, in case there are
                                                                                // more certificates than allowed by maximumContractCertificateChains.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface Get15118EVCertificateResponse {
    status:                             types.  ISO15118EVCertificateStatus,    // Indicates whether the message was processed properly.
    exiResponse?:                       types.  EXIData,                        // (2/1) Raw CertificateInstallationRes response for the EV, Base64 encoded.
                                                                                // Extended to support ISO 15118-20 certificates. The minimum supported length is 17000.
                                                                                // If a longer exiResponse is supported, then the supported length must be communicated in variable
                                                                                //  OCPPCommCtrlr.FieldLength["Get15118EVCertificateResponse.exiResponse" ].
    remainingContracts?:                types.  Integer,                        // (2.1) Number of contracts that can be retrieved with additional requests.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetBaseReportRequest {
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    reportBase:                         types.  ReportBase,                     // Base report to retrieve.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetBaseReportResponse {
    status:                             types.  GenericDeviceModelStatus,       // This indicates whether the Charging Station is able to accept this request.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCertificateStatusRequest {
    ocspRequestData:                    complex.OCSPRequestData,                // Indicates the certificate of which the status is requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCertificateStatusResponse {
    status:                             types.GetCertificateStatus,             // This indicates whether the charging station was able to retrieve the OCSP certificate status.
    ocspResult?:                        string,                                 // (2.1) OCSPResponse class as defined in IETF RFC 6960. DER encoded (as defined in IETF RFC 6960),
                                                                                // and then base64 encoded. MAY only be omitted when status is not Accepted.
                                                                                // The minimum supported length is 18000. If a longer ocspResult is supported, then the supported
                                                                                // length must be communicated in variable OCPPCommCtrlr.FieldLength["GetCertificateStatusResponse.ocspResult" ].
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetChargingProfilesRequest {
    requestId:                          types.  RequestId,                      // Reference identification that is to be used by the Charging Station in the
                                                                                // ReportChargingProfilesRequest when provided.
    evseId?:                            types.  EVSEId,                         // For which EVSE installed charging profiles SHALL be reported. If 0, only charging profiles
                                                                                // installed on the Charging Station itself (the grid connection) SHALL be reported.
                                                                                // If omitted, all installed charging profiles SHALL be reported.
                                                                                // Reported charging profiles SHALL match the criteria in field chargingProfile.
    chargingProfile:                    complex.ChargingProfileCriterion,       // Specifies the charging profile.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetChargingProfilesResponse {
    status:                             types.  GetChargingProfileStatus,       // This indicates whether the Charging Station is able to process this request and will send
                                                                                // ReportChargingProfilesRequest messages.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCompositeScheduleRequest {
    duration:                           types.  Seconds,                        // Length of the requested schedule in seconds.
    chargingRateUnit?:                  types.  ChargingRateUnit,               // Can be used to force a power or current profile.
    evseId:                             types.  EVSEId,                         // The ID of the EVSE for which the schedule is requested. When evseid=0, the Charging Station will
                                                                                // calculate the expected consumption for the grid connection.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCompositeScheduleResponse {
    status:                             types.  GenericStatus,                  // The Charging Station will indicate if it was able to process the request.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    schedule?:                          complex.CompositeSchedule,              // This field contains the calculated composite schedule.
                                                                                // It may only be omitted when this message contains status Rejected.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCRLRequest {
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    certificateHashData:                complex.CertificateHashData,            // CertificateHashData as also used in DeleteCertificateRequest.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetCRLResponse {
    requestId:                          types.  RequestId,                      // Unique identifier of the associated request.
    status:                             types.  GenericStatus,                  // Accepted or rejected.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetDERControlRequest {
    isDefault:                          boolean,                                // True: get a default DER control. False: get a scheduled control.
    controlType?:                       types.  DERControlType,                 // Type of control settings to retrieve. Not used when controlId is provided.
    controlId?:                         types.  DERControlId,                   // Id of setting to get. When omitted all settings for controlType are retrieved.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetDERControlResponse {
    status:                             types.  DERControlStatus,               // Result of operation.
    fixedPFAbsorb?:                     Array<complex.FixedPFGet>,              // Fixed power factor setpoint when absorbing active power.
    fixedPFInject?:                     Array<complex.FixedPFGet>,              // Fixed power factor setpoint when injecting active power.
    fixedVar?:                          Array<complex.FixedVarGet>,             // Fixed reactive power setting.
    limitMaxDischarge?:                 Array<complex.LimitMaxDischargeGet>,    // Limit maximum discharge as percentage of rated capability.
    freqDroop?:                         Array<complex.FreqDroopGet>,            // Frequency-Watt parameterized mode.
    enterService?:                      Array<complex.EnterServiceGet>,         // Enter service after trip parameters.
    gradient?:                          Array<complex.GradientGet>,             // Gradient settings
    curve?:                             Array<complex.DERCurveGet>,             // Voltage/Frequency/Active/Reactive curve.
}

export interface GetDisplayMessagesRequest {
    id?:                                Array<types.MessageId>,                 // If provided the Charging Station shall return Display Messages of the given ids.
                                                                                // This field SHALL NOT contain more ids than set in NumberOfDisplayMessages.maxLimit
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    priority?:                          types.  MessagePriority,                // If provided the Charging Station shall return Display Messages with the given priority only.
    state?:                             types.  MessageState,                   // If provided the Charging Station shall return Display Messages with the given state only.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetDisplayMessagesResponse {
    status:                             types.  GetDisplayMessageStatus,        // Indicates if the Charging Station has Display Messages that match the request criteria in the GetDisplayMessagesRequest
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetInstalledCertificateIdsRequest {
    certificateType?:                   types.GetCertificateIdUse,              // Indicates the type of certificates requested. When omitted, all certificate types are requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetInstalledCertificateIdsResponse {
    status:                             types.GetInstalledCertificateStatus,    // Charging Station indicates if it can process the request.
    certificateHashData?:               Array<complex.CertificateHashData>      // The Charging Station includes the Certificate information for each available certificate.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetLocalListVersionRequest {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetLocalListVersionResponse {
    listVersion:                        types.  ListVersion,                    // This contains the current version number of the local authorization list in the Charging Station.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetLogRequest {
    logType:                            types.  LogType,                        // This contains the type of log file that the Charging Station should send.
    requestId:                          types.  RequestId,                      // The Id of this request.
    retries?:                           types.  Integer,                        // This specifies how many times the Charging Station must try to upload the log before giving up.
                                                                                // If this field is not present, it is left to Charging Station to decide how many times it wants to retry.
    retryInterval?:                     types.  Seconds,                        // The interval in seconds after which a retry may be attempted. If this field is not present,
                                                                                // it is left to Charging Station to decide how long to wait between attempts.
    log:                                complex.LogParameters                   // This field specifies the requested log and the location to which the log should be sent.
}

export interface GetLogResponse {
    status:                             types.LogStatus,                        // This field indicates whether the Charging Station was able to accept the request.
    filename?:                          string                                  // This contains the name of the log file that will be uploaded.
                                                                                // This field is not present when no logging information is available.
}

export interface GetMonitoringReportRequest {
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    monitoringCriteria?:                Array<types.  MonitoringCriterion>,     // This field contains criteria for components for which a monitoring report is requested.
    componentVariable?:                 Array<complex.ComponentVariable>,       // This field specifies the components and variables for which a monitoring report is requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetMonitoringReportResponse {
    status:                             types.  GenericDeviceModelStatus,       // This field indicates whether the Charging Station was able to accept the request.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetPeriodicEventStreamRequest {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetPeriodicEventStreamResponse {
    constantStreamData:                 Array<complex.ConstantStreamData>,      // List of constant part of streams.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetReportRequest {
    requestId:                          types.  RequestId,                      // Unique identifier of the request.
    componentCriteria?:                 Array<types.  ComponentCriterion>,      // This field contains criteria for components for which a report is requested.
    componentVariable?:                 Array<complex.ComponentVariable>,       // This field specifies the components and variables for which a report is requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetReportResponse {
    status:                             types.  GenericDeviceModelStatus,       // This field indicates whether the Charging Station was able to accept the request.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetTariffsRequest {
    evseId?:                            types.  EVSEId,                         // EVSE id to get tariff from. When absent gets all tariffs.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetTariffsResponse {
    status:                             types.  TariffStatus,                   // Status of the operation.
    tariffAssignments?:                 Array<complex.TariffAssignment>         // Installed default and user-specific tariffs per EVSE.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetTransactionStatusRequest {
    transactionId:                      types.  TransactionId,                  // The identifier of the transaction for which the status is requested.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetTransactionStatusResponse {
    ongoingIndicator?:                  boolean,                                // Whether the transaction is still ongoing.
    messagesInQueue:                    boolean,                                // Whether there are still message to be delivered.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetVariablesRequest {
    getVariableData:                    Array<complex.GetVariableData>,         // List of requested variables.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface GetVariablesResponse {
    getVariableResult:                  Array<complex.GetVariableResult>,       // List of requested variables and their values.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface HeartBeatRequest {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface HeartBeatResponse {
    currentTime:                        types.  Timestamp,                      // This contains the current time of the CSMS.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface InstallCertificateRequest {
    certificateType:                    types.InstallCertificateUse,            // Indicates the certificate type that is sent.
    certificate:                        types.PEMCertificate,                   // An PEM encoded X.509 certificate.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface InstallCertificateResponse {
    status:                             types.InstallCertificateStatus,         // Charging Station indicates if installation was successful.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.c
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface LogStatusNotificationRequest {
    status:                             types.  UploadLogStatus,                // This contains the status of the log upload.
    requestId:                          types.  RequestId,                      // The request id that was provided in GetLogRequest that started this log upload.
                                                                                // This field is mandatory, unless the message was triggered by a TriggerMessageRequest AND
                                                                                // there is no log upload ongoing.
    statusInfo?:                        complex.StatusInfo,                     // Detailed status information.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface LogStatusNotificationResponse {
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface MeterValuesRequest {
    evseId:                             types.  EVSEId,                         // This contains a number (>0) designating an EVSE of the Charging Station. ‘0’ (zero) is used to
                                                                                // designate the main power meter.
    meterValue:                         Array<complex.MeterValue>,              // The sampled meter values with timestamps. The following Configuration Variables are used to
                                                                                // configure which measurands are sent: AlignedDataMeasurands, AlignedDataUpstreamMeasurands
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface MeterValuesResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyAllowedEnergyTransferRequest {
    allowedEnergyTransfer:              Array<types.EnergyTransferMode>,            // Modes of energy transfer that are accepted by CSMS.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyAllowedEnergyTransferResponse {
    status:                             types.  NotifyAllowedEnergyTransferStatus,  // This indicates whether the Charging Station was able to process the request.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyChargingLimitRequest {
    evseId?:                            types.  EVSEId,                             // The EVSE to which the charging limit is set.
                                                                                    // If absent or when zero, it applies to the entire Charging Station.
    chargingLimit:                      complex.ChargingLimit,                      // This contains the source of the charging limit and whether it is grid critical.
    chargingSchedule?:                  Array<complex.ChargingSchedule>,            // Contains limits for the available power or current over time, as set by the external source.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyChargingLimitResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyCRLRequest {
    requestId:                          types.  RequestId,                          // Id of the GetCRLRequest for which this is the notification.
    status:                             types.  NotifyCRLStatus,                    // Status whether CRL is available or not.
    location:                           string,                                     // Required when a CRL is available. URL to location where charging station can retrieve the CRL.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyCRLResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyCustomerInformationRequest {
    requestId:                          types.  RequestId,                          // Unique identifier of the request.
    data:                               string,                                     // (Part of) the requested data. No format specified in which the data is returned.
                                                                                    // Should be human readable.
    seqNo:                              types.  Integer,                            // Sequence number of this message. First message starts at 0.
    generatedAt:                        types.  Timestamp,                          // Timestamp of the moment this message was generated at the Charging Station.
    tbc?:                               boolean,                                    // “to be continued” indicator. Indicates whether another part of the monitoringData follows
                                                                                    // in an upcoming notifyMonitoringReportRequest message.
                                                                                    // Default value when omitted is false.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyCustomerInformationResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDERAlarmRequest {
    controlType:                        types.  DERControlType,                     // Name of DER control, e.g. FreqDroop
    gridEventFault?:                    types.  GridEventFault,                     // Type of grid event that caused this
    alarmEnded?:                        boolean,                                    // True when error condition has ended. Absent or false when alarm has started.
    timestamp:                          types.Timestamp,                            // Time of start or end of alarm.
    extraInfo:                          string,                                     // Optional info provided by EV.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDERAlarmResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDERStartStopRequest {
    controlId:                          types.  DERControlId,                       // Id of DER control, e.g. FreqDroop
    started:                            boolean,                                    // True if DER control has started. False if it has ended.
    timestamp:                          types.  Timestamp,                          // Time of start or end of event.
    supersededIds?:                     Array<types.DERControlId>,                  // List of controlIds that are superseded as a result of this control starting.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDERStartStopResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDisplayMessagesRequest {
    requestId:                          types.  RequestId,                          // The id of the GetDisplayMessagesRequest that requested this message.
    messageInfo?:                       Array<complex.MessageInfo>,                 // The requested display message as configured in the Charging Station.
    tbc?:                               boolean,                                    // "to be continued" indicator. Indicates whether another part of the report follows in an
                                                                                    // upcoming NotifyDisplayMessagesRequest message. Default value when omitted is false.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyDisplayMessagesResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEVChargingNeedsRequest {
    timestamp?:                         types.  Timestamp,                          // (2.1) Time when EV charging needs were received.
                                                                                    // Field can be added when charging station was offline when charging needs were received.
    evseId:                             types.  EVSEId,                             // Defines the EVSE and connector to which the EV is connected. EvseId may not be 0.
    chargingNeeds:                      complex.ChargingNeeds,                      // The characteristics of the energy delivery required.
    maxScheduleTuples?:                 types.  Integer,                            // Contains the maximum schedule tuples the car supports per SASchedule (both Pmax and Tariff).
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEVChargingNeedsResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEVChargingScheduleRequest {
    timeBase:                           types.  Timestamp,                          // Periods contained in the charging profile are relative to this point in time.
    evseId:                             types.  EVSEId,                             // The charging schedule contained in this notification applies to an EVSE. EvseId must be > 0.
    chargingSchedule:                   complex.ChargingSchedule,                   // Planned energy consumption of the EV over time. Always relative to timeBase.
    selectedScheduleTupleId?:           types.  Integer,                            // (2.1) Id of chargingSchedule that EV selected from the provided ChargingProfile.
    powerToleranceAcceptance?:          boolean,                                    // (2.1) True when power tolerance is accepted by EV. This value is taken from
                                                                                    // EVPowerProfile.PowerToleranceAcceptance in the ISO 15118-20 PowerDeliverReq message.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEVChargingScheduleResponse {
    status:                             types.  GenericStatus,                      // Returns whether the CSMS has been able to process the message successfully.
                                                                                    // It does not imply any approval of the charging schedule.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEventRequest {
    generatedAt:                        types.  Timestamp,                          // Timestamp of the moment this message was generated at the Charging Station.
    seqNo:                              types.  Integer,                            // Sequence number of this message. First message starts at 0.
    eventData:                          Array<complex.EventData>,                   // List of EventData. An EventData element contains only the Component, Variable and
                                                                                    // VariableMonitoring data that caused the event. The list of EventData will usally contain
                                                                                    // one eventData element, but the Charging Station may decide to group multiple events
                                                                                    // in one notification. For example, when multiple events triggered at the same time.
    tbc?:                               boolean,                                    // “to be continued” indicator. Indicates whether another part of the report follows in an
                                                                                    // upcoming notifyEventRequest message. Default value when omitted is false.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyEventResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyMonitoringReportRequest {
    requestId:                          types.  RequestId,                          // The id of the GetMonitoringRequest that requested this report.
    seqNo:                              types.  Integer,                            // Sequence number of this message. First message starts at 0.
    generatedAt:                        types.  Timestamp,                          // Timestamp of the moment this message was generated at the Charging Station.
    monitor:                            Array<complex.MonitoringData>,              // List of MonitoringData containing monitoring settings.
    tbc?:                               boolean,                                    // “to be continued” indicator. Indicates whether another part of the monitoringData follows
                                                                                    // in an upcoming notifyMonitoringReportRequest message. Default value when omitted is false.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyMonitoringReportResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyPeriodicEventStreamRequest {
    id:                                 types.  StreamId,                           // Unique identifier of the event stream.
    pending:                            number,                                     // Number of data elements still pending to be sent.
    data:                               Array<complex.StreamDataElement>,           // Variable part of stream data.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyPeriodicEventStreamResponse {
    status:                             types.  GenericStatus,                      // Status of operation.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyPriorityChargingRequest {
    transactionId:                      types.  TransactionId,                      // The transaction for which priority charging is requested.
    activated:                          boolean,                                    // True if priority charging was activated. False if it has stopped using the priority charging profile.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyPriorityChargingResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyQRCodeScannedRequest {
    evseId:                             types.  EVSEId,                             // EVSE id for which transaction is requested.
    timeout:                            types.  Seconds,                            // Timeout value in seconds after which no result of QR code scanning is to be expected anymore.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyQRCodeScannedResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyReportRequest {
    requestId:                          types.  RequestId,                          // The id of the GetReportRequest or GetBaseReportRequest that requested this report.
    seqNo:                              types.  Integer,                            // Sequence number of this message. First message starts at 0.
    generatedAt:                        types.  Timestamp,                          // Timestamp of the moment this message was generated at the Charging Station.
    reportData?:                        Array<complex.ReportData>,                  // List of ReportData.
    tbc?:                               boolean,                                    // “to be continued” indicator. Indicates whether another part of the report follows in an
                                                                                    // upcoming notifyReportRequest message. Default value when omitted is false.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifyReportResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifySettlementRequest {
    transactionId?:                     types.  Identifier,                         // The transactionId that the settlement belongs to. Can be empty if the payment transaction is canceled prior to the start of the OCPP transaction.
    pspRef:                             types.  Identifier,                         // The payment reference received from the payment terminal and is used as the value for idToken.
    status:                             types.  PaymentStatus,                      // The status of the settlement attempt.
    statusInfo?:                        string,                                     // Additional information from payment terminal/payment process.
    settlementAmount:                   types.  Decimal,                            // The amount that was settled, or attempted to be settled (in case of failure).
    settlementTime:                     types.  Timestamp,                          // The time when the settlement was done.
    receiptId?:                         types.  ReceiptId,                          // The receiptId that was received from the payment terminal.
    receiptUrl?:                        types.  URL,                                // The receipt URL, to be used if the receipt is generated by the payment terminal or the CS.
    vatNumber?:                         types.  VATNumber,                          // VAT number for a company receipt.
    vatCompany?:                        complex.AddressType,                        // Company address associated with VAT number.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface NotifySettlementResponse {
    receiptURL?:                        types.  URL,                                // The receipt URL if receipt generated by CSMS. The Charging Station can QR encode it and
                                                                                    // show it to the EV Driver.
    receiptId?:                         types.  ReceiptId,                          // The receipt id if the receipt is generated by CSMS.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface OpenPeriodicEventStreamRequest {
    constantStreamData:                 complex.ConstantStreamData,                // Constant part of stream data.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface OpenPeriodicEventStreamResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PublishFirmwareRequest {
    requestId:                          types.  RequestId,                          // The Id of the request.
    location:                           types.  URL,                                // This contains a string containing an URL from which to retrieve the firmware.
    retries?:                           types.  Integer,                            // This specifies how many times Charging Station must retry to download the firmware before
                                                                                    // giving up. If this field is not present, it is left to Charging Station to decide how many
                                                                                    // times it wants to retry. If the value is 0, it means: no retries.
    checksum:                           string,                                     // The MD5 checksum over the entire firmware file as a hexadecimal string of length 32.
    retryInterval?:                     types.  Seconds,                            // The interval in seconds after which a retry may be attempted. If this field is not present,
                                                                                    // it is left to Charging Station to decide how long to wait between attempts.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PublishFirmwareResponse {
    status:                             types.  GenericStatus,                      // Indicates whether the request was accepted.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PublishFirmwareStatusNotificationRequest {
    status:                             types.  PublishFirmwareStatus,              // This contains the progress status of the publishfirmware installation.
    location?:                          Array<types.URL>,                           // Required if status is Published. Can be multiple URI’s, if the Local Controller supports
                                                                                    // e.g. HTTP, HTTPS, and FTP.
    requestId?:                         types.  RequestId,                          // The request id that was provided in the PublishFirmwareRequest which triggered this action.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PublishFirmwareStatusNotificationResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PullDynamicScheduleUpdateRequest {
    chargingProfileId:                  types.  ChargingProfileId,                  // Required. Id of charging profile to update.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface PullDynamicScheduleUpdateResponse {
    status:                             types.  ChargingProfileStatus,              // Result of request.
    scheduleUpdate?:                    complex.ChargingScheduleUpdate,             // Updated charging schedule period values.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReportChargingProfilesRequest {
    requestId:                          types.  RequestId,                          // Id used to match the GetChargingProfilesRequest message with the resulting
                                                                                    // ReportChargingProfilesRequest messages. When the CSMS provided a requestId in the
                                                                                    // GetChargingProfilesRequest, this field SHALL contain the same value.
    chargingLimitSource:                types.  ChargingLimitSource,                // Source that has installed this charging profile.
    evseId:                             types.  EVSEId,                             // The evse to which the charging profile applies.
                                                                                    // If evseId = 0, the message contains an overall limit for the Charging Station.
    chargingProfile:                    Array<complex.ChargingProfile>,             // The charging profile as configured in the Charging Station.
    tbc?:                               boolean,                                    // To Be Continued. Default value when omitted: false. false indicates that there are no
                                                                                    // further messages as part of this report.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReportChargingProfilesResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestBatterySwapRequest {
    requestId:                          types.  RequestId,                          // Unique identifier of the request.
    idToken:                            complex.IdToken,                            // Id token of EV driver.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestBatterySwapResponse {
    status:                             types.  GenericStatus,                      // This indicates whether the request was accepted.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestStartTransactionRequest {
    evseId?:                           types.  EMAId,                               // Number of the EVSE on which to start the transaction. EvseId SHALL be > 0
    remoteStartId:                     types.  RemoteStartId,                       // Id given by the server to this start request. The Charging Station will return this in the
                                                                                    // TransactionEventRequest, letting the server know which transaction was started for this
                                                                                    // request. Use to start a transaction.
    idToken:                           complex.IdToken,                             // The identifier that the Charging Station must use to start a transaction.
    chargingProfile?:                  complex.ChargingProfile,                     // Charging Profile to be used by the Charging Station for the requested transaction.
                                                                                    // ChargingProfilePurpose MUST be set to TxProfile.
    groupIdToken?:                     complex.IdToken,                             // The groupIdToken is only relevant when the transaction is to be started on an EVSE for
                                                                                    // which a reservation for groupIdToken is active, and the configuration variable
                                                                                    // AuthorizeRemoteStart = false (otherwise the AuthorizeResponse could return the groupIdToken).
    transactionLimit?:                 complex.TransactionLimit,                    // (2.1) Maximum cost/energy/time allowed for this transaction.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestStartTransactionResponse {
    status:                             types.  RequestStartStopStatus,             // Status indicating whether the Charging Station accepts the request to start a transaction.
    transactionId?:                     types.  TransactionId,                      // When the transaction was already started by the Charging Station before the
                                                                                    // RequestStartTransactionRequest was received, for example: cable plugged in first.
                                                                                    // This contains the transactionId of the already started transaction.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestStopTransactionRequest {
    transactionId:                      types.  TransactionId,                      // The identifier of the transaction which the Charging Station is requested to stop.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface RequestStopTransactionResponse {
    status:                             types.  RequestStartStopStatus,             //  Status indicating whether Charging Station accepts the request to stop a transaction.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReservationStatusUpdateRequest {
    reservationId:                      types.  ReservationId,                      // The ID of the reservation.
    reservationUpdateStatus:            types.  ReservationUpdateStatus,            // The updated reservation status.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReservationStatusUpdateResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReserveNowRequest {
    id:                                 types.  ReservationId,                      // The Id of the reservation.
    expiryDateTime:                     types.  Timestamp,                          // Date and time at which the reservation expires.
    connectorType:                      types.  ConnectorType,                      // This field specifies the connector type.
    evseId?:                            types.  EVSEId,                             // This contains ID of the evse to be reserved.
    idToken:                            complex.IdToken,                            // The identifier for which the reservation is made.
    groupIdToken?:                      complex.IdToken,                            // The group identifier for which the reservation is made.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ReserveNowResponse {
    status:                             types.  ReserveNowStatus,                   // This indicates the success or failure of the reservation.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ResetRequest {
    type:                               types.ResetType,                            // This contains the type of reset that the Charging Station or EVSE should perform.
    evseId?:                            types.EVSEId,                               // This contains the ID of a specific EVSE that needs to be reset, instead of the
                                                                                    // entire Charging Station.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface ResetResponse {
    status:                             types.ResetStatus,                          // This indicates whether the Charging Station is able to perform the reset.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SecurityEventNotificationRequest {
    type:                               complex.SecurityEventType,                  // Type of the security event. This value should be taken from the Security events list.
    timestamp:                          types.  Timestamp,                          // Date and time at which the event occurred.
    techInfo?:                          string,                                     // Additional information about the occurred security event.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SecurityEventNotificationResponse {
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SendLocalListRequest {
    listVersion:                        types.  Integer,                            // In case of a full update this is the version number of the full list. In case of a
                                                                                    // differential update it is the version number of the list after the update has been applied.
    localAuthorisationList:             Array<complex.AuthorizationData>,           // This contains the Local Authorization List entries.
    updateType:                         types.  UpdateType,                         // This contains the type of update (full or differential) of this request.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SendLocalListResponse {
    status:                             types.  SendLocalListStatus,                // This indicates whether the Charging Station has successfully received and applied the update
                                                                                    // of the Local Authorization List.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SetChargingProfileRequest {
    evseId:                             types.  EVSEId,                             // For TxDefaultProfile an evseId=0 applies the profile to each individual evse.
                                                                                    // For ChargingStationMaxProfile and ChargingStationExternalConstraints an evseId=0 contains
                                                                                    // an overal limit for the whole Charging Station.
    chargingProfile:                    complex.ChargingProfile,                    // The charging profile to be set at the Charging Station.
    customData?:                        complex.ICustomData                         // Customer specific data.
}

export interface SetChargingProfileResponse {
    status:                             types.ChargingProfileStatus,                // Returns whether the Charging Station has been able to process the message successfully.
                                                                                    // This does not guarantee the schedule will be followed to the letter.
                                                                                    // There might be other constraints the Charging Station may need to take into account.
    statusInfo?:                        complex.StatusInfo,                         // Detailed status information.
    customData?:                        complex.ICustomData                         // Customer specific data.
}










export interface SignCertificateRequest {
    csr:                                string,
    certificateType:                    types.  CertificateType,
    customData?:                        complex.ICustomData
}

export interface StatusNotificationRequest {
    timestamp:                          types.  Timestamp,
    connectorStatus:                    types.  ConnectorStatus,
    evseId:                             types.  EVSEId,
    connectorId:                        types.  ConnectorId,
    customData?:                        complex.ICustomData
}

export interface TransactionEventRequest {
    eventType:                          types.  TransactionEvent,
    timestamp:                          types.  Timestamp,
    triggerReason:                      types.  TriggerReason,
    seqNo:                              types.  Integer,
    transactionInfo:                    complex.TransactionInfo,
    offline?:                           boolean,
    numberOfPhasesUsed?:                types.  Integer,
    cableMaxCurrent?:                   types.  Integer,
    reservationId?:                     types.  ReservationId,
    idToken?:                           complex.IdToken,
    evse?:                              complex.EVSE,
    meterValue?:                        complex.MeterValue[],
    customData?:                        complex.ICustomData
}
