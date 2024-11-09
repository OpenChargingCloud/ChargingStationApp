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

import * as interfaces    from './Interfaces';

import * as OCPPv1_6      from './OCPPv1.6/Internal';
import * as OCPPv1_6In    from './OCPPv1.6/IncomingMessages';
import * as OCPPv1_6Out   from './OCPPv1.6/OutgoingMessages';
import * as SettingsV1_6  from './OCPPv1.6/Configuration';

import * as OCPPv2_0_1    from './OCPPv2.0.1/IOCPPv2_0_1';

import * as OCPPv2_1      from './OCPPv2.1/Complex';
import * as OCPPv2_1In    from './OCPPv2.1/IncomingMessages';
import * as OCPPv2_1Out   from './OCPPv2.1/OutgoingMessages';

import * as logger        from './Logger';

export class OCPPChargingStation {

    //#region Data

    private          websocket?:                                         WebSocket;

    private readonly configurationDiv:                                   HTMLDivElement;
    private readonly qrCodeDiv:                                          HTMLDivElement;
    private readonly qrCodeURL:                                          HTMLAnchorElement;

    private readonly csmsDiv:                                            HTMLDivElement;
    private readonly csmsURL:                                            HTMLInputElement;
    private readonly httpBasicAuthDiv:                                   HTMLDivElement;
    private readonly csmsOCPPVersion:                                    HTMLSelectElement;
    private readonly csmsConnectButton:                                  HTMLButtonElement;

    private readonly commandsDiv:                                        HTMLDivElement;
    private readonly bootNotificationRequestDiv:                         HTMLDivElement;
    private readonly heartbeatRequestDiv:                                HTMLDivElement;
    private readonly authorizeRequestDiv:                                HTMLDivElement;
    private readonly startTransactionRequestDiv:                         HTMLDivElement;
    private readonly transactionEventRequestDiv:                         HTMLDivElement;
    private readonly statusNotificationRequestDiv:                       HTMLDivElement;
    private readonly meterValuesRequestDiv:                              HTMLDivElement;
    private readonly stopTransactionRequestDiv:                          HTMLDivElement;
    private readonly dataTransferRequestDiv:                             HTMLDivElement;
    private readonly diagnosticsStatusNotificationRequestDiv:            HTMLDivElement;
    private readonly firmwareStatusNotificationRequestDiv:               HTMLDivElement;
    private readonly signCertificateRequestDiv:                          HTMLDivElement;
    private readonly securityEventNotificationRequestDiv:                HTMLDivElement;
    private readonly notifyCustomerInformationRequestDiv:                HTMLDivElement;
    private readonly rawRequestDiv:                                      HTMLDivElement;

    private readonly controlDiv:                                         HTMLDivElement;

    private readonly buttonsDiv:                                         HTMLDivElement;
    private readonly showBootNotificationRequestButton:                  HTMLButtonElement;
    private readonly showHeartbeatRequestButton:                         HTMLButtonElement;
    private readonly showAuthorizeRequestButton:                         HTMLButtonElement;
    private readonly showStartTransactionRequestButton:                  HTMLButtonElement;
    private readonly showTransactionEventRequestButton:                  HTMLButtonElement;
    private readonly showStatusNotificationRequestButton:                HTMLButtonElement;
    private readonly showMeterValuesRequestButton:                       HTMLButtonElement;
    private readonly showStopTransactionRequestButton:                   HTMLButtonElement;
    private readonly showDataTransferRequestButton:                      HTMLButtonElement;
    private readonly showDiagnosticsStatusNotificationRequestButton:     HTMLButtonElement;
    private readonly showFirmwareStatusNotificationRequestButton:        HTMLButtonElement;
    private readonly showSignCertificateRequestButton:                   HTMLButtonElement;
    private readonly showSecurityEventNotificationRequestButton:         HTMLButtonElement;
    private readonly showNotifyCustomerInformationRequestButton:         HTMLButtonElement;
    private readonly showRAWRequestButton:                               HTMLButtonElement;

    private readonly sendBootNotificationRequestButton:                  HTMLButtonElement;
    private readonly sendHeartbeatRequestButton:                         HTMLButtonElement;
    private readonly sendAuthorizeRequestButton:                         HTMLButtonElement;
    private readonly sendStartTransactionRequestButton:                  HTMLButtonElement;
    private readonly sendTransactionEventRequestButton:                  HTMLButtonElement;
    private readonly sendStatusNotificationRequestButton:                HTMLButtonElement;
    private readonly sendMeterValuesRequestButton:                       HTMLButtonElement;
    private readonly sendStopTransactionRequestButton:                   HTMLButtonElement;
    private readonly sendDataTransferRequestButton:                      HTMLButtonElement;
    private readonly sendDiagnosticsStatusNotificationRequestButton:     HTMLButtonElement;
    private readonly sendFirmwareStatusNotificationRequestButton:        HTMLButtonElement;
    private readonly sendSignCertificateRequestButton:                   HTMLButtonElement;
    private readonly sendSecurityEventNotificationRequestButton:         HTMLButtonElement;
    private readonly sendNotifyCustomerInformationRequestButton:         HTMLButtonElement;
    private readonly sendRAWRequestButton:                               HTMLButtonElement;

    private readonly WriteToScreen:                                      interfaces.WriteToScreenDelegate;


    private          requestId:                                          number  = 100000;

    private readonly ocpp_v1_6_settings:                                 SettingsV1_6.Configuration    = new SettingsV1_6.Configuration();
    // private readonly ocpp_v1_6_messagesOut:                              OCPPv1_6Out.OutgoingMessages  = new OCPPv1_6Out.OutgoingMessages(
    //                                                                                                          this.sendRequest,
    //                                                                                                          this.showException
    //                                                                                                      );

    // private readonly ocpp_v2_1_messagesOut:                              OCPPv2_1Out.OutgoingMessages  = new OCPPv2_1Out.OutgoingMessages(
    //                                                                                                          this.sendRequest,
    //                                                                                                          this.showException
    //                                                                                                      );

    private readonly diagnosticsLog:                                     logger.Logger                 = new logger.Logger(1000);
    private readonly securityLog:                                        logger.Logger                 = new logger.Logger(1000);

    //#endregion

    //#region Constructor

    constructor(WriteToScreen: interfaces.WriteToScreenDelegate)
    {

        this.WriteToScreen  = WriteToScreen;

        this.sendRequest    = this.sendRequest.  bind(this);
        this.sendResponse   = this.sendResponse. bind(this);
        this.showException  = this.showException.bind(this);

        //#region Data

        // Configuration on the top
        this.configurationDiv                                        = document.querySelector("#configuration")                                         as HTMLDivElement;
        this.qrCodeDiv                                               = document.querySelector("#qrcode")                                                as HTMLDivElement;
        this.qrCodeURL                                               = document.querySelector("#qrCodeURL")                                             as HTMLAnchorElement;

        // CSMS on the top
        this.csmsDiv                                                 = document.querySelector("#CSMS")                                                  as HTMLDivElement;
        this.csmsURL                                                 = this.csmsDiv.querySelector("#CSMS_URL")                                          as HTMLInputElement;
        this.httpBasicAuthDiv                                        = this.csmsDiv.querySelector("#HTTPBasicAuthDiv")                                  as HTMLDivElement;
        this.csmsOCPPVersion                                         = this.csmsDiv.querySelector("#selectedOCPPVersion")                               as HTMLSelectElement;
        this.csmsConnectButton                                       = this.csmsDiv.querySelector("#connectButton")                                     as HTMLButtonElement;

        // Control on the bottom
        this.controlDiv                                              = document.querySelector("#control")                                               as HTMLDivElement;

        // Buttons on the left
        this.buttonsDiv                                              = this.controlDiv.querySelector("#buttons")                                        as HTMLDivElement;
        this.showBootNotificationRequestButton                       = this.buttonsDiv.querySelector("#ShowBootNotificationRequestButton")              as HTMLButtonElement;
        this.showHeartbeatRequestButton                              = this.buttonsDiv.querySelector("#ShowHeartbeatRequestButton")                     as HTMLButtonElement;
        this.showAuthorizeRequestButton                              = this.buttonsDiv.querySelector("#ShowAuthorizeRequestButton")                     as HTMLButtonElement;
        this.showStartTransactionRequestButton                       = this.buttonsDiv.querySelector("#ShowStartTransactionRequestButton")              as HTMLButtonElement;
        this.showTransactionEventRequestButton                       = this.buttonsDiv.querySelector("#ShowTransactionEventRequestButton")              as HTMLButtonElement;
        this.showStatusNotificationRequestButton                     = this.buttonsDiv.querySelector("#ShowStatusNotificationRequestButton")            as HTMLButtonElement;
        this.showMeterValuesRequestButton                            = this.buttonsDiv.querySelector("#ShowMeterValuesRequestButton")                   as HTMLButtonElement;
        this.showStopTransactionRequestButton                        = this.buttonsDiv.querySelector("#ShowStopTransactionRequestButton")               as HTMLButtonElement;
        this.showDataTransferRequestButton                           = this.buttonsDiv.querySelector("#ShowDataTransferRequestButton")                  as HTMLButtonElement;
        this.showDiagnosticsStatusNotificationRequestButton          = this.buttonsDiv.querySelector("#ShowDiagnosticsStatusNotificationRequestButton") as HTMLButtonElement;
        this.showFirmwareStatusNotificationRequestButton             = this.buttonsDiv.querySelector("#ShowFirmwareStatusNotificationRequestButton")    as HTMLButtonElement;
        this.showSignCertificateRequestButton                        = this.buttonsDiv.querySelector("#ShowSignCertificateRequestButton")               as HTMLButtonElement;
        this.showSecurityEventNotificationRequestButton              = this.buttonsDiv.querySelector("#ShowSecurityEventNotificationRequestButton")     as HTMLButtonElement;
        this.showNotifyCustomerInformationRequestButton              = this.buttonsDiv.querySelector("#ShowNotifyCustomerInformationRequestButton")     as HTMLButtonElement;
        this.showRAWRequestButton                                    = this.buttonsDiv.querySelector("#ShowRAWRequestButton")                           as HTMLButtonElement;

        this.showBootNotificationRequestButton.onclick               = () => this.showDialog(this.bootNotificationRequestDiv);
        this.showHeartbeatRequestButton.onclick                      = () => this.showDialog(this.heartbeatRequestDiv);
        this.showAuthorizeRequestButton.onclick                      = () => this.showDialog(this.authorizeRequestDiv);
        this.showStartTransactionRequestButton.onclick               = () => this.showDialog(this.startTransactionRequestDiv);
        this.showTransactionEventRequestButton.onclick               = () => this.showDialog(this.transactionEventRequestDiv);
        this.showStatusNotificationRequestButton.onclick             = () => this.showDialog(this.statusNotificationRequestDiv);
        this.showMeterValuesRequestButton.onclick                    = () => this.showDialog(this.meterValuesRequestDiv);
        this.showStopTransactionRequestButton.onclick                = () => this.showDialog(this.stopTransactionRequestDiv);
        this.showDataTransferRequestButton.onclick                   = () => this.showDialog(this.dataTransferRequestDiv);
        this.showDiagnosticsStatusNotificationRequestButton.onclick  = () => this.showDialog(this.diagnosticsStatusNotificationRequestDiv);
        this.showFirmwareStatusNotificationRequestButton.onclick     = () => this.showDialog(this.firmwareStatusNotificationRequestDiv);
        this.showSignCertificateRequestButton.onclick                = () => this.showDialog(this.signCertificateRequestDiv);
        this.showSecurityEventNotificationRequestButton.onclick      = () => this.showDialog(this.securityEventNotificationRequestDiv);
        this.showNotifyCustomerInformationRequestButton.onclick      = () => this.showDialog(this.notifyCustomerInformationRequestDiv);
        this.showRAWRequestButton.onclick                            = () => this.showDialog(this.rawRequestDiv);

        // Commands on the right
        this.commandsDiv                                             = this.controlDiv. querySelector("#commands")                              as HTMLDivElement;
        this.bootNotificationRequestDiv                              = this.commandsDiv.querySelector("#BootNotificationRequest")               as HTMLDivElement;
        this.heartbeatRequestDiv                                     = this.commandsDiv.querySelector("#HeartbeatRequest")                      as HTMLDivElement;
        this.authorizeRequestDiv                                     = this.commandsDiv.querySelector("#AuthorizeRequest")                      as HTMLDivElement;
        this.startTransactionRequestDiv                              = this.commandsDiv.querySelector("#StartTransactionRequest")               as HTMLDivElement;
        this.transactionEventRequestDiv                              = this.commandsDiv.querySelector("#TransactionEventRequest")               as HTMLDivElement;
        this.statusNotificationRequestDiv                            = this.commandsDiv.querySelector("#StatusNotificationRequest")             as HTMLDivElement;
        this.meterValuesRequestDiv                                   = this.commandsDiv.querySelector("#MeterValuesRequest")                    as HTMLDivElement;
        this.stopTransactionRequestDiv                               = this.commandsDiv.querySelector("#StopTransactionRequest")                as HTMLDivElement;
        this.dataTransferRequestDiv                                  = this.commandsDiv.querySelector("#DataTransferRequest")                   as HTMLDivElement;
        this.diagnosticsStatusNotificationRequestDiv                 = this.commandsDiv.querySelector("#DiagnosticsStatusNotificationRequest")  as HTMLDivElement;
        this.firmwareStatusNotificationRequestDiv                    = this.commandsDiv.querySelector("#FirmwareStatusNotificationRequest")     as HTMLDivElement;
        this.signCertificateRequestDiv                               = this.commandsDiv.querySelector("#SignCertificateRequest")                as HTMLDivElement;
        this.securityEventNotificationRequestDiv                     = this.commandsDiv.querySelector("#SecurityEventNotificationRequest")      as HTMLDivElement;
        this.notifyCustomerInformationRequestDiv                     = this.commandsDiv.querySelector("#NotifyCustomerInformationRequest")      as HTMLDivElement;
        this.rawRequestDiv                                           = this.commandsDiv.querySelector("#RAWRequest")                            as HTMLDivElement;

        this.sendBootNotificationRequestButton                       = this.bootNotificationRequestDiv.             querySelector(".commandButton")                              as HTMLButtonElement;
        this.sendHeartbeatRequestButton                              = this.heartbeatRequestDiv.                    querySelector(".commandButton")                              as HTMLButtonElement;
        this.sendAuthorizeRequestButton                              = this.authorizeRequestDiv.                    querySelector("#AuthorizeRequestButton")                     as HTMLButtonElement;
        this.sendStartTransactionRequestButton                       = this.startTransactionRequestDiv.             querySelector("#StartTransactionRequestButton")              as HTMLButtonElement;
        this.sendTransactionEventRequestButton                       = this.transactionEventRequestDiv.             querySelector("#TransactionEventRequestButton")              as HTMLButtonElement;
        this.sendStatusNotificationRequestButton                     = this.statusNotificationRequestDiv.           querySelector("#StatusNotificationRequestButton")            as HTMLButtonElement;
        this.sendMeterValuesRequestButton                            = this.meterValuesRequestDiv.                  querySelector("#MeterValuesRequestButton")                   as HTMLButtonElement;
        this.sendStopTransactionRequestButton                        = this.stopTransactionRequestDiv.              querySelector("#StopTransactionRequestButton")               as HTMLButtonElement;
        this.sendDataTransferRequestButton                           = this.dataTransferRequestDiv.                 querySelector("#DataTransferRequestButton")                  as HTMLButtonElement;
        this.sendDiagnosticsStatusNotificationRequestButton          = this.diagnosticsStatusNotificationRequestDiv.querySelector("#DiagnosticsStatusNotificationRequestButton") as HTMLButtonElement;
        this.sendFirmwareStatusNotificationRequestButton             = this.firmwareStatusNotificationRequestDiv.   querySelector("#FirmwareStatusNotificationRequestButton")    as HTMLButtonElement;
        this.sendSignCertificateRequestButton                        = this.signCertificateRequestDiv.              querySelector("#SignCertificateRequestButton")               as HTMLButtonElement;
        this.sendSecurityEventNotificationRequestButton              = this.securityEventNotificationRequestDiv.    querySelector("#SecurityEventNotificationRequestButton")     as HTMLButtonElement;
        this.sendNotifyCustomerInformationRequestButton              = this.notifyCustomerInformationRequestDiv.    querySelector("#NotifyCustomerInformationRequestButton")     as HTMLButtonElement;
        this.sendRAWRequestButton                                    = this.rawRequestDiv.                          querySelector("#RAWRequestButton")                           as HTMLButtonElement;


        this.sendBootNotificationRequestButton.onclick               = () => this.SendBootNotificationRequest();
        this.sendHeartbeatRequestButton.onclick                      = () => this.SendHeartbeatRequest();
        this.sendAuthorizeRequestButton.onclick                      = () => this.SendAuthorizeRequest();
        this.sendStartTransactionRequestButton.onclick               = () => this.SendStartTransactionRequest();
        this.sendTransactionEventRequestButton.onclick               = () => this.SendTransactionEventRequest();
        this.sendStatusNotificationRequestButton.onclick             = () => this.SendStatusNotificationRequest();
        this.sendMeterValuesRequestButton.onclick                    = () => this.SendMeterValuesRequest();
        this.sendStopTransactionRequestButton.onclick                = () => this.SendStopTransactionRequest();
        this.sendDataTransferRequestButton.onclick                   = () => this.SendDataTransferRequest();
        this.sendDiagnosticsStatusNotificationRequestButton.onclick  = () => this.SendDiagnosticsStatusNotificationRequest();
        this.sendFirmwareStatusNotificationRequestButton.onclick     = () => this.SendFirmwareStatusNotificationRequest();
        this.sendSignCertificateRequestButton.onclick                = () => this.SendSignCertificateRequestRequest();
        this.sendSecurityEventNotificationRequestButton.onclick      = () => this.SendSecurityEventNotificationRequestRequest();
        this.sendNotifyCustomerInformationRequestButton.onclick      = () => this.NotifyCustomerInformationRequestRequest();
        this.sendRAWRequestButton.onclick                            = () => this.SendRAWRequest();

        //#endregion

        this.CheckHTTPBasicAuth();
            this.csmsURL.onkeyup = () => this.CheckHTTPBasicAuth();

        this.startQRCodeInterval();

        //#region Handle OCPP version selector

        this.handleOCPPVersionChange();

        this.csmsOCPPVersion.onchange = (e) => this.handleOCPPVersionChange();

        //#endregion

        //#region Handle connect button

        this.csmsConnectButton.onclick = (e) => {

            if (!this.websocket ||
                 this.websocket.readyState !== this.websocket.OPEN)
            {

                try
                {

                    let url = this.csmsURL.value;

                    if (url.startsWith("wss://"))
                    {

                        // HTTP WebSockets with HTTP Basic Auth seem to be broken in most browsers!

                        // Kubernetes transport username and password as subprotocol, not as a HTTP Authorization header! m(
                        // https://github.com/kubernetes/kubernetes/commit/714f97d7baf4975ad3aa47735a868a81a984d1f0

                        const usernameInput = this.httpBasicAuthDiv.querySelector("#HTTPBasicAuthUsername") as HTMLInputElement;
                        const passwordInput = this.httpBasicAuthDiv.querySelector("#HTTPBasicAuthPassword") as HTMLInputElement;

                        if (usernameInput && passwordInput)
                        {

                            var username = usernameInput.value.trim();
                            var password = passwordInput.value.trim();

                            if (username.length > 0 && password.length > 0)
                            {
                                url = url.replace("wss://", `wss://${username}:${password}@`);
                                url = url + `?u=${username}&p=${password}`;
                            }

                        }

                    }

                    this.websocket = new WebSocket(
                                         url,
                                         this.csmsOCPPVersion.value.toLowerCase().replace(/ /g, "").replace(/v/g, "").replace(/_/g, "."),
                                     );

                    this.websocket.onopen = (e) => {

                        this.WriteToScreen("CONNECTED");

                        this.csmsURL.readOnly                = true;
                        this.csmsOCPPVersion.disabled        = true;
                        this.controlDiv.style.display        = 'flex';
                        this.controlDiv.style.pointerEvents  = 'auto';
                        this.buttonsDiv.style.pointerEvents  = 'auto';
                        this.csmsConnectButton.textContent   = "Disconnect";

                    };

                    this.websocket.onerror = (e) => {

                        // There is NO USEFUL error information!
                        this.WriteToScreen("<span class=error>Websocket error!</span>");

                        if (this.websocket?.readyState !== WebSocket.OPEN)
                        {
                            this.csmsURL.readOnly                = false;
                            this.csmsOCPPVersion.disabled        = false;
                            this.buttonsDiv.style.pointerEvents  = 'none';
                            this.csmsConnectButton.textContent   = "Connect";
                        }

                    };

                    this.websocket.onclose = (e) => {

                        var reason = "Unknown reason";

                        switch (e.code)
                        {

                            case 1000:
                                reason = "Normal closure";
                                break;

                            case 1001:
                                reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
                                break;

                            case 1002:
                                reason = "An endpoint is terminating the connection due to a protocol error";
                                break;

                            case 1003:
                                reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
                                break;

                            case 1004:
                                reason = "Reserved";
                                break;

                            case 1005:
                                reason = "No status code was actually present.";
                                break;

                            case 1006:
                                reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
                                break;

                            case 1007:
                                reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).";
                                break;

                            case 1008:
                                reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
                                break;

                            case 1009:
                                reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
                                break;

                            case 1010:
                                // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                                reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + e.reason;
                                break;

                            case 1011:
                                reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
                                break;

                            case 1015:
                                reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
                                break;

                        }

                        this.WriteToScreen(`DISCONNECTED: ${e.code} ${e.reason.length > 0 ? e.reason : reason}`);

                        if (this.websocket)
                        {

                            // Clean up event handlers
                            this.websocket.onopen     = null;
                            this.websocket.onclose    = null;
                            this.websocket.onerror    = null;
                            this.websocket.onmessage  = null;

                            this.websocket            = undefined;

                        }

                        this.csmsURL.readOnly                = false;
                        this.csmsOCPPVersion.disabled        = false;
                        this.controlDiv.style.display        = 'none';
                        this.buttonsDiv.style.pointerEvents  = 'none';
                        this.csmsConnectButton.textContent   = "Connect";

                    };

                    this.websocket.onmessage = (e) => {

                        try
                        {

                            const message = JSON.parse(e.data);

                            switch (message[0])
                            {

                                //#region Incoming OCPP Commands

                                case 2:
                                    this.WriteToScreen("<span>COMMAND: " + e.data + "</span>");

                                    const commandView = document.createElement('div');
                                    commandView.className = "commandView";

                                    switch (message[2])
                                    {

                                        //#region Certificates

                                        // DeleteCertificate
                                        // GetInstalledCertificateIds
                                        // InstallCertificate
                                        // CertificateSigned

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

                                        // DataTransfer

                                        //#endregion

                                        //#region Firmware

                                        case "Reset": {

                                            //#region Reset variants

                                            const textView = document.createElement('div');
                                            textView.className = "description";

                                            switch (message[3]["type"])
                                            {

                                                case "Soft":
                                                    textView.innerHTML = "Soft Reset Request";
                                                    break;

                                                case "Hard":
                                                    textView.innerHTML = "Hard Reset Request";
                                                    break;

                                            }

                                            commandView.appendChild(textView);

                                            //#endregion

                                            //#region Accept or Reject

                                            const buttonsDiv        = document.createElement('div');
                                            buttonsDiv.className    = "buttons";

                                            const buttonAccept      = document.createElement("button");
                                            buttonAccept.innerHTML  = "Accept";
                                            buttonAccept.onclick    = () => {
                                                buttonAccept.disabled = true;
                                                buttonReject.disabled = true;
                                                this.sendResponse(message[1], { "status": "Accepted" });
                                            }
                                            buttonsDiv.appendChild(buttonAccept);

                                            const buttonReject      = document.createElement("button");
                                            buttonReject.innerHTML  = "Reject";
                                            buttonReject.onclick    = () => {
                                                buttonAccept.disabled = true;
                                                buttonReject.disabled = true;
                                                this.sendResponse(message[1], { "status": "Rejected" });
                                            }
                                            buttonsDiv.appendChild(buttonReject);

                                            commandView.appendChild(buttonsDiv);

                                            //#endregion

                                            }
                                            break;

                                        // SignedUpdateFirmware
                                        // UpdateFirmware

                                        //#endregion

                                        //#region LocalList

                                        // ClearCache
                                        // GetLocalListVersion
                                        // SendLocalList

                                        //#endregion

                                        //#region Monitoring

                                        case "ChangeAvailability":
                                            if (this.csmsOCPPVersion.value === this.OCPPv1_6)
                                                OCPPv1_6In.IncomingMessages.ChangeAvailability(
                                                    message[1],
                                                    message[3],
                                                    commandView,
                                                    this.sendResponse
                                                );
                                            break;

                                        case "ChangeConfiguration": 
                                            if (this.csmsOCPPVersion.value === this.OCPPv1_6)
                                                OCPPv1_6In.IncomingMessages.ChangeConfiguration(
                                                    message[1],
                                                    message[3],
                                                    this.ocpp_v1_6_settings,
                                                    commandView,
                                                    this.sendResponse
                                                );
                                            break;

                                        // ExtendedTriggerMessage

                                        case "GetConfiguration":
                                            if (this.csmsOCPPVersion.value === this.OCPPv1_6)
                                                OCPPv1_6In.IncomingMessages.GetConfiguration(
                                                    message[1],
                                                    message[3],
                                                    this.ocpp_v1_6_settings,
                                                    commandView,
                                                    this.sendResponse
                                                );
                                            break;

                                        // GetDiagnostics
                                        // GetLog
                                        // Trigger

                                        //#endregion

                                        default: {
                                            this.sendRequestError(
                                                message[1],
                                                "0",
                                                "Unknown command!",
                                                { }
                                            );
                                            }
                                            break;

                                    }

                                    this.WriteToScreen(commandView);

                                    break;

                                //#endregion

                                //#region OCPP Responses

                                case 3:
                                    this.WriteToScreen("<span>RESPONSE: " + e.data + "</span>");
                                    break;

                                //#endregion

                                //#region OCPP Error Responses

                                case 4:
                                    this.WriteToScreen("<span>ERROR: " + e.data + "</span>");
                                    break;

                                //#endregion

                            }

                        }
                        catch (ex)
                        {
                            this.WriteToScreen("<span>EXCEPTION: " + e.data + " => " + ex + "</span>");
                        }

                    };

                }
                catch (exception)
                {

                    this.WriteToScreen("<span class=error>Error creating WebSocket:</span> " + exception);

                    this.csmsURL.readOnly                = false;
                    this.buttonsDiv.style.pointerEvents  = 'none';
                    this.csmsConnectButton.textContent   = "Connect";

                }

            }
            else
            {

                this.websocket.close();

            }

        }

        //#endregion

    }

    //#endregion

    public isLittleEndian() {
        const buf = new ArrayBuffer(4);
        new DataView(buf).setUint32(0, 1, true);
        return new Uint32Array(buf)[0] === 1;
    }

    public reverseBytes(buffer: Uint8Array): void {
        for (let i = 0; i < buffer.length / 2; i++) {
            let temp = buffer[i] as number;
            buffer[i] = buffer[buffer.length - 1 - i] as number;
            buffer[buffer.length - 1 - i] = temp;
        }
    }


    public CheckHTTPBasicAuth()
    {
        if (this.csmsURL.value.startsWith("wss://"))
            this.httpBasicAuthDiv.style.display = 'table-row-group';
        else
            this.httpBasicAuthDiv.style.display = 'none';
    }


    private async calcTOTPSlot(slotBytes:     Uint8Array,
                               TOTPLength:    number,
                               alphabet:      string,
                               sharedSecret:  string) {

        // JavaScript's Buffer methods default to big-endian!
        if (!this.isLittleEndian())
            this.reverseBytes(slotBytes);

        const hash = await crypto.subtle.sign(
            "HMAC",
            await crypto.subtle.importKey(
                "raw",
                new TextEncoder().encode(sharedSecret),
                {
                    name: "HMAC",
                    hash: "SHA-256"
                },
                false,
                ["sign", "verify"]
            ),
            slotBytes
        );

        const currentHash = new Uint8Array(hash);
        const offset      = currentHash[currentHash.length - 1]! & 0x0F;

        let result = '';
        for (let i = 0; i < TOTPLength; i++)
            result += alphabet[(currentHash[(offset + i) % currentHash.length]! >>> 0) % alphabet.length];

        return result;

    }

    private async generateTOTPs(SharedSecret:  string,
                                ValidityTime:  number | undefined = undefined,
                                TOTPLength:    number | undefined = undefined,
                                Alphabet:      string | undefined = undefined,
                                Timestamp:     number | undefined = undefined) {

        if (!ValidityTime) ValidityTime  = 30;
        if (!TOTPLength)   TOTPLength    = 12;
        if (!Alphabet)     Alphabet      = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (!Timestamp)    Timestamp     = Date.now();

        SharedSecret = SharedSecret?.trim();
        Alphabet     = Alphabet?.    trim();

        if (!SharedSecret)                              throw new Error("The given shared secret must not be null or empty!");
        if (/\s/.test(SharedSecret))                    throw new Error("The given shared secret must not contain any whitespace characters!");
        if (SharedSecret.length < 16)                   throw new Error("The length of the given shared secret must be at least 16 characters!");
        if (TOTPLength < 4)                             throw new Error("The expected length of the TOTP must be between 4 and 255 characters!");
        if (!Alphabet)                                  throw new Error("The given alphabet must not be null or empty!");
        if (Alphabet.length < 4)                        throw new Error("The given alphabet must contain at least 4 characters!");
        if (new Set(Alphabet).size !== Alphabet.length) throw new Error("The given alphabet must not contain duplicate characters!");
        if (/\s/.test(Alphabet))                        throw new Error("The given alphabet must not contain any whitespace characters!");

        var  currentUnixTime     = 0;

        if (typeof Timestamp === 'string')
            currentUnixTime = Math.floor(new Date(Timestamp).getTime() / 1000) - new Date().getTimezoneOffset() * 60;
        else if (typeof Timestamp === 'number')
            currentUnixTime = Timestamp;
        else
            throw new Error('Invalid timestamp format');

        const currentSlot        = BigInt(Math.floor(currentUnixTime / ValidityTime));
        const remainingTime      = ValidityTime - (currentUnixTime % ValidityTime);

        // For interoperability we use 8 byte timestamps
        const previousSlotBytes  = new Uint8Array(8);
        const currentSlotBytes   = new Uint8Array(8);
        const nextSlotBytes      = new Uint8Array(8);

        new DataView(previousSlotBytes.buffer).setBigUint64(0, currentSlot - BigInt(1));
        new DataView(currentSlotBytes.buffer). setBigUint64(0, currentSlot);
        new DataView(nextSlotBytes.buffer).    setBigUint64(0, currentSlot + BigInt(1));

        const previous           = await this.calcTOTPSlot(previousSlotBytes, TOTPLength, Alphabet, SharedSecret);
        const current            = await this.calcTOTPSlot(currentSlotBytes,  TOTPLength, Alphabet, SharedSecret);
        const next               = await this.calcTOTPSlot(nextSlotBytes,     TOTPLength, Alphabet, SharedSecret);

        return {
            previous,
            current,
            next,
            remainingTime
        };

    }
    public replaceTemplate(template: string, key: string, value: string) {
        const regex = new RegExp(`{${key}}`, 'g');
        return template.replace(regex, value);
    }


    private startQRCodeInterval(): void {
        setInterval(() => {
            this.QRCode();
        }, 1000);
    }

    private async QRCode() {

        const sharedSecret  = "dfwsighifbdfibhidgijhdgtng";
        const validityTime  = "30";
        const totpLength    = "12";
        const alphabet      = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const timestamp     = Date.now() / 1000;

        const result = await this.generateTOTPs(
                                 sharedSecret,
                                 validityTime ? parseInt(validityTime) : undefined,
                                 totpLength   ? parseInt(totpLength)   : undefined,
                                 alphabet     ? alphabet               : undefined,
                                 timestamp
                             );

        let url = "http://qr.charging.cloud/qr/{evseId}/{totp}";
        let evseId = "DE*GEF*E1234*5678*1";
        url = this.replaceTemplate(url, 'evseId', evseId);
        url = this.replaceTemplate(url, 'totp',   result.current);
        // Remove all remaining placeholders
        url = url.replace(/{(\w+)}/g, '');

        //@ts-ignore
        var svgDocument = new QRCode({
                              msg: url,
                              dim: 128,
                              pad: 0,
                              mtx: -1,
                              ecl: "L",
                              ecb: 1,
                              pal: ["#0"],
                              vrb: 0
                          });

        while (this.qrCodeDiv.firstChild)
            this.qrCodeDiv.removeChild(this.qrCodeDiv.firstChild);

        this.qrCodeDiv.appendChild(svgDocument);

    //    var qrCodeURL                                               = document.querySelector("#QRCodeURL")                                             as HTMLAnchorElement;
        this.qrCodeURL.href      = url;
        this.qrCodeURL.innerText = url;

    }



    //#region Handle OCPP version change

    private handleOCPPVersionChange()
    {

        const ocppVersion = this.csmsOCPPVersion.value.replace(/ /g, "").replace(/\./g, "_");

        for (const child of this.buttonsDiv.children as any as HTMLElement[])
            child.style.display = child.classList.contains(ocppVersion)
                                      ? 'block'
                                      : 'none';

        for (const child of Array.from(this.commandsDiv.querySelectorAll('div.command, div.properties, div.row')))
        {

            // Only property lists having the selected "OCPPv..." class are shown!
            if (child.classList.contains("properties"))
            {

                let divElement = child as HTMLDivElement;

                divElement.style.display = child.classList.contains(ocppVersion)
                                               ? 'table'
                                               : 'none';

            }

            // Only rows without any "OCPPv..." class or the selected "OCPPv..." class are shown!
            if (child.classList.contains("row"))
            {

                let divElement = child as HTMLDivElement;

                if (child.classList.contains(ocppVersion))
                    divElement.style.display = 'block';

                else
                {
                    for (const className of (child.classList as any)) {
                        if (className.startsWith('OCPPv')) {
                            divElement.style.display = 'none';
                        }
                    }
                }

            }

        }

    }

    //#endregion

    //#region Helpers

    private showDialog(dialogDiv: HTMLDivElement) {

        for (const dialog of Array.from(document.querySelectorAll<HTMLDivElement>("#commands .command")))
            dialog.style.display = "none";

        dialogDiv.style.display = "block";

    }

    private ParseCustomData(CustomData?: string | null): OCPPv2_0_1.ICustomData|undefined
    {

        if (CustomData == null)
            return undefined;

        let customData = null;

        try
        {

            const json = JSON.parse(CustomData);

            if (json.hasOwnProperty('vendorId'))
                return json;

        } catch { }

        return undefined;

    }

    private removeNullsAndEmptyObjects(obj: any): any {
        for (let key in obj) {
            if (obj[key] == null || obj[key] === "") {
                delete obj[key];
            } else if (typeof obj[key] === 'object') {
                obj[key] = this.removeNullsAndEmptyObjects(obj[key]);
    
                // After cleaning the inner object, if it's empty, delete it too.
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            }
        }
        return obj;
    }

    public sendRAWRequest(message: string) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            this.WriteToScreen("SENT: " + message);
            this.websocket.send(message);

        }

    }


    private OCPPv1_6:        string = "OCPP v1.6";
    private OCPPv2_0_1:      string = "OCPP v2.0.1";
    private OCPPv2_0_1__2_1: string = "OCPP v2.0.1/2.1";
    private OCPPv2_1:        string = "OCPP v2.1";

    private showException(ex:          any,
                          Caller:      string,
                          OCPPVersion: string)
    {

        this.WriteToScreen("<span class=error>Exception in " + Caller + "(" + OCPPVersion + "): " + ex + "</span>");

        if (ex.stack !== undefined)
            this.WriteToScreen(ex.stack);

    }

    //#endregion


    public sendRequest(command: string, request: any) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            const message = JSON.stringify([ 2,
                                             (this.requestId++).toString(),
                                             command,
                                             request != null
                                                 ? this.removeNullsAndEmptyObjects(request)
                                                 : {}
                                           ]);

            this.WriteToScreen("SENT: " + message);
            this.diagnosticsLog.Log("INFO", "request", message);
            this.websocket.send(message);

        }

    }

    public sendResponse(responseId: string,
                        response:   any) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            const message = JSON.stringify([ 3,
                                             responseId,
                                             response
                                           ]);

            this.WriteToScreen("REPLY: " + message);
            this.diagnosticsLog.Log("INFO", "response", message);
            this.websocket.send(message);

        }

    }

    public sendRequestError(responseId:        string,
                            ErrorCode:         string,
                            ErrorDescription:  string,
                            ErrorDetails:      any) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            const message = JSON.stringify([ 4,
                                             responseId,
                                             ErrorCode,
                                             ErrorDescription,
                                             ErrorDetails
                                           ]);

            this.WriteToScreen("Request Error: " + ErrorCode + " - " + ErrorDescription);

            if (ErrorDetails != null)
                this.WriteToScreen(ErrorDetails);

            this.diagnosticsLog.Log("INFO", "requestError", message);
            this.websocket.send(message);

        }

    }

    public sendResposeError(responseId: string,
                            response:   any) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            const message = JSON.stringify([ 3,
                                             responseId,
                                             response
                                           ]);

            this.WriteToScreen("REPLY: " + message);
            this.diagnosticsLog.Log("INFO", "responseError", message);
            this.websocket.send(message);

        }

    }


    public SendBootNotificationRequest()
    {

        let request;

        switch (this.csmsOCPPVersion.value)
        {

            case this.OCPPv1_6:
                request = OCPPv1_6Out.OutgoingMessages.SendBootNotification(
                              this.bootNotificationRequestDiv?.querySelector('div.properties.OCPPv1_6') as HTMLDivElement
                          );
                break;

            default:
                request = OCPPv2_1Out.OutgoingMessages.SendBootNotification(
                              this.bootNotificationRequestDiv?.querySelector('div.properties.OCPPv2_1') as HTMLDivElement
                          );
                break;

        }

        this.sendRequest(
            "BootNotification",
             request
        );

    }

    public SendHeartbeatRequest(RequestDivElement?: HTMLDivElement)
    {

        let request;

        switch (this.csmsOCPPVersion.value)
        {

            case this.OCPPv1_6:
                request = OCPPv1_6Out.OutgoingMessages.SendHeartbeat(
                              this.heartbeatRequestDiv?.querySelector('div.properties.OCPPv1_6') as HTMLDivElement
                          );
                break;

            default:
                request = OCPPv2_1Out.OutgoingMessages.SendHeartbeat(
                              this.heartbeatRequestDiv?.querySelector('div.properties.OCPPv2_1') as HTMLDivElement
                          );
                break;

        }

        this.sendRequest(
            "Heartbeat",
             request
        );

    }

    public SendAuthorizeRequest(RequestDivElement?: HTMLDivElement)
    {

      const authorizeRequestDiv  = RequestDivElement ?? document.querySelector("#AuthorizeRequest");
      const properties           = authorizeRequestDiv?.querySelector(".properties")     as HTMLDivElement;
      const IdTag                = (properties?.querySelector("#AuthorizeRequest_IdTag") as HTMLInputElement)?.value;

      this.sendRequest("Authorize",
                       {
                           "idTag": IdTag
                       });

    }

    public SendStartTransactionRequest(RequestDivElement?: HTMLDivElement)
    {

      const startTransactionRequestDiv  = RequestDivElement ?? document.querySelector("#StartTransactionRequest");
      const properties                  = startTransactionRequestDiv?.querySelector(".properties")             as HTMLDivElement;
      const ConnectorId                 = (properties?.querySelector("#StartTransactionRequest_ConnectorId")   as HTMLInputElement)?.value;
      const IdTag                       = (properties?.querySelector("#StartTransactionRequest_IdTag")         as HTMLInputElement)?.value;
      const Timestamp                   = (properties?.querySelector("#StartTransactionRequest_Timestamp")     as HTMLInputElement)?.value;
      const MeterStart                  = (properties?.querySelector("#StartTransactionRequest_MeterStart")    as HTMLInputElement)?.value;
      const ReservationId               = (properties?.querySelector("#StartTransactionRequest_ReservationId") as HTMLInputElement)?.value;

      this.sendRequest("StartTransaction",
                       {
                           "connectorId":    parseInt(ConnectorId),
                           "idTag":          IdTag,
                           "timestamp":      Timestamp != "" ? Timestamp : new Date().toISOString(),
                           "meterStart":     parseInt(MeterStart),
                           "reservationId":  ReservationId != "" ? parseInt(ReservationId) : null
                       });

    }

    public SendTransactionEventRequest(RequestDivElement?: HTMLDivElement)
    {

      const transactionEventRequestDiv  = RequestDivElement ?? document.querySelector("#TransactionEventRequest");
      const properties                  = transactionEventRequestDiv?.querySelector(".properties")             as HTMLDivElement;

    //   const ConnectorId                 = (properties?.querySelector("#StartTransactionRequest_ConnectorId")   as HTMLInputElement)?.value;
    //   const IdTag                       = (properties?.querySelector("#StartTransactionRequest_IdTag")         as HTMLInputElement)?.value;
    //   const Timestamp                   = (properties?.querySelector("#StartTransactionRequest_Timestamp")     as HTMLInputElement)?.value;
    //   const MeterStart                  = (properties?.querySelector("#StartTransactionRequest_MeterStart")    as HTMLInputElement)?.value;
    //   const ReservationId               = (properties?.querySelector("#StartTransactionRequest_ReservationId") as HTMLInputElement)?.value;

    //   this.sendRequest("TransactionEvent",
    //                    {
    //                        "connectorId":    parseInt(ConnectorId),
    //                        "idTag":          IdTag,
    //                        "timestamp":      Timestamp != "" ? Timestamp : new Date().toISOString(),
    //                        "meterStart":     parseInt(MeterStart),
    //                        "reservationId":  ReservationId != "" ? parseInt(ReservationId) : null
    //                    });

    }

    public SendStatusNotificationRequest(RequestDivElement?: HTMLDivElement)
    {

      const StatusNotificationRequestDiv  = RequestDivElement ?? document.querySelector("#StatusNotificationRequest");
      const properties                    = StatusNotificationRequestDiv?.querySelector(".properties")               as HTMLDivElement;
      const ConnectorId                   = (properties?.querySelector("#StatusNotificationRequest_ConnectorId")     as HTMLInputElement)?.value;
      const Status                        = (properties?.querySelector("#StatusNotificationRequest_Status")          as HTMLInputElement)?.value;
      const ErrorCode                     = (properties?.querySelector("#StatusNotificationRequest_ErrorCode")       as HTMLInputElement)?.value;
      const Info                          = (properties?.querySelector("#StatusNotificationRequest_Info")            as HTMLInputElement)?.value;
      const Timestamp                     = (properties?.querySelector("#StatusNotificationRequest_Timestamp")       as HTMLInputElement)?.value;
      const VendorId                      = (properties?.querySelector("#StatusNotificationRequest_VendorId")        as HTMLInputElement)?.value;
      const VendorErrorCode               = (properties?.querySelector("#StatusNotificationRequest_VendorErrorCode") as HTMLInputElement)?.value;

      this.sendRequest("StatusNotification",
                       {
                           "connectorId":      parseInt(ConnectorId),
                           "status":           Status,
                           "errorCode":        ErrorCode,
                           "info":             Info,
                           "timestamp":        Timestamp != "" ? Timestamp : new Date().toISOString(),
                           "vendorId":         VendorId,
                           "vendorErrorCode":  VendorErrorCode
                       });

    }

    public SendMeterValuesRequest(RequestDivElement?: HTMLDivElement)
    {

      const MeterValuesRequestDiv  = RequestDivElement ?? document.querySelector("#MeterValuesRequest");
      const properties             = MeterValuesRequestDiv?.querySelector(".properties")                                   as HTMLDivElement;
      const ConnectorId            = (properties?.querySelector("#MeterValuesRequest_ConnectorId")                         as HTMLInputElement)?.value;
      const TransactionId          = (properties?.querySelector("#MeterValuesRequest_TransactionId")                       as HTMLInputElement)?.value;

      const Timestamp              = (properties?.querySelector("#MeterValuesRequest_MeterValue1_Timestamp")               as HTMLInputElement)?.value;
      //const SampledValues          =  properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValues");

      const Value                  = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Value")     as HTMLInputElement)?.value;
      const Context                = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Context")   as HTMLSelectElement)?.value;
      const Format                 = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Format")    as HTMLSelectElement)?.value;
      const Measurand              = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Measurand") as HTMLSelectElement)?.value;
      const Phase                  = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Phase")     as HTMLSelectElement)?.value;
      const Location               = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Location")  as HTMLSelectElement)?.value;
      const Unit                   = (properties?.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Unit")      as HTMLSelectElement)?.value;

      this.sendRequest("MeterValues",
                       {
                           "connectorId":    parseInt(ConnectorId),
                           "transactionId":  TransactionId != "" ? parseInt(TransactionId) : null,
                           "meterValue":     [
                               {
                                   "timestamp":    Timestamp != "" ? Timestamp : new Date().toISOString(),
                                   "sampledValue": [
                                       {
                                           "value":      Value,
                                           "context":    Context   != "-" ? Context   : null,
                                           "format":     Format    != "-" ? Format    : null,
                                           "measurand":  Measurand != "-" ? Measurand : null,
                                           "phase":      Phase     != "-" ? Phase     : null,
                                           "location":   Location  != "-" ? Location  : null,
                                           "unit":       Unit      != "-" ? Unit      : null
                                       }
                                   ]
                               }
                           ]
                       });

    }

    public SendStopTransactionRequest(RequestDivElement?: HTMLDivElement)
    {

      const StopTransactionRequestDiv  = RequestDivElement ?? document.querySelector("#StopTransactionRequest");
      const properties                 = StopTransactionRequestDiv?.querySelector(".properties")                                        as HTMLDivElement;
      const TransactionId              = (properties?.querySelector("#StopTransactionRequest_TransactionId")                            as HTMLInputElement)?.value;
      const IdTag                      = (properties?.querySelector("#StopTransactionRequest_IdTag")                                    as HTMLInputElement)?.value;
      const Timestamp                  = (properties?.querySelector("#StopTransactionRequest_Timestamp")                                as HTMLInputElement)?.value;
      const MeterStop                  = (properties?.querySelector("#StopTransactionRequest_MeterStop")                                as HTMLInputElement)?.value;
      const Reason                     = (properties?.querySelector("#StopTransactionRequest_Reason")                                   as HTMLSelectElement)?.value;
      
      const Timestamp1                 = (properties?.querySelector("#StopTransactionRequest_TransactionData1_Timestamp")               as HTMLInputElement)?.value;
      //const SampledValues              =  properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValues");
      
      const Value                      = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Value")     as HTMLSelectElement)?.value;
      const Context                    = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Context")   as HTMLSelectElement)?.value;
      const Format                     = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Format")    as HTMLSelectElement)?.value;
      const Measurand                  = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Measurand") as HTMLSelectElement)?.value;
      const Phase                      = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Phase")     as HTMLSelectElement)?.value;
      const Location                   = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Location")  as HTMLSelectElement)?.value;
      const Unit                       = (properties?.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Unit")      as HTMLSelectElement)?.value;

      this.sendRequest("StopTransaction",
                       {
                           "transactionId":    TransactionId != ""  ? parseInt(TransactionId) : null,
                           "idTag":            IdTag,
                           "timestamp":        Timestamp     != ""  ? Timestamp               : new Date().toISOString(),
                           "meterStop":        MeterStop     != ""  ? parseInt(MeterStop)     : null,
                           "reason":           Reason        != "-" ? Reason                  : null,
                           "meterValue":       [
                               {
                                   "timestamp":    Timestamp1 != "" ? Timestamp1 : new Date().toISOString(),
                                   "sampledValue": [
                                       {
                                           "value":      Value,
                                           "context":    Context   != "-" ? Context   : null,
                                           "format":     Format    != "-" ? Format    : null,
                                           "measurand":  Measurand != "-" ? Measurand : null,
                                           "phase":      Phase     != "-" ? Phase     : null,
                                           "location":   Location  != "-" ? Location  : null,
                                           "unit":       Unit      != "-" ? Unit      : null
                                       }
                                   ]
                               }
                           ]
                       });

    }

    public SendDataTransferRequest(RequestDivElement?: HTMLDivElement)
    {

      const dataTransferRequestDiv  = RequestDivElement ?? document.querySelector("#DataTransferRequest");
      const properties              = dataTransferRequestDiv?.querySelector(".properties")         as HTMLDivElement;
      const VendorId                = (properties?.querySelector("#DataTransferRequest_VendorId")  as HTMLInputElement)?.value;
      const MessageId               = (properties?.querySelector("#DataTransferRequest_MessageId") as HTMLInputElement)?.value;
      const Data                    = (properties?.querySelector("#DataTransferRequest_Data")      as HTMLInputElement)?.value;

      this.sendRequest("DataTransfer",
                       {
                           "vendorId":   VendorId,
                           "messageId":  MessageId,
                           "data":       Data
                       });

    }

    public SendDiagnosticsStatusNotificationRequest(RequestDivElement?: HTMLDivElement)
    {

      const DiagnosticsStatusNotificationRequestDiv  = RequestDivElement ?? document.querySelector("#DiagnosticsStatusNotificationRequest");
      const properties                               = DiagnosticsStatusNotificationRequestDiv?.querySelector(".properties")      as HTMLDivElement;
      const Status                                   = (properties?.querySelector("#DiagnosticsStatusNotificationRequest_Status") as HTMLSelectElement)?.value;

      this.sendRequest("DiagnosticsStatusNotification",
                       {
                           "status": Status
                       });

    }

    public SendFirmwareStatusNotificationRequest(RequestDivElement?: HTMLDivElement)
    {

      const FirmwareStatusNotificationRequestDiv  = RequestDivElement ?? document.querySelector("#FirmwareStatusNotificationRequest");
      const properties                            = FirmwareStatusNotificationRequestDiv?.querySelector(".properties")      as HTMLDivElement;
      const Status                                = (properties?.querySelector("#FirmwareStatusNotificationRequest_Status") as HTMLSelectElement)?.value;

      this.sendRequest("FirmwareStatusNotification",
                       {
                           "status": Status
                       });

    }

    public SendSignCertificateRequestRequest(RequestDivElement?: HTMLDivElement)
    {

      const SignCertificateRequestDiv  = RequestDivElement ?? document.querySelector("#SignCertificateRequest");
      const properties                 = SignCertificateRequestDiv?.querySelector(".properties")               as HTMLDivElement;

      const CSR                        = (properties?.querySelector("#SignCertificateRequest_Type")            as HTMLInputElement)?.value;
      const CertificateType            = (properties?.querySelector("#SignCertificateRequest_CertificateType") as HTMLSelectElement)?.value;
      const CustomData                 = (properties?.querySelector("#SignCertificateRequest_CustomData")      as HTMLInputElement)?.value;

      this.sendRequest("SignCertificate",
                       {
                           "csr":              CSR,
                           "certificateType":  CertificateType,
                           "customData":       this.ParseCustomData(CustomData)
                       });

    }

    public SendSecurityEventNotificationRequestRequest(RequestDivElement?: HTMLDivElement)
    {

      const SecurityEventNotificationRequestDiv  = RequestDivElement ?? document.querySelector("#SecurityEventNotificationRequest");
      const properties                           = SecurityEventNotificationRequestDiv?.querySelector(".properties")          as HTMLDivElement;

      const Type                                 = (properties?.querySelector("#SecurityEventNotificationRequest_Type")       as HTMLInputElement)?.value;
      const Timestamp                            = (properties?.querySelector("#SecurityEventNotificationRequest_Timestamp")  as HTMLInputElement)?.value;
      const TechInfo                             = (properties?.querySelector("#SecurityEventNotificationRequest_TechInfo")   as HTMLInputElement)?.value;
      const CustomData                           = (properties?.querySelector("#SecurityEventNotificationRequest_CustomData") as HTMLInputElement)?.value;

      this.sendRequest("SecurityEventNotification",
                       {
                           "type":        Type,
                           "timestamp":   Timestamp,
                           "techInfo":    TechInfo,
                           "customData":  this.ParseCustomData(CustomData)
                       });

    }

    public NotifyCustomerInformationRequestRequest(RequestDivElement?: HTMLDivElement)
    {

      const CustomerInformationRequestRequestDiv  = RequestDivElement ?? document.querySelector("#CustomerInformationRequestRequest");
      const properties                            = CustomerInformationRequestRequestDiv?.querySelector(".properties")      as HTMLDivElement;
      const Status                                = (properties?.querySelector("#CustomerInformationRequestRequest_Status") as HTMLSelectElement)?.value;

      this.sendRequest("CustomerInformationRequest",
                       {
                           "status": Status
                       });

    }

    public SendRAWRequest(RequestDivElement?: HTMLDivElement)
    {

      const RAWRequestDiv  = RequestDivElement ?? document.querySelector("#RAWRequest");
      const properties     = RAWRequestDiv?.querySelector(".properties")    as HTMLDivElement;
      const Request        = (properties?.querySelector("#RAWRequest_Text") as HTMLTextAreaElement)?.value;

      this.sendRAWRequest(Request);

    }

}
