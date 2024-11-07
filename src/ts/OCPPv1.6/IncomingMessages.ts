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

import * as Interfaces  from '../Interfaces';
import * as OCPPv1_6    from './IOCPPv1_6';


export class IncomingMessages {



    //#region Monitoring

    static ChangeAvailability(requestId:     string,
                              request:       { connectorId: number, type: string },
                              commandView:   HTMLDivElement,
                              sendResponse:  Interfaces.SendResponseDelegate)
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

    static ChangeConfiguration(requestId:     string,
                               request:       { key: string, value: string },
                               settings:      Map<string, OCPPv1_6.IConfigurationValue>,
                               commandView:   HTMLDivElement,
                               sendResponse:  Interfaces.SendResponseDelegate)
    {

        if (request.key && request.value)
        {

            var setting = settings.get(request.key);

            if (setting === undefined)
            {

                settings.set(request.key, {
                    AccessRights:  OCPPv1_6.ConfigurationKeyAccessRights.ReadWrite,
                    Value:         request.value
                });

                sendResponse(requestId, { "status": "Accepted" });

            }

            else if (setting.AccessRights === OCPPv1_6.ConfigurationKeyAccessRights.ReadWrite ||
                     setting.AccessRights === OCPPv1_6.ConfigurationKeyAccessRights.WriteOnly)
            {

                settings.set(request.key, {
                    AccessRights:  setting.AccessRights,
                    Value:         request.value
                });

                sendResponse(requestId, { "status": "Accepted" });

            }

            else
                sendResponse(requestId, { "status": "Rejected" });

        }

        else
            sendResponse(requestId, { "status": "Rejected" });

    }

    static GetConfiguration(requestId:     string,
                            request:       { key?: string[] },
                            settings:      Map<string, OCPPv1_6.IConfigurationValue>,
                            commandView:   HTMLDivElement,
                            sendResponse:  Interfaces.SendResponseDelegate)
    {

        const keys = request.key ?? [];

        const configurationKeys: Array<OCPPv1_6.IConfigurationKey>  = [];
        const unknownKeys:       Array<string>                      = [];

        if (!keys || keys.length === 0)
        {
            for (const kvp of settings)
            {
                if (kvp[1].AccessRights !== OCPPv1_6.ConfigurationKeyAccessRights.WriteOnly)
                    configurationKeys.push({
                        key:       kvp[0],
                        value:     kvp[1].Value,
                        readonly:  kvp[1].AccessRights === OCPPv1_6.ConfigurationKeyAccessRights.ReadOnly
                    });
            }
        }

        else {
            for (const key of keys) {

                const configurationValue = settings.get(key);

                if (configurationValue === undefined ||
                    configurationValue.AccessRights === OCPPv1_6.ConfigurationKeyAccessRights.WriteOnly)
                {
                    unknownKeys.push(key);
                }

                else
                    configurationKeys.push({
                        key:       key,
                        value:     configurationValue.Value,
                        readonly:  configurationValue.AccessRights === OCPPv1_6.ConfigurationKeyAccessRights.ReadOnly
                    });

            }
        }

        sendResponse(
            requestId,
            {
                "configurationKey":  configurationKeys,
                "unknownKey":        unknownKeys
            }
        );

    }

    //#endregion

}
