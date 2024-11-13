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

import * as types    from './OCPPv1.6/Types';
import * as complex  from './OCPPv1.6/Complex';

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

interface Certificate {
    type:   types.CertificateUse;
    PEM:    string;
}

export class Certificates {

    private certificates:  Map<string, Certificate> = new Map();
    private maxSize:       number;

    constructor(maxSize: number) {
        this.maxSize  = maxSize;
    }

    /**
     * Adds a new certificate.
     *
     * @param PEM - The PEM encoded certificate.
     * @param type - The type of the certificate.
     * 
     * @returns Whether the certificate was added.
     */
    public Add(PEM:   string,
               type:  types.CertificateUse) : types.CertificateStatus
    {

        if (this.certificates.size >= this.maxSize)
            return "Failed";

        //ToDo: Parse PEM certificate!
        const id = "1";

        this.certificates.set(
            id,
            {
                PEM:   PEM,
                type:  type
            }
        );

        return "Accepted";

    }

    /**
     * 
     * @param SerialNumber The id of the certificate.
     * 
     * @returns Whether the certificate was removed.
     */
    public Remove(SerialNumber: string) : boolean
    {
        return this.certificates.delete(SerialNumber);
    }

    /**
     * Filters certificates based on optional criteria.
     * Any combination of parameters can be used for filtering.
     *
     * @param type - Filter the type of certificates.
     * @param filter - Additional filter function.
     * 
     * @returns Filtered array of certificates that match the criteria.
     */
    public Filter(type?:    types.CertificateUse,
                  filter?: (certificate: Certificate) => boolean) : Certificate[]
    {

        return Array.from(this.certificates.values())
                    .filter(certificate => {

                        const matchesType   = type   ? certificate.type === type : true;
                        const matchesFilter = filter ? filter(certificate)       : true;

                        return matchesType &&
                               matchesFilter;

                    });

    }

}
