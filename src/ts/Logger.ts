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

export type Criticality = "INFO" | "WARNING" | "ERROR" | "CRITICAL";
export type MessageType = "request" | "requestError" | "response" | "responseError" | "message";

interface LogEvent {
    timestamp:    Date;
    criticality:  Criticality;
    type:         MessageType,
    message:      string;
}

export class Logger {

    private logs:         (LogEvent | null)[] = [];
    private maxSize:       number;
    private currentIndex:  number = 0;

    constructor(maxSize: number) {
        this.maxSize  = maxSize;
        this.logs     = new Array(maxSize).fill(null);
    }

    /**
     * Adds a new log event to the logger.
     * If the logger reaches its max size, it overwrites the oldest log in a circular manner.
     *
     * @param criticality - The criticality level of the log.
     * @param type - The type of message.
     * @param message - The log message.
     */
    public Log(criticality: Criticality,
               type:        MessageType,
               message:     string) : void
    {

        this.logs[this.currentIndex] = {
            timestamp: new Date(),
            criticality,
            type,
            message
        };

        this.currentIndex = (this.currentIndex + 1) % this.maxSize;

    }

    /**
     * Filters logs based on optional criteria.
     * Any combination of parameters can be used for filtering.
     *
     * @param criticality - Filter by criticality level.
     * @param start - Filter logs with timestamp on or after this date.
     * @param end - Filter logs with timestamp on or before this date.
     * @returns Filtered array of logs that match the criteria.
     */
    public Filter(criticality?:  Criticality,
                  start?:        Date,
                  end?:          Date) : LogEvent[]
    {

        return this.logs.slice(this.currentIndex).concat(this.logs.slice(0, this.currentIndex))
            .filter((log): log is LogEvent => log !== null)
            .filter(log => {
                const matchesCriticality = criticality ? log.criticality === criticality : true;
                const matchesStart       = start       ? log.timestamp    >= start       : true;
                const matchesEnd         = end         ? log.timestamp    <= end         : true;
                return matchesCriticality && matchesStart && matchesEnd;
            });

    }

    /**
     * Converts the current logs to a JSON blob for upload.
     *
     * @returns A Blob object containing the logs in JSON format.
     */
    public AsJSONFile(): Blob
    {

        const jsonData = JSON.stringify(
            this.logs.slice(this.currentIndex).concat(this.logs.slice(0, this.currentIndex))
                     .filter((log): log is LogEvent => log !== null),
            null,
            2
        );

        return new Blob([jsonData], { type: "application/json" });

    }

}
