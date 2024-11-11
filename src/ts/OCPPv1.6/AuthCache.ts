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

export interface AuthCacheEntry extends complex.IdTagInfo {
    autoRemoveAfter:  Date;
}

export class AuthCache {

    private cachedTokens:    Map<types.IdToken, AuthCacheEntry> = new Map();
    private maxSize:         number;
    private defaultTimeout:  number = 30 * 60 * 1000;  // Default to 30 minutes
    private cleanupTimer:    NodeJS.Timeout;
    private cleanupEvery:    number = 60 * 1000;       // Default to 1 minute

    constructor(maxSize: number) {

        this.maxSize = maxSize;

        // Has to be set withing the constructor!
        this.cleanupTimer = setInterval(
            () => this.removeOutdatedEntries(),
            this.cleanupEvery
        );

    }


    /**
     * Starts the cleanup interval with the current interval duration.
     */
    private start44CleanupInterval(): void {

        this.cleanupTimer = setInterval(
                                   () => this.removeOutdatedEntries(),
                                   this.cleanupEvery
                               );

    }

    /**
     * Checks and removes outdated entries based on their autoRemoveAfter date.
     */
    private removeOutdatedEntries(): void {

        const now = new Date();

        for (const [idTag, entry] of this.cachedTokens.entries()) {
            if (entry.autoRemoveAfter <= now)
                this.cachedTokens.delete(idTag);
        }

    }


    /**
     * Changes the cleanup interval duration and restarts the timer.
     * 
     * @param newIntervalDuration - The new interval duration in milliseconds.
     * 
     * @returns Whether the interval duration was updated.
     */
    public setCleanupInterval(newIntervalDuration: number): boolean {

        if (newIntervalDuration > 0) {

            clearInterval(this.cleanupTimer);

            this.cleanupEvery = newIntervalDuration;
            this.cleanupTimer = setInterval(
                () => this.removeOutdatedEntries(),
                this.cleanupEvery
            );

            return true;

        }

        return false;

    }

    /**
     * Clears the cleanup interval when the instance is no longer in use.
     */
    public stopCleanup(): void {
        clearInterval(this.cleanupTimer);
    }




    /**
     * Adds a new idToken.
     *
     * @param idTag - The idToken to add.
     * @param idTagInfo - The information about the idToken.
     * @param autoRemoveAfter - The date when the idToken should be removed automatically.
     * 
     * @returns Whether the idToken was added.
     */
    public Add(idTag:             types.IdToken,
               idTagInfo:         complex.IdTagInfo,
               autoRemoveAfter?:  Date) : boolean
    {

        if (this.cachedTokens.size <= this.maxSize)
        {

            this.cachedTokens.set(
                idTag,
                {
                    ...idTagInfo,
                    autoRemoveAfter: autoRemoveAfter ?? new Date(Date.now() + this.defaultTimeout)
                }
            );

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
        return this.cachedTokens.get(idTag) || null;
    }

    /**
     * Removes an idToken.
     *
     * @param idTag - The idToken to remove
     * 
     * @returns Whether the idToken was removed.
     */
    public Remove(idTag: types.IdToken): boolean {
        return this.cachedTokens.delete(idTag);
    }

    /**
     * Clears all cached idTokens.
     */
    public Clear(): void {
        this.cachedTokens.clear();
    }


}
