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

import * as types from './Types';


export interface ICustomData {
    vendorId:                           types.VendorId,                   // Vendor identification.
    [key: string]:                      any                                 // Vendor specific data.
}

export interface AbsolutePriceSchedule {
    timeAnchor:                         types.Timestamp,                    // Starting point of price schedule.
    priceScheduleID:                    types.PriceScheduleId,              // Unique ID of price schedule
    priceScheduleDescription?:          string,                             // Description of the price schedule.
    currency:                           types.Currency,                     // Currency according to ISO 4217.
    language:                           types.Language,                     // String that indicates what language is used for the human readable strings in the price schedule.
                                                                            // Based on ISO 639.
    priceAlgorithm:                     string,                             // A string in URN notation which shall uniquely identify an algorithm that defines how to compute
                                                                            // an energy fee sum for a specific power profile based on the EnergyFee information from the
                                                                            // PriceRule elements.
    priceRuleStacks:                    Array<PriceRuleStack>,              // A set of pricing rules for parking and energy costs.
    taxRules?:                          Array<TaxRule>,                     // Describes the applicable tax rule(s) for this price schedule.
    additionalSelectedServices?:        Array<AdditionalSelectedService>,   // A set of prices for optional services (e.g. valet, carwash).
    overstayRuleList?:                  OverstayRuleList,                   // A set of overstay rules that allows for escalation of charges after the overstay is triggered.
    minimumCost?:                       RationalNumber,                     // Minimum amount to be billed for the overall charging session (e.g. including energy, parking, and overstay).
    maximumCost?:                       RationalNumber,                     // Maximum amount to be billed for the overall charging session (e.g. including energy, parking, and overstay).
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ACChargingParameters {
    energyAmount:                       types.WattHour,                   // Amount of energy requested (in Wh). This includes energy required for preconditioning.
                                                                            // Relates to: ISO 15118-2:  AC_EVChargeParameterType:               EAmount
                                                                            //             ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: EVTargetEnergyRequest
    evMinCurrent:                       types.Ampere,                   // Minimum current (amps) supported by the electric vehicle (per phase).
                                                                            // Relates to: ISO 15118-2:  AC_EVChargeParameterType: EVMinCurrent
    evMaxCurrent:                       types.Ampere,                   // Maximum current (amps) supported by the electric vehicle (per phase). Includes cable capacity.
                                                                            // Relates to: ISO 15118-2:  AC_EVChargeParameterType: EVMaxCurrent
    evMaxVoltage:                       types.Volt,                    // Maximum voltage supported by the electric vehicle.
                                                                            // Relates to: ISO 15118-2:  AC_EVChargeParameterType: EVMaxVoltage
    customData?:                        ICustomData                         // Customer specific data.
}

export interface AdditionalInfo {
    additionalIdToken:                  types.IdToken,                    // (2.1) This field specifies the additional IdToken.
    type:                               string,                             // additionalInfo can be used to send extra information to CSMS in addition to the regular
                                                                            // authorization with IdToken. AdditionalInfo contains one or more custom types, which need
                                                                            // to be agreed upon by all parties involved. When the type is not supported, the
                                                                            // CSMS/Charging Station MAY ignore the additionalInfo.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface AdditionalSelectedService {
    serviceName:                        string,                             // Human readable string to identify this service.
    serviceFee:                         RationalNumber,                     // Cost of the service.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface Address {
    name?:                              string,                             // Name of person/company
    address1?:                          string,                             // Address line 1
    address2?:                          string,                             // Address line 2
    city?:                              string,                             // City
    postalCode?:                        types.PostalCode,                   // Postal code
    country?:                           string,                             // Country name
    customData?:                        ICustomData                         // Customer specific data.
}

export interface APN {
    apn:                                string,                             // The Access Point Name as an URL.
    apnUserName?:                       string,                             // APN username.
    apnPassword?:                       string,                             // APN Password.
    simPin?:                            types.Integer,                      // SIM card pin code.
    preferredNetwork?:                  string,                             // Preferred network, written as MCC and MNC concatenated.
    useOnlyPreferredNetwork?:           boolean,                            // Default: false. Use only the preferred Network, do not dial in when not available.
    apnAuthentication:                  types.APNAuthentication,            // Authentication method.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface AuthorizationData {
    idToken:                            types.IdToken,                      // This contains the identifier which needs to be stored for authorization.
    idTokenInfo?:                       IdToken,                            // This contains information about authorization status, expiry and group id. For a Differential update
                                                                            // the following applies: If this element is present, then this entry SHALL be added or updated in the
                                                                            // Local Authorization List. If this element is absent, the entry for this IdToken in the Local
                                                                            // Authorization List SHALL be deleted.
                                                                            // (Required when UpdateType is Full)
    customData?:                        ICustomData                         // Customer specific data.
}

export interface BatteryData {
    evseId:                             types.EVSEId,                       // Slot number where battery is inserted or removed.
    serialNumber:                       string,                             // Serial number of the battery.
    SoC:                                types.Percentage,                   // State of charge of the battery.
    SoH:                                types.Percentage,                   // State of health of the battery.
    productionDate?:                    types.Timestamp,                    // Date of production of the battery.
    vendorInfo?:                        string,                             // Vendor-specific info from battery in undefined format.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface CertificateHashDataChain {
    certificateType:                    types.GetCertificateIdUse,          // Indicates the type of the requested certificate(s).
    certificateHashData:                CertificateHashData,                // Information to identify a certificate.
    childCertificateHashData:           Array<CertificateHashData>,         // Information to identify the child certificate(s).
    customData?:                        ICustomData                         // Customer specific data.
}

export interface CertificateHashData {
    hashAlgorithm:                      types.HashAlgorithm,                // Used algorithms for the hashes provided.
    issuerNameHash:                     string,                             // The hash of the issuer’s distinguished name (DN), that must be calculated over the DER encoding
                                                                            // of the issuer’s name field in the certificate being checked.
    issuerKeyHash:                      string,                             // The hash of the DER encoded public key: the value (excluding tag and length) of the subject
                                                                            // public key field in the issuer’s certificate.
    serialNumber:                       string,                             // The string representation of the hexadecimal value of the serial number without the prefix "0x"
                                                                            // and without leading zeroes.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ChargingLimit {
    chargingLimitSource:                types.ChargingLimitSource,          // Represents the source of the charging limit.
                                                                            // Values defined in appendix as ChargingLimitSourceEnumStringType.
    isLocalGeneration?:                 boolean,                            // (2.1) True when the reported limit concerns local generation that is providing extra capacity,
                                                                            // instead of a limitation.
    isGridCritical?:                    boolean,                            // Indicates whether the charging limit is critical for the grid.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ChargingNeeds {
    requestedEnergyTransfer:            types.EnergyTransferMode,           // Mode of energy transfer requested by the EV.
    availableEnergyTransfer?:           Array<types.EnergyTransferMode>,    // (2.1) Modes of energy transfer that are marked as available by EV.
    controlMode?:                       types.ControlMode,                  // (2.1) Indicates whether EV wants to operate in Dynamic or Scheduled mode.
                                                                            // When absent, Scheduled mode is assumed for backwards compatibility.
                                                                            // ISO 15118-20: ServiceSelectionReq(SelectedEnergyTransferService)
    mobilityNeedsMode?:                 types.MobilityNeedsMode,            // (2.1) Value of EVCC indicates that EV determines min/target SOC and departure time.
                                                                            // A value of EVCC_SECC indicates that charging station or CSMS may also update min/target SOC and
                                                                            // departure time.
                                                                            // ISO 15118-20: ServiceSelectionReq(SelectedEnergyTransferService)
    departureTime?:                     types.Timestamp,                    // Estimated departure time of the EV.
                                                                            // ISO 15118-2:  AC/DC_EVChargeParameterType:            DepartureTime
                                                                            // ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: DepartureTime
    v2xChargingParameters?:             V2XChargingParameters,              // (2.1) The list of charging parameters that apply to an ISO 15118-20 session or any other session
                                                                            // that supports bidirectional charging.
    dcChargingParameters?:              DCChargingParameters,               // EV DC charging parameters
    acChargingParameters?:              ACChargingParameters,               // EV AC charging parameters
    evEnergyOffer?:                     EVEnergyOffer,                      // (2.1) Discharging and associated price offered by EV. Schedule periods during which EV is willing
                                                                            // to discharge have a negative value for power.
    derChargingParameters?:             DERChargingParameters,              // (2.1) Additional charging parameters for ISO 15118-20 AC bidirectional sessions with DER control
                                                                            // (AC_BPT_DER)
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ChargingPeriod {
    tariffId?:                          types.TariffId,                     // Unique identifier of the Tariff that was used to calculate cost. If not provided, then cost
                                                                            // was calculated by some other means.
    startPeriod:                        types.Timestamp,                    // Start timestamp of charging period. A period ends when the next period starts. The last
                                                                            // period ends when the session ends.
    dimensions:                         Array<CostDimension>,               // List of volume per cost dimension for this charging period.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ChargingProfileCriterion {
    chargingProfilePurpose?:            types.ChargingProfilePurpose,       // Defines the purpose of the schedule transferred by this profile.
    stackLevel?:                        types.Integer,                      // Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values.
                                                                            // Lowest level is 0.
    chargingProfileId?:                 Array<types.ChargingProfileId>,     // List of all the chargingProfileIds requested. Any ChargingProfile that matches one of these profiles will
                                                                            // be reported. If omitted, the Charging Station SHALL not filter on chargingProfileId. This field SHALL NOT
                                                                            // contain more ids than set in ChargingProfileEntries.maxLimit.
    chargingLimitSource?:               types.ChargingLimitSource,          // For which charging limit sources, charging profiles SHALL be reported.
                                                                            // If omitted, the Charging Station SHALL not filter on chargingLimitSource.
                                                                            // Values defined in Appendix as ChargingLimitSourceEnumStringType.
}

export interface ChargingProfile {
    id:                                 types.ChargingProfileId,            // Id of ChargingProfile. Unique within charging station. Id can have a negative value. This is
                                                                            // useful to distinguish charging profiles from an external actor (external constraints) from
                                                                            // charging profiles received from CSMS.
    stackLevel:                         types.Integer,                      // Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values.
                                                                            // Lowest level is 0.
    chargingProfilePurpose:             types.ChargingProfilePurpose,       // Defines the purpose of the schedule transferred by this profile.
    chargingProfileKind:                types.ChargingProfileKind,          // Indicates the kind of schedule.
    recurrencyKind?:                    types.RecurrencyKind,               // Indicates the start point of a recurrence.
    validFrom?:                         types.Timestamp,                    // Point in time at which the profile starts to be valid. If absent, the profile is valid as soon
                                                                            // as it is received by the Charging Station.
    validTo?:                           types.Timestamp,                    // Point in time at which the profile stops to be valid. If absent, the profile is valid until it
                                                                            // is replaced by another profile.
    transactionId?:                     types.TransactionId,                // SHALL only be included if ChargingProfilePurpose is set to TxProfile in a SetChargingProfileRequest.
                                                                            // The transactionId is used to match the profile to a specific transaction.
    maxOfflineDuration?:                types.Seconds,                      // (2.1) Period in seconds that this charging profile remains valid after the Charging Station has
                                                                            // gone offline. After this period the charging profile permanently becomes invalid and Charging
                                                                            // Station reverts back to a valid profile with a lower stack level. A value of 0 or no value means
                                                                            // that no timeout applies and the charging profile is valid when offline.
    stopAfterOffline?:                  boolean,                            // (2.1) When set to true this charging profile will not be valid anymore after being offline for
                                                                            // more than maxOfflineDuration. When absent defaults to false.
    updateInterval?:                    types.Seconds,                      // (2.1) Interval in seconds after receipt of last update, when to request a profile update by
                                                                            // sending a PullDynamicScheduleUpdateRequest message. A value of 0 or no value means that no
                                                                            // update interval applies. Only relevant in a dynamic charging profile.
    dynUpdateTime?:                     types.Timestamp,                    // (2.1) Time at which limits or setpoints in this charging profile were last updated by a
                                                                            // PullDynamicScheduleUpdateRequest or UpdateDynamicScheduleRequest or by an external actor.
                                                                            // Only relevant in a dynamic charging profile.
    priceScheduleSignature?:            string,                             // (2.1) ISO 15118-20 signature for all price schedules in chargingSchedules.
                                                                            // Note: For 256-bit elliptic curves (like secp256k1) the ECDSA signature is 512 bits (64 bytes)
                                                                            //       and for 521-bit curves (like secp521r1) the signature is 1042 bits. This equals 131 bytes,
                                                                            //       which can be encoded as base64 in 176 bytes.
    chargingSchedule:                   Array<ChargingSchedule>,            // Schedule that contains limits for the available power or current over time. In order to support
                                                                            // ISO 15118 schedule negotiation, it supports at most three schedules with associated tariff to
                                                                            // choose from. Having multiple chargingSchedules is only allowed for charging profiles of purpose
                                                                            // TxProfile in the context of an ISO 15118 charging session. For ISO 15118 Dynamic Control Mode
                                                                            // only one chargingSchedule shall be provided.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface ChargingSchedulePeriod {
    startPeriod:                        types.Integer,                  // Start of the period, in seconds from the start of schedule.
                                                                        // The value of StartPeriod also defines the stop time of the previous period.
    limit?:                             types.Decimal,                  // Optional only when not required by the operationMode, as in CentralSetpoint, ExternalSetpoint,
                                                                        // ExternalLimits, LocalFrequency, LocalLoadBalancing. Charging rate limit during the schedule period,
                                                                        // in the applicable chargingRateUnit. This SHOULD be a nonnegative value; a negative value is only
                                                                        // supported for backwards compatibility with older systems that use a negative value to specify a
                                                                        // discharging limit. For AC this field represents the sum of all phases, unless values are provided
                                                                        // for L2 and L3, in which case this field represents phase L1.
    limit_L2?:                          types.Decimal,                  // (2.1) Charging rate limit on phase L2 in the applicable chargingRateUnit.
    limit_L3?:                          types.Decimal,                  // (2.1) Charging rate limit on phase L3 in the applicable chargingRateUnit.
    numberPhases?:                      types.Integer,                  // The number of phases that can be used for charging.
                                                                        // For a DC EVSE this field should be omitted.
                                                                        // For an AC EVSE a default value of numberPhases = 3 will be assumed if the field is absent.
    phaseToUse?:                        types.Integer,                  // Values: 1..3, Used if numberPhases=1 and if the EVSE is capable of switching the phase connected
                                                                        // to the EV, i.e. ACPhaseSwitchingSupported is defined and true.
                                                                        // It’s not allowed unless both conditions above are true.
                                                                        // If both conditions are true, and phaseToUse is omitted, the Charging Station / EVSE will make the
                                                                        // selection on its own.
    dischargeLimit?:                    types.Decimal,                  // (2.1) Limit in chargingRateUnit that the EV is allowed to discharge with.
                                                                        // Note, these are negative values in order to be consistent with setpoint, which can be positive
                                                                        // and negative.
                                                                        // For AC this field represents the sum of all phases, unless values are provided for L2 and L3,
                                                                        // in which case this field represents phase L1.
    dischargeLimit_L2?:                 types.Decimal,                  // (2.1) Limit in chargingRateUnit on phase L2 that the EV is allowed to discharge with.
    dischargeLimit_L3?:                 types.Decimal,                  // (2.1) Limit in chargingRateUnit on phase L3 that the EV is allowed to discharge with.
    setpoint?:                          types.Decimal,                  // (2.1) Setpoint in chargingRateUnit that the EV should follow as close as possible.
                                                                        // Use negative values for discharging.
                                                                        // When a limit and/or dischargeLimit are given the overshoot when following setpoint must remain within
                                                                        // these values. This field represents the sum of all phases, unless values are provided for L2 and L3,
                                                                        // in which case this field represents phase L1.
    setpoint_L2?:                       types.Decimal,                  // (2.1) Setpoint in chargingRateUnit that the EV should follow on phase L2 as close as possible.
    setpoint_L3?:                       types.Decimal,                  // (2.1) Setpoint in chargingRateUnit that the EV should follow on phase L3 as close as possible.
    setpointReactive?:                  types.Decimal,                  // (2.1) Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow as
                                                                        // closely as possible. Positive values for inductive, negative for capacitive reactive power or current.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
    setpointReactive_L2?:               types.Decimal,                  // (2.1) Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow on phase
                                                                        // L2 as closely as possible.
    setpointReactive_L3?:               types.Decimal,                  // (2.1) Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow on phase
                                                                        // L3 as closely as possible.
    preconditioningRequest?:            boolean,                        // (2.1) If true, the EV should attempt to keep the BMS preconditioned for this time interval.
    operationMode?:                     types.OperationMode,            // (2.1) Charging operation mode to use during this time interval. When absent defaults to ChargingOnly.
    evseSleep?:                         boolean,                        // (2.1) Of true, the EVSE must turn off power electronics/modules associated with this transaction.
                                                                        // Default value when absent is false.
    v2xBaseline?:                       types.Decimal,                  // (2.1) Power value that, when present, is used as a baseline on top of which values from
                                                                        // v2xFreqWattCurve and v2xSignalWattCurve are added.
    v2xFreqWattCurve?:                  Array<V2XFreqWattPoint>,        // (2.1) Only required when operationMode = LocalFrequency. When used it must contain at least
                                                                        // two coordinates to specify a power-frequency table to use during this period. The table determines
                                                                        // the value of setpoint power for a given frequency. chargingRateUnit must be W for LocalFrequency
                                                                        // control.
    v2xSignalWattCurve?:                Array<V2XSignalWattPoint>,      // (2.1) Only used, but not required, when operationMode = LocalFrequency. When used it must
                                                                        // contain at least two coordinates to specify a signalfrequency curve to use during this period.
                                                                        // The curve determines the value of setpoint power for a given signal.
                                                                        // chargingRateUnit must be W for LocalFrequency control.
    customData?:                        ICustomData
}

export interface ChargingSchedule {
    id:                                 types.ChargingScheduleId,       // Id of the schedule. Ids are unique within a ChargingProfile.
    startSchedule?:                     types.Timestamp,                // Starting point of an absolute schedule or recurring schedule.
    duration?:                          types.Integer,                  // Duration of the charging schedule in seconds. If the duration is left empty, the last period will
                                                                        // continue indefinitely or until end of the transaction in case startSchedule is absent.
    chargingRateUnit:                   types.ChargingRateUnit,         // The unit of measure in which limits and setpoints are expressed.
    minChargingRate?:                   number,                         // Minimum charging rate supported by the EV. The unit of measure is defined by the chargingRateUnit.
                                                                        // This parameter is intended to be used by a local smart charging algorithm to optimize the power
                                                                        // allocation for in the case a charging process is inefficient at lower charging rates.
    powerTolerance?:                    number,                         // (2.1) Power tolerance when following EVPowerProfile.
    signatureId?:                       types.Integer,                  // (2.1) Id of this element for referencing in a signature.
    digestValue?:                       string,                         // (2.1) Base64 encoded hash (SHA256 for ISO 15118-2, SHA512 for ISO 15118-20) of the EXI price
                                                                        // schedule element. Used in signature.
    useLocalTime?:                      boolean,                        // (2.1) Defaults to false. When true, disregard time zone offset in dateTime fields of
                                                                        // ChargingScheduleType and use unqualified local time at Charging Station instead. This allows the
                                                                        // same Absolute or Recurring charging profile to be used in both summer and winter time.
    randomizedDelay?:                   types.Integer,                  // (2.1) Defaults to 0. When randomizedDelay not equals zero, then the start of each
                                                                        // ChargingSchedulePeriodType is delayed by a randomly chosen number of seconds between 0 and
                                                                        // randomizedDelay. Only allowed for TxProfile and TxDefaultProfile.
    salesTariff?:                       SalesTariff,                    // Sales tariff for charging associated with this schedule.
    chargingSchedulePeriod:             Array<ChargingSchedulePeriod>,  // List of ChargingSchedulePeriod elements defining maximum power or current usage over time.
                                                                        // The maximum number of periods, that is supported by the Charging Station, if less than 1024, is set
                                                                        // by device model variable SmartChargingCtrlr.PeriodsPerSchedule.
    absolutePriceSchedule?:             AbsolutePriceSchedule,          // (2.1) The ISO 15118-20 absolute price schedule.
    priceLevelSchedule?:                PriceLevelSchedule,             // (2.1) The ISO 15118-20 price level schedule.
    limitBeyondSoC?:                    LimitBeyondSoC,                 // When present and SoC of EV is greater than or equal to soc, then charging limit or setpoint will be
                                                                        // capped to the value of limit.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface ChargingScheduleUpdate {
    limit?:                             types.Decimal,                  // Only optional when not required by the operationMode, as in CentralSetpoint, ExternalSetpoint,
                                                                        // ExternalLimits, LocalFrequency, LocalLoadBalancing. Charging rate limit during the schedule period,
                                                                        // in the applicable chargingRateUnit. This SHOULD be a nonnegative value; a negative value is only
                                                                        // supported for backwards compatibility with older systems that use a negative value to specify a
                                                                        // discharging limit. For AC this field represents the sum of all phases, unless values are provided
                                                                        // for L2 and L3, in which case this field represents phase L1.
    limit_L2?:                          types.Decimal,                  // Charging rate limit on phase L2 in the applicable chargingRateUnit.
    limit_L3?:                          types.Decimal,                  // Charging rate limit on phase L3 in the applicable chargingRateUnit.
    dischargeLimit?:                    types.Decimal,                  // Limit in chargingRateUnit that the EV is allowed to discharge with. Note, these are negative
                                                                        // values in order to be consistent with setpoint, which can be positive and negative.
                                                                        // For AC this field represents the sum of all phases, unless values are provided for L2 and L3,
                                                                        // in which case this field represents phase L1.
    dischargeLimit_L2?:                 types.Decimal,                  // Limit in chargingRateUnit on phase L2 that the EV is allowed to discharge with.
    dischargeLimit_L3?:                 types.Decimal,                  // Limit in chargingRateUnit on phase L3 that the EV is allowed to discharge with.
    setpoint?:                          types.Decimal,                  // Setpoint in chargingRateUnit that the EV should follow as close as possible. Use negative values
                                                                        // for discharging. When a limit and/or dischargeLimit are given the overshoot when following setpoint
                                                                        // must remain within these values. This field represents the sum of all phases, unless values are
                                                                        // provided for L2 and L3, in which case this field represents phase L1.
    setpoint_L2?:                       types.Decimal,                  // Setpoint in chargingRateUnit that the EV should follow on phase L2 as close as possible.
    setpoint_L3?:                       types.Decimal,                  // Setpoint in chargingRateUnit that the EV should follow on phase L3 as close as possible.
    setPointReactive?:                  types.Decimal,                  // Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow as closely as
                                                                        // possible. Positive values for inductive, negative for capacitive reactive power or current.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
    setpointReactive_L2?:               types.Decimal,                  // Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow on phase L2
                                                                        // as closely as possible.
    setpointReactive_L3?:               types.Decimal,                  // Setpoint for reactive power (or current) in chargingRateUnit that the EV should follow on phase L3
                                                                        // as closely as possible.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface ChargingStation {
    serialNumber?:                      string,                         // Vendor-specific device identifier.
    model:                              string,                         // Defines the model of the device.
    vendorName:                         string,                         // Identifies the vendor (not necessarily in a unique manner).
    firmwareVersion?:                   string,                         // This contains the firmware version of the Charging Station.
    modem?:                             Modem,                          // Defines the functional parameters of a communication link.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface ClearChargingProfile {
    evseId?:                            types.EVSEId,                   // Specifies the id of the EVSE for which to clear charging profiles. An evseId of zero (0) specifies the
                                                                        // charging profile for the overall Charging Station. Absence of this parameter means the clearing applies
                                                                        // to all charging profiles that match the other criteria in the request.
    chargingProfilePurpose?:            types.ChargingProfilePurpose,   // Specifies to purpose of the charging profiles that will be cleared, if they meet the other criteria in the request.
    stackLevel?:                        types.Integer,                  // Specifies the stackLevel for which charging profiles will be cleared, if they meet the other criteria in the request.
}

export interface ClearMonitoringResult {
    status:                             types.ClearMonitoringStatus,    // Result of the clear request for this monitor, identified by its Id.
    id:                                 types.MonitoringId,             // Id of the monitor of which a clear was requested.
    statusInfo?:                        StatusInfo                      // Element providing more information about the status.
}

export interface ClearTariffsResult {
    tariffId?:                          types.TariffId,                 // Id of tariff for which status is reported. If no tariffs were found, then this field is absent,
                                                                        // and status will be NoTariff.
    status:                             types.TariffStatus,             // Status of the operation.
    statusInfo?:                        StatusInfo                      // Additional status information.
}

export interface Component {
    name:                               string,                         // Name of the component. Name should be taken from the list of standardized component names whenever
                                                                        // possible. Case Insensitive. strongly advised to use Camel Case.
    instance?:                          string,                         // Name of instance in case the component exists as multiple instances. Case Insensitive.
                                                                        // Strongly advised to use Camel Case.
    evse?:                              EVSE,                           // Specifies the EVSE when component is located at EVSE level, also specifies the connector when
                                                                        // component is located at Connector level.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface ComponentVariable {
    component:                          Component,                      // Component for which a report of Variable is requested.
    variable?:                          Variable,                       // Variable for which the report is requested.
}

export interface CompositeSchedule {
    evseId:                             types.EVSEId,                   // The id of the EVSE for which the composite schedule is requested.
    duration:                           types.Seconds,                  // The duration of the composite schedule in seconds.
    scheduleStart:                      types.Timestamp,                // The start time of the composite schedule.
    chargingRateUnit:                   types.ChargingRateUnit,         // The unit of measure for the charging rate.
    chargingSchedulePeriod:             Array<ChargingSchedulePeriod>,  // List of ChargingSchedulePeriod elements defining maximum power or current over time.
}

export interface ConstantStreamData {
    id:                                 types.StreamId,                 // Uniquely identifies the stream.
    variableMonitoringId:               types.VariableMonitoringId,     // Id of monitor used to report his event. It can be a preconfigured or hardwired monitor.
    params:                             PeriodicEventStreamParams       // Parameters for the stream.
}

export interface ConsumptionCost {
    startValue:                         types.Decimal,                  // The lowest level of consumption that defines the starting point of this consumption block.
                                                                        // The block interval extends to the start of the next interval.
    cost:                               Array<Cost>,                    // This field contains the cost details.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface CostDetails {
    failureToCalculate?:                boolean,                        // If set to true, then Charging Station has failed to calculate the cost.
    failureReason?:                     string,                         // Optional human-readable reason text in case of failure to calculate.
    chargingPeriods?:                   Array<ChargingPeriod>,          // List of Charging Periods that make up this charging session. A finished session has of 1 or
                                                                        // more periods, where each period has a different list of dimensions that determined the price.
                                                                        // When sent as a running cost update during a transaction chargingPeriods are omitted.
    totalCost:                          TotalCost,                      // Total sum of all the costs of this transaction in the specified currency.
    totalUsage:                         TotalUsage,                     // Total usage of energy and time.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface CostDimension {
    type:                               types.CostDimensionType,        // Type of cost dimension: energy, power, time, etc.
    volume:                             types.Decimal                   // Volume of the dimension consumed, measured according to the dimension type.
}

export interface Cost {
    costKind:                           types.CostKind,                 // The kind of cost referred to in the message element amount.
    amount:                             types.Integer,                  // The estimated or actual cost per kWh.
    amountMultiplier?:                  types.Integer,                  // Values: -3..3, The amountMultiplier defines the exponent to base 10 (dec).
                                                                        // The final value is determined by: amount * 10 ^ amountMultiplier.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface DCChargingParameters {
    evMaxCurrent:                       types.Ampere,                 // Maximum current (in A) supported by the electric vehicle. Includes cable capacity.
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               EVMaximumCurrentLimit
                                                                        //             ISO 15118-20: DC_CPDReqEnergyTransferModeType:        EVMaximumChargeCurrent
    evMaxVoltage:                       types.Volt,                  // Maximum voltage supported by the electric vehicle.
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               EVMaximumVoltageLimit
                                                                        //             ISO 15118-20: DC_EVChargeParameterType:               EVMaximumVoltage
    evMaxPower?:                        types.Watt,                     // Maximum power (in W) supported by the electric vehicle. Required for DC charging.
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               EVMaximumPowerLimit
                                                                        //             ISO 15118-20: DC_CPDReqEnergyTransferModeType:        EVMaximumChargePower
    evEnergyCapacity?:                  types.WattHour,                 // Capacity of the electric vehicle battery (in Wh).
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               EVEnergyCapacity
    energyAmount?:                      types.WattHour,                 // Amount of energy requested (in Wh). This inludes energy required for preconditioning.
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               EVEnergyRequest
                                                                        //             ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: EVTargetEnergyRequest
    StateOfCharge?:                     types.Percentage,               // Energy available in the battery (in percent of the battery capacity)
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               DC_EVStatus: EVRESSSOC
    fullSoC?:                           types.Percentage,               // Percentage of SoC at which the EV considers the battery fully charged. (possible values: 0 - 100)
                                                                        // Relates to: ISO 15118-2:  DC_EVChargeParameterType:               FullSOC
                                                                        //             ISO 15118-20: DC_CPDReqEnergyTransferModeType:        TargetSOC
    bulkSoC?:                           types.Percentage,               // Percentage of SoC at which the EV considers a fast charging process to end.
                                                                        // (possible values: 0 - 100)
                                                                        // Relates to: ISO 15118-2: DC_EVChargeParameterType:                BulkSOC
    customData?:                        ICustomData                     // Customer specific data.
}

export interface DERChargingParameters {
    evSupportedDERControl?:             Array<types.DERControlType>     // DER control functions supported by EV.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: DERControlFunctions (bitmap)
    evOverExcitedMaxDischargePower?:    types.Watt,                     // Rated maximum injected active power by EV, at specified over-excited power factor
                                                                        // (overExcitedPowerFactor).
                                                                        // It can also be defined as the rated maximum discharge power at the rated minimum injected reactive
                                                                        // power value. This means that if the EV is providing reactive power support, and it is requested to
                                                                        // discharge at max power (e.g. to satisfy an EMS request), the EV may override the request and
                                                                        // discharge up to overExcitedMaximumDischargePower to meet the minimum reactive power requirements.
                                                                        // Corresponds to the WOvPF attribute in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVOverExcitedMaximumDischargePower
    evOverExcitedPowerFactor?:          types.Decimal,                  // EV power factor when injecting (over excited) the minimum reactive power.
                                                                        // Corresponds to the OvPF attribute in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVOverExcitedPowerFactor
    evUnderExcitedMaxDischargePower?:   types.Watt,                     // Rated maximum injected active power by EV supported at specified under-excited power factor
                                                                        // (EVUnderExcitedPowerFactor).
                                                                        // It can also be defined as the rated maximum dischargePower at the rated minimum absorbed reactive
                                                                        // power value. This means that if the EV is providing reactive power support, and it is requested to
                                                                        // discharge at max power (e.g. to satisfy an EMS request), the EV may override the request and
                                                                        // discharge up to underExcitedMaximumDischargePower to meet the minimum reactive power requirements.
                                                                        // This corresponds to the WUnPF attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVUnderExcitedMaximumDischargePower
    evUnderExcitedPowerFactor?:         types.Decimal,                  // EV power factor when injecting (under excited) the minimum reactive power.
                                                                        // Corresponds to the OvPF attribute in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVUnderExcitedPowerFactor
    maxApparentPower?:                  types.VoltAmpere,               // Rated maximum total apparent power, defined by min(EV, EVSE) in va.
                                                                        // Corresponds to the VAMaxRtg in IEC 61850.
                                                                        // ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumApparentPower
    maxChargeApparentPower?:            types.VoltAmpere,               // Rated maximum absorbed apparent power, defined by min(EV, EVSE) in va.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Corresponds to the ChaVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeApparentPower
    maxChargeApparentPower_L2?:         types.VoltAmpere,               // Rated maximum absorbed apparent power on phase L2, defined by min(EV, EVSE) in va.
                                                                        // Corresponds to the ChaVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeApparentPower_L2
    maxChargeApparentPower_L3?:         types.VoltAmpere,               // Rated maximum absorbed apparent power on phase L3, defined by min(EV, EVSE) in va.
                                                                        // Corresponds to the ChaVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeApparentPower_L3
    maxDischargeApparentPower?:         types.VoltAmpere,               // Rated maximum injected apparent power, defined by min(EV, EVSE) in va.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Corresponds to the DisVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeApparentPower
    maxDischargeApparentPower_L2?:      types.VoltAmpere,               // Rated maximum injected apparent power on phase L2, defined by min(EV, EVSE) in va.
                                                                        // Corresponds to the DisVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeApparentPower_L2
    maxDischargeApparentPower_L3?:      types.VoltAmpere,               // Rated maximum injected apparent power on phase L3, defined by min(EV, EVSE) in va.
                                                                        // Corresponds to the DisVAMaxRtg in IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeApparentPower_L3
    maxChargeReactivePower?:            types.VoltAmpereReactive,       // Rated maximum absorbed reactive power, defined by min(EV, EVSE), in vars.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Corresponds to the AvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeReactivePower
    maxChargeReactivePower_L2?:         types.VoltAmpereReactive,       // Rated maximum absorbed reactive power, defined by min(EV, EVSE), in vars on phase L2.
                                                                        // Corresponds to the AvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeReactivePower_L2
    maxChargeReactivePower_L3?:         types.VoltAmpereReactive,       // Rated maximum absorbed reactive power, defined by min(EV, EVSE), in vars on phase L3.
                                                                        // Corresponds to the AvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumChargeReactivePower_L3
    minChargeReactivePower?:            types.VoltAmpereReactive,       // Rated minimum absorbed reactive power, defined by max(EV, EVSE), in vars.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumChargeReactivePower
    minChargeReactivePower_L2?:         types.VoltAmpereReactive,       // Rated minimum absorbed reactive power, defined by max(EV, EVSE), in vars on phase L2.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumChargeReactivePower_L2
    minChargeReactivePower_L3?:         types.VoltAmpereReactive,       // Rated minimum absorbed reactive power, defined by max(EV, EVSE), in vars on phase L3.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumChargeReactivePower_L3
    maxDischargeReactivePower?:         types.VoltAmpereReactive,       // Rated maximum injected reactive power, defined by min(EV, EVSE), in vars.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Corresponds to the IvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeReactivePower
    maxDischargeReactivePower_L2?:      types.VoltAmpereReactive,       // Rated maximum injected reactive power, defined by min(EV, EVSE), in vars on phase L2.
                                                                        // Corresponds to the IvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeReactivePower_L2
    maxDischargeReactivePower_L3?:      types.VoltAmpereReactive,       // Rated maximum injected reactive power, defined by min(EV, EVSE), in vars on phase L3.
                                                                        // Corresponds to the IvarMax attribute in the IEC 61850.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumDischargeReactivePower_L3
    minDischargeReactivePower?:         types.VoltAmpereReactive,       // Rated minimum injected reactive power, defined by max(EV, EVSE), in vars.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in which case
                                                                        // this field represents phase L1.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumDischargeReactivePower
    minDischargeReactivePower_L2?:      types.VoltAmpereReactive,       // Rated minimum injected reactive power, defined by max(EV, EVSE), in var on phase L2.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumDischargeReactivePower_L2
    minDischargeReactivePower_L3?:      types.VoltAmpereReactive,       // Rated minimum injected reactive power, defined by max(EV, EVSE), in var on phase L3.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumDischargeReactivePower_L3
    nominalVoltage?:                    types.Volt,                     // Line voltage supported by EVSE and EV.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVNominalVoltage
    nominalVoltageOffset?:              types.Volt,                     // The nominal AC voltage (rms) offset between the Charging Station’s electrical connection point and
                                                                        // the utility’s point of common coupling.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVNominalVoltageOffset
    maxNominalVoltage?:                 types.Volt,                     // Maximum AC rms voltage, as defined by min(EV, EVSE) to operate with.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumNominalVoltage
    minNominalVoltage?:                 types.Volt,                     // Minimum AC rms voltage, as defined by max(EV, EVSE) to operate with.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMinimumNominalVoltage
    evInverterManufacturer?:            string,                         // Manufacturer of the EV inverter.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVInverterManufacturer
    evInverterModel?:                   string,                         // Model name of the EV inverter.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVInverterModel
    evInverterSerialNumber?:            string,                         // Serial number of the EV inverter.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVInverterSerialNumber
    evInverterSwVersion?:               string,                         // Software version of EV inverter.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVInverterSwVersion
    evInverterHwVersion?:               string,                         // Hardware version of EV inverter.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVInverterHwVersion
    evIslandingDetectionMethod?:        Array<types.IslandingDetection>,// Type of islanding detection method. Only mandatory when islanding detection is required at the
                                                                        // site, as set in the ISO 15118 Service Details configuration.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVIslandingDetectionMethod
    evIslandingTripTime?:               types.Seconds,                  // Time after which EV will trip if an island has been detected.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVIslandingTripTime
    evMaximumLevel1DCInjection?:        types.Ampere,                   // Maximum injected DC current allowed at level 1 charging.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumLevel1DCInjection
    evDurationLevel1DCInjection?:       types.Seconds,                  // Maximum allowed duration of DC injection at level 1 charging.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVDurationLevel1DCInjection
    evMaximumLevel2DCInjection?:        types.Ampere,                   // Maximum injected DC current allowed at level 2 charging.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVMaximumLevel2DCInjection
    evDurationLevel2DCInjection?:       types.Seconds,                  // Maximum allowed duration of DC injection at level 2 charging.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVDurationLevel2DCInjection
    evReactiveSusceptance?:             types.Siemens,                  // Measure of the susceptibility of the circuit to reactance, in Siemens (S).
                                                                        // Relates to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVReactiveSusceptance
    evSessionTotalDischargeEnergyAvailable?: types.WattHour,            // Total energy value, in Wh, that EV is allowed to provide during the entire V2G session.
                                                                        // The value is independent of the V2X Cycling area. Once this value reaches the value of 0, the EV
                                                                        // may block any attempt to discharge in order to protect the battery health.
                                                                        // Related to: ISO 15118-20: DER_BPT_AC_CPDReqEnergyTransferModeType: EVSessionTotalDischargeEnergyAvailable
    customData?:                        ICustomData                     // Customer specific data.
}

export interface DERCurveGet {
    id:                                 types.Identifier,               // Id of setting.
    curveType:                          types.DERControlType,           // Type of DER curve.
    isDefault:                          boolean,                        // True if this is a default curve.
    isSuperseded:                       boolean,                        // True if this setting is superseded by a higher priority setting (i.e. lower value of priority)
    curve:                              DERCurve                        // Parameters defining the DER curve.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface DERCurvePoints {
    x:                                  types.Decimal,                  // The data value of the X-axis (independent) variable, depending on the curve type.
    y:                                  types.Decimal                   // The data value of the Y-axis (dependent) variable, depending on the DERUnitEnumType of the
                                                                        // curve. If y is power factor, then a positive value means DER is absorbing reactive power
                                                                        // (under-excited), a negative value when DER is injecting reactive power (over-excited).
    customData?:                        ICustomData                     // Customer specific data.
}

export interface DERCurve {
    priority:                           types.Integer,                  // Priority of curve (0=highest)
    yUnit:                              types.DERUnit,                  // Unit a Y-axis of DER curve.
    responseTime?:                      types.Seconds,                  // Open loop response time, the time to ramp up to 90% of the new target in response to the change
                                                                        // in voltage, in seconds. A value of 0 is used to mean no limit. When not present, the device
                                                                        // should follow its default behavior.
    startTime?:                         types.Timestamp,                // Point in time when this curve will become activated. Only absent when default is true.
    duration?:                          types.Seconds,                  // Duration in seconds that this curve will be active. Only absent when default is true.
    hysteresis?:                        Hysteresis,                     // Hysteresis parameters for curve.
    voltageParams?:                     VoltageParams,                  // Additional parameters for voltage curves.
    reactivePowerParams?:               ReactivePowerParams,            // Additional parameters for VoltVar curve.
    curveData:                          Array<DERCurvePoints>           // Coordinates of the DER curve. X-axis is determined by curveType. Y-axis is determined by yUnit.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface EnterServiceGet {
    id:                                 types.Identifier,               // Id of setting.
    enterService:                       EnterService                    // Enter Service settings.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface EnterService {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    highVoltage:                        types.Volt,                     // Enter service voltage high.
    lowVoltage:                         types.Volt,                     // Enter service voltage low.
    highFreq:                           types.Hertz,                    // Enter service frequency high.
    lowFreq:                            types.Hertz,                    // Enter service frequency low.
    delay?:                             types.Seconds,                  // Enter service delay.
    randomDelay?:                       types.Seconds,                  // Enter service randomized delay.
    rampRate?:                          types.Seconds                   // Enter service ramp rate in seconds.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface EVAbsolutePriceScheduleEntry {
    duration:                           types.Seconds,                      // The amount of seconds of this entry.
    evPriceRule:                        Array<EVPriceRule>                  // A set of pricing rules for energy costs.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface EVAbsolutePriceSchedule {
    timeAnchor:                         types.Timestamp,                    // Starting point in time of the EVEnergyOffer.
    currency:                           types.Currency,                     // Currency code according to ISO 4217.
    priceAlgorithm:                     string,                             // ISO 15118-20 URN of price algorithm: Power, PeakPower, StackedEnergy.
    evAbsolutePriceScheduleEntries:     Array<EVAbsolutePriceScheduleEntry> // Schedule of prices for which EV is willing to discharge.
}

export interface EVEnergyOffer {
    evPowerSchedule:                    EVPowerSchedule,                    // Power schedule offered for discharging.
    evAbsolutePriceSchedule?:           EVAbsolutePriceSchedule,            // Price schedule for which EV is willing to discharge.
}

export interface EventData {
    eventId:                            types.EventId,                      // Identifies the event. This field can be referred to as a cause by other events.
    timestamp:                          types.Timestamp,                    // Timestamp of the moment the report was generated.
    trigger:                            types.EventTrigger,                 // Type of trigger for this event, e.g. exceeding a threshold value.
    cause?:                             types.EventId,                      // Refers to the Id of an event that is considered to be the cause for this event.
    actualValue:                        string,                             // Actual value (attributeType Actual) of the variable.
                                                                            // The Configuration Variable ReportingValueSize can be used to limit
                                                                            // GetVariableResult.attributeValue, VariableAttribute.value and EventData.actualValue.
                                                                            // The max size of these values will always remain equal.
    techCode?:                          string,                             // Technical (error) code as reported by component.
    techInfo?:                          string,                             // Technical detail information as reported by component.
    cleared?:                           boolean,                            // Cleared is set to true to report the clearing of a monitored situation, i.e. a 'return to normal'.
    transactionId?:                     types.TransactionId,                // If an event notification is linked to a specific transaction, this field can be used to specify
                                                                            // its transactionId.
    variableMonitoringId?:              types.VariableMonitoringId,         // Identifies the VariableMonitoring which triggered the event.
    eventNotificationType:              types.EventNotificationType,        // Specifies the event notification type of the message.
    severity:                           types.SeverityLevel,                // (2.1) Severity associated with the monitor ins variableMonitoringId or with the hardwired
                                                                            // notification.
    component:                          Component,                          // Component for which event is notified.
    variable:                           Variable,                           // Variable for which event is notified.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface EVPowerScheduleEntry {
    duration:                           types.Seconds,                      // The duration of this entry.
    evPower:                            types.Watt,                         // Defines maximum amount of power for the duration of this EVPowerScheduleEntry to be discharged
                                                                            // from the EV battery through EVSE power outlet. Negative values are used for discharging.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface EVPowerSchedule {
    timeAnchor:                         types.Timestamp,                    // Starting point in time of the EVPowerSchedule.
    evPowerScheduleEntries:             Array<EVPowerScheduleEntry>         // Schedule of power for which EV is willing to discharge.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface EVPriceRule {
    energyFee:                          types.Decimal,                      // Cost per kWh.
    powerRangeStart:                    types.Decimal,                      // The EnergyFee applies between this value and the value of the PowerRangeStart of the subsequent
                                                                            // EVPriceRule. If the power is below this value, the EnergyFee of the previous EVPriceRule applies.
                                                                            // Negative values are used for discharging.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface EVSE {
    id:                                 types.EVSEId,                       // EVSE Identifier. This contains a number (> 0) designating an EVSE of the Charging Station.
    connectorId?:                       types.ConnectorId,                  // An id to designate a specific connector (on an EVSE) by connector index number.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface Firmware {
    location:                           types.URL,                          // URL defining the origin of the firmware.
    retrieveDateTime:                   types.Timestamp,                    // Date and time at which the firmware shall be retrieved.
    installDateTime?:                   types.Timestamp,                    // Date and time at which the firmware shall be installed.
    signingCertificate?:                string,                             // Certificate with which the firmware was signed. PEM encoded X.509 certificate.
    signature?:                         string,                             // Base64 encoded firmware signature.
    customData?:                        ICustomData                         // Customer specific data.
}

export interface FixedPFGet {
    id:                                 types.Identifier,               // Id of setting.
    isDefault:                          boolean,                        // True if setting is a default control.
    isSuperseded:                       boolean,                        // True if this setting is superseded by a lower priority setting.
    fixedPF:                            FixedPF,                        // FixedPF for AbsorbW or InjectW.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface FixedPF {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    displacement:                       types.Decimal,                  // Power factor, cos(phi), as value between 0..1.
    excitation:                         boolean,                        // True when absorbing reactive power (underexcited), false when injecting reactive power (overexcited).
    startTime?:                         types.Timestamp,                // Time when this setting becomes active.
    duration?:                          types.Seconds,                  // Duration in seconds that this setting is active.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface  FixedVarGet {
    id:                                 types.Identifier,               // Id of setting.
    isDefault:                          boolean,                        // True if setting is a default control.
    isSuperseded:                       boolean,                        // True if this setting is superseded by a lower priority setting.
    fixedVar:                           FixedVar,                       // Fixed Var setpoint.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface FixedVar {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    setpoint:                           types.Decimal,                  // The value specifies a target var output interpreted as a signed percentage (-100 to 100).
                                                                        // A negative value refers to charging, whereas a positive one refers to discharging.
                                                                        // The value type is determined by the unit field.
    unit:                               types.DERUnit,                  // Unit of the setpoint.
    startTime?:                         types.Timestamp,                // Time when this setting becomes active.
    duration?:                          types.Seconds,                  // Duration in seconds that this setting is active.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface FreqDroopGet {
    id:                                 types.Identifier,               // Id of setting.
    isDefault:                          boolean,                        // True if setting is a default control.
    isSuperseded:                       boolean,                        // True if this setting is superseded by a lower priority setting.
    freqDroop:                          FreqDroop,                      // FreqDroop parameters.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface FreqDroop {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    overFreq:                           types.Decimal,                  // Over-frequency start of droop.
    underFreq:                          types.Decimal,                  // Under-frequency start of droop.
    overDroop:                          types.Decimal,                  // Over-frequency droop per unit, oFDroop.
    underDroop:                         types.Decimal,                  // Under-frequency droop per unit, uFDroop.
    responseTime:                       types.Decimal,                  // Open loop response time in seconds.
    startTime?:                         types.Timestamp,                // Time when this setting becomes active.
    duration?:                          types.Seconds,                  // Duration in seconds that this setting is active.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface GetVariableData {
    attributeType?:                     types.AttributeType,            // Attribute type for which value is requested. When absent, default 'Actual' is assumed.
    component:                          Component,                      // Component for which the Variable is requested.
    variable:                           Variable,                       // Variable for which the attribute value is requested.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface GetVariableResult {
    attributeStatus:                    types.GetVariableStatus,        // Status of the GetVariable operation.
    attributeType?:                     types.AttributeType,            // Attribute type for which value is requested.
    attributeValue?:                    string,                         // Value of requested attribute type of componentvariable. This field can only be empty when the given
                                                                        // status is NOT accepted.
                                                                        // The Configuration Variable ReportingValueSize can be used to limit GetVariableResult.attributeValue,
                                                                        // VariableAttribute.value and EventData.actualValue.
                                                                        // The max size of these values will always remain equal.
    component:                          Component,                      // Component for which the Variable is requested.
    variable:                           Variable,                       // Variable for which the attribute value is requested.
    attributeStatusInfo?:               StatusInfo,                     // Detailed attribute status information.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface GradientGet {
    id:                                 types.Identifier,               // Id of setting.
    gradient:                           Gradient,                       // Gradient settings.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Gradient {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    gradient:                           types.Seconds,                  // Default ramp rate in seconds (0 if not applicable)
    softGradient:                       types.Seconds,                  // Soft-start ramp rate in seconds (0 if not applicable)
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Hysteresis {
    hysteresisHigh?:                    types.Decimal,                  // High value for return to normal operation after a grid event, in absolute value. This value adopts
                                                                        // the same unit as defined by yUnit.
    hysteresisLow?:                     types.Decimal,                  // Low value for return to normal operation after a grid event, in absolute value. This value adopts
                                                                        // the same unit as defined by yUnit.
    hysteresisDelay?:                   types.Decimal,                  // Delay in seconds, once grid parameter within HysteresisLow and HysteresisHigh, for the EV to return
                                                                        // to normal operation after a grid event.
    hysteresisGradient?:                types.Decimal,                  // Set default rate of change (ramp rate %/s) for the EV to return to normal operation after a grid event.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface IdTokenInfo {
    status:                             types.AuthorizationStatus,      // Current status of the ID Token.
    cacheExpiryDateTime?:               types.Timestamp,                // Date and Time after which the token must be considered invalid.
    chargingPriority?:                  types.Integer,                  // Priority from a business point of view. Default priority is 0, The range is from -9 to 9.
                                                                        // Higher values indicate a higher priority. The chargingPriority in TransactionEventResponse
                                                                        // overrules this one.
    language1?:                         types.Language,                 // Preferred user interface language of identifier user. Contains a language code as defined in [RFC5646].
    language2?:                         types.Language,                 // Second preferred user interface language of identifier user. Don’t use when language1 is omitted,
                                                                        // has to be different from language1. Contains a language code as defined in [RFC5646].
    evseId:                             Array<types.Integer>,           // Only used when the IdToken is only valid for one or more specific EVSEs, not for the entire Charging Station.
    groupIdToken:                       types.IdTokenType,              // This contains the group identifier.
    personalMessage?:                   MessageContent,                 // Personal message that can be shown to the EV Driver and can be used for tariff information, user greetings etc.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface IdToken {
    idToken:                            types.IdToken,                  // (2.1) IdToken is case insensitive. Might hold the hidden id of an RFID tag, but can for example
                                                                        // also contain a UUID.
    type:                               types.IdTokenType,              // Enumeration of possible idToken types. Values defined in Appendix as IdTokenEnumStringType.
    additionalInfo?:                    Array<AdditionalInfo>,          // AdditionalInfo can be used to send extra information which can be validated by the CSMS in
                                                                        // addition to the regular authorization with IdToken. AdditionalInfo contains one or more custom
                                                                        // types, which need to be agreed upon by all parties involved. When AdditionalInfo is NOT implemented
                                                                        // or a not supported AdditionalInfo.type is used, the CSMS/Charging Station MAY ignore the
                                                                        // AdditionalInfo.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface LimitBeyondSoC {
    soc:                                types.Percentage,               // The SoC value beyond which the charging rate limit should be applied.
    limit:                              types.Decimal,                  // Charging rate limit beyond the SoC value. The unit is defined by chargingSchedule.chargingRateUnit.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface LimitMaxDischargeGet {
    id:                                 types.Identifier,               // Id of setting.
    isDefault:                          boolean,                        // True if setting is a default control.
    isSuperseded:                       boolean,                        // True if this setting is superseded by a lower priority setting.
    limitMaxDischarge:                  LimitMaxDischarge,              // Maximum discharge power as percentage or rated capability.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface LimitMaxDischarge {
    priority:                           types.Integer,                  // Priority of setting (0=highest)
    pctMaxDischargePower?:              types.Percentage,               // Only for PowerMonitoring. The value specifies a percentage (0 to 100) of the rated maximum discharge 
                                                                        // power of EV. The PowerMonitoring curve becomes active when power exceeds this percentage.
    startTime?:                         types.Timestamp,                // Time when this setting becomes active.
    duration?:                          types.Seconds,                  // Duration in seconds that this setting is active.
    powerMonitoringMustTrip?:           DERCurve,                       // The curve is an interpolation of data points where the x-axis values are time in seconds and the
                                                                        // yaxis values refer to the percentage value of the rated EVMaximumDischargePower, reported in the
                                                                        // ChargeParameterDiscoveryRequest message. The value lies between 0 and 100. The curve is activated
                                                                        // when the power value measured via the ExternalMeter value reported in the ChargeLoopRes is higher
                                                                        // than the pctMaxDischargePower defined above. If the power does not stay within the defined curve
                                                                        // for the respective time period, the EV must trip.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface LogParameters {
    remoteLocation:                     string,                         // The URL of the location at the remote system where the log should be stored.
    oldestTimestamp?:                   types.Timestamp,                // This contains the date and time of the oldest logging information to include in the diagnostics.
    latestTimestamp?:                   types.Timestamp,                // This contains the date and time of the latest logging information to include in the diagnostics.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface MessageContent {
    format:                             types.MessageFormat,            // Format of the message.
    language?:                          types.Language,                 // Message language identifier. Contains a language code as defined in [RFC5646].
    content:                            string,                         // (2.1) Required. Message contents. Maximum length supported by Charging Station is given in
                                                                        // OCPPCommCtrlr.FieldLength["MessageContentType.content"]. Maximum length defaults to 1024.
}

export interface MessageInfo {
    id:                                 types.DisplayMessageId,         // Unique id within an exchange context. It is defined within the OCPP context as a positive
                                                                        // Integer value (greater or equal to zero).
    priority:                           types.MessagePriority,          // With what priority should this message be shown.
    state?:                             types.MessageState,             // During what state should this message be shown. When omitted this message should be shown
                                                                        // in any state of the Charging Station.
    startTimestamp?:                    types.Timestamp,                // From what date-time should this message be shown. If omitted: directly.
    endTimestamp?:                      types.Timestamp,                // Until what date-time should this message be shown, after this date/time this message SHALL
                                                                        // be removed.
    transactionId?:                     types.TransactionId,            // During which transaction shall this message be shown. Message SHALL be removed by the
                                                                        // Charging Station after transaction has ended.
    message:                            MessageContent,                 // Contains message details for the message to be displayed on a Charging Station.
    display?:                           Component,                      // When a Charging Station has multiple Displays, this field can be used to define to which
                                                                        // Display this message belongs.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface MeterValue {
    timestamp:                          types.Timestamp,                // Timestamp for measured value(s).
    sampledValue:                       Array<SampledValue>,            // One or more measured values
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Modem {
    iccid?:                             string,                         // This contains the ICCID of the modem’s SIM card.
    imsi?:                              string,                         // This contains the IMSI of the modem’s SIM card.
    customData?:                        ICustomData,                    // Customer specific data.
}

export interface MonitoringData {
    component:                          Component,                      // Component for which monitoring report was requested.
    variable:                           Variable,                       // Variable for which monitoring report was requested.
    variableMonitoring:                 Array<VariableMonitoring>,      // List of monitors for this Component-Variable pair.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface NetworkConnectionProfile {
    ocppVersion:                        types.OCPPVersion,              // (2.1) This field is ignored, since the OCPP version to use is determined during the websocket
                                                                        // handshake.
    ocppInterface:                      types.OCPPInterface,            // Applicable Network Interface. Charging Station is allowed to use a different network interface
                                                                        // to connect if the given one does not work.
    ocppTransport:                      types.OCPPTransport,            // Defines the transport protocol (e.g. SOAP or JSON). Note: SOAP is not supported in OCPP 2.x,
                                                                        // but is supported by earlier versions of OCPP.
    messageTimeout:                     types.Seconds,                  // Duration in seconds before a message send by the Charging Station via this network connection
                                                                        // timesout. The best setting depends on the underlying network and response times of the CSMS.
                                                                        // If you are looking for a some guideline: use 30 seconds as a starting point.
    ocppCsmsUrl:                        types.URL,                      // URL of the CSMS(s) that this Charging Station communicates with, without the Charging Station
                                                                        // identity part. The SecurityCtrlr.Identity field is appended to ocppCsmsUrl to provide the full
                                                                        // websocket URL
    securityProfile:                    types.Integer,                  // This field specifies the security profile used when connecting to the CSMS with this NetworkConnectionProfile.
    identity?:                          string,                         // (2.1) Charging Station identity to be used as the basic authentication username.
    basicAuthPassword?:                 string,                         // (2.1) BasicAuthPassword to use for security profile 1 or 2.
    vpn?:                               VPN,                            // Settings to be used to set up the VPN connection.
    apn?:                               APN,                            // Collection of configuration data needed to make a data-connection over a cellular network.
}

export interface OCSPRequestData {
    hashAlgorithm:                      types.HashAlgorithm,            // Used algorithms for the hashes provided.
    issuerNameHash:                     string,                         // The hash of the issuer’s distinguished name (DN), that must be calculated over the DER encoding
                                                                        // of the issuer’s name field in the certificate being checked.
    issuerKeyHash:                      string,                         // The hash of the DER encoded public key: the value (excluding tag and length) of the subject
                                                                        // public key field in the issuer’s certificate.
    serialNumber:                       string,                         // The string representation of the hexadecimal value of the serial number without the prefix "0x"
                                                                        // and without leading zeroes.
    responderURL:                       types.URL,                      // This contains the responder URL.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface OverstayRuleList {
    overstayTimeThreshold?:             types.Seconds,                  // Time till overstay is applied in seconds.
    overstayPowerThreshold?:            RationalNumber,                 // Power threshold in W at which the overstay applies.
    overstayRule:                       OverstayRule,                   // Overstay rules that will be applied.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface OverstayRule {
    overstayRuleDesription?:            string,                         // Human readable string to identify the overstay rule.
    startTime?:                         types.Seconds,                  // Time in seconds after trigger of the parent Overstay Rules for this particular fee to apply.
    overstayFeePeriod:                  types.Seconds,                  // Time till overstay will be reapplied.
    overstayFee:                        RationalNumber,                 // Fee that applies to this overstay.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface PeriodicEventStreamParams {
    interval?:                          types.Seconds,                  // Time in seconds after which stream data is sent.
    vales?:                             types.Integer                   // Number of items to be sent together in stream.
}

export interface PriceLevelScheduleEntry {
    duration:                           types.Seconds,                  // The amount of seconds that define the duration of this given PriceLevelScheduleEntry.
    priceLevel:                         types.Integer,                  // Defines the price level of this PriceLevelScheduleEntry (referring to NumberOfPriceLevels).
                                                                        // Small values for the PriceLevel represent a cheaper PriceLevelScheduleEntry.
                                                                        // Large values for the PriceLevel represent a more expensive PriceLevelScheduleEntry.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface PriceLevelSchedule {
    timeAnchor:                         types.Timestamp,                // Starting point of this price schedule.
    priceScheduleID:                    types.PriceScheduleId,          // Unique ID of this price schedule.
    priceScheduleDescription?:          string,                         // Description of the price schedule.
    numberOfPriceLevels:                types.Integer,                  // Defines the overall number of distinct price level elements used across all PriceLevelSchedules.
    priceLevelScheduleEntries:          Array<PriceLevelScheduleEntry>, // List of entries of the schedule.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface PriceRuleStack {
    duration:                           types.Seconds,                  // Duration of the stack of price rules. he amount of seconds that define the duration of the given
                                                                        // PriceRule(s).
    priceRule:                          PriceRule,                      //  Contains the price rules.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface PriceRule {
    parkingFeePeriod?:                  types.Seconds,                  // The duration of the parking fee period (in seconds). When the time enters into a ParkingFeePeriod,
                                                                        // the ParkingFee will apply to the session.
    carbonDioxideEmission?:             number,                         // Number of grams of CO2 per kWh.
    renewableGenerationPercentage?:     types.Percentage,               // Percentage of the power that is created by renewable resources.
    energyFee:                          RationalNumber,                 // Cost per kWh. Use zero for free energy.
    parkingFee?:                        RationalNumber,                 // Cost of parking. Mandatory whenever a parking fee applies.
    powerRangeStart:                    RationalNumber,                 // For values 0 and above, this is the power level above which this price rule applies.
                                                                        // If there is another PriceRule with a higher value, and the current power is above that value, then
                                                                        // that other PriceRule applies. For negative values, this is the power level below which this price
                                                                        // rule applies. If there is another PriceRule with a lower value, and the current power is below that
                                                                        // value, then that other PriceRule applies.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Price {
    exclTax?:                           types.Decimal,                  // Price/cost excluding tax. Can be absent if inclTax is present.
    inclTax?:                           types.Decimal,                  // Price/cost including tax. Can be absent if exclTax is present.
    taxRates?:                          Array<TaxRate>,                 // Tax percentages that were used to calculate inclTax from exclTax (for displaying/printing on invoices).
}

export interface RationalNumber {
    exponent:                           types.Integer,                  // The exponent to base 10 (dec).
    value:                              types.Integer                   // Value which shall be multiplied.
}

export interface ReactivePowerParams {
    vRef?:                              types.Percentage,               // Only for VoltVar curve: The nominal AC voltage (rms) adjustment to the voltage curve points for
                                                                        // Volt-Var curves (percentage).
    autonomousVRefEnable?:              boolean,                        // Only for VoltVar: Enable/disable autonomous VRef adjustment.
    autonomousVRefTimeConstant?:        types.Seconds,                  // Only for VoltVar: Adjustment range for VRef time constant.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface RelativeTimeInterval {
    start:                              types.Seconds,                  // Start of the interval, in seconds from NOW.
    duration?:                          types.Seconds,                  // Duration of the interval, in seconds.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface ReportData {
    component:                          Component,                      // Component for which a report of Variable is requested.
    variable:                           Variable,                       // Variable for which report is requested.
    variableAttribute:                  Array<VariableAttribute>,       // Attribute data of a variable.
    variableCharacteristics?:           VariableCharacteristics,        // Fixed read-only parameters of a variable.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SalesTariffEntry {
    relativeTimeInterval:               RelativeTimeInterval,           // Defines the price level of this SalesTariffEntry (referring to NumEPriceLevels).
                                                                        // Small values for the EPriceLevel represent a cheaper TariffEntry.
                                                                        // Large values for the EPriceLevel represent a more expensive TariffEntry.
    ePriceLevel?:                       types.Integer,                  // Defines the time interval the SalesTariffEntry is valid for, based upon relative times.
    consumptionCost?:                   Array<ConsumptionCost>,         // Defines additional means for further relative price information and/or alternative costs.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SalesTariff {
    id:                                 types.SalesTariffId,            // SalesTariff identifier used to identify one sales tariff. An SAID remains a unique identifier
                                                                        // for one schedule throughout a charging session.
    salesTariffDescription?:            string,                         // A human readable title/short description of the sales tariff e.g. for HMI display purposes.
    numEPriceLevels?:                   types.Integer,                  // Encapsulating element describing all relevant details for one time interval of the SalesTariff.
                                                                        // The number of SalesTariffEntry elements is limited by the parameter maxScheduleTuples.
    salesTariffEntry:                   Array<SalesTariffEntry>,        // Defines the overall number of distinct price levels used across all provided SalesTariff elements.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SampledValue {
    value:                              types.Decimal,                  // Indicates the measured value.
    measurand?:                         types.Measurand,                // Type of measurement. Default = "Energy.Active.Import.Register"
    context?:                           types.ReadingContext,           // Type of detail value: start, end or sample. Default = "Sample.Periodic"
    phase?:                             types.Phase,                    // Indicates how the measured value is to be interpreted. For instance between L1 and neutral (L1-N)
                                                                        // Please note that not all values of phase are applicable to all Measurands. When phase is absent,
                                                                        // the measured value is interpreted as an overall value.
    location?:                          types.MeteringLocation,         // Indicates where the measured value has been sampled. Default = "Outlet"
    signedMeterValue?:                  SignedMeterValue,               // Contains the MeterValueSignature with sign/encoding method information.
    unitOfMeasure?:                     UnitOfMeasure,                  // Represents a UnitOfMeasure including a multiplier
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SetMonitoringData {
    id?:                                types.MonitoringId,             // An id SHALL only be given to replace an existing monitor. The Charging Station handles
                                                                        // the generation of id’s for new monitors.
    transaction?:                       boolean,                        // Monitor only active when a transaction is ongoing on a component relevant to this
                                                                        // transaction. Default = false.
    value:                              types.Decimal,                  // Value for threshold or delta monitoring. For Periodic or PeriodicClockAligned this is
                                                                        // the interval in seconds.
    type:                               types.MonitorType,              // The type of this monitor, e.g. a threshold, delta or periodic monitor.
    serverity:                          types.SeverityLevel,            // The severity that will be assigned to an event that is triggered by this monitor.
                                                                        // The severity range is 0-9, with 0 as the highest and 9 as the lowest severity level.
    component:                          Component,                      // Component for which the monitor is set.
    variable:                           Variable,                       // Variable for which the monitor is set.
    periodicEventStream?:               PeriodicEventStreamParams,      // (2.1) When present, events from periodic monitor will be sent via a periodic event
                                                                        // stream. Only used for monitors of type Periodic or PeriodicClockAligned
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SetMonitoringResult {
    id:                                 types.MonitoringId,             // Id given to the VariableMonitor by the Charging Station. The Id is only returned when
                                                                        // status is accepted. Installed VariableMonitors should have unique id’s but the id’s
                                                                        // of removed Installed monitors should have unique id’s but the id’s of removed monitors
                                                                        // MAY be reused.
    status:                             types.SetMonitoringStatus,      // Status is OK if a value could be returned. Otherwise this will indicate the reason why
                                                                        // a value could not be returned.
    type:                               types.MonitorType,              // The type of this monitor, e.g. a threshold, delta or periodic monitor.
    severity:                           types.SeverityLevel,            // The severity that will be assigned to an event that is triggered by this monitor.
                                                                        // The severity range is 0-9, with 0 as the highest and 9 as the lowest severity level.
    component:                          Component,                      // Component for which status is returned.
    variable:                           Variable,                       // Variable for which status is returned.
    statusInfo?:                        StatusInfo,                     // Detailed status information.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SetVariableData {
    attributeType?:                     types.AttributeType,            // Type of attribute: Actual, Target, MinSet, MaxSet. Default is Actual when omitted.
    attributeValue:                     string,                         // Value to be assigned to attribute of variable.
                                                                        // This value is allowed to be an empty string ("").
                                                                        // The Configuration Variable ConfigurationValueSize can
                                                                        // be used to limit SetVariableData.attributeValue and
                                                                        // VariableCharacteristics.valueList. The max size of these
                                                                        // values will always remain equal.
    component:                          Component,                      // The component for which the variable data is set.
    variable:                           Variable,                       // Specifies the that needs to be set.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SetVariableResult {
    attributeType?:                     types.AttributeType,            // Type of attribute: Actual, Target, MinSet, MaxSet. Default is Actual when omitted.
    attributeStatus:                    types.SetVariableStatus,        // Result status of setting the variable.
    component:                          Component,                      // The component for which result is returned.
    variable:                           Variable,                       // The variable for which the result is returned.
    attributeStatusInfo?:               StatusInfo,                     // Detailed attribute status information.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface SignedMeterValue {
    signedMeterData:                    string,                         // Base64 encoded, contains the signed data which might contain more then just the meter value.
                                                                        // It can contain information like timestamps, reference to a customer etc.
    signingMethod:                      string,                         // (2.1) Method used to create the digital signature.
                                                                        // Optional, if already included in signedMeterData.
    encodingMethod:                     string,                         // Method used to encode the meter values before applying the digital signature algorithm.
    publicKey:                          string,                         // (2.1) Base64 encoded, sending depends on configuration variable PublicKeyWithSignedMeterValue.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface StatusInfo {
    reasonCode:                         string,                         // A predefined code for the reason why the status is returned in this response.
                                                                        // The string is caseinsensitive.
    additionalInfo?:                    string,                         // Additional text to provide detailed information.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface StreamDataElement {
    t:                                  types.Timestamp,                // Timestamp of the stream data element.
    v:                                  string,                         // Value of the stream data element.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffAssignment {
    tariffId:                           types.TariffId,                 // Tariff id.
    tariffKind:                         types.TariffKind,               // Kind of tariff (user/default)
    evseIds?:                           Array<types.EVSEId>,            // List of EVSEs to which the tariff is assigned. If omitted, the tariff is assigned to all EVSEs.
    idTokens?:                          Array<types.IdToken>,           // IdTokens related to tariff.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffConditions {
    startTimeOfDay?:                    types.TimeOfDay,                // Start time of day in local time. Must be in 24h format with leading zeros.
                                                                        // Hour/Minute separator: ":" Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
    endTimeOfDay?:                      types.TimeOfDay,                // End time of day in local time. Same syntax as startTimeOfDay. If end time < start time then
                                                                        // the period wraps around to the next day. To stop at end of the day use: 00:00.
    validFrom?:                         types.LocalDate,                // Optional. Start date in local time, for example: 2015-12-24. Valid from this day (inclusive).
                                                                        // Regex: ([12][0-9]+{3}+)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
    validTo?:                           types.LocalDate,                // End date in local time, for example: 2015-12-27. Valid until this day (exclusive). Same syntax as validFrom.
    minEnergy?:                         types.WattHour,                 // Minimum consumed energy in Wh, for example 20000 Wh. Valid from this amount of energy (inclusive) being used.
    maxEnergy?:                         types.WattHour,                 // Maximum consumed energy in Wh, for example 50000 Wh. Valid until this amount of energy (exclusive) being used.
    minCurrent?:                        types.Ampere,                   // Sum of the minimum current (in Amperes) over all phases, for example 5 A. When the EV is charging with
                                                                        // more than, or equal to, the defined amount of current, this TariffElement is/becomes active. If the
                                                                        // charging current is or becomes lower, this TariffElement is not or no longer valid and becomes inactive.
                                                                        // This is NOT about the minimum current over the entire transaction.
    maxCurrent?:                        types.Ampere,                   // Sum of the maximum current (in Amperes) over all phases, for example 20 A. When the EV is charging
                                                                        // with less than the defined amount of current, this TariffElement becomes/is active. If the charging
                                                                        // current is or becomes higher, this TariffElement is not or no longer valid and becomes inactive.
                                                                        // This is NOT about the maximum current over the entire transaction.
    minPower?:                          types.Watt,                     // Minimum power in W, for example 5000 W. When the EV is charging with more than, or equal to, the
                                                                        // defined amount of power, this TariffElement is/becomes active. If the charging power is or becomes
                                                                        // lower, this TariffElement is not or no longer valid and becomes inactive. This is NOT about the
                                                                        // minimum power over the entire transaction.
    maxPower?:                          types.Watt,                     // Maximum power in W, for example 20000 W. When the EV is charging with less than the defined amount
                                                                        // of power, this TariffElement becomes/is active. If the charging power is or becomes higher, this
                                                                        // TariffElement is not or no longer valid and becomes inactive. This is NOT about the maximum power
                                                                        // over the entire transaction.
    minTime?:                           types.Seconds,                  // Minimum duration in seconds the transaction (charging & idle) MUST last (inclusive). When the duration
                                                                        // of a transaction is longer than the defined value, this TariffElement is or becomes active. Before that
                                                                        // moment, this TariffElement is not yet active.
    maxTime?:                           types.Seconds,                  // Maximum duration in seconds the transaction (charging & idle) MUST last (exclusive). When the duration
                                                                        // of a transaction is shorter than the defined value, this TariffElement is or becomes active. After that
                                                                        // moment, this TariffElement is no longer active.
    minChargingTime?:                   types.Seconds,                  // Minimum duration in seconds the charging MUST last (inclusive). When the duration of a charging is
                                                                        // longer than the defined value, this TariffElement is or becomes active. Before that moment, this
                                                                        // TariffElement is not yet active.
    maxChargingTime?:                   types.Seconds,                  // Maximum duration in seconds the charging MUST last (exclusive). When the duration of a charging is
                                                                        // shorter than the defined value, this TariffElement is or becomes active. After that moment, this
                                                                        // TariffElement is no longer active.
    minIdleTime?:                       types.Seconds,                  // Minimum duration in seconds the idle period (i.e. not charging) MUST last (inclusive). When the
                                                                        // duration of the idle time is longer than the defined value, this TariffElement is or becomes active.
                                                                        // Before that moment, this TariffElement is not yet active.
    maxIdleTime?:                       types.Seconds,                  // Maximum duration in seconds the idle period (i.e. not charging) MUST last (exclusive). When the
                                                                        // duration of idle time is shorter than the defined value, this TariffElement is or becomes active.
                                                                        // After that moment, this TariffElement is no longer active.
    dayOfWeek?:                         Array<types.DayOfWeek>,         // Day(s) of the week this is tariff applies.
    evseKind?:                          types.EVSEKind,                 // Type of EVSE (AC, DC) this tariff applies to.
    tariffKind?:                        types.TariffKind,               // Condition based on DefaultTariff (adhoc) or UserTariff.
    paymentBrand?:                      string,                         // For which payment brand this (adhoc) tariff applies. Can be used to add a surcharge for certain
                                                                        // payment brands. Based on value of additionalIdToken from idToken.additionalInfo.type = "PaymentBrand".
    paymentRecognition?:                string,                         // Type of adhoc payment, e.g. CC, Debit. Based on value of additionalIdToken from idToken.additionalInfo.type = "PaymentRecognition".
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffEnergyPrice {
    priceKwh:                           types.Decimal,                  // Price per kWh (excl. tax) for this element.
    stepSize?:                          types.Integer,                  // When absent, the exact amount is billed. When present, this type is billed in blocks of stepSize
                                                                        // of the base unit: Wh. Amounts are rounded up to a multiple of stepSize.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffEnergy {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffEnergyPrice>,       // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffFixedPrice {
    priceFixed:                         types.Decimal,                  // Fixed price for this element e.g. a start fee.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffFixed {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffFixedPrice>,        // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffTimePrice {
    priceMinute:                        types.Decimal,                  // Price per minute (excl. tax) for this element.
    stepSize?:                          types.Integer,                  // When absent, the exact amount is billed. When present, this type is billed in blocks of stepSize
                                                                        // of the base unit: Wh. Amounts are rounded up to a multiple of stepSize.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffTime {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffTimePrice>,         // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Tariff {
    tariffId:                           types.TariffId,                 // The unique identification of the tariff.
    currency:                           types.Currency,                 // The currency of the tariff.
    description?:                       Array<MessageContent>,          // List of multi-language tariff information texts.
    minPrice?:                          Array<Price>,                   // When this field is set, a transaction with this tariff will at least cost this amount.
    maxPrice?:                          Array<Price>,                   // When this field is set, a transaction with this tariff will not cost more than this amount.
    energy?:                            TariffEnergy,                   // The energy tariff.
    chargingTime?:                      TariffTime,                     // The charging time tariff.
    idleTime?:                          TariffTime,                     // Idle time tariff.
    fixedFee?:                          TariffFixed,                    // Fixed fee tariff.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TaxRate {
    type:                               types.TaxRateType,              // Type of this tax, e.g. "Federal ", "State", for information on receipt.
    tax:                                types.Percentage,               // Tax rate in percentage.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TaxRule {
    taxRuleID:                          types.TaxRuleId,                // Unique identifier for this tax rule.
    taxRuleName?:                       string,                         // Human readable string to identify the tax rule.
    taxIncludedInPrice?:                boolean,                        // Indicates whether the tax is included in any price or not.
    appliesToEnergyFee:                 boolean,                        // Indicates whether this tax applies to Energy Fees.
    appliesToParkingFee:                boolean,                        // Indicates whether this tax applies to Parking Fees.
    appliesToOverstayFee:               boolean,                        // Indicates whether this tax applies to Overstay Fees.
    appliesToMinimumMaximumCost:        boolean,                        // Indicates whether this tax applies to Minimum/Maximum Cost.
    taxRate:                            RationalNumber,                 // Percentage of the total amount of applying fee (energy, parking, overstay, MinimumCost and/or MaximumCost).
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TotalCost {
    currency:                           types.Currency                  // Currency of the costs in ISO 4217 Code.
    fixed:                              Price,                          // Total sum of all flat fees in the specified currency, except for components with
                                                                        // conditions.isReservation = true (counted in totalReservationCost).
    energy:                             Price,                          // Total sum of all the cost of all the energy used, in the specified currency.
    chargingTime:                       Price,                          // Total sum of all the cost related to duration of charging during this transaction,
                                                                        // in the specified currency.
    idleTime:                           Price,                          // Total sum of all the cost related to idle time of this transaction, including fixed price
                                                                        // components, in the specified currency.
    reservation:                        Price,                          // Total sum of all the cost related to reservation of the EVSE, including fixed price
                                                                        // components, in the specified currency.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TotalUsage {
    energy:                             types.Decimal,                  // Total energy used during this transaction, in the specified unit.
    chargingTime:                       types.Seconds,                  // Total duration of the charging session (including the duration of charging and not charging)
    idleTime:                           types.Seconds                   // Total duration of the charging session where the EV was not charging (no energy was
                                                                        // transferred between EVSE and EV), in seconds.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TransactionLimit {
    maxCost?:                           types.Decimal,                  // Maximum allowed cost of transaction.
    maxEnergy?:                         types.Watt,                     // Maximum allowed energy to charge in transaction.
    maxTime?:                           types.Seconds,                  // Maximum duration of transaction from start to end.
    maxSoC?:                            types.Percentage,               // Maximum allowed state of charge at end of the charging session.
    customData?:                        ICustomData                     // Customer specific data.
}
export interface Transaction {
    transactionId:                      types.TransactionId,            // This contains the Id of the transaction.
    chargingState?:                     types.ChargingState,            // Current charging state, is required when state has changed.
                                                                        // Omitted when there is no communication between EVSE and EV, because no cable is plugged in.
    timeSpentCharging?:                 types.Seconds,                  // Contains the total time that energy flowed from EVSE to EV during the transaction
                                                                        // (in seconds). Note that timeSpentCharging is smaller or equal to the duration of the
                                                                        // transaction.
    stoppedReason?:                     types.StopTransactionReason,    // The stoppedReason is the reason/event that initiated the process of stopping the transaction.
                                                                        // It will normally be the user stopping authorization via card (Local or MasterPass) or app
                                                                        // (Remote), but it can also be CSMS revoking authorization (DeAuthorized), or disconnecting
                                                                        // the EV when TxStopPoint = EVConnected (EVDisconnected). Most other reasons are related to
                                                                        // technical faults or energy limitations. MAY only be omitted when stoppedReason is "Local"
    remoteStartId?:                     types.RemoteStartId,            // The ID given to remote start request (RequestStartTransactionRequest. This enables to CSMS
                                                                        // to match the started transaction to the given start request.
    operationMode?:                     types.OperationMode,            // (2.1) The operationMode that is currently in effect for the transaction.
    tariffId?:                          types.TariffId,                 // (2.1) Id of tariff in use for transaction.
    transactionLimit?:                  TransactionLimit,               // (2.1) Maximum cost/energy/time allowed for this transaction.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface UnitOfMeasure {
    unit?:                              types.UnitOfMeasure,            // Unit of the value. Default = "Wh" if the (default) measurand is an "Energy" type.
                                                                        // This field SHALL use a value from the list Standardized Units of Measurements in Part 2
                                                                        // Appendices. If an applicable unit is available in that list, otherwise a "custom" unit
                                                                        // might be used.
    multiplier:                         types.Integer,                  // Multiplier, this value represents the exponent to base 10. I.e. multiplier 3 means 10
                                                                        // raised to the 3rd power. Default is 0.
                                                                        // The multiplier only multiplies the value of the measurand.
                                                                        // It does not specify a conversion between units, for example, kW and W.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface V2XChargingParameters {
    minChargePower?:                    types.Watt,                     // Minimum charge power in W, defined by max(EV, EVSE). This field represents the sum of
                                                                        // all phases, unless values are provided for L2 and L3, in which case this field represents
                                                                        // phase L1.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumChargePower
    minChargePower_L2?:                 types.Watt,                     // Minimum charge power on phase L2 in W, defined by max(EV, EVSE).
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumChargePower_L2
    minChargePower_L3?:                 types.Watt,                     // Minimum charge power on phase L3 in W, defined by max(EV, EVSE).
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumChargePower_L3
    maxChargePower?:                    types.Watt,                     // Maximum charge (absorbed) power in W, defined by min(EV, EVSE) at unity power factor.
                                                                        // This field represents the sum of all phases, unless values are provided for L2 and L3, in
                                                                        // which case this field represents phase L1. It corresponds to the ChaWMax attribute in the
                                                                        // IEC 61850. It is usually equivalent to the rated apparent power of the EV when discharging
                                                                        // (ChaVAMax) in IEC 61850.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumChargePower
    maxChargePower_L2?:                 types.Watt,                     // Maximum charge power on phase L2 in W, defined by min(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumChargePower_L2
    maxChargePower_L3?:                 types.Watt,                     // Maximum charge power on phase L3 in W, defined by min(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumChargePower_L3
    minDischargePower?:                 types.Watt,                     // Minimum discharge (injected) power in W, defined by max(EV, EVSE) at unity power factor.
                                                                        // Value >= 0. This field represents the sum of all phases, unless values are provided for
                                                                        // L2 and L3, in which case this field represents phase L1.
                                                                        // It corresponds to the WMax attribute in the IEC 61850. It is usually equivalent to the
                                                                        // rated apparent power of the EV when discharging (VAMax attribute in the IEC 61850).
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumDischargePower
    minDischargePower_L2?:              types.Watt,                     // Minimum discharge power on phase L2 in W, defined by max(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumDischargePower_L2
    minDischargePower_L3?:              types.Watt,                     // Minimum discharge power on phase L3 in W, defined by max(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMinimumDischargePower_L3
    maxDischargePower?:                 types.Watt,                     // Maximum discharge (injected) power in W, defined by min(EV, EVSE) at unity power factor.
                                                                        // Value >= 0. This field represents the sum of all phases, unless values are provided for L2
                                                                        // and L3, in which case this field represents phase L1.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumDischargePower
    maxDischargePower_L2?:              types.Watt,                     // Maximum discharge power on phase L2 in W, defined by min(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumDischargePowe_L2
    maxDischargePower_L3?:              types.Watt,                     // Maximum discharge power on phase L3 in W, defined by min(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_AC/DC_CPDReqEnergyTransferModeType: EVMaximumDischargePowe_L3
    minChargeCurrent?:                  types.Ampere,                   // Minimum charge current in A, defined by max(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMinimumChargeCurrent
    maxChargeCurrent?:                  types.Ampere,                   // Maximum charge current in A, defined by min(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMaximumChargeCurrent
    minDischargeCurrent?:               types.Ampere,                   // Minimum discharge current in A, defined by max(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMinimumDischargeCurrent
    maxDischargeCurrent?:               types.Ampere,                   // Maximum discharge current in A, defined by min(EV, EVSE). Value >= 0.
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMaximumDischargeCurrent
    minVoltage?:                        types.Volt,                     // Minimum voltage in V, defined by max(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMinimumVoltage
    maxVoltage?:                        types.Volt,                     // Maximum voltage in V, defined by min(EV, EVSE)
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: EVMaximumVoltage
    evTargetEnergyRequest?:             types.WattHour,                 // Energy to requested state of charge in Wh.
                                                                        // Related to: ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: EVTargetEnergyRequest
    evMinEnergyRequest?:                types.WattHour,                 // Energy to minimum allowed state of charge in Wh.
                                                                        // Related to: ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: EVMinimumEnergyRequest
    evMaxEnergyRequest?:                types.WattHour,                 // Energy to maximum state of charge in Wh.
                                                                        // Related to: ISO 15118-20: Dynamic/Scheduled_SEReqControlModeType: EVMaximumEnergyRequest
    evMinV2XEnergyRequest?:             types.WattHour,                 // Energy (in Wh) to minimum state of charge for cycling (V2X) activity. Positive value means
                                                                        // that current state of charge is below V2X range.
                                                                        // Related to: ISO 15118-20: Dynamic_SEReqControlModeType: EVMinimumV2XEnergyRequest
    evMaxV2XEnergyRequest?:             types.WattHour,                 // Energy (in Wh) to maximum state of charge for cycling (V2X) activity. Negative value
                                                                        // indicates that current state of charge is above V2X range.
                                                                        // Related to: ISO 15118-20: Dynamic_SEReqControlModeType: EVMaximumV2XEnergyRequest
    targetSoC?:                         types.Percentage,               // Target state of charge at departure as percentage.
                                                                        // Related to: ISO 15118-20: BPT_DC_CPDReqEnergyTransferModeType: TargetSOC
    customData?:                        ICustomData                     // Customer specific data.
}

export interface V2XFreqWattPoint {
    frequency:                          types.Hertz,                    // Net frequency in Hz.
    power:                              types.Watt,                     // Power in W to charge (positive) or discharge (negative) at specified frequency.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface V2XSignalWattPoint {
    signal:                             types.Integer,                  // Signal value from an AFRRSignalRequest.
    power:                              types.Watt,                     // Power in W to charge (positive) or discharge (negative) at specified frequency.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface VariableAttribute {
    type?:                              types.AttributeType,            // Attribute: Actual, MinSet, MaxSet, etc. Defaults to Actual if absent.
    value?:                             string,                         // Value of the attribute. May only be omitted when mutability is set to 'WriteOnly'.
                                                                        // The Configuration Variable ReportingValueSize can be used to limit
                                                                        // GetVariableResult.attributeValue, VariableAttribute.value and EventData.actualValue.
                                                                        // The max size of these values will always remain equal.
    mutability?:                        types.MutabilityType,           // Defines the mutability of this attribute. Default is ReadWrite when omitted.
    persistent?:                        boolean,                        // If true, value will be persistent across system reboots or power down.
                                                                        // Default when omitted is false.
    constant?:                          boolean,                        // If true, value that will never be changed by the Charging Station at runtime.
                                                                        // Default when omitted is false.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface VariableCharacteristics {
    unit?:                              UnitOfMeasure,                  // Unit of the variable. When the transmitted value has a unit, this field SHALL be included.
    dataType:                           types.DataType,                 // Data type of this variable.
    minLimit?:                          number,                         // Minimum possible value of this variable.
    maxLimit?:                          number,                         // Maximum possible value of this variable. When the datatype of this Variable is String, OptionList,
                                                                        // SequenceList or MemberList, this field defines the maximum length of the (CSV) string.
    maxElements?:                       types.Integer,                  // (2.1) Maximum number of elements from valuesList that are supported as attributeValue.
    valuesList?:                        types.CSVs,                     // Mandatory when dataType = OptionList, MemberList or SequenceList. In that case valuesList specifies
                                                                        // the allowed values for the type.
                                                                        // The length of this field can be limited by DeviceDataCtrlr.ConfigurationValueSize.
                                                                        //   * OptionList:   The (Actual) Variable value must be a single value from the reported (CSV)
                                                                        //                   enumeration list.
                                                                        //   * MemberList:   The (Actual) Variable value may be an (unordered) (sub-)set of the reported (CSV)
                                                                        //                   valid values list.
                                                                        //   * SequenceList: The (Actual) Variable value may be an ordered (priority, etc) (sub-)set of the
                                                                        //                   reported (CSV) valid values.
                                                                        // This is a comma separated list.
                                                                        // The Configuration Variable ConfigurationValueSize can be used to limit
                                                                        // SetVariableData.attributeValue and VariableCharacteristics.valueList.
                                                                        // The max size of these values will always remain equal.
    supportsMonitoring:                 boolean,                        // Flag indicating if this variable supports monitoring.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface VariableMonitoring {
    id:                                 types.VariableMonitoringId,     // Identifies the monitor.
    transaction:                        boolean,                        // Monitor only active when a transaction is ongoing on a component relevant to this transaction.
    value:                              number,                         // Value for threshold or delta monitoring.
                                                                        // For Periodic or PeriodicClockAligned this is the interval in seconds.
    type:                               types.MonitorType,              // The type of this monitor, e.g. a threshold, delta or periodic monitor.
    severity:                           types.SeverityLevel,            // The severity that will be assigned to an event that is triggered by this monitor. The severity
                                                                        // range is 0-9, with 0 as the highest and 9 as the lowest severity level.
    eventNotificationType?:             types.EventNotificationType,    // (2.1) Type of monitor.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface Variable {
    name:                               string,                         // Name of the variable. Name should be taken from the list of standardized variable names whenever
                                                                        // possible. Case Insensitive. strongly advised to use Camel Case.
    instance?:                          string,                         // Name of instance in case the variable exists as multiple instances.
                                                                        // Case Insensitive. Strongly advised to use Camel Case.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface VoltageParams {
    hvMeanValue10Min?:                  types.Decimal,                  // EN 50549-1 chapter 4.9.3.4 Voltage threshold for the 10 min time window mean value monitoring.
                                                                        // The 10 min mean is recalculated up to every 3 s. If the present voltage is above this threshold for
                                                                        // more than the time defined by OverVoltage10MinMeanTripDelay, the EV must trip. This value is
                                                                        // mandatory if OverVoltage10MinMeanTripDelay is set.
    hv10MinMeanTripDelay?:              types.Decimal,                  // Time for which the voltage is allowed to stay above the 10 min mean value. After this time, the EV
                                                                        // must trip. This value is mandatory if OverVoltageMeanValue10min is set.
    powerDuringCessation?:              types.PowerDuringCessation,     // Parameter is only sent, if the EV has to feed-in power or reactive power during fault-ride through
                                                                        // (FRT) as defined by HVMomCess curve and LVMomCess curve.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface VPN {
    server:                             string,                         // VPN Server Address
    user:                               string,                         // VPN User
    group?:                             string,                         // VPN group
    password:                           string,                         // VPN Password
    key:                                string,                         // VPN shared secret
    type:                               types.VPNType,                  // VPN type.
    customData?:                        ICustomData                     // Customer specific data.
}
