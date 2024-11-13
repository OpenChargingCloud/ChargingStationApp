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


export enum ConfigurationKeyAccessRights
{
    ReadWrite,
    ReadOnly,
    WriteOnly
}

export enum ConfigurationKeyRequirement
{
    Required,
    Optional
}

export enum ConfigurationKeyTypes
{
    Boolean,
    Integer,
    String,
    CSL
}

export enum ConfigurationKeyUnits
{
    Times,
    Seconds,
    Percentage,
    Wh
}

export interface IConfigurationValue {

    Value:          string
    Type:           ConfigurationKeyTypes
    Required:       ConfigurationKeyRequirement
    AccessRights:   ConfigurationKeyAccessRights
    Description:    string

    updateValue(newValue: string): void;

}



export interface ChangeChargingStationAvailabilityDelegate {
    (newAvailability:  types.AvailabilityType): void;
}

export interface ChangeConnectorsAvailabilityDelegate {
    (connectorId:      types.ConnectorId,
     newAvailability:  types.AvailabilityType): void;
}

export interface ReservationDelegate {
    (connectorId:      types.ConnectorId,
     reservationId:    types.ReservationId,
     expiryDate:       types.Timestamp,
     idTag:            types.IdToken,
     parentIdTag?:     types.IdToken): types.ReservationStatus;
}

export interface ChargingSession {
    Id:                number;
    IdTag:             types.IdToken;
    ChargingProfile?:  complex.ChargingProfile;
}


export class OCPPConnector {

    constructor(Id: number) {
        this.Id = Id;
    }

    Id:                number;
    Availability:      types.AvailabilityType     = "Inoperative";
    Status:            types.ChargePointStatus    = "Unavailable";
    Session?:          ChargingSession;
    Reservation?:      OCPPReservation;
    ChargingProfiles:  Map<types.ChargingProfileId, complex.ChargingProfile>  = new Map;

    public StartSession(idTag:             types.IdToken,
                        chargingProfile?:  complex.ChargingProfile) : types.RemoteStartStopStatus
    {

        if (this.Status === "Available" ||
            this.Status === "Reserved")
        {

            this.Status   = "Occupied";
            this.Session  = {
                                Id:               1,
                                IdTag:            idTag,
                                ChargingProfile:  chargingProfile
                            };

            return "Accepted";

        }

        return "Rejected";

    }

}

export interface OCPPReservation {
    id:             types.ReservationId,
    expiryDate:     types.Timestamp,
    idTag:          types.IdToken,
    parentIdTag?:   types.IdToken
}
