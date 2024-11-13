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
//import * as Configuration  from './Configuration';
import * as JobQueue       from '../JobQueue';
import * as Certificates   from '../CertificateStore';


export class IncomingMessages {

    //#region Certificates

    static DeleteCertificate(requestId:     string,
                             request:       messages.DeleteCertificateRequest,
                             certificates:  Certificates.Certificates,
                             commandView:   HTMLDivElement,
                             sendResponse:  interfaces.SendResponseDelegate)
    {

        var success = certificates.Remove(
                          request.certificateHashData.serialNumber
                      );

        sendResponse(
            requestId,
            {
                status:  success ? "Accepted" : "NotFound"
            } satisfies messages.DeleteCertificateResponse
        );

    }

    static GetInstalledCertificateIds(requestId:     string,
                                      request:       messages.GetInstalledCertificateIdsRequest,
                                      certificates:  Certificates.Certificates,
                                      commandView:   HTMLDivElement,
                                      sendResponse:  interfaces.SendResponseDelegate)
    {

        var installedCertificates = certificates.Filter(
                                        request.certificateType
                                    );

        sendResponse(
            requestId,
            {
                status:  installedCertificates.length > 0 ? "Accepted" : "NotFound"
            } satisfies messages.GetInstalledCertificateIdsResponse
        );

    }

    static InstallCertificate(requestId:     string,
                              request:       messages.InstallCertificateRequest,
                              certificates:  Certificates.Certificates,
                              commandView:   HTMLDivElement,
                              sendResponse:  interfaces.SendResponseDelegate)
    {

        var success = certificates.Add(
                          request.certificate,
                          request.certificateType
                      );

        sendResponse(
            requestId,
            {
                status:  success
            } satisfies messages.InstallCertificateResponse
        );

    }

    // SendSignedCertificate

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
                          JSON.stringify(request)
                      );

        sendResponse(
            requestId,
            {
                status:  success ? "Scheduled" : "Rejected"
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

    //#endregion

    //#region Monitoring

    static ChangeAvailability(requestId:                string,
                              request:                  messages.ChangeAvailabilityRequest,
                              chargingStationDelegate:  internal.ChangeChargingStationOperationalStatusDelegate,
                              evseDelegate:             internal.ChangeEVSEOperationalStatusDelegate,
                              commandView:              HTMLDivElement,
                              sendResponse:             interfaces.SendResponseDelegate)
    {

        const textView = document.createElement('div');
        textView.className = "description";

        if (request.evse)
        {
            textView.innerHTML = `Change EVSE '${request.evse.id}' availability: ${request.operationalStatus}`;
            evseDelegate(
                request.evse,
                request.operationalStatus
            );
        }
        else
        {
            textView.innerHTML = `Change charging station availability: ${request.operationalStatus}`;
            chargingStationDelegate(request.operationalStatus);
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

    //#endregion

}
