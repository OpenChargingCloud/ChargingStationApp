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

// Only OCPP Charging Station initiated messages!
// OCPP v2.1 Draft 2 (0.41)

//#region OCPP Messages

export interface AuthorizeRequest {
    idToken:                            IdToken,
    certificate?:                       Certificate,
    iso15118CertificateHashData?:       OCSPRequestData[],
    customData?:                        ICustomData
}

export interface BootNotificationRequest {
    chargingStation:                    ChargingStation,
    reason:                             BootReason,
    customData?:                        ICustomData
}

export interface ClearedChargingLimitRequest {
    chargingLimitSource:                ChargingLimitSource,
    evseId?:                            EVSEId,
    customData?:                        ICustomData
}

export interface DataTransferRequest {
    vendorId:                           VendorId,
    messageId?:                         string,
    data?:                              any,
    customData?:                        ICustomData
}

export interface FirmwareStatusNotificationRequest {
    status:                             FirmwareStatus,
    requestId?:                         RequestId,
    customData?:                        ICustomData
}

export interface Get15118EVCertificateRequest {
    iso15118SchemaVersion:              ISO15118SchemaVersion,
    action:                             CertificateAction,
    exiRequest:                         EXIData,
    maximumContractCertificateChains?:  Integer,
    prioritizedEMAIDs?:                 EMAId[],
    customData?:                        ICustomData
}

export interface GetCertificateStatusRequest {
    ocspRequestData:                    OCSPRequestData,
    customData?:                        ICustomData
}

export interface GetCRLRequest {
    requestId:                          RequestId,
    certificateHashData:                CertificateHashData,
    customData?:                        ICustomData
}

export interface HeartBeatRequest {
    customData?:                        ICustomData
}

export interface LogStatusNotificationRequest {
    status:                             UploadLogStatus,
    requestId:                          RequestId,
    customData?:                        ICustomData
}

export interface MeterValuesRequest {
    evseId:                             EVSEId,
    meterValue:                         MeterValue[],
    customData?:                        ICustomData
}

export interface NotifyChargingLimitRequest {
    chargingLimit:                      ChargingLimit,
    chargingSchedule:                   ChargingSchedule[],
    evseId?:                            EVSEId,
    customData?:                        ICustomData
}

export interface NotifyCustomerInformationRequest {
    requestId:                          RequestId,
    data:                               string,
    seqNo:                              Integer,
    generatedAt:                        Timestamp,
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface NotifyCustomerInformationRequest {
    requestId:                          RequestId,
    messageInfo:                        MessageInfo,
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface NotifyDisplayMessagesRequest {
    requestId:                          RequestId,
    messageInfo:                        MessageInfo[],
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface NotifyEVChargingNeedsRequest {
    timestamp?:                         Timestamp,
    evseId:                             EVSEId,
    chargingNeeds:                      ChargingNeeds,
    maxScheduleTuples?:                 Integer,
    customData?:                        ICustomData
}

export interface NotifyEVChargingScheduleRequest {
    timeBase:                           Timestamp,
    evseId:                             EVSEId,
    chargingSchedule:                   ChargingSchedule,
    selectedScheduleTupleId?:           Integer,
    powerToleranceAcceptance?:          boolean,
    customData?:                        ICustomData
}

export interface NotifyEventRequest {
    generatedAt:                        Timestamp,
    seqNo:                              Integer,
    eventData:                          EventData[],
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface NotifyMonitoringReportRequest {
    requestId:                          RequestId,
    seqNo:                              Integer,
    generatedAt:                        Timestamp,
    monitor:                            MonitoringData[],
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface NotifyPriorityChargingRequest {
    transactionId:                      TransactionId,
    activated:                          boolean,
    customData?:                        ICustomData
}

export interface NotifyReportRequest {
    requestId:                          RequestId,
    seqNo:                              Integer,
    generatedAt:                        Timestamp,
    reportData:                         ReportData[],
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface PublishFirmwareStatusNotificationRequest {
    status:                             PublishFirmwareStatus,
    requestId?:                         RequestId,
    location:                           URL[],
    customData?:                        ICustomData
}

export interface PullDynamicScheduleUpdateRequest {
    chargingProfileId:                  ChargingProfileId,
    customData?:                        ICustomData
}

export interface ReportChargingProfilesRequest {
    requestId:                          RequestId,
    chargingLimitSource:                ChargingLimitSource,
    evseId:                             EVSEId,
    chargingProfile:                    ChargingProfile[],
    tbc?:                               boolean,
    customData?:                        ICustomData
}

export interface ReservationStatusUpdateRequest {
    reservationId:                      ReservationId,
    reservationUpdateStatus:            ReservationUpdateStatus,
    customData?:                        ICustomData
}

export interface SecurityEventNotificationRequest {
    type:                               SecurityEventType,
    timestamp:                          Timestamp,
    techInfo?:                          string,
    customData?:                        ICustomData
}

export interface SignCertificateRequest {
    csr:                                string,
    certificateType:                    CertificateType,
    customData?:                        ICustomData
}

export interface StatusNotificationRequest {
    timestamp:                          Timestamp,
    connectorStatus:                    ConnectorStatus,
    evseId:                             EVSEId,
    connectorId:                        ConnectorId,
    customData?:                        ICustomData
}

export interface TransactionEventRequest {
    eventType:                          TransactionEvent,
    timestamp:                          Timestamp,
    triggerReason:                      TriggerReason,
    seqNo:                              Integer,
    transactionInfo:                    TransactionInfo,
    offline?:                           boolean,
    numberOfPhasesUsed?:                Integer,
    cableMaxCurrent?:                   Integer,
    reservationId?:                     ReservationId,
    idToken?:                           IdToken,
    evse?:                              EVSE,
    meterValue?:                        MeterValue[],
    customData?:                        ICustomData
}

//#endregion

//#region Complex Data Structures

export interface IdToken {
    idToken:                            IdToken2,
    type:                               IdTokenType,
    additionalInfo:                     AdditionalInfo[],
}

export interface AdditionalInfo {
    additionalIdToken:                  IdToken2,
    type:                               string,
    customData?:                        ICustomData,
}

export interface ICustomData {
    vendorId:                           VendorId,
    [key: string]:                      any,
}

export interface OCSPRequestData {
    hashAlgorithm:                      HashAlgorithm,
    issuerNameHash:                     string,
    issuerKeyHash:                      string,
    serialNumber:                       string,
    responderURL:                       URL,
    customData?:                        ICustomData,
}

export interface CertificateHashData {
    hashAlgorithm:                      HashAlgorithm,
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
    timestamp:                          Timestamp,
    sampledValue:                       SampledValue[],
    customData?:                        ICustomData
}

export interface SampledValue {
    value:                              string,
    context:                            ReadingContext,
    format:                             ValueFormat,
    measurand:                          Measurand,
    phase?:                             Phase,
    location?:                          MeteringLocation,
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
    unit:                               UnitOfMeasure,
    multiplier:                         Integer,
    customData?:                        ICustomData
}

export interface ChargingLimit {
    chargingLimitSource:                ChargingLimitSource,
    isGridCritical?:                    boolean,
    isLocalGeneration?:                 boolean,
    customData?:                        ICustomData
}

export interface ChargingSchedule {
    id:                                 ChargingScheduleId,
    startSchedule?:                     Timestamp,
    duration?:                          Integer,
    chargingRateUnit:                   ChargingRateUnit,
    minChargingRate?:                   number,
    useLocalTime?:                      boolean,
    randomizedDelay?:                   Integer,
    limitBeyondSoC?:                    LimitBeyondSoC,
    salesTariff?:                       SalesTariff,
    absolutePriceSchedule?:             AbsolutePriceSchedule,
    priceLevelSchedule?:                PriceLevelSchedule,
    signatureId?:                       Integer,
    digestValue?:                       string,
    powerTolerance?:                    number,
    chargingSchedulePeriod:             ChargingSchedulePeriod[],
    customData?:                        ICustomData
}

export interface LimitBeyondSoC {
    soc:                                Integer,
    limit:                              number,
    customData?:                        ICustomData
}

export interface AbsolutePriceSchedule {
    id:                                 string, // ???
    timeAnchor:                         Timestamp,
    priceScheduleID:                    PriceScheduleId,
    priceScheduleDescription?:          string,
    currency:                           Currency,
    language:                           Language,
    priceAlgorithm:                     PriceAlgorithm,
    minimumCost?:                       RationalNumber,
    maximumCost?:                       RationalNumber,
    taxRules?:                          TaxRule[],
    priceRuleStacks:                    PriceRuleStack[],
    overstayRules?:                     OverstayRuleList,
    additionalSelectedServices?:        AdditionalSelectedService[],
    customData?:                        ICustomData
}

export interface RationalNumber {
    exponent:                           Integer,
    value:                              Integer,
    customData?:                        ICustomData
}

export interface TaxRule {
    taxRuleID:                          TaxRuleId,
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
    duration:                           Integer,
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
    overstayTimeThreshold?:             Integer,
    overstayPowerThreshold?:            RationalNumber,
    overstayRule:                       OverstayRule,
    customData?:                        ICustomData
}

export interface OverstayRule {
    overstayRuleDesription?:            string,
    overstayFee:                        RationalNumber,
    overstayFeePeriod:                  Integer,
    customData?:                        ICustomData
}

export interface AdditionalSelectedService {
    serviceName:                        string,
    serviceFee:                         RationalNumber,
    customData?:                        ICustomData
}

export interface PriceLevelSchedule {
    timeAnchor:                         Timestamp,
    priceScheduleID:                    PriceScheduleId,
    priceScheduleDescription?:          string,
    numberOfPriceLevels:                Integer,
    priceLevelScheduleEntries:          PriceLevelScheduleEntry[],
    customData?:                        ICustomData
}

export interface PriceLevelScheduleEntry {
    duration:                           Integer,
    priceLevel:                         Integer,
    customData?:                        ICustomData
}

export interface ChargingSchedulePeriod {
    startPeriod:                        Integer,
    limit:                              Number,
    numberPhases?:                      Integer,
    phaseToUse?:                        Integer,
    customData?:                        ICustomData
}

export interface SalesTariff {
    id:                                 SalesTariffId,
    salesTariffEntry:                   SalesTariffEntry[],
    salesTariffDescription?:            string,
    numEPriceLevels?:                   Integer,
    customData?:                        ICustomData
}

export interface SalesTariffEntry {
    relativeTimeInterval:               RelativeTimeInterval,
    ePriceLevel?:                       Integer,
    consumptionCost?:                   ConsumptionCost[],
    customData?:                        ICustomData
}

export interface RelativeTimeInterval {
    start:                              Integer,
    duration?:                          Integer,
    customData?:                        ICustomData
}

export interface ConsumptionCost {
    startValue:                         Number,
    cost:                               Cost[],
    customData?:                        ICustomData
}

export interface Cost {
    costKind:                           CostKind,
    amount:                             Integer,
    amountMultiplier?:                  Integer,
    customData?:                        ICustomData
}

export interface MessageInfo {
    id:                                 DisplayMessageId,
    priority:                           MessagePriority,
    message:                            MessageContent,
    state?:                             MessageState,
    startTimestamp?:                    Timestamp,
    endTimestamp?:                      Timestamp,
    transactionId?:                     TransactionId,
    display?:                           Component,
    customData?:                        ICustomData
}

export interface MessageContent {
    content:                            string,
    format:                             MessageFormat,
    language?:                          LanguageId,
    customData?:                        ICustomData
}

export interface Component {
    name:                               string,
    instance?:                          string,
    evse?:                              EVSE,
    customData?:                        ICustomData
}

export interface EVSE {
    id:                                 EVSEId,
    connectorId?:                       ConnectorId,
    customData?:                        ICustomData
}

export interface ChargingNeeds {
    requestedEnergyTransfer:            EnergyTransferMode,
    departureTime?:                     Timestamp,
    acChargingParameters?:              ACChargingParameters,
    dcChargingParameters?:              DCChargingParameters,
    customData?:                        ICustomData
}

export interface ACChargingParameters {
    energyAmount:                       Integer,
    evMinCurrent:                       Integer,
    evMaxCurrent:                       Integer,
    evMaxVoltage:                       Integer,
    customData?:                        ICustomData
}    

export interface DCChargingParameters {
    evMaxCurrent:                       Integer,
    evMaxVoltage:                       Integer,
    energyAmount?:                      Integer,
    evMaxPower?:                        Integer,
    StateOfCharge?:                     PercentageInt,
    evEnergyCapacity?:                  Integer,
    fullSoC?:                           PercentageInt,
    bulkSoC?:                           PercentageInt,
    customData?:                        ICustomData
}

export interface EventData {
    eventId:                            EventId,
    timestamp:                          Timestamp,
    trigger:                            EventTrigger,
    actualValue:                        string,
    eventNotificationType:              EventNotificationType,
    severity:                           Serverity,
    component:                          Component,
    variable:                           Variable,
    cause?:                             EventId,
    techCode?:                          string,
    techInfo?:                          string,
    cleared?:                           boolean,
    transactionId?:                     TransactionId,
    variableMonitoringId?:              VariableMonitoringId,
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
    id:                                 VariableMonitoringId,
    transaction:                        boolean,
    value:                              number,
    type:                               MonitorType,
    severity:                           Severity,
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
    type?:                              AttributeType,
    value?:                             string,
    mutability?:                        MutabilityType,
    persistent?:                        boolean,
    constant?:                          boolean,
    customData?:                        ICustomData
}

export interface VariableCharacteristics {
    dataType:                           VariableDataType,
    supportsMonitoring:                 boolean,
    unit?:                              UnitsOfMeasure,
    minLimit?:                          number,
    maxLimit?:                          number,
    valuesList?:                        string, // Comma Separated List
    customData?:                        ICustomData
}

export interface ChargingProfile {
    id:                                 ChargingProfileId,
    transactionId?:                     TransactionId,
    stackLevel:                         Integer,
    chargingProfilePurpose:             ChargingProfilePurpose,
    chargingProfileKind:                ChargingProfileKind,
    validFrom?:                         Timestamp,
    validTo?:                           Timestamp,
    recurrencyKind?:                    RecurrencyKind,
    chargingSchedule:                   ChargingSchedule[],
    customData?:                        ICustomData
}

export interface SecurityEventType {
    text:                               SecurityEvent,
    description?:                       string,
    isCritical?:                        boolean
}

export interface TransactionInfo {
    transactionId:                      TransactionId,
    chargingState?:                     ChargingState,
    timeSpentCharging?:                 Integer,
    stoppedReason?:                     StopTransactionReason,
    remoteStartId?:                     RemoteStartId,
    customData?:                        ICustomData
}

//#endregion

//#region Types

// Currently just for clarity
type IdToken2                 = string;
type VendorId                 = string;
type Certificate              = string;
type RequestId                = number;
type EMAId                    = string;
type EVSEId                   = number;
type ISO15118SchemaVersion    = string;
type EXIData                  = string;
type Timestamp                = string;
type Integer                  = number;
type ChargingScheduleId       = string;
type PriceScheduleId          = number;
type Currency                 = string;
type Language                 = string;
type PriceAlgorithm           = string;
type TaxRuleId                = number;
type SalesTariffId            = string;
type DisplayMessageId         = number;
type LanguageId               = string;
type ConnectorId              = number;
type TransactionId            = number;
type PercentageInt            = number;
type EventId                  = number;
type Serverity                = number;
type VariableMonitoringId     = number;
type Severity                 = number;
type ChargingProfileId        = number;
type ReservationId            = number;
type RemoteStartId            = number;

type IdTokenType              = "Central"         |
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

type HashAlgorithm            = "SHA256" |
                                "SHA384" |
                                "SHA512" |
                                 string;

type BootReason               = "ApplicationReset" |
                                "FirmwareUpdate"   |
                                "LocalReset"       |
                                "PowerUp"          |
                                "RemoteReset"      |
                                "ScheduledReset"   |
                                "Triggered"        |
                                "Watchdog"         |
                                 string;

type ChargingLimitSource      = "EMS"   |
                                "Other" |
                                "SO"    |
                                "CSO"   |
                                 string;

type FirmwareStatus           = "Downloaded"                |
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

type CertificateAction        = "Install" |
                                "Update"  |
                                 string;

type UploadLogStatus          = "BadMessage"            |
                                "Idle"                  |
                                "NotSupportedOperation" |
                                "PermissionDenied"      |
                                "Uploaded"              |
                                "UploadFailure"         |
                                "Uploading"             |
                                "AcceptedCanceled"      |
                                 string;

type ReadingContext           = "Interruption.Begin" |
                                "Interruption.End"   |
                                "Other"              |
                                "Sample.Clock"       |
                                "Transaction.Begin"  |
                                "Transaction.End"    |
                                "Trigger"            |
                                "Sample.Periodic"    |
                                 string;
 
 type ValueFormat             = "Raw" |
                                "SignedData";
 
 type Measurand               = "Current.Export"                  |
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
 
 type Phase                   = "L1"    |
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
 
 type MeteringLocation        = "Body"   |
                                "Cable"  |
                                "EV"     |
                                "Inlet"  |
                                "Outlet" |
                                 string;
 
 type UnitOfMeasure           = "Celsius"    |
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

type ChargingRateUnit         = "A" |
                                "W" |
                                 string;

type CostKind                 = "CarbonDioxideEmission"         |
                                "RelativePricePercentage"       |
                                "RenewableGenerationPercentage" |
                                 string;

type MessagePriority          = "AlwaysFront" |
                                "InFront"     |
                                "NormalCycle" |
                                 string;

type MessageFormat            = "ASCII" |
                                "HTML"  |
                                "URI"   |
                                "UTF8"  |
                                 string;

type MessageState             = "Charging"    |
                                "Faulted"     |
                                "Idle"        |
                                "Unavailable" |
                                 string;

type EnergyTransferMode       = "DC"               |
                                "AC_single_phase"  |
                                "AC_two_phase"     |
                                "AC_three_phase"   |
                                 string;

type EventTrigger             = "Alerting" |
                                "Delta"    |
                                "Periodic" |
                                 string;

type EventNotificationType    = "HardWiredNotification" |
                                "HardWiredMonitor"      |
                                "PreconfiguredMonitor"  |
                                "CustomMonitor"         |
                                 string;

type MonitorType              = "UpperThreshold"       |
                                "LowerThreshold"       |
                                "Delta"                |
                                "Periodic"             |
                                "PeriodicClockAligned" |
                                 string;

type AttributeType            = "Actual" |
                                "Target" |
                                "MinSet" |
                                "MaxSet" |
                                 string;

type MutabilityType           = "ReadOnly"  |
                                "WriteOnly" |
                                "ReadWrite" |
                                 string;

type VariableDataType         = "ReadOnly"  |
                                "WriteOnly" |
                                "ReadWrite" |
                                 string;

type PublishFirmwareStatus    = "Idle"              |
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

type ChargingProfilePurpose   = "ChargingStationExternalConstraints" |
                                "ChargePointMaxProfile"              |
                                "TxProfile"                          |
                                "TxDefaultProfile"                   |
                                 string;

type ChargingProfileKind      = "Absolute"  |
                                "Recurring" |
                                "Relative"  |
                                 string;

type RecurrencyKind           = "Daily"  |
                                "Weekly" |
                                 string;

type ReservationUpdateStatus  = "Expired" |
                                "Removed" |
                                 string;

type SecurityEvent            = "FirmwareUpdated"                     |
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

type CertificateType          = "ChargingStationCertificate" |
                                "V2GCertificate"             |
                                 string;

type ConnectorStatus          = "Available"   |
                                "Occupied"    |
                                "Reserved"    |
                                "Unavailable" |
                                "Faulted"     |
                                 string;

type TransactionEvent         = "Started" |
                                "Updated" |
                                "Ended"   |
                                 string;

type TriggerReason            = "Authorized"           |
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

type ChargingState            = "Charging"      |
                                "EVConnected"   |
                                "SuspendedEV"   |
                                "SuspendedEVSE" |
                                "Idle"          |
                                 string;

type StopTransactionReason    = "DeAuthorized"       |
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

//#endregion
