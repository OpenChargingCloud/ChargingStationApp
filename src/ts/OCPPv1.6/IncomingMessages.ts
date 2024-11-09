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

import * as interfaces     from '../Interfaces';
import * as internal       from './Internal';
import * as complex        from './Complex';
import * as messages       from './Messages';
import * as Configuration  from './Configuration';

export class IncomingMessages {


    //#region Certificates

    // DeleteCertificate
    // GetInstalledCertificates
    // InstallCertificate
    // SendSignedCertificate

    //#endregion

    //#region Charging

    // CancelReservation
    // ClearChargingProfile
    // GetCompositeSchedule
    // RemoteStartTransaction
    // RemoteStopTransaction
    // ReserveNow
    // SetChargingProfile
    // UnlockConnector

    //#endregion

    //#region Common

    //TransferData

    //#endregion

    //#region Firmware

    // Reset
    // UpdateSignedFirmware
    // UpdateFirmware

    //#endregion

    //#region LocalList

    // ClearCache
    // GetLocalListVersion
    // SendLocalList

    //#endregion

    //#region Monitoring

    static ChangeAvailability(requestId:     string,
                              request:       { connectorId: number, type: string },
                              commandView:   HTMLDivElement,
                              sendResponse:  interfaces.SendResponseDelegate)
    {

        //#region Change Availability variants

        const textView = document.createElement('div');
        textView.className = "description";

        textView.innerHTML = `Set connector ${request.connectorId} `;

        switch (request.type)
        {

            case "Inoperative":
                textView.innerHTML += "inoperative";
                break;

            case "Operative":
                textView.innerHTML += "operative";
                break;

        }

        commandView.appendChild(textView);

        //#endregion

        //#region Accept, Reject or Schedule

        const buttonsDiv           = document.createElement('div');
        buttonsDiv.className       = "buttons";

        const buttonAccept         = document.createElement("button");
        buttonAccept.innerHTML     = "Accept";
        buttonAccept.onclick       = () => {
            buttonAccept.disabled    = true;
            buttonReject.disabled    = true;
            buttonScheduled.disabled = true;
            sendResponse(requestId, { "status": "Accepted" });
        }
        buttonsDiv.appendChild(buttonAccept);

        const buttonReject         = document.createElement("button");
        buttonReject.innerHTML     = "Reject";
        buttonReject.onclick       = () => {
            buttonAccept.disabled    = true;
            buttonReject.disabled    = true;
            buttonScheduled.disabled = true;
            sendResponse(requestId, { "status": "Rejected" });
        }
        buttonsDiv.appendChild(buttonReject);

        const buttonScheduled      = document.createElement("button");
        buttonScheduled.innerHTML  = "Schedule";
        buttonScheduled.onclick    = () => {
            buttonAccept.disabled    = true;
            buttonReject.disabled    = true;
            buttonScheduled.disabled = true;
            sendResponse(requestId, { "status": "Scheduled" });
        }
        buttonsDiv.appendChild(buttonScheduled);

        commandView.appendChild(buttonsDiv);

        //#endregion

    }

    static ChangeConfiguration(requestId:      string,
                               request:        messages.ChangeConfigurationRequest,
                               configuration:  Configuration.Configuration,
                               commandView:    HTMLDivElement,
                               sendResponse:   interfaces.SendResponseDelegate)
    {

        if (request.key && request.value)
        {

            var entry = configuration.get(request.key);

            if (entry === undefined)
            {

                configuration.set(
                    request.key,
                    Configuration.ConfigurationValue.Create(request.value)
                );

                sendResponse(
                    requestId,
                    {
                        status:  "Accepted"
                    } satisfies messages.ChangeConfigurationResponse
                );

            }

            else if (entry.AccessRights === internal.ConfigurationKeyAccessRights.ReadWrite ||
                     entry.AccessRights === internal.ConfigurationKeyAccessRights.WriteOnly)
            {

                entry.updateValue(
                    request.value
                );

                sendResponse(
                    requestId,
                    {
                        status:  "Accepted"
                    } satisfies messages.ChangeConfigurationResponse
                );

            }

            else
                sendResponse(
                    requestId,
                    {
                        status:  "Rejected"
                    } satisfies messages.ChangeConfigurationResponse
                );

        }

        else
            sendResponse(
                requestId,
                {
                    status:  "Rejected"
                } satisfies messages.ChangeConfigurationResponse
            );

    }

    // ExtenedTrigger

    static GetConfiguration(requestId:      string,
                            request:        messages.GetConfigurationRequest,
                            configuration:  Configuration.Configuration,
                            commandView:    HTMLDivElement,
                            sendResponse:   interfaces.SendResponseDelegate)
    {

        const keys = request.key ?? [];

        const configurationKeys: Array<complex.KeyValue>  = [];
        const unknownKeys:       Array<string>          = [];

        if (!keys || keys.length === 0)
        {
            for (const kvp of configuration.all())
            {
                if (kvp[1].AccessRights !== internal.ConfigurationKeyAccessRights.WriteOnly)
                    configurationKeys.push({
                        key:       kvp[0],
                        value:     kvp[1].Value,
                        readonly:  kvp[1].AccessRights === internal.ConfigurationKeyAccessRights.ReadOnly
                    });
            }
        }

        else {
            for (const key of keys) {

                const configurationValue = configuration.get(key);

                if (configurationValue === undefined ||
                    configurationValue.AccessRights === internal.ConfigurationKeyAccessRights.WriteOnly)
                {
                    unknownKeys.push(key);
                }

                else
                    configurationKeys.push({
                        key:       key,
                        value:     configurationValue.Value,
                        readonly:  configurationValue.AccessRights === internal.ConfigurationKeyAccessRights.ReadOnly
                    });

            }
        }

        sendResponse(
            requestId,
            {
                configurationKey:  configurationKeys,
                unknownKey:        unknownKeys
            } satisfies messages.GetConfigurationResponse
        );

    }

    // GetDiagnostics
    // GetLog
    // Trigger

    //#endregion

}
