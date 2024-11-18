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

import * as types            from '../../Types';
import * as complex          from '../../Complex';
import * as componentConfig  from '../ComponentConfig';
import * as logical          from '../ALogicalComponentConfig';


export class LocalAuthListCtrlr extends logical.ALogicalComponentConfig {

    /**
     * Whether Local Authorization List is enabled.
     */
    public enabled:               boolean;

    /**
     * Amount of IdTokens currently in the Local Authorization List. The maxLimit of
     * this variable SHALL be provided to report the maximum number of IdTokens that
     * can be stored in the Local Authorization List.
     */
    public entries:               number;

    /**
     * Whether Local Authorization List is supported.
     */
    public available:             boolean;

    /**
     * Maximum number of identifications that can be sent in a single SendLocalListRequest.
     */
    public itemsPerMessage:       number              | null = null;

    /**
     * Message Size (in bytes) - puts a constraint on SendLocalListRequest message size.
     */
    public bytesPerMessage:       number              | null = null;

    /**
     * Indicates the number of bytes currently used by the Local Authorization List.
     * MaxLimit indicates the maximum number of bytes that can be used by the Local
     * Authorization List.
     */
    public storage:               number              | null = null;

    /**
     * When set to true this variable disables the behavior to request authorization for
     * an idToken that is stored in the local authorization list with a status other than
     * Accepted, as stated in C14.FR.03.
     */
    public disablePostAuthorize:  boolean             | null = null;



    public instance:              string              | null = null;


    public customData:            complex.ICustomData | null = null;


    constructor(enabled?:               boolean,
                entries?:               number,
                available?:             boolean,
                itemsPerMessage?:       number,
                bytesPerMessage?:       number,
                storage?:               number,
                disablePostAuthorize?:  boolean,

                instance?:              string,
                customData?:            complex.ICustomData) {

        super('LocalAuthListCtrlr',
              instance,
              "Logical Component responsible for configuration relating to the use of Local Authorization Lists for charging station use.",
              customData);

        this.enabled               = enabled              ?? true;
        this.entries               = entries              ?? 1000;
        this.available             = available            ?? true;
        this.itemsPerMessage       = itemsPerMessage      ?? null;
        this.bytesPerMessage       = bytesPerMessage      ?? null;
        this.storage               = storage              ?? null;
        this.disablePostAuthorize  = disablePostAuthorize ?? null;

        this.instance              = instance             ?? null;
        this.customData            = customData           ?? null;

        // export interface VariableAttribute {
        //     type?:                              types.AttributeType,            // Attribute: Actual, MinSet, MaxSet, etc. Defaults to Actual if absent.
        //     value?:                             string,                         // Value of the attribute. May only be omitted when mutability is set to 'WriteOnly'.
        //                                                                         // The Configuration Variable ReportingValueSize can be used to limit
        //                                                                         // GetVariableResult.attributeValue, VariableAttribute.value and EventData.actualValue.
        //                                                                         // The max size of these values will always remain equal.
        //     mutability?:                        types.MutabilityType,           // Defines the mutability of this attribute. Default is ReadWrite when omitted.
        //     persistent?:                        boolean,                        // If true, value will be persistent across system reboots or power down.
        //                                                                         // Default when omitted is false.
        //     constant?:                          boolean,                        // If true, value that will never be changed by the Charging Station at runtime.
        //                                                                         // Default when omitted is false.
        //     customData?:                        ICustomData                     // Customer specific data.
        // }

        // export interface VariableCharacteristics {
        //     unit?:                              UnitOfMeasure,                  // Unit of the variable. When the transmitted value has a unit, this field SHALL be included.
        //     dataType:                           types.DataType,                 // Data type of this variable.
        //     minLimit?:                          number,                         // Minimum possible value of this variable.
        //     maxLimit?:                          number,                         // Maximum possible value of this variable. When the datatype of this Variable is String, OptionList,
        //                                                                         // SequenceList or MemberList, this field defines the maximum length of the (CSV) string.
        //     maxElements?:                       types.Integer,                  // (2.1) Maximum number of elements from valuesList that are supported as attributeValue.
        //     valuesList?:                        types.CSVs,                     // Mandatory when dataType = OptionList, MemberList or SequenceList. In that case valuesList specifies
        //                                                                         // the allowed values for the type.
        //                                                                         // The length of this field can be limited by DeviceDataCtrlr.ConfigurationValueSize.
        //                                                                         //   * OptionList:   The (Actual) Variable value must be a single value from the reported (CSV)
        //                                                                         //                   enumeration list.
        //                                                                         //   * MemberList:   The (Actual) Variable value may be an (unordered) (sub-)set of the reported (CSV)
        //                                                                         //                   valid values list.
        //                                                                         //   * SequenceList: The (Actual) Variable value may be an ordered (priority, etc) (sub-)set of the
        //                                                                         //                   reported (CSV) valid values.
        //                                                                         // This is a comma separated list.
        //                                                                         // The Configuration Variable ConfigurationValueSize can be used to limit
        //                                                                         // SetVariableData.attributeValue and VariableCharacteristics.valueList.
        //                                                                         // The max size of these values will always remain equal.
        //     supportsMonitoring:                 boolean,                        // Flag indicating if this variable supports monitoring.
        //     customData?:                        ICustomData                     // Customer specific data.
        // }

        // export interface UnitOfMeasure {
        //     unit?:                              types.UnitOfMeasure,            // Unit of the value. Default = "Wh" if the (default) measurand is an "Energy" type.
        //                                                                         // This field SHALL use a value from the list Standardized Units of Measurements in Part 2
        //                                                                         // Appendices. If an applicable unit is available in that list, otherwise a "custom" unit
        //                                                                         // might be used.
        //     multiplier:                         types.Integer,                  // Multiplier, this value represents the exponent to base 10. I.e. multiplier 3 means 10
        //                                                                         // raised to the 3rd power. Default is 0.
        //                                                                         // The multiplier only multiplies the value of the measurand.
        //                                                                         // It does not specify a conversion between units, for example, kW and W.
        //     customData?:                        ICustomData                     // Customer specific data.
        // }



        this.variableConfigs.push(
            new componentConfig.VariableConfig(
                'Enabled',
                () => this.enabled
                          ? 'true'
                          : 'false',
                (newValue?: string, oldValue?: string) => {
                    this.enabled = newValue === 'true';
                    return new componentConfig.ValueSetterResponse(newValue);
                },
                instance,
                new componentConfig.VariableAttribute({}),
                new componentConfig.VariableCharacteristics({
                    dataType:     "boolean"
                }),
                undefined,
                "If this variable exists and reports a value of true, Local Authorization List is enabled."
            )
        );

    }

}
