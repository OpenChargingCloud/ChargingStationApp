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
    certificate?:                       types.  Certificate,                    // The X.509 certificate chain presented by EV and encoded in PEM format.
                                                                                // Order of certificates in chain is from leaf up to (but excluding) root certificate.
                                                                                // Only needed in case of central contract validation when Charging Station cannot validate
                                                                                // the contract certificate.
    iso15118CertificateHashData?:       complex.OCSPRequestData[],              // Contains the information needed to verify the EV Contract Certificate via OCSP.
                                                                                // Not needed if certificate is provided.
    customData?:                        complex.ICustomData                     // Customer specific data.
}

export interface AuthorizeResponse {
    idTokenInfo:                        complex.IdTokenInfo,                    // This contains information about authorization status, expiry and group id.
    certificateStatus?:                 types.  AuthorizeCertificateStatus,     // Status of the certificate.
    allowedEnergyTransfer?:             types.  EnergyTransferMode[],           // (2.1) List of allowed energy transfer modes the EV can choose from. If omitted this defaults to charging only.
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
    certificateChain:                   string                                  // The signed PEM encoded X.509 certificate. This SHALL also contain the necessary sub CA
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
    status:                             types.DeleteCertificateStatus           // Charge Point indicates if it can process the request.
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











export interface GetInstalledCertificateIdsRequest {
    certificateType?:                   types.GetCertificateIdUse               // Indicates the type of certificates requested. When omitted, all certificate types are requested.
}

export interface GetInstalledCertificateIdsResponse {
    status:                             types.GetInstalledCertificateStatus,    // Charge Point indicates if it can process the request.
    certificateHashData?:               complex.CertificateHashData[]           // The Charge Point includes the Certificate information for each available certificate.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
}

export interface InstallCertificateRequest {
    certificateType:                    types.InstallCertificateUse,            // Indicates the certificate type that is sent.
    certificate:                        string                                  // An PEM encoded X.509 certificate.
}

export interface InstallCertificateResponse {
    status:                             types.InstallCertificateStatus,         // Charge Point indicates if installation was successful.
    statusInfo?:                        complex.StatusInfo                      // Detailed status information.
}

export interface HeartBeatRequest {
    customData?:                        complex.ICustomData
}

export interface LogStatusNotificationRequest {
    status:                             types.  UploadLogStatus,
    requestId:                          types.  RequestId,
    customData?:                        complex.ICustomData
}

export interface MeterValuesRequest {
    evseId:                             types.  EVSEId,
    meterValue:                         complex.MeterValue[],
    customData?:                        complex.ICustomData
}

export interface NotifyChargingLimitRequest {
    chargingLimit:                      complex.ChargingLimit,
    chargingSchedule:                   complex.ChargingSchedule[],
    evseId?:                            types.  EVSEId,
    customData?:                        complex.ICustomData
}

export interface NotifyCustomerInformationRequest {
    requestId:                          types.  RequestId,
    data:                               string,
    seqNo:                              types.  Integer,
    generatedAt:                        types.  Timestamp,
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyCustomerInformationRequest {
    requestId:                          types.  RequestId,
    messageInfo:                        complex.MessageInfo,
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyDisplayMessagesRequest {
    requestId:                          types.  RequestId,
    messageInfo:                        complex.MessageInfo[],
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyEVChargingNeedsRequest {
    timestamp?:                         types.  Timestamp,
    evseId:                             types.  EVSEId,
    chargingNeeds:                      complex.ChargingNeeds,
    maxScheduleTuples?:                 types.  Integer,
    customData?:                        complex.ICustomData
}

export interface NotifyEVChargingScheduleRequest {
    timeBase:                           types.  Timestamp,
    evseId:                             types.  EVSEId,
    chargingSchedule:                   complex.ChargingSchedule,
    selectedScheduleTupleId?:           types.  Integer,
    powerToleranceAcceptance?:          boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyEventRequest {
    generatedAt:                        types.  Timestamp,
    seqNo:                              types.  Integer,
    eventData:                          complex.EventData[],
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyMonitoringReportRequest {
    requestId:                          types.  RequestId,
    seqNo:                              types.  Integer,
    generatedAt:                        types.  Timestamp,
    monitor:                            complex.MonitoringData[],
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyPriorityChargingRequest {
    transactionId:                      types.  TransactionId,
    activated:                          boolean,
    customData?:                        complex.ICustomData
}

export interface NotifyReportRequest {
    requestId:                          types.  RequestId,
    seqNo:                              types.  Integer,
    generatedAt:                        types.  Timestamp,
    reportData:                         complex.ReportData[],
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface PublishFirmwareStatusNotificationRequest {
    status:                             types.  PublishFirmwareStatus,
    requestId?:                         types.  RequestId,
    location:                           URL[],
    customData?:                        complex.ICustomData
}

export interface PullDynamicScheduleUpdateRequest {
    chargingProfileId:                  types.  ChargingProfileId,
    customData?:                        complex.ICustomData
}

export interface ReportChargingProfilesRequest {
    requestId:                          types.  RequestId,
    chargingLimitSource:                types.  ChargingLimitSource,
    evseId:                             types.  EVSEId,
    chargingProfile:                    complex.ChargingProfile[],
    tbc?:                               boolean,
    customData?:                        complex.ICustomData
}

export interface ReservationStatusUpdateRequest {
    reservationId:                      types.  ReservationId,
    reservationUpdateStatus:            types.  ReservationUpdateStatus,
    customData?:                        complex.ICustomData
}

export interface SecurityEventNotificationRequest {
    type:                               complex.SecurityEventType,
    timestamp:                          types.  Timestamp,
    techInfo?:                          string,
    customData?:                        complex.ICustomData
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

export interface ResetRequest {
    type:                               types.ResetType
    evseId?:                            types.EVSEId
}

export interface ResetResponse {
    status:                             types.ResetStatus
    statusInfo?:                        complex.StatusInfo
}

