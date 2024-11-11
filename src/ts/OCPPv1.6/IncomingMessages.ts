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
import * as types          from './Types';
import * as complex        from './Complex';
import * as messages       from './Messages';
import * as Configuration  from './Configuration';
import * as JobQueue       from '../JobQueue';
import * as AuthCache      from './AuthCache';
import * as LocalList      from './LocalList';


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

    static Reset(requestId:     string,
                 request:       messages.ResetRequest,
                 jobQueue:      JobQueue.JobQueue,
                 commandView:   HTMLDivElement,
                 sendResponse:  interfaces.SendResponseDelegate)
    {

        var success = jobQueue.Add(
                          requestId,
                          "reset",
                          request
                      );

        sendResponse(
            requestId,
            {
                status:  success ? "Accepted" : "Rejected"
            } satisfies messages.ResetResponse
        );

        return;

        //#region Accept or Reject

        const buttonsDiv        = document.createElement('div');
        buttonsDiv.className    = "buttons";

        const buttonAccept      = document.createElement("button");
        buttonAccept.innerHTML  = "Accept";
        buttonAccept.onclick    = () => {
            buttonAccept.disabled = true;
            buttonReject.disabled = true;
            sendResponse(requestId, { "status": "Accepted" });
        }
        buttonsDiv.appendChild(buttonAccept);

        const buttonReject      = document.createElement("button");
        buttonReject.innerHTML  = "Reject";
        buttonReject.onclick    = () => {
            buttonAccept.disabled = true;
            buttonReject.disabled = true;
            sendResponse(requestId, { "status": "Rejected" });
        }
        buttonsDiv.appendChild(buttonReject);

        commandView.appendChild(buttonsDiv);

        //#endregion

    }

    static UpdateSignedFirmware(requestId:      string,
                                request:        messages.SignedUpdateFirmwareRequest,
                                configuration:  Configuration.Configuration,
                                jobQueue:       JobQueue.JobQueue,
                                commandView:    HTMLDivElement,
                                sendResponse:   interfaces.SendResponseDelegate)
    {

        //ToDo: "InvalidCertificate"
        //      "RevokedCertificate"

        var existingJobs = jobQueue.Filter(
                               false,
                               undefined,
                               undefined,
                               job => job.type === "updateSignedFirmware"
                           );

        for (const existingJob of existingJobs)
        {
            existingJob.success    = "cancelled";
            existingJob.finishedAt = new Date();
        }

        const success = jobQueue.Add(
                            requestId,
                            "updateSignedFirmware",
                            request
                        );

        sendResponse(
            requestId,
            {
                status:  success ? (existingJobs.length > 0 ? "AcceptedCanceled" : "Accepted") : "Rejected",
             } satisfies messages.SignedUpdateFirmwareResponse
        );

    }

    static UpdateFirmware(requestId:      string,
                          request:        messages.UpdateFirmwareRequest,
                          configuration:  Configuration.Configuration,
                          jobQueue:       JobQueue.JobQueue,
                          commandView:    HTMLDivElement,
                          sendResponse:   interfaces.SendResponseDelegate)
    {

        const success = jobQueue.Add(
                            requestId,
                            "updateFirmware",
                            request
                        );

        sendResponse(
            requestId,
            { } satisfies messages.UpdateFirmwareResponse
        );

    }

    //#endregion

    //#region LocalList

    static ClearCache(requestId:      string,
                      request:        messages.ClearCacheRequest,
                      configuration:  Configuration.Configuration,
                      authCache:      AuthCache.AuthCache,
                      commandView:    HTMLDivElement,
                      sendResponse:   interfaces.SendResponseDelegate)
    {

        if (configuration.get("LocalAuthListEnabled")?.Value === "true")
        {

            authCache.Clear();

            sendResponse(
                requestId,
                {
                    status: "Accepted"
                } satisfies messages.ClearCacheResponse
            );

        }

        sendResponse(
            requestId,
            {
                status: "Rejected"
            } satisfies messages.ClearCacheResponse
        );

    }

    static GetLocalListVersion(requestId:      string,
                               request:        messages.GetLocalListVersionRequest,
                               configuration:  Configuration.Configuration,
                               localList:      LocalList.LocalList,
                               commandView:    HTMLDivElement,
                               sendResponse:   interfaces.SendResponseDelegate)
    {

        sendResponse(
            requestId,
            {
                listVersion: localList.Version()
            } satisfies messages.GetLocalListVersionResponse
        );

    }

    static SendLocalList(requestId:      string,
                         request:        messages.SendLocalListRequest,
                         configuration:  Configuration.Configuration,
                         localList:      LocalList.LocalList,
                         commandView:    HTMLDivElement,
                         sendResponse:   interfaces.SendResponseDelegate)
    {

        //ToDo: "VersionMismatch" => Version number in the request for a differential update is less or equal then version number of current list.

        if (configuration.get("LocalAuthListEnabled")?.Value === "true")
        {

            const success = localList.ProcessAuthorizationData(
                                request.listVersion,
                                request.localAuthorisationList,
                                request.updateType
                            );

            sendResponse(
                requestId,
                {
                    status: success ? "Accepted" : "Failed"
                } satisfies messages.SendLocalListResponse
            );

        }

        sendResponse(
            requestId,
            {
                status: "NotSupported"
            } satisfies messages.SendLocalListResponse
        );

    }

    //#endregion

    //#region Monitoring

    static ChangeAvailability(requestId:     string,
                              request:       messages.ChangeAvailabilityRequest,
                              delegate:      internal.ChangeAvailabilityDelegate,
                              connectors:    Array<types.AvailabilityType>,
                              commandView:   HTMLDivElement,
                              sendResponse:  interfaces.SendResponseDelegate)
    {

        const textView = document.createElement('div');
        textView.className = "description";

        if (request.connectorId > 0)
        {
            textView.innerHTML = `Change connector '${request.connectorId}' availability: ${request.type}`;
            connectors[request.connectorId - 1] = request.type;
        }
        else
        {
            textView.innerHTML = `Change charging station availability: ${request.type}`;
            delegate(request.type);
        }

        commandView.appendChild(textView);

        return;

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

    static ExtendedTrigger(requestId:     string,
                           request:       messages.ExtendedTriggerMessageRequest,
                           jobQueue:      JobQueue.JobQueue,
                           commandView:   HTMLDivElement,
                           sendResponse:  interfaces.SendResponseDelegate)
    {

        var success = jobQueue.Add(
                          requestId,
                          "trigger",
                          request
                      );

        sendResponse(
            requestId,
            {
                status:  success ? "Accepted" : "Rejected"
            } satisfies messages.ExtendedTriggerMessageResponse
        );

    }

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

    static GetDiagnostics(requestId:      string,
                          request:        messages.GetDiagnosticsRequest,
                          configuration:  Configuration.Configuration,
                          jobQueue:       JobQueue.JobQueue,
                          filename:       string,
                          commandView:    HTMLDivElement,
                          sendResponse:   interfaces.SendResponseDelegate)
    {

        const success = jobQueue.Add(
                            requestId,
                            "getDiagnostics",
                            request,
                            { filename: filename }
                        );

        sendResponse(
            requestId,
            {
                fileName:  success ? filename : undefined
            } satisfies messages.GetDiagnosticsResponse
        );

    }

    static GetLog(requestId:      string,
                  request:        messages.GetLogRequest,
                  configuration:  Configuration.Configuration,
                  jobQueue:       JobQueue.JobQueue,
                  filename:       string,
                  commandView:    HTMLDivElement,
                  sendResponse:   interfaces.SendResponseDelegate)
    {

        var existingJobs = jobQueue.Filter(
                               false,
                               undefined,
                               undefined,
                               job => job.type === (request.logType === "SecurityLog"
                                                        ? "getSecurityLog"
                                                        : "getDiagnosticsLog")
                           );

        for (const existingJob of existingJobs)
        {
            existingJob.success    = "cancelled";
            existingJob.finishedAt = new Date();
        }

        const success = jobQueue.Add(
                            requestId,
                            request.logType === "SecurityLog"
                                ? "getSecurityLog"
                                : "getDiagnosticsLog",
                            request,
                            { filename: filename }
                        );

        sendResponse(
            requestId,
            {
                status:    success ? (existingJobs.length > 0 ? "AcceptedCanceled" : "Accepted") : "Rejected",
                filename:  success ? filename : undefined
            } satisfies messages.GetLogResponse
        );

    }

    static Trigger(requestId:     string,
                   request:       messages.TriggerMessageRequest,
                   jobQueue:      JobQueue.JobQueue,
                   commandView:   HTMLDivElement,
                   sendResponse:  interfaces.SendResponseDelegate)
    {

        var success = jobQueue.Add(
                          requestId,
                          "trigger",
                          request
                      );

        sendResponse(
            requestId,
            {
                status:  success ? "Accepted" : "Rejected"
            } satisfies messages.TriggerMessageResponse
        );

    }

    //#endregion

}
