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

import * as exp from 'constants';
import * as types from './Types';


export interface AuthorizationData {
    idTag:                      types.IdToken,                    // The identifier to which this authorization applies.
    idTagInfo?:                 IdTagInfo                         // This contains information about authorization status, expiry and parent id.
                                                                  // For a Differential update the following applies: If this element is present, then this entry SHALL be
                                                                  // added or updated in the Local Authorization List. If this element is absent, than the entry for this
                                                                  // idtag in the Local Authorization List SHALL be deleted.
                                                                  // (Required when UpdateType is Full)
}

export interface ChargingProfile {
    chargingProfileId:          types.ChargingProfileId,          // Unique identifier for this profile.
    transactionId?:             types.TransactionId,              // Only valid if ChargingProfilePurpose is set to TxProfile, the transactionId MAY be used to match the profile to a specific transaction.
    stackLevel:                 number,                           // Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values. Lowest level is 0.
    chargingProfilePurpose:     types.ChargingProfilePurposeType, // Defines the purpose of the schedule transferred by this message.
    chargingProfileKind?:       types.ChargingProfileKindType,    // Indicates the kind of schedule.
    recurrencyKind?:            types.RecurrencyKindType,         // Indicates the start point of a recurrence.
    validFrom?:                 types.Timestamp,                  // Point in time at which the profile starts to be valid. If absent, the profile is valid as soon as it is received by the Charge Point.
    validTo?:                   types.Timestamp,                  // Point in time at which the profile stops to be valid. If absent, the profile is valid until it is replaced by another profile.
    chargingSchedule:           ChargingSchedule                  // Contains limits for the available power or current over time.
}

/**
 * Charging schedule structure defines a list of charging periods, as used in: GetCompositeSchedule.conf and ChargingProfile.
 */
export interface ChargingSchedule {
    duration?:                  number,                           // Duration of the charging schedule in seconds.
                                                                  // If the duration is left empty, the last period will continue indefinitely or until
                                                                  // end of the transaction in case startSchedule is absent.
    startSchedule?:             types.Timestamp,                  // Starting point of an absolute schedule. If absent the schedule will be relative to start of charging.
    chargingRateUnit:           types.ChargingRateUnitType,       // The unit of measure Limit is expressed in
    chargingSchedulePeriod:     ChargingSchedulePeriod[],         // List of ChargingSchedulePeriod elements defining maximum power or current usage over time.
                                                                  // The startSchedule of the first ChargingSchedulePeriod SHALL always be 0.
    minChargingRate?:           number                            // Minimum charging rate supported by the electric vehicle. The unit of measure is defined by the chargingRateUnit.
                                                                  // This parameter is intended to be used by a local smart charging algorithm to optimize the power allocation for
                                                                  // in the case a charging process is inefficient at lower charging rates. Accepts at most one digit fraction (e.g. 8.1)
}

/**
 * Charging schedule period structure defines a time period in a charging schedule, as used in: ChargingSchedule.
 */
export interface ChargingSchedulePeriod {
    startPeriod:                number,                           // Start of the period, in seconds from the start of schedule.
                                                                  // The value of StartPeriod also defines the stop time of the previous period.
    limit:                      number,                           // Charging rate limit during the schedule period, in the applicable chargingRateUnit,
                                                                  // for example in Amperes or Watts. Accepts at most one digit fraction (e.g. 8.1).
    numberPhases?:              number                            // The number of phases that can be used for charging. If a number of phases is needed,
                                                                  // numberPhases=3 will be assumed unless another number is given.
}

/**
 * Contains status information about an identifier. It is returned in Authorize, Start Transaction and Stop Transaction responses.
 * If expiryDate is not given, the status has no end date.
 */
export interface IdTagInfo {
    expiryDate?:                types.Timestamp,                  // This contains the date at which idTag should be removed from the Authorization Cache.
    parentIdTag?:               types.IdToken,                    // This contains the parent-identifier.
    status:                     types.AuthorizationStatus         // This contains whether the idTag has been accepted or not by the Central System.
}

/**
 * Represents a configuration key in `GetConfiguration.conf`.
 */
export interface KeyValue {
    key:                        string                            // CiString50
    readonly:                   boolean                           // False if the value can be set with the ChangeConfiguration message.
    value?:                     string                            // If key is known but not set, this field may be absent. CiString500
}

/**
 * Represents a collection of one or more sampled values in `MeterValues.req` and `StopTransaction.req`.
 * All sampled values in a `MeterValue` are measured at the same point in time.
 */
export interface MeterValue {
    timestamp:                  types.Timestamp,
    sampledValue:               SampledValue[]
}

/**
 * Represents a single measured value in a `MeterValue`.
 */
export interface SampledValue {
    value:                      string,
    context?:                   types.ReadingContext,
    format?:                    types.ValueFormat,
    measurand?:                 types.Measurand,
    phase?:                     types.Phase,
    location?:                  types.MeteringLocation,
    unit?:                      types.UnitOfMeasure
}

/**
 * Represents hash data of a certificate in `DeleteCertificate.req`, `GetInstalledCertificateIds.conf`.
 */
export interface CertificateHashData {
    hashAlgorithm:              types.HashAlgorithm,            // Used algorithms for the hashes provided.
    issuerNameHash:             string,                         // The hash of the issuer’s distinguished name (DN), that must be calculated over the DER encoding of the issuer’s name field
                                                                // in the certificate being checked. The hash is represented in hexbinary format (i.e. each byte is represented by 2 hexadecimal digits).
                                                                // Please refer to the OCSP specification: RFC 6960.
    issuerKeyHash:              string,                         // The hash of the DER encoded public key: the value (excluding tag and length) of the subject public key field in the
                                                                // issuer’s certificate. The hash is represented in hexbinary format (i.e. each byte is represented by 2 hexadecimal digits).
    serialNumber:               string                          // The serial number as a hexadecimal string without leading zeroes (and without the prefix 0x).
                                                                // For example: the serial number with decimal value 4095 will be represented as “FFF”.
                                                                // Please note: The serial number of a certificate is a non-negative integer of at most 20 bytes. Since this is too large
                                                                // to be handled as a number in many system, it is represented as a string that contains the hexadecimal representation
                                                                // of this number. The string shall not have any leading zeroes.
}

/**
 * Represents a copy of the firmware that can be loaded/updated on the Charge Point.
 */
export interface Firmware {
    location:                   string,                         // URI defining the origin of the firmware.
    retrieveDateTime:           types.Timestamp,                // Date and time at which the firmware shall be retrieved.
    installDateTime?:           types.Timestamp,                // Date and time at which the firmware shall be installed.
    signingCertificate:         string,                         // Certificate with which the firmware was signed. PEM encoded X.509 certificate.
    signature:                  string                          // Base64 encoded firmware signature.
}

/**
 * Represents detailed information the retrieval of logging entries.
 */
export interface LogParameters {
    remoteLocation:             string,                         // The URL of the location at the remote system where the log should be stored.
    oldestTimestamp?:           types.Timestamp,                // This contains the date and time of the oldest logging information to include in the diagnostics.
    latestTimestamp?:           types.Timestamp                 // This contains the date and time of the latest logging information to include in the diagnostics.
}
