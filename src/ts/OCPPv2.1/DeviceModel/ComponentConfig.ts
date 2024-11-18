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

import * as types   from '../Types';
import * as complex from '../Complex';


export class ComponentConfig {

    public name:               string;
    public instance:           string              | null = null;
    public evse:               complex.EVSE        | null = null;
    public variableConfigs:    Array<VariableConfig>;
    public description:        types.  i18nString  | null = null;
    public customData:         complex.ICustomData | null = null;


    constructor(name:              string,
                instance?:         string,
                evse?:             complex.EVSE,
                variableConfigs?:  Array<VariableConfig>,
                description?:      types.  i18nString,
                customData?:       complex.ICustomData) {

        this.name             = name;
        this.instance         = instance        ?? null;
        this.evse             = evse            ?? null;
        this.variableConfigs  = variableConfigs ?? [];
        this.description      = description     ?? null;
        this.customData       = customData      ?? null;

    }

}


export class VariableConfig {

    public name:             string;
    public valueGetter:      (() => string | null)                                           | null = null;
    public valueSetter:      ((newValue?: string, oldValue?: string) => ValueSetterResponse) | null = null;
    public instance:         string                                                          | null = null;
    public attributes:       complex.VariableAttribute                                       | null = null;
    public characteristics:  complex.VariableCharacteristics                                 | null = null;
    public monitorings:      complex.VariableMonitoring                                      | null = null;
    public description:      types.i18nString                                                | null = null;

    constructor(name:              string,
                valueGetter?:      () => string | null,
                valueSetter?:      (newValue?: string, oldValue?: string) => ValueSetterResponse,
                instance?:         string,
                attributes?:       complex.VariableAttribute,
                characteristics?:  complex.VariableCharacteristics,
                monitorings?:      complex.VariableMonitoring,
                description?:      types.i18nString) {

        this.name             = name;
        this.valueGetter      = valueGetter     ?? null;
        this.valueSetter      = valueSetter     ?? null;
        this.instance         = instance        ?? null;
        this.attributes       = attributes      ?? null;
        this.characteristics  = characteristics ?? null;
        this.monitorings      = monitorings     ?? null;
        this.description      = description     ?? null;

    }

}

export class ValueSetterResponse {

    public newValue:      string | null = null;
    public errorMessage:  string | null = null;

    constructor(newValue?:      string,
                errorMessage?:  string) {

        this.newValue      = newValue     ?? null;
        this.errorMessage  = errorMessage ?? null;

    }

}


export class VariableAttribute implements complex.VariableAttribute {

    public value?:       string;
    public type:         types.AttributeType;
    public mutability?:  types.MutabilityType;
    public persistent?:  boolean;
    public constant?:    boolean;
    public customData?:  complex.ICustomData;

    constructor(options: {
                    value?:       string,
                    type?:        types.AttributeType,
                    mutability?:  types.MutabilityType,
                    persistent?:  boolean,
                    constant?:    boolean,
                    customData?:  complex.ICustomData
                }) {

        this.value       = options.value;
        this.type        = options.type       ?? "Actual";
        this.mutability  = options.mutability ?? "ReadWrite";
        this.persistent  = options.persistent ?? false;
        this.constant    = options.constant   ?? false;
        this.customData  = options.customData;

    }

}


export class VariableCharacteristics implements complex.VariableCharacteristics {

    public unit?:               complex.UnitOfMeasure;
    public dataType:            types.  DataType;
    public minLimit?:           number;
    public maxLimit?:           number;
    public maxElements?:        types.Integer;
    public valuesList?:         types.CSVs;
    public supportsMonitoring:  boolean;
    public customData?:         complex.ICustomData;


    constructor(options: {
                    dataType:             types.DataType,
                    unit?:                complex.UnitOfMeasure,
                    minLimit?:            number,
                    maxLimit?:            number,
                    maxElements?:         types.Integer,
                    valuesList?:          types.CSVs,
                    supportsMonitoring?:  boolean,
                    customData?:          complex.ICustomData
                }) {

        this.dataType            = options.dataType;
        this.unit                = options.unit;
        this.minLimit            = options.minLimit;
        this.maxLimit            = options.maxLimit;
        this.maxElements         = options.maxElements;
        this.valuesList          = options.valuesList;
        this.supportsMonitoring  = options.supportsMonitoring ?? false;
        this.customData          = options.customData;

    }

}


export class VariableMonitoring implements complex.VariableMonitoring {

    public id:                      types.VariableMonitoringId;
    public transaction:             boolean;
    public value:                   number;
    public type:                    types.MonitorType;
    public severity:                types.SeverityLevel;
    public eventNotificationType?:  types.EventNotificationType;
    public customData?:             complex.ICustomData;

    constructor(options: {
                    id:                      types.VariableMonitoringId,
                    transaction:             boolean,
                    value:                   number,
                    type:                    types.MonitorType,
                    severity:                types.SeverityLevel,
                    eventNotificationType?:  types.EventNotificationType,
                    customData?:             complex.ICustomData
                }) {

        this.id                     = options.id;
        this.transaction            = options.transaction;
        this.value                  = options.value;
        this.type                   = options.type;
        this.severity               = options.severity;
        this.eventNotificationType  = options.eventNotificationType;
        this.customData             = options.customData;

    }

}
