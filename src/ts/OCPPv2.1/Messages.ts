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


export interface AuthorizeRequest {
    idToken:                            complex.IdToken,
    certificate?:                       types.  Certificate,
    iso15118CertificateHashData?:       complex.OCSPRequestData[],
    customData?:                        complex.ICustomData
}

export interface BootNotificationRequest {
    chargingStation:                    complex.ChargingStation,
    reason:                             types.  BootReason,
    customData?:                        complex.ICustomData
}

export interface ClearedChargingLimitRequest {
    chargingLimitSource:                types.  ChargingLimitSource,
    evseId?:                            types.  EVSEId,
    customData?:                        complex.ICustomData
}

export interface DataTransferRequest {
    vendorId:                           types.  VendorId,
    messageId?:                         string,
    data?:                              any,
    customData?:                        complex.ICustomData
}

export interface FirmwareStatusNotificationRequest {
    status:                             types.  FirmwareStatus,
    requestId?:                         types.  RequestId,
    customData?:                        complex.ICustomData
}

export interface Get15118EVCertificateRequest {
    iso15118SchemaVersion:              types.  ISO15118SchemaVersion,
    action:                             types.  CertificateAction,
    exiRequest:                         types.  EXIData,
    maximumContractCertificateChains?:  types.  Integer,
    prioritizedEMAIDs?:                 types.  EMAId[],
    customData?:                        complex.ICustomData
}

export interface GetCertificateStatusRequest {
    ocspRequestData:                    complex.OCSPRequestData,
    customData?:                        complex.ICustomData
}

export interface GetCRLRequest {
    requestId:                          types.  RequestId,
    certificateHashData:                complex.CertificateHashData,
    customData?:                        complex.ICustomData
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







export interface ChangeAvailabilityRequest {
    operationalStatus:          types.OperationalStatus,
    evse?:                      complex.EVSE
}

export interface ChangeAvailabilityResponse {
    status:                     types.ChangeAvailabilityStatus,
    statusInfo?:                complex.StatusInfo
}



export interface ResetRequest {
    type:                       types.ResetType
    evseId?:                    types.EVSEId
}

export interface ResetResponse {
    status:                     types.ResetStatus
    statusInfo?:                complex.StatusInfo
}

