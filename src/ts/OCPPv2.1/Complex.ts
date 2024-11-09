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

export interface ChargingSchedulePeriod {
    startPeriod:                        types.Integer,
    limit:                              Number,
    numberPhases?:                      types.Integer,
    phaseToUse?:                        types.Integer,
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
    StateOfCharge?:                     types.PercentageInt,
    evEnergyCapacity?:                  types.Integer,
    fullSoC?:                           types.PercentageInt,
    bulkSoC?:                           types.PercentageInt,
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
