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

import * as types    from './Types';
import * as complex  from './Complex';


export class LocalList {

    private tokens:       Map<types.IdToken, complex.IdTagInfo> = new Map();
    private maxSize:      number;
    private listVersion:  types.Integer;

    constructor(maxSize: number) {

        this.listVersion  = 0;
        this.maxSize      = maxSize;

    }

    /**
     * Adds a new idToken.
     *
     * @param idTag - The idToken to add.
     * @param idTagInfo - The information about the idToken.
     * 
     * @returns Whether the idToken was added.
     */
    public Add(idTag:      types.IdToken,
               idTagInfo:  complex.IdTagInfo) : boolean
    {

        if (!this.tokens.has(idTag) && this.tokens.size <= this.maxSize)
        {
            this.tokens.set(idTag, idTagInfo);
            return true;
        }

        return false;

    }

    /**
     * Gets the information about an idToken.
     *
     * @param idTag - The idToken to get the information for.
     * 
     * @returns The information about the idToken.
     */
    public Get(idTag: types.IdToken): complex.IdTagInfo | null {
        return this.tokens.get(idTag) || null;
    }

    /**
     * Removes an idToken.
     *
     * @param idTag - The idToken to remove
     * 
     * @returns Whether the idToken was removed.
     */
    public Remove(idTag: types.IdToken): boolean {
        return this.tokens.delete(idTag);
    }


    /**
     * Returns the version of the list.
     * 
     * @returns The version of the list.
     */
    public Version() : types.Integer
    {
        return this.listVersion;
    }


    /**
     * Processes authorization data.
     * 
     * @param newListVersion - The new version of the list.
     * @param localAuthorisationList - The list of authorization data.
     * @param updateType - The update type.
     * 
     * @returns Whether the processing was successful.
     */
    public ProcessAuthorizationData(newListVersion:          types.Integer,
                                    localAuthorisationList:  complex.AuthorizationData[],
                                    updateType:              types.UpdateType) : boolean
    {

        switch (updateType)
        {

            case "Full":
                this.tokens.clear();
                for (const authorization of localAuthorisationList)
                {
                    if (authorization.idTagInfo)
                        this.tokens.set(
                            authorization.idTag,
                            authorization.idTagInfo
                        );
                }
                this.listVersion = newListVersion;
                return true;

            case "Differential":
                for (const authorization of localAuthorisationList)
                {

                    if (authorization.idTagInfo)
                        this.tokens.set(
                            authorization.idTag,
                            authorization.idTagInfo
                        );

                    else
                        this.tokens.delete(authorization.idTag);

                }
                this.listVersion = newListVersion;
                return true;

            default:
                return false;

        }

    }

}
