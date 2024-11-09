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
    idTag:                      types.IdToken
}

export interface AuthorizeResponse {
    idTagInfo:                  complex.IdTagInfo
}

export interface BootNotificationRequest {
    chargePointSerialNumber?:   string,
    chargePointModel:           string,
    chargeBoxSerialNumber?:     string,
    chargePointVendor:          string,
    firmwareVersion?:           string,
    iccid?:                     string,
    imsi?:                      string,
    meterSerialNumber?:         string
    meterType?:                 string,
}

export interface BootNotificationResponse {
    currentTime:                types.Timestamp,
    interval:                   types.Seconds,
    status:                     types.RegistrationStatus
}

export interface CancelReservationRequest {
    reservationId:              types.ReservationId
}

export interface CancelReservationResponse {
    status:                     types.CancelReservationStatus
}

export interface ChangeAvailabilityRequest {
    connectorId:                types.ConnectorId,
    type:                       types.AvailabilityType
}

export interface ChangeAvailabilityResponse {
    status:                     types.AvailabilityStatus
}

export interface ChangeConfigurationRequest {
    key:                        string,
    value:                      string
}

export interface ChangeConfigurationResponse {
    status:                     types.ConfigurationStatus
}

export interface ClearCacheRequest {
}

export interface ClearCacheResponse {
    status:                     types.ClearCacheStatus
}

export interface ClearChargingProfileRequest {
    id?:                        types.Integer,
    connectorId?:               types.ConnectorId,
    chargingProfilePurpose?:    types.ChargingProfilePurposeType,
    stackLevel?:                types.Integer
}

export interface ClearChargingProfileResponse {
    status:                     types.ClearChargingProfileStatus
}

export interface DataTransferRequest {
    vendorId:                   types.VendorId,
    messageId?:                 string,
                                // OCPP CSE: A string, JSON object, or JSON array
    data?:                      string | {[key: string]: any } | any[]
}

export interface DataTransferResponse {
    status:                     types.DataTransferStatus,
                                // OCPP CSE: A string, JSON object, or JSON array
    data?:                      string | {[key: string]: any } | any[]
}

export interface DiagnosticsStatusNotificationRequest {
    status:                     types.DiagnosticsStatus
}

export interface DiagnosticsStatusNotificationResponse {
}

export interface FirmwareStatusNotificationRequest {
    status:                     types.FirmwareStatus
}

export interface FirmwareStatusNotificationResponse {
}

export interface GetCompositeScheduleRequest {
    connectorId:                types.ConnectorId,
    duration:                   types.Seconds,
    chargingRateUnit?:          types.ChargingRateUnitType
}

export interface GetCompositeScheduleResponse {
    status:                     types.GetCompositeScheduleStatus,
    connectorId?:               types.ConnectorId,
    scheduleStart?:             types.Timestamp,
    chargingSchedule?:          complex.ChargingSchedule
}

export interface GetConfigurationRequest {
    key?:                       string[]
}

export interface GetConfigurationResponse {
    configurationKey?:          complex.KeyValue[]
    unknownKey?:                string[]
}

export interface GetDiagnosticsRequest {
    location:                   string,
    retries?:                   types.Integer,
    retryInterval?:             types.Seconds,
    startTime?:                 types.Timestamp,
    stopTime?:                  types.Timestamp
}

export interface GetDiagnosticsResponse {
    fileName?:                  string
}

export interface GetLocalListVersionRequest {
}

export interface GetLocalListVersionResponse {
    listVersion:                types.Integer
}

export interface HeartBeatRequest {
}

export interface HeartbeatResponse {
    currentTime:                types.Timestamp
}

export interface MeterValuesRequest {
    connectorId:                types.ConnectorId,
    transactionId:              types.TransactionId,
    meterValue:                 complex.MeterValue[]
}

export interface MeterValuesResponse {
}

export interface RemoteStartTransactionRequest {
    connectorId?:               types.ConnectorId,
    idTag:                      types.IdToken,
    chargingProfile?:           complex.ChargingProfile
}

export interface RemoteStartTransactionResponse {
    status:                     types.RemoteStartStopStatus
}

export interface RemoteStopTransactionRequest {
    transactionId:              types.TransactionId
}

export interface RemoteStopTransactionResponse {
    status:                     types.RemoteStartStopStatus
}

export interface ReserveNowRequest {
    connectorId:                types.ConnectorId,
    expiryDate:                 types.Timestamp,
    idTag:                      types.IdToken,
    parentIdTag?:               types.IdToken,
    reservationId:              types.ReservationId
}

export interface ReserveNowResponse {
    status:                     types.ReservationStatus
}

export interface ResetRequest {
    type:                       types.ResetType
}

export interface ResetResponse {
    status:                     types.ResetStatus
}

export interface SendLocalListRequest {
    listVersion:                types.Integer,
    localAuthorisationList:     complex.AuthorizationData[],
    updateType:                 types.UpdateType
}

export interface SendLocalListResponse {
    status:                     types.UpdateStatus
}

export interface SetChargingProfileRequest {
    connectorId:                types.ConnectorId,
    csChargingProfiles:         complex.ChargingProfile[]
}

export interface SetChargingProfileResponse {
    status:                     types.ChargingProfileStatus
}

export interface StartTransactionRequest {
    connectorId:                types.ConnectorId,
    idTag:                      types.IdToken,
    meterStart:                 types.MeteringValue,
    reservationId?:             types.ReservationId,
    timestamp:                  types.Timestamp
}

export interface StartTransactionResponse {
    idtagInfo:                  complex.IdTagInfo,
    transactionId:              types.TransactionId
}

export interface StatusNotificationRequest {
    connectorId:                types.ConnectorId,
    errorCode:                  types.ChargePointErrorCode,
    info?:                      string,
    status:                     types.ChargePointStatus,
    timestamp?:                 types.Timestamp,
    vendorId?:                  types.VendorId,
    vendorErrorCode?:           string;
}

export interface StatusNotificationResponse {
}

export interface StopTransactionRequest {
    idTag?:                     types.IdToken,
    meterStop:                  types.MeteringValue,
    timestamp:                  types.Timestamp,
    transactionId:              types.TransactionId,
    reason?:                    types.StopReason,
    transactionData?:           complex.MeterValue[]
}

export interface StopTransactionResponse {
    idTagInfo?:                 complex.IdTagInfo
}

export interface TriggerMessageRequest {
    requestedMessage:           types.MessageTrigger,
    connectorId?:               types.ConnectorId
}

export interface TriggerMessageResponse {
    status:                     types.TriggerMessageStatus
}

export interface UnlockConnectorRequest {
    connectorId:                types.ConnectorId
}

export interface UnlockConnectorResponse {
    status:                     types.UnlockStatus
}

export interface UpdateFirmwareRequest {
    location:                   string,
    retries?:                   types.Integer,
    retrieveDate?:              types.Timestamp,
    retryInterval?:             types.Seconds
}

export interface UpdateFirmwareResponse {
}



// Security Extensions

export interface CertificateSignedRequest {
    certificateChain:           string                                  // The signed PEM encoded X.509 certificates. This can also contain the
                                                                        // necessary sub CA certificates. The maximum size of this field is be limited by the
                                                                        // configuration key: CertificateSignedMaxSize.
}

export interface CertificateSignedResponse {
    status:                     types.CertificateSignedStatus           // Returns whether certificate signing has been accepted, otherwise rejected.
}

export interface DeleteCertificateRequest {
    certificateHashData:        complex.CertificateHashData             // Indicates the certificate of which deletion is requested.
}

export interface DeleteCertificateResponse {
    status:                     types.DeleteCertificateStatus           // Charge Point indicates if it can process the request.
}

export interface ExtendedTriggerMessageRequest {
    requestedMessage:           types.MessageTrigger,                   // Type of the message to be triggered.
    connectorId?:               types.ConnectorId                       // The id of the connector for which the message should be sent.
}

export interface ExtendedTriggerMessageResponse {
    status:                     types.TriggerMessageStatus              // Indicates whether the Charge Point will send the requested notification or not.
}

export interface GetInstalledCertificateIdsRequest {
    certificateType:            types.CertificateUse                    // Indicates the type of certificates requested.
}

export interface GetInstalledCertificateIdsResponse {
    status:                     types.GetInstalledCertificateStatus,    // Charge Point indicates if it can process the request.
    certificateHashData?:       complex.CertificateHashData[]           // The Charge Point includes the Certificate information for each available certificate.
}

export interface GetLogRequest {
    logType:                    types.LogType,                          // This contains the type of log file that the Charge Point should send.
    requestId:                  types.RequestId,                        // The Id of this request.
    retries?:                   types.Integer,                          // This specifies how many times the Charge Point must try to upload the log before giving up.
                                                                        // If this field is not present, it is left to Charge Point to decide how many times it wants to retry.
    retryInterval?:             types.Seconds,                          // The interval in seconds after which a retry may be attempted. If this field is not present,
                                                                        // it is left to Charge Point to decide how long to wait between attempts.
    log:                        complex.LogParameters                   // This field specifies the requested log and the location to which the log should be sent.
}

export interface GetLogResponse {
    status:                     types.LogStatus,                        // This field indicates whether the Charge Point was able to accept the request.
    filename?:                  string                                  // This contains the name of the log file that will be uploaded.
                                                                        // This field is not present when no logging information is available.
}

export interface InstallCertificateRequest {
    certificateType:            types.CertificateUse,                   // Indicates the certificate type that is sent.
    certificate:                string                                  // An PEM encoded X.509 certificate.
}

export interface InstallCertificateResponse {
    status:                     types.CertificateStatus                 // Charge Point indicates if installation was successful.
}

export interface LogStatusNotificationRequest {
    status:                     types.UploadLogStatus,                  // This contains the status of the log upload.
    requestId:                  types.RequestId                         // The request id that was provided in the GetLog.req that started this log upload.
}

export interface LogStatusNotificationResponse {
}

export interface SecurityEventNotificationRequest {
    type:                       types.SecurityEvent,                    // Type of the security event (See list of currently known security events)
    timestamp:                  types.Timestamp,                        // Date and time at which the event occurred.
    techInfo?:                  string                                  // Additional information about the occurred security event.
}

export interface SecurityEventNotificationResponse {
}

export interface SignCertificateRequest {
    csr:                        string                                  // The Charge Point SHALL send the public key in form of a Certificate Signing Request (CSR)
                                                                        // as described in RFC 2986 [14] and then PEM encoded, using the SignCertificate.req message.
}

export interface SignCertificateResponse {
    status:                     types.GenericStatus                     // Specifies whether the Central System can process the request.
}

export interface SignedFirmwareStatusNotificationRequest {
    status:                     types.FirmwareStatus,                   // This contains the progress status of the firmware installation.
    requestId:                  types.RequestId,                        // The request id that was provided in the SignedUpdateFirmware.req that started this firmware update.
                                                                        // This field is mandatory, unless the message was triggered by a TriggerMessage.req or the
                                                                        // ExtendedTriggerMessage.req AND there is no firmware update ongoing.
}

export interface SignedFirmwareStatusNotificationResponse {
}

export interface SignedUpdateFirmwareRequest {
    retries?:                   types.Integer,                          // This specifies how many times Charge Point must try to download the firmware before giving up.
                                                                        // If this field is not present, it is left to Charge Point to decide how many times it wants to retry.
    retryInterval?:             types.Seconds,                          // The interval in seconds after which a retry may be attempted. If this field is not present,
                                                                        // it is left to Charge Point to decide how long to wait between attempts.
    requestId:                  types.RequestId,                        // The Id of this request.
    firmware:                   complex.Firmware,                       // Specifies the firmware to be updated on the Charge Point.
}

export interface SignedUpdateFirmwareResponse {
    status:                     types.UpdateFirmwareStatus              // This field indicates whether the Charge Point was able to accept the request.
}
