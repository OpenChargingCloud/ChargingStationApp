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


export class ChargingStationConnector { //extends componentConfig.ComponentConfig {

    private parentEVSE:  any;

    public  id:          types.ConnectorId;
    public  type:        types.ConnectorType;

    constructor(parentEVSE:  any,
                id:          types.ConnectorId,
                type:        types.ConnectorType) {

        //super(parentEVSE.name + '_' + id,

        this.parentEVSE  = parentEVSE;
        this.id          = id;
        this.type        = type;

    }

}
