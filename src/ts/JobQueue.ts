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

export type JobType     = "reset"                |
                          "trigger"              |
                          "changeAvailability"   |
                          "getSecurityLog"       |
                          "getDiagnosticsLog"    |
                          "getDiagnostics"       |
                          "updateFirmware"       |
                          "updateSignedFirmware" |
                          "background";

export type JobSuccess  = "success"   |
                          "cancelled" |
                          "failed";

interface Job {
    id:           string;
    timestamp:    Date;
    type:         JobType,
    request:      any;
    context?:     any;
    success?:     JobSuccess;
    finishedAt?:  Date|null;
}

export class JobQueue {

    private logs:         (Job | null)[] = [];
    private maxSize:       number;
    private currentIndex:  number = 0;

    constructor(maxSize: number) {
        this.maxSize  = maxSize;
        this.logs     = new Array(maxSize).fill(null);
    }

    /**
     * Adds a new job to the queue.
     *
     * @param type - The type of job.
     * @param request - The request that created this job.
     * @param context - Optional context for this job.
     * 
     * @returns Whether the job was added.
     */
    public Add(id:        string,
               type:      JobType,
               request:   any,
               context?:  any) : boolean
    {

        this.logs[this.currentIndex] = {
            id,
            timestamp: new Date(),
            type,
            request: request,
            context,
            finishedAt: null
        };

        // All jobs are stored until the queue reaches its max size.
        // Then it overwrites the oldest job in a circular manner.
        this.currentIndex = (this.currentIndex + 1) % this.maxSize;

        return true;

    }

    /**
     * Marks a job as done.
     *
     * @param id - The id of the job to mark as done.
     * 
     * @returns Whether the job was found and marked as done.
     */
    public Done(id: string) : boolean
    {

        const job = this.logs.find(job => job?.id === id);

        if (job === undefined || job === null)
            return false;

        job.finishedAt = new Date();

        return true;

    }

    /**
     * Filters jobs based on optional criteria.
     * Any combination of parameters can be used for filtering.
     *
     * @param finished - Whether they are done or not.
     * @param start - Filter jobs with timestamp on or after this date.
     * @param end - Filter jobs with timestamp on or before this date.
     * @param filter - Additional filter function.
     * 
     * @returns Filtered array of jobs that match the criteria.
     */
    public Filter(finished?:  boolean,
                  start?:     Date,
                  end?:       Date,
                  filter?:    (job: Job) => boolean) : Job[]
    {

        return this.logs.slice (this.currentIndex).concat(this.logs.slice(0, this.currentIndex))
                        .filter((log): log is Job => log !== null)
                        .filter(log => {

                            const matchesDone    = finished ? log.finishedAt !== null  : true;
                            const matchesStart   = start    ? log.timestamp   >= start : true;
                            const matchesEnd     = end      ? log.timestamp   <= end   : true;
                            const matchesFilter  = filter   ? filter(log)              : true;

                            return matchesDone  &&
                                   matchesStart &&
                                   matchesEnd   &&
                                   matchesFilter;

                        });

    }

}
