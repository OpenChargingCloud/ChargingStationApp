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

import * as IOCPPv1_6   from './Internal';

export class ConfigurationValue implements IOCPPv1_6.IConfigurationValue {

    Value:         string;
    Type:          IOCPPv1_6.ConfigurationKeyTypes;
    Required:      IOCPPv1_6.ConfigurationKeyRequirement;
    ReadOnly:      boolean;
    AccessRights:  IOCPPv1_6.ConfigurationKeyAccessRights;
    Unit?:         IOCPPv1_6.ConfigurationKeyUnits;
    Description:   string;

    constructor(Value:         string,
                Type:          IOCPPv1_6.ConfigurationKeyTypes,
                Required:      IOCPPv1_6.ConfigurationKeyRequirement,
                AccessRights:  IOCPPv1_6.ConfigurationKeyAccessRights,
                Unit?:         IOCPPv1_6.ConfigurationKeyUnits,
                Description:   string = "") {

        this.Value         = Value;
        this.Type          = Type;
        this.Required      = Required;
        this.ReadOnly      = AccessRights === IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly;
        this.AccessRights  = AccessRights;
        this.Unit          = Unit;
        this.Description   = Description;

    }

    static Create(Value: string) : ConfigurationValue {

        return new ConfigurationValue(
                   Value,
                   IOCPPv1_6.ConfigurationKeyTypes.String,
                   IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                   IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                   undefined,
                   ""
               );

    }


    updateValue(newValue: string): void {
        if (!this.ReadOnly) {
            this.Value = newValue;
        } else {
            throw new Error("Cannot update readonly value!");
        }
    }

}


/**
 * Standard Configuration Key Names
 *
 * This class represents the configuration keys used in the application. 
 * Each key corresponds to a configurable setting, providing access 
 * to key names and default values where applicable.
 */
export class ConfigurationKey {

    //#region Core Profile

    static readonly AllowOfflineTxForUnknownId               = "AllowOfflineTxForUnknownId";
    static readonly AuthorizationCacheEnabled                = "AuthorizationCacheEnabled";
    static readonly AuthorizeRemoteTxRequests                = "AuthorizeRemoteTxRequests";
    static readonly BlinkRepeat                              = "BlinkRepeat";
    static readonly ClockAlignedDataInterval                 = "ClockAlignedDataInterval";
    static readonly ConnectionTimeOut                        = "ConnectionTimeOut";
    static readonly ConnectorPhaseRotation                   = "ConnectorPhaseRotation";
    static readonly ConnectorPhaseRotationMaxLength          = "ConnectorPhaseRotationMaxLength";
    static readonly GetConfigurationMaxKeys                  = "GetConfigurationMaxKeys";
    static readonly HeartbeatInterval                        = "HeartbeatInterval";
    static readonly LightIntensity                           = "LightIntensity";
    static readonly LocalAuthorizeOffline                    = "LocalAuthorizeOffline";
    static readonly LocalPreAuthorize                        = "LocalPreAuthorize";
    static readonly MaxEnergyOnInvalidId                     = "MaxEnergyOnInvalidId";
    static readonly MeterValuesAlignedData                   = "MeterValuesAlignedData";
    static readonly MeterValuesAlignedDataMaxLength          = "MeterValuesAlignedDataMaxLength";
    static readonly MeterValueSampleInterval                 = "MeterValueSampleInterval";
    static readonly MinimumStatusDuration                    = "MinimumStatusDuration";
    static readonly NumberOfConnectors                       = "NumberOfConnectors";
    static readonly ResetRetries                             = "ResetRetries";
    static readonly StopTransactionOnEVSideDisconnect        = "StopTransactionOnEVSideDisconnect";
    static readonly StopTransactionOnInvalidId               = "StopTransactionOnInvalidId";
    static readonly StopTxnAlignedData                       = "StopTxnAlignedData";
    static readonly StopTxnAlignedDataMaxLength              = "StopTxnAlignedDataMaxLength";
    static readonly StopTxnSampledData                       = "StopTxnSampledData";
    static readonly StopTxnSampledDataMaxLength              = "StopTxnSampledDataMaxLength";
    static readonly SupportedFeatureProfiles                 = "SupportedFeatureProfiles";
    static readonly SupportedFeatureProfilesMaxLength        = "SupportedFeatureProfilesMaxLength";
    static readonly TransactionMessageAttempts               = "TransactionMessageAttempts";
    static readonly TransactionMessageRetryInterval          = "TransactionMessageRetryInterval";
    static readonly UnlockConnectorOnEVSideDisconnect        = "UnlockConnectorOnEVSideDisconnect";
    static readonly WebSocketPingInterval                    = "WebSocketPingInterval";

    static readonly SupportedFileTransferProtocols           = "SupportedFileTransferProtocols";

    //#endregion

    //#region Local Auth List Management Profile

    static readonly LocalAuthListEnabled                     = "LocalAuthListEnabled";
    static readonly LocalAuthListMaxLength                   = "LocalAuthListMaxLength";
    static readonly SendLocalListMaxLength                   = "SendLocalListMaxLength";

    //#endregion

    //#region Reservation Profile

    static readonly ReserveConnectorZeroSupported            = "ReserveConnectorZeroSupported";

    //#endregion

    //#region Smart Charging Profile

    static readonly ChargeProfileMaxStackLevel               = "ChargeProfileMaxStackLevel";
    static readonly ChargingScheduleAllowedChargingRateUnit  = "ChargingScheduleAllowedChargingRateUnit";
    static readonly ChargingScheduleMaxPeriods               = "ChargingScheduleMaxPeriods";
    static readonly ConnectorSwitch3to1PhaseSupported        = "ConnectorSwitch3to1PhaseSupported";
    static readonly MaxChargingProfilesInstalled             = "MaxChargingProfilesInstalled";

    //#endregion

    //#region Security Extensions

    static readonly AdditionalRootCertificateCheck           = "AdditionalRootCertificateCheck";
    static readonly AuthorizationKey                         = "AuthorizationKey";
    static readonly CertificateSignedMaxChainSize            = "CertificateSignedMaxChainSize";
    static readonly CertificateStoreMaxLength                = "CertificateStoreMaxLength";
    static readonly CpoName                                  = "CpoName";
    static readonly SecurityProfile                          = "SecurityProfile";

    //#endregion

    // SupportedFileTransferProtocols (Not defined under 9.!!!)


    static readonly ChargingStationId                        = "ChargingStationId";


}


/**
 * Standard Configuration Key Names & Values
 */
export class Configuration {

    private configuration: Map<string, IOCPPv1_6.IConfigurationValue> = new Map<string, IOCPPv1_6.IConfigurationValue>();

    AllowOfflineTxForUnknownId = this.configuration.get(ConfigurationKey.AllowOfflineTxForUnknownId);

    constructor() {

        //#region Standard Configuration Key Names & Values

        //#region Core Profile

        this.configuration.set(
            ConfigurationKey.AllowOfflineTxForUnknownId,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "If this key exists, the Charge Point supports Unknown Offline Authorization. If this key reports a value of true, Unknown Offline Authorization is enabled."
            )
        );

        this.configuration.set(
            ConfigurationKey.AuthorizationCacheEnabled,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "If this key exists, the Charge Point supports an Authorization Cache. If this key reports a value of true, the Authorization Cache is enabled."
            )
        );

        this.configuration.set(
            ConfigurationKey.AuthorizeRemoteTxRequests,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite, //ReadOnly
                undefined,
                "Whether a remote request to start a transaction in the form of a RemoteStartTransaction.req message should be authorized beforehand like a local action to start a transaction."
            )
        );

        this.configuration.set(
            ConfigurationKey.BlinkRepeat,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Times,
                "Number of times to blink Charge Point lighting when signalling."
            )
        );

        this.configuration.set(
            ConfigurationKey.ClockAlignedDataInterval,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                `Size (in seconds) of the clock-aligned data interval. This is the size (in seconds) of the set of evenly spaced aggregation intervals 
per day, starting at 00:00:00 (midnight). For example, a value of 900 (15 minutes) indicates that every day should be broken into 
96 15-minute intervals. 
When clock aligned data is being transmitted, the interval in question is identified by the start time and (optional) duration 
interval value, represented according to the ISO8601 standard. All "per-period" data (e.g. energy readings) should be 
accumulated (for "flow" type measurands such as energy), or averaged (for other values) across the entire interval (or partial 
interval, at the beginning or end of a Transaction), and transmitted (if so enabled) at the end of each interval, bearing the 
interval start time timestamp. 
A value of "0" (numeric zero), by convention, is to be interpreted to mean that no clock-aligned data should be transmitted.`
            )
        );

        this.configuration.set(
            ConfigurationKey.ConnectionTimeOut,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                `Interval *from beginning of status: 'Preparing' until incipient Transaction is automatically canceled, due to failure of EV driver to
(correctly) insert the charging cable connector(s) into the appropriate socket(s). The Charge Point SHALL go back to the original
state, probably: 'Available'.`
            )
        );

        this.configuration.set(
            ConfigurationKey.ConnectorPhaseRotation,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `The phase rotation per connector in respect to the connector’s electrical meter (or if absent, the grid connection). Possible 
values per connector are: 
NotApplicable (for Single phase or DC Charge Points) 
Unknown (not (yet) known) 
RST (Standard Reference Phasing) 
RTS (Reversed Reference Phasing) 
SRT (Reversed 240 degree rotation) 
STR (Standard 120 degree rotation) 
TRS (Standard 240 degree rotation) 
TSR (Reversed 120 degree rotation) 
R can be identified as phase 1 (L1), S as phase 2 (L2), T as phase 3 (L3).
If known, the Charge Point MAY also report the phase rotation between the grid connection and the main energymeter by 
using index number Zero (0).
Values are reported in CSL, formatted: 0.RST, 1.RST, 2.RTS`
            )
        );

        this.configuration.set(
            ConfigurationKey.ConnectionTimeOut,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                `Interval *from beginning of status: 'Preparing' until incipient Transaction is automatically canceled, due to failure of EV driver to
(correctly) insert the charging cable connector(s) into the appropriate socket(s). The Charge Point SHALL go back to the original
state, probably: 'Available'.`
            )
        );

        this.configuration.set(
            ConfigurationKey.ConnectorPhaseRotationMaxLength,
            new ConfigurationValue(
                "false",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of items in a ConnectorPhaseRotation Configuration Key."
            )
        );

        this.configuration.set(
            ConfigurationKey.GetConfigurationMaxKeys,
            new ConfigurationValue(
                "1024",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of requested configuration keys in a GetConfiguration.req PDU."
            )
        );

        this.configuration.set(
            ConfigurationKey.HeartbeatInterval,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                "Interval of inactivity (no OCPP exchanges) with central system after which the Charge Point should send a Heartbeat.req PDU."
            )
        );

        this.configuration.set(
            ConfigurationKey.LightIntensity,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Percentage,
                "Percentage of maximum intensity at which to illuminate Charge Point lighting."
            )
        );

        this.configuration.set(
            ConfigurationKey.LocalAuthorizeOffline,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "Whether the Charge Point, when offline, will start a transaction for locally-authorized identifiers."
            )
        );

        this.configuration.set(
            ConfigurationKey.LocalPreAuthorize,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `Whether the Charge Point, when online, will start a transaction for locally-authorized identifiers without waiting for or
requesting an Authorize.conf from the Central System`
            )
        );

        this.configuration.set(
            ConfigurationKey.MaxEnergyOnInvalidId,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Wh,
                "Maximum energy in Wh delivered when an identifier is invalidated by the Central System after start of a transaction."
            )
        );

        this.configuration.set(
            ConfigurationKey.MeterValuesAlignedData,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "Clock-aligned measurand(s) to be included in a MeterValues.req PDU, every ClockAlignedDataInterval seconds."
            )
        );

        this.configuration.set(
            ConfigurationKey.MeterValuesAlignedDataMaxLength,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of items in a MeterValuesAlignedData Configuration Key."
            )
        );

        this.configuration.set(
            ConfigurationKey.MeterValueSampleInterval,
            new ConfigurationValue(
                "300",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                `Interval between sampling of metering (or other) data, intended to be transmitted by "MeterValues" PDUs. For charging
session data (ConnectorId>0), samples are acquired and transmitted periodically at this interval from the start of the charging
transaction.
A value of "0" (numeric zero), by convention, is to be interpreted to mean that no sampled data should be transmitted.`
            )
        );

        this.configuration.set(
            ConfigurationKey.NumberOfConnectors,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "The number of physical charging connectors of this Charge Point."
            )
        );

        this.configuration.set(
            ConfigurationKey.ResetRetries,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Times,
                "Number of times to retry an unsuccessful reset of the Charge Point."
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTransactionOnEVSideDisconnect,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "When set to true, the Charge Point SHALL administratively stop the transaction when the cable is unplugged from the EV."
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTransactionOnInvalidId,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `Whether the Charge Point will stop an ongoing transaction when it receives
a non- Accepted authorization status in a StartTransaction.conf for this transaction.`
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTxnAlignedData,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `Clock-aligned periodic measurand(s) to be included in the TransactionData element of StopTransaction.req MeterValues.req
PDU for every ClockAlignedDataInterval of the Transaction.`
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTxnAlignedDataMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of items in a StopTxnAlignedData Configuration Key."
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTxnSampledData,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `Sampled measurands to be included in the TransactionData element of StopTransaction.req PDU, every
MeterValueSampleInterval seconds from the start of the charging session.`
            )
        );

        this.configuration.set(
            ConfigurationKey.StopTxnSampledDataMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of items in a StopTxnSampledData Configuration Key."
            )
        );

        this.configuration.set(
            ConfigurationKey.SupportedFeatureProfiles,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                `A list of supported Feature Profiles. Possible profile identifiers:
Core, FirmwareManagement, LocalAuthListManagement, Reservation, SmartCharging and RemoteTrigger.`
            )
        );

        this.configuration.set(
            ConfigurationKey.SupportedFeatureProfilesMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of items in a SupportedFeatureProfiles Configuration Key."
            )
        );

        this.configuration.set(
            ConfigurationKey.TransactionMessageAttempts,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Times,
                "How often the Charge Point should try to submit a transaction-related message when the Central System fails to process it."
            )
        );

        this.configuration.set(
            ConfigurationKey.TransactionMessageRetryInterval,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                "How long the Charge Point should wait before resubmitting a transaction-related message that the Central System failed to process."
            )
        );

        this.configuration.set(
            ConfigurationKey.UnlockConnectorOnEVSideDisconnect,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "When set to true, the Charge Point SHALL unlock the cable on Charge Point side when the cable is unplugged at the EV."
            )
        );

        this.configuration.set(
            ConfigurationKey.WebSocketPingInterval,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                IOCPPv1_6.ConfigurationKeyUnits.Seconds,
                `Only relevant for websocket implementations. 0 disables client side websocket Ping/Pong. In this case there is either no 
ping/pong or the server initiates the ping and client responds with Pong. Positive values are interpreted as number of seconds 
between pings. Negative values are not allowed. ChangeConfiguration is expected to return a REJECTED result.`
            )
        );


        this.configuration.set(
            ConfigurationKey.SupportedFileTransferProtocols,
            new ConfigurationValue(
                "HTTP, HTTPS",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "The list of supported File Transfer Protocols."
            )
        );

        //#endregion

        //#region Local Auth List Management Profile

        this.configuration.set(
            ConfigurationKey.LocalAuthListEnabled,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "Whether the Local Authorization List is enabled."
            )
        );

        this.configuration.set(
            ConfigurationKey.LocalAuthListMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of identifications that can be stored in the Local Authorization List."
            )
        );

        this.configuration.set(
            ConfigurationKey.SendLocalListMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of identifications that can be send in a single SendLocalList.req."
            )
        );

        //#endregion

        //#region Reservation Profile

        this.configuration.set(
            ConfigurationKey.ReserveConnectorZeroSupported,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "Whether the Local Authorization List is enabled."
            )
        );

        //#endregion

        //#region Smart Charging Profile

        this.configuration.set(
            ConfigurationKey.ChargeProfileMaxStackLevel,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                `Max StackLevel of a ChargingProfile. The number defined also indicates the max allowed
number of installed charging schedules per Charging Profile Purposes.`
            )
        );

        this.configuration.set(
            ConfigurationKey.ChargingScheduleAllowedChargingRateUnit,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.CSL,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "A list of supported quantities for use in a ChargingSchedule. Allowed values: 'Current' and 'Power'."
            )
        );

        this.configuration.set(
            ConfigurationKey.ChargingScheduleMaxPeriods,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of periods that may be defined per ChargingSchedule."
            )
        );

        this.configuration.set(
            ConfigurationKey.ConnectorSwitch3to1PhaseSupported,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "If defined and true, this Charge Point support switching from 3 to 1 phase during a Transaction."
            )
        );

        this.configuration.set(
            ConfigurationKey.MaxChargingProfilesInstalled,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of Charging profiles installed at a time."
            )
        );

        //#endregion

        //#region Security Extensions

        this.configuration.set(
            ConfigurationKey.AdditionalRootCertificateCheck,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Boolean,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                `When set to true, only one certificate (plus a temporarily fallback certificate) of certificateType CentralSystemRootCertificate is
allowed to be installed at a time. When installing a new Central System Root certificate, the new certificate SHALL replace the
old one AND the new Central System Root Certificate MUST be signed by the old Central System Root Certificate it is replacing.
This configuration key is required unless only "security profile 1 - Unsecured Transport with Basic Authentication" is
implemented. Please note that security profile 1 SHOULD only be used in trusted networks.
Note: When using this additional security mechanism please be aware that the Charge Point needs to perform a full certificate chain
verification when the new Central System Root certificate is being installed. However, once the old Central System Root certificate is set
as the fallback certificate, the Charge Point needs to perform a partial certificate chain verification when verifying the server certificate
during the TLS handshake. Otherwise the verification will fail once the old Central System Root (fallback) certificate is either expired or
removed.`
            )
        );

        this.configuration.set(
            ConfigurationKey.AuthorizationKey,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.String,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.WriteOnly,
                undefined,
                `The basic authentication password is used for HTTP Basic Authentication, minimal length: 16 bytes.
It is strongly advised to be randomly generated binary to get maximal entropy. Hexadecimal represented (20 bytes maximum,
represented as a string of up to 40 hexadecimal digits).
This configuration key is write-only, so that it cannot be accidentally stored in plaintext by the Central System when it reads out
all configuration keys.
This configuration key is required unless only "security profile 3 - TLS with client side certificates" is implemented.`
            )
        );

        this.configuration.set(
            ConfigurationKey.CertificateSignedMaxChainSize,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                `This configuration key can be used to limit the size of the 'certificateChain' field from the CertificateSigned.req PDU. The value
of this configuration key has a maximum limit of 10.000 characters.`
            )
        );

        this.configuration.set(
            ConfigurationKey.CertificateStoreMaxLength,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadOnly,
                undefined,
                "Maximum number of Root/CA certificates that can be installed in the Charge Point."
            )
        );

        this.configuration.set(
            ConfigurationKey.CpoName,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.String,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `This configuration key contains CPO name (or an organization trusted by the CPO) as used in the Charge Point Certificate. This
is the CPO name that is to be used in a CSR send via: SignCertificate.req.`
            )
        );

        this.configuration.set(
            ConfigurationKey.SecurityProfile,
            new ConfigurationValue(
                "1",
                IOCPPv1_6.ConfigurationKeyTypes.Integer,
                IOCPPv1_6.ConfigurationKeyRequirement.Optional,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                `This configuration key is used to set the security profile used by the Charge Point.
The value of this configuration key can only be increased to a higher level, not decreased to a lower level, if the Charge Point
receives a lower value then currently configured,the Charge Point SHALL Rejected the ChangeConfiguration.req
Before accepting the new value, the Charge Point SHALL check if all the prerequisites for the new Security Profile are met, if
not, the Charge Point SHALL Rejected the ChangeConfiguration.req.
After the security profile was successfully changed, the Charge Point disconnects from the Central System and SHALL
reconnect using the new configured Security Profile.
Default, when no security profile is yet configured: 0.`
            )
        );

        //#endregion

        //#endregion


        this.configuration.set(
            ConfigurationKey.ChargingStationId,
            new ConfigurationValue(
                "test",
                IOCPPv1_6.ConfigurationKeyTypes.String,
                IOCPPv1_6.ConfigurationKeyRequirement.Required,
                IOCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                undefined,
                "The name of the charging station."
            )
        );


    }

    public set(key: string, value: IOCPPv1_6.IConfigurationValue) {
        this.configuration.set(key, value);
    }

    public get(key: string): IOCPPv1_6.IConfigurationValue|undefined {
        return this.configuration.get(key);
    }

    public all(): Map<string, IOCPPv1_6.IConfigurationValue> {
        return this.configuration;
    }

}
