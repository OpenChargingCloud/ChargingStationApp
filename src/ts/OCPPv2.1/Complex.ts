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


export interface PeriodicEventStreamParams {
    interval?:                          types.Integer,                  // Time in seconds after which stream data is sent.
    vales?:                             types.Integer                   // Number of items to be sent together in stream.
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

export interface MessageContent {
    format:                             types.MessageFormat,            // Format of the message.
    language?:                          types.Language,                 // Message language identifier. Contains a language code as defined in [RFC5646].
    content:                            string,                         // (2.1) Required. Message contents. Maximum length supported by Charging Station is given in
                                                                        // OCPPCommCtrlr.FieldLength["MessageContentType.content"]. Maximum length defaults to 1024.
}

export interface TransactionLimit {
    maxCost?:                           types.Integer,                  // Maximum allowed cost of transaction.
    maxEnergy?:                         types.Integer,                  // Maximum allowed energy to charge in transaction.
    maxTime?:                           types.Integer,                  // Maximum duration of transaction from start to end.
    maxSoC?:                            types.Percentage,               // Maximum allowed state of charge at end of the charging session.
}

export interface BatteryData {
    evseId:                             types.EVSEId,                   // Slot number where battery is inserted or removed.
    serialNumber:                       string,                         // Serial number of the battery.
    SoC:                                types.Percentage,               // State of charge of the battery.
    SoH:                                types.Percentage,               // State of health of the battery.
    productionDate?:                    types.Timestamp,                // Date of production of the battery.
    vendorInfo?:                        string,                         // Vendor-specific info from battery in undefined format.
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

export interface Price {
    exclTax?:                           types.Decimal,                  // Price/cost excluding tax. Can be absent if inclTax is present.
    inclTax?:                           types.Decimal,                  // Price/cost including tax. Can be absent if exclTax is present.
    taxRates?:                          Array<TaxRate>,                 // Tax percentages that were used to calculate inclTax from exclTax (for displaying/printing on invoices).
}

export interface TaxRate {
    type:                               types.TaxRateType,              // Type of this tax, e.g. "Federal ", "State", for information on receipt.
    tax:                                types.Percentage,               // Tax rate in percentage.
}

export interface TariffEnergy {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffEnergyPrice>,       // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffEnergyPrice {
    priceKwh:                           types.Decimal,                  // Price per kWh (excl. tax) for this element.
    stepSize?:                          types.Integer,                  // When absent, the exact amount is billed. When present, this type is billed in blocks of stepSize
                                                                        // of the base unit: Wh. Amounts are rounded up to a multiple of stepSize.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
}

export interface TariffTime {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffTimePrice>,         // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffTimePrice {
    priceMinute:                        types.Decimal,                  // Price per minute (excl. tax) for this element.
    stepSize?:                          types.Integer,                  // When absent, the exact amount is billed. When present, this type is billed in blocks of stepSize
                                                                        // of the base unit: Wh. Amounts are rounded up to a multiple of stepSize.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
}

export interface TariffFixed {
    taxRates?:                          Array<TaxRate>,                 // Applicable tax percentages for this tariff dimension. If omitted, no tax is applicable.
                                                                        // Not providing a tax is different from 0% tax, which would be a value of 0.0 here.
    prices:                             Array<TariffFixedPrice>,        // Element tariff price and conditions.
    customData?:                        ICustomData                     // Customer specific data.
}

export interface TariffFixedPrice {
    priceFixed:                         types.Decimal,                  // Fixed price for this element e.g. a start fee.
    conditions?:                        TariffConditions,               // Conditions when this tariff element price is applicable.
}

export interface TariffConditions {
    startTimeOfDay?:                    types.TimeOfDay,                // Start time of day in local time. Must be in 24h format with leading zeros.
                                                                        // Hour/Minute separator: ":" Regex: ([0-1][0-9]|2[0-3]):[0-5][0-9]
    endTimeOfDay?:                      types.TimeOfDay,                // End time of day in local time. Same syntax as startTimeOfDay. If end time < start time then
                                                                        // the period wraps around to the next day. To stop at end of the day use: 00:00.
    validFrom?:                         types.LocalDate,                // Optional. Start date in local time, for example: 2015-12-24. Valid from this day (inclusive).
                                                                        // Regex: ([12][0-9]+{3}+)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])
    validTo?:                           types.LocalDate,                // End date in local time, for example: 2015-12-27. Valid until this day (exclusive). Same syntax as validFrom.
    minEnergy?:                         types.Wh,                       // Minimum consumed energy in Wh, for example 20000 Wh. Valid from this amount of energy (inclusive) being used.
    maxEnergy?:                         types.Wh,                       // Maximum consumed energy in Wh, for example 50000 Wh. Valid until this amount of energy (exclusive) being used.
    minCurrent?:                        types.Amperage,                 // Sum of the minimum current (in Amperes) over all phases, for example 5 A. When the EV is charging with
                                                                        // more than, or equal to, the defined amount of current, this TariffElement is/becomes active. If the
                                                                        // charging current is or becomes lower, this TariffElement is not or no longer valid and becomes inactive.
                                                                        // This is NOT about the minimum current over the entire transaction.
    maxCurrent?:                        types.Amperage,                 // Sum of the maximum current (in Amperes) over all phases, for example 20 A. When the EV is charging
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

export interface ChargingProfileCriteria {
    evseId?:                            types.EVSEId,                   // Specifies the id of the EVSE for which to clear charging profiles. An evseId of zero (0) specifies the
                                                                        // charging profile for the overall Charging Station. Absence of this parameter means the clearing applies
                                                                        // to all charging profiles that match the other criteria in the request.
    chargingProfilePurpose?:            types.ChargingProfilePurpose,   // Specifies to purpose of the charging profiles that will be cleared, if they meet the other criteria in the request.
    stackLevel?:                        types.Integer,                  // Specifies the stackLevel for which charging profiles will be cleared, if they meet the other criteria in the request.
}

export interface ClearTariffsResult {
    tariffId?:                          types.TariffId,                 // Id of tariff for which status is reported. If no tariffs were found, then this field is absent,
                                                                        // and status will be NoTariff.
    status:                             types.TariffStatus,             // Status of the operation.
    statusInfo?:                        StatusInfo                      // Additional status information.
}

export interface ClearMonitoringResult {
    status:                             types.ClearMonitoringStatus,    // Result of the clear request for this monitor, identified by its Id.
    id:                                 types.MonitoringId,             // Id of the monitor of which a clear was requested.
    statusInfo?:                        StatusInfo                      // Element providing more information about the status.
}

export interface ChargingProfileCriterion {
    chargingProfilePurpose?:            types.ChargingProfilePurpose,   // Defines the purpose of the schedule transferred by this profile.
    stackLevel?:                        types.Integer,                  // Value determining level in hierarchy stack of profiles. Higher values have precedence over lower values.
                                                                        // Lowest level is 0.
    chargingProfileId?:                 Array<types.ChargingProfileId>, // List of all the chargingProfileIds requested. Any ChargingProfile that matches one of these profiles will
                                                                        // be reported. If omitted, the Charging Station SHALL not filter on chargingProfileId. This field SHALL NOT
                                                                        // contain more ids than set in ChargingProfileEntries.maxLimit.
    chargingLimitSource?:               types.ChargingLimitSource,      // For which charging limit sources, charging profiles SHALL be reported.
                                                                        // If omitted, the Charging Station SHALL not filter on chargingLimitSource.
                                                                        // Values defined in Appendix as ChargingLimitSourceEnumStringType.
}

export interface CompositeSchedule {
    evseId:                             types.EVSEId,                   // The id of the EVSE for which the composite schedule is requested.
    duration:                           types.Seconds,                  // The duration of the composite schedule in seconds.
    scheduleStart:                      types.Timestamp,                // The start time of the composite schedule.
    chargingRateUnit:                   types.ChargingRateUnit,         // The unit of measure for the charging rate.
    chargingSchedulePeriod:             Array<ChargingSchedulePeriod>,  // List of ChargingSchedulePeriod elements defining maximum power or current over time.
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

export interface V2XFreqWattPoint {
    frequency:                          types.Hertz,                    // Net frequency in Hz.
    power:                              types.Watt                      // Power in W to charge (positive) or discharge (negative) at specified frequency.
}

export interface V2XSignalWattPoint {
    signal:                             types.Integer,                  // Signal value from an AFRRSignalRequest.
    power:                              types.Watt                      // Power in W to charge (positive) or discharge (negative) at specified frequency.
}
















export interface IdToken {
    idToken:                            types.IdToken2,
    type:                               types.IdTokenType,
    additionalInfo:                     AdditionalInfo[],
}

export interface AdditionalInfo {
    additionalIdToken:                  types.IdToken2,
    type:                               string,
    customData?:                        ICustomData,
}

export interface ICustomData {
    vendorId:                           types.VendorId,
    [key: string]:                      any,
}

export interface OCSPRequestData {
    hashAlgorithm:                      types.HashAlgorithm,
    issuerNameHash:                     string,
    issuerKeyHash:                      string,
    serialNumber:                       string,
    responderURL:                       URL,
    customData?:                        ICustomData,
}

export interface CertificateHashData {
    hashAlgorithm:                      types.HashAlgorithm,
    issuerNameHash:                     string,
    issuerKeyHash:                      string,
    serialNumber:                       string,
    customData?:                        ICustomData,
}

export interface ChargingStation {
    model:                              string,
    vendorName:                         string,
    serialNumber?:                      string,
    modem?:                             Modem,
    firmwareVersion?:                   string,
    customData?:                        ICustomData,

}
export interface Modem {
    iccid?:                             string,
    imsi?:                              string,
    customData?:                        ICustomData,
}

export interface MeterValue {
    timestamp:                          types.Timestamp,
    sampledValue:                       SampledValue[],
    customData?:                        ICustomData
}

export interface SampledValue {
    value:                              string,
    context:                            types.ReadingContext,
    format:                             types.ValueFormat,
    measurand:                          types.Measurand,
    phase?:                             types.Phase,
    location?:                          types.MeteringLocation,
    signedMeterValue?:                  SignedMeterValue[],
    unit?:                              UnitsOfMeasure,
    customData?:                        ICustomData
}

export interface SignedMeterValue {
    signedMeterData:                    string,
    signingMethod:                      string,
    encodingMethod:                     string,
    publicKey:                          string,
    customData?:                        ICustomData
}

export interface UnitsOfMeasure {
    unit:                               types.UnitOfMeasure,
    multiplier:                         types.Integer,
    customData?:                        ICustomData
}

export interface ChargingLimit {
    chargingLimitSource:                types.ChargingLimitSource,
    isGridCritical?:                    boolean,
    isLocalGeneration?:                 boolean,
    customData?:                        ICustomData
}

export interface ChargingSchedule {
    id:                                 types.ChargingScheduleId,
    startSchedule?:                     types.Timestamp,
    duration?:                          types.Integer,
    chargingRateUnit:                   types.ChargingRateUnit,
    minChargingRate?:                   number,
    useLocalTime?:                      boolean,
    randomizedDelay?:                   types.Integer,
    limitBeyondSoC?:                    LimitBeyondSoC,
    salesTariff?:                       SalesTariff,
    absolutePriceSchedule?:             AbsolutePriceSchedule,
    priceLevelSchedule?:                PriceLevelSchedule,
    signatureId?:                       types.Integer,
    digestValue?:                       string,
    powerTolerance?:                    number,
    chargingSchedulePeriod:             ChargingSchedulePeriod[],
    customData?:                        ICustomData
}

export interface LimitBeyondSoC {
    soc:                                types.Integer,
    limit:                              number,
    customData?:                        ICustomData
}

export interface AbsolutePriceSchedule {
    id:                                 string, // ???
    timeAnchor:                         types.Timestamp,
    priceScheduleID:                    types.PriceScheduleId,
    priceScheduleDescription?:          string,
    currency:                           types.Currency,
    language:                           types.Language,
    priceAlgorithm:                     types.PriceAlgorithm,
    minimumCost?:                       RationalNumber,
    maximumCost?:                       RationalNumber,
    taxRules?:                          TaxRule[],
    priceRuleStacks:                    PriceRuleStack[],
    overstayRules?:                     OverstayRuleList,
    additionalSelectedServices?:        AdditionalSelectedService[],
    customData?:                        ICustomData
}

export interface RationalNumber {
    exponent:                           types.Integer,
    value:                              types.Integer,
    customData?:                        ICustomData
}

export interface TaxRule {
    taxRuleID:                          types.TaxRuleId,
    taxRuleName?:                       string,
    taxRate:                            RationalNumber,
    taxIncludedInPrice?:                boolean,
    appliesToEnergyFee:                 boolean,
    appliesToParkingFee:                boolean,
    appliesToOverstayFee:               boolean,
    appliesToMinimumMaximumCost:        boolean,
    customData?:                        ICustomData
}

export interface PriceRuleStack {
    duration:                           types.Integer,
    priceRule:                          PriceRule,
    customData?:                        ICustomData
}

export interface PriceRule {
    energyFee:                          RationalNumber,
    parkingFee?:                        RationalNumber,
    parkingFeePeriod?:                  RationalNumber,
    carbonDioxideEmission?:             RationalNumber,
    renewableGenerationPercentage?:     RationalNumber,
    powerRangeStart:                    RationalNumber,
    customData?:                        ICustomData
}

export interface OverstayRuleList {
    overstayTimeThreshold?:             types.Integer,
    overstayPowerThreshold?:            RationalNumber,
    overstayRule:                       OverstayRule,
    customData?:                        ICustomData
}

export interface OverstayRule {
    overstayRuleDesription?:            string,
    overstayFee:                        RationalNumber,
    overstayFeePeriod:                  types.Integer,
    customData?:                        ICustomData
}

export interface AdditionalSelectedService {
    serviceName:                        string,
    serviceFee:                         RationalNumber,
    customData?:                        ICustomData
}

export interface PriceLevelSchedule {
    timeAnchor:                         types.Timestamp,
    priceScheduleID:                    types.PriceScheduleId,
    priceScheduleDescription?:          string,
    numberOfPriceLevels:                types.Integer,
    priceLevelScheduleEntries:          PriceLevelScheduleEntry[],
    customData?:                        ICustomData
}

export interface PriceLevelScheduleEntry {
    duration:                           types.Integer,
    priceLevel:                         types.Integer,
    customData?:                        ICustomData
}

export interface SalesTariff {
    id:                                 types.SalesTariffId,
    salesTariffEntry:                   SalesTariffEntry[],
    salesTariffDescription?:            string,
    numEPriceLevels?:                   types.Integer,
    customData?:                        ICustomData
}

export interface SalesTariffEntry {
    relativeTimeInterval:               RelativeTimeInterval,
    ePriceLevel?:                       types.Integer,
    consumptionCost?:                   ConsumptionCost[],
    customData?:                        ICustomData
}

export interface RelativeTimeInterval {
    start:                              types.Integer,
    duration?:                          types.Integer,
    customData?:                        ICustomData
}

export interface ConsumptionCost {
    startValue:                         Number,
    cost:                               Cost[],
    customData?:                        ICustomData
}

export interface Cost {
    costKind:                           types.CostKind,
    amount:                             types.Integer,
    amountMultiplier?:                  types.Integer,
    customData?:                        ICustomData
}

export interface MessageInfo {
    id:                                 types.DisplayMessageId,
    priority:                           types.MessagePriority,
    message:                            MessageContent,
    state?:                             types.MessageState,
    startTimestamp?:                    types.Timestamp,
    endTimestamp?:                      types.Timestamp,
    transactionId?:                     types.TransactionId,
    display?:                           Component,
    customData?:                        ICustomData
}

export interface MessageContent {
    content:                            string,
    format:                             types.MessageFormat,
    language?:                          types.LanguageId,
    customData?:                        ICustomData
}

export interface Component {
    name:                               string,
    instance?:                          string,
    evse?:                              EVSE,
    customData?:                        ICustomData
}

export interface EVSE {
    id:                                 types.EVSEId,
    connectorId?:                       types.ConnectorId,
    customData?:                        ICustomData
}

export interface ChargingNeeds {
    requestedEnergyTransfer:            types.EnergyTransferMode,
    departureTime?:                     types.Timestamp,
    acChargingParameters?:              ACChargingParameters,
    dcChargingParameters?:              DCChargingParameters,
    customData?:                        ICustomData
}

export interface ACChargingParameters {
    energyAmount:                       types.Integer,
    evMinCurrent:                       types.Integer,
    evMaxCurrent:                       types.Integer,
    evMaxVoltage:                       types.Integer,
    customData?:                        ICustomData
}    

export interface DCChargingParameters {
    evMaxCurrent:                       types.Integer,
    evMaxVoltage:                       types.Integer,
    energyAmount?:                      types.Integer,
    evMaxPower?:                        types.Integer,
    StateOfCharge?:                     types.Percentage,
    evEnergyCapacity?:                  types.Integer,
    fullSoC?:                           types.Percentage,
    bulkSoC?:                           types.Percentage,
    customData?:                        ICustomData
}

export interface EventData {
    eventId:                            types.EventId,
    timestamp:                          types.Timestamp,
    trigger:                            types.EventTrigger,
    actualValue:                        string,
    eventNotificationType:              types.EventNotificationType,
    severity:                           types.Serverity,
    component:                          Component,
    variable:                           Variable,
    cause?:                             types.EventId,
    techCode?:                          string,
    techInfo?:                          string,
    cleared?:                           boolean,
    transactionId?:                     types.TransactionId,
    variableMonitoringId?:              types.VariableMonitoringId,
    customData?:                        ICustomData
}

export interface Variable {
    name:                               string,
    instance?:                          string,
    customData?:                        ICustomData
}

export interface MonitoringData {
    component:                          Component,
    variable:                           Variable,
    variableMonitoring:                 VariableMonitoring[],
    customData?:                        ICustomData
}

export interface VariableMonitoring {
    id:                                 types.VariableMonitoringId,
    transaction:                        boolean,
    value:                              number,
    type:                               types.MonitorType,
    severity:                           types.Severity,
    customData?:                        ICustomData
}

export interface ReportData {
    component:                          Component,
    variable:                           Variable,
    variableAttribute:                  VariableAttribute[],
    variableCharacteristics?:           VariableCharacteristics,
    customData?:                        ICustomData
}

export interface VariableAttribute {
    type?:                              types.AttributeType,
    value?:                             string,
    mutability?:                        types.MutabilityType,
    persistent?:                        boolean,
    constant?:                          boolean,
    customData?:                        ICustomData
}

export interface VariableCharacteristics {
    dataType:                           types.VariableDataType,
    supportsMonitoring:                 boolean,
    unit?:                              UnitsOfMeasure,
    minLimit?:                          number,
    maxLimit?:                          number,
    valuesList?:                        string, // Comma Separated List
    customData?:                        ICustomData
}

export interface ChargingProfile {
    id:                                 types.ChargingProfileId,
    transactionId?:                     types.TransactionId,
    stackLevel:                         types.Integer,
    chargingProfilePurpose:             types.ChargingProfilePurpose,
    chargingProfileKind:                types.ChargingProfileKind,
    validFrom?:                         types.Timestamp,
    validTo?:                           types.Timestamp,
    recurrencyKind?:                    types.RecurrencyKind,
    chargingSchedule:                   ChargingSchedule[],
    customData?:                        ICustomData
}

export interface SecurityEventType {
    text:                               types.SecurityEvent,
    description?:                       string,
    isCritical?:                        boolean
}

export interface TransactionInfo {
    transactionId:                      types.TransactionId,
    chargingState?:                     types.ChargingState,
    timeSpentCharging?:                 types.Integer,
    stoppedReason?:                     types.StopTransactionReason,
    remoteStartId?:                     types.RemoteStartId,
    customData?:                        ICustomData
}



export interface StatusInfo {
    reasonCode:                         string,
    additionalInfo?:                    string
}
