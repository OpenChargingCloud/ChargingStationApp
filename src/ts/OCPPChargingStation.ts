/*
 * Copyright 2014-2023 GraphDefined GmbH <achim.friedland@graphdefined.com>
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

interface WriteToScreenDelegate {
    (message: string|Element): void;
}

class OCPPChargingStation {

    //#region Data

    private          websocket?:                                         WebSocket;

    private readonly csmsDiv:                                            HTMLDivElement;
    private readonly csmsURL:                                            HTMLInputElement;
    private readonly csmsOCPPVersion:                                    HTMLSelectElement;
    private readonly csmsConnectButton:                                  HTMLButtonElement;

    private readonly commandsDiv:                                        HTMLDivElement;
    private readonly bootNotificationRequestDiv:                         HTMLDivElement;
    private readonly heartbeatRequestDiv:                                HTMLDivElement;
    private readonly authorizeRequestDiv:                                HTMLDivElement;
    private readonly startTransactionRequestDiv:                         HTMLDivElement;
    private readonly statusNotificationRequestDiv:                       HTMLDivElement;
    private readonly meterValuesRequestDiv:                              HTMLDivElement;
    private readonly stopTransactionRequestDiv:                          HTMLDivElement;
    private readonly dataTransferRequestDiv:                             HTMLDivElement;
    private readonly diagnosticsStatusNotificationRequestDiv:            HTMLDivElement;
    private readonly firmwareStatusNotificationRequestDiv:               HTMLDivElement;
    private readonly rawRequestDiv:                                      HTMLDivElement;

    private readonly controlDiv:                                         HTMLDivElement;

    private readonly buttonsDiv:                                         HTMLDivElement;
    private readonly showBootNotificationRequestButton:                  HTMLButtonElement;
    private readonly showHeartbeatRequestButton:                         HTMLButtonElement;
    private readonly showAuthorizeRequestButton:                         HTMLButtonElement;
    private readonly showStartTransactionRequestButton:                  HTMLButtonElement;
    private readonly showStatusNotificationRequestButton:                HTMLButtonElement;
    private readonly showMeterValuesRequestButton:                       HTMLButtonElement;
    private readonly showStopTransactionRequestButton:                   HTMLButtonElement;
    private readonly showDataTransferRequestButton:                      HTMLButtonElement;
    private readonly showDiagnosticsStatusNotificationRequestButton:     HTMLButtonElement;
    private readonly showFirmwareStatusNotificationRequestButton:        HTMLButtonElement;
    private readonly showRAWRequestButton:                               HTMLButtonElement;

    private readonly sendBootNotificationRequestButton:                  HTMLButtonElement;
    private readonly sendHeartbeatRequestButton:                         HTMLButtonElement;
    private readonly sendAuthorizeRequestButton:                         HTMLButtonElement;
    private readonly sendStartTransactionRequestButton:                  HTMLButtonElement;
    private readonly sendStatusNotificationRequestButton:                HTMLButtonElement;
    private readonly sendMeterValuesRequestButton:                       HTMLButtonElement;
    private readonly sendStopTransactionRequestButton:                   HTMLButtonElement;
    private readonly sendDataTransferRequestButton:                      HTMLButtonElement;
    private readonly sendDiagnosticsStatusNotificationRequestButton:     HTMLButtonElement;
    private readonly sendFirmwareStatusNotificationRequestButton:        HTMLButtonElement;
    private readonly sendRAWRequestButton:                               HTMLButtonElement;

    private readonly WriteToScreen:                                      WriteToScreenDelegate;


    private requestId: number = 100000;

    //#endregion

    //#region Constructor

    constructor(WriteToScreen: WriteToScreenDelegate)
    {

        this.WriteToScreen = WriteToScreen;

        //#region Data

        // CSMS on the top
        this.csmsDiv                                                 = document.querySelector("#CSMS")                                                  as HTMLDivElement;
        this.csmsURL                                                 = this.csmsDiv.querySelector("#CSMS_URL")                                          as HTMLInputElement;
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
        this.showStatusNotificationRequestButton                     = this.buttonsDiv.querySelector("#ShowStatusNotificationRequestButton")            as HTMLButtonElement;
        this.showMeterValuesRequestButton                            = this.buttonsDiv.querySelector("#ShowMeterValuesRequestButton")                   as HTMLButtonElement;
        this.showStopTransactionRequestButton                        = this.buttonsDiv.querySelector("#ShowStopTransactionRequestButton")               as HTMLButtonElement;
        this.showDataTransferRequestButton                           = this.buttonsDiv.querySelector("#ShowDataTransferRequestButton")                  as HTMLButtonElement;
        this.showDiagnosticsStatusNotificationRequestButton          = this.buttonsDiv.querySelector("#ShowDiagnosticsStatusNotificationRequestButton") as HTMLButtonElement;
        this.showFirmwareStatusNotificationRequestButton             = this.buttonsDiv.querySelector("#ShowFirmwareStatusNotificationRequestButton")    as HTMLButtonElement;
        this.showRAWRequestButton                                    = this.buttonsDiv.querySelector("#ShowRAWRequestButton")                           as HTMLButtonElement;

        this.showBootNotificationRequestButton.onclick               = () => this.showDialog(this.bootNotificationRequestDiv);
        this.showHeartbeatRequestButton.onclick                      = () => this.showDialog(this.heartbeatRequestDiv);
        this.showAuthorizeRequestButton.onclick                      = () => this.showDialog(this.authorizeRequestDiv);
        this.showStartTransactionRequestButton.onclick               = () => this.showDialog(this.startTransactionRequestDiv);
        this.showStatusNotificationRequestButton.onclick             = () => this.showDialog(this.statusNotificationRequestDiv);
        this.showMeterValuesRequestButton.onclick                    = () => this.showDialog(this.meterValuesRequestDiv);
        this.showStopTransactionRequestButton.onclick                = () => this.showDialog(this.stopTransactionRequestDiv);
        this.showDataTransferRequestButton.onclick                   = () => this.showDialog(this.dataTransferRequestDiv);
        this.showDiagnosticsStatusNotificationRequestButton.onclick  = () => this.showDialog(this.diagnosticsStatusNotificationRequestDiv);
        this.showFirmwareStatusNotificationRequestButton.onclick     = () => this.showDialog(this.firmwareStatusNotificationRequestDiv);
        this.showRAWRequestButton.onclick                            = () => this.showDialog(this.rawRequestDiv);

        // Commands on the right
        this.commandsDiv                                             = this.controlDiv. querySelector("#commands")                              as HTMLDivElement;
        this.bootNotificationRequestDiv                              = this.commandsDiv.querySelector("#BootNotificationRequest")               as HTMLDivElement;
        this.heartbeatRequestDiv                                     = this.commandsDiv.querySelector("#HeartbeatRequest")                      as HTMLDivElement;
        this.authorizeRequestDiv                                     = this.commandsDiv.querySelector("#AuthorizeRequest")                      as HTMLDivElement;
        this.startTransactionRequestDiv                              = this.commandsDiv.querySelector("#StartTransactionRequest")               as HTMLDivElement;
        this.statusNotificationRequestDiv                            = this.commandsDiv.querySelector("#StatusNotificationRequest")             as HTMLDivElement;
        this.meterValuesRequestDiv                                   = this.commandsDiv.querySelector("#MeterValuesRequest")                    as HTMLDivElement;
        this.stopTransactionRequestDiv                               = this.commandsDiv.querySelector("#StopTransactionRequest")                as HTMLDivElement;
        this.dataTransferRequestDiv                                  = this.commandsDiv.querySelector("#DataTransferRequest")                   as HTMLDivElement;
        this.diagnosticsStatusNotificationRequestDiv                 = this.commandsDiv.querySelector("#DiagnosticsStatusNotificationRequest")  as HTMLDivElement;
        this.firmwareStatusNotificationRequestDiv                    = this.commandsDiv.querySelector("#FirmwareStatusNotificationRequest")     as HTMLDivElement;
        this.rawRequestDiv                                           = this.commandsDiv.querySelector("#RAWRequest")                            as HTMLDivElement;

        this.sendBootNotificationRequestButton                       = this.bootNotificationRequestDiv.             querySelector("#BootNotificationRequestButton")              as HTMLButtonElement;
        this.sendHeartbeatRequestButton                              = this.heartbeatRequestDiv.                    querySelector("#HeartbeatRequestButton")                     as HTMLButtonElement;
        this.sendAuthorizeRequestButton                              = this.authorizeRequestDiv.                    querySelector("#AuthorizeRequestButton")                     as HTMLButtonElement;
        this.sendStartTransactionRequestButton                       = this.startTransactionRequestDiv.             querySelector("#StartTransactionRequestButton")              as HTMLButtonElement;
        this.sendStatusNotificationRequestButton                     = this.statusNotificationRequestDiv.           querySelector("#StatusNotificationRequestButton")            as HTMLButtonElement;
        this.sendMeterValuesRequestButton                            = this.meterValuesRequestDiv.                  querySelector("#MeterValuesRequestButton")                   as HTMLButtonElement;
        this.sendStopTransactionRequestButton                        = this.stopTransactionRequestDiv.              querySelector("#StopTransactionRequestButton")               as HTMLButtonElement;
        this.sendDataTransferRequestButton                           = this.dataTransferRequestDiv.                 querySelector("#DataTransferRequestButton")                  as HTMLButtonElement;
        this.sendDiagnosticsStatusNotificationRequestButton          = this.diagnosticsStatusNotificationRequestDiv.querySelector("#DiagnosticsStatusNotificationRequestButton") as HTMLButtonElement;
        this.sendFirmwareStatusNotificationRequestButton             = this.firmwareStatusNotificationRequestDiv.   querySelector("#FirmwareStatusNotificationRequestButton")    as HTMLButtonElement;
        this.sendRAWRequestButton                                    = this.rawRequestDiv.                          querySelector("#RAWRequestButton")                           as HTMLButtonElement;

        this.sendBootNotificationRequestButton.onclick               = () => this.SendBootNotificationRequest();
        this.sendHeartbeatRequestButton.onclick                      = () => this.SendHeartbeatRequest();
        this.sendAuthorizeRequestButton.onclick                      = () => this.SendAuthorizeRequest();
        this.sendStartTransactionRequestButton.onclick               = () => this.SendStartTransactionRequest();
        this.sendStatusNotificationRequestButton.onclick             = () => this.SendStatusNotificationRequest();
        this.sendMeterValuesRequestButton.onclick                    = () => this.SendMeterValuesRequest();
        this.sendStopTransactionRequestButton.onclick                = () => this.SendStopTransactionRequest();
        this.sendDataTransferRequestButton.onclick                   = () => this.SendDataTransferRequest();
        this.sendDiagnosticsStatusNotificationRequestButton.onclick  = () => this.SendDiagnosticsStatusNotificationRequest();
        this.sendFirmwareStatusNotificationRequestButton.onclick     = () => this.SendFirmwareStatusNotificationRequest();
        this.sendRAWRequestButton.onclick                            = () => this.SendRAWRequest();

        //#endregion

        //#region Handle OCPP version selector

        this.csmsOCPPVersion.onchange = (e) => {

            for (const child of this.buttonsDiv.children as any as HTMLElement[]) {

                child.style.display = child.classList.contains(this.csmsOCPPVersion.value)
                                          ? 'block'
                                          : 'none';

            }

            for (const child of this.commandsDiv.children as any as HTMLElement[]) {

                if (child.classList.contains("properties"))
                {
                    child.style.display = child.classList.contains(this.csmsOCPPVersion.value)
                                              ? 'block'
                                              : 'none';
                }

            }

        }

        //#endregion

        //#region Handle connect button

        this.csmsConnectButton.onclick = (e) => {

            if (!this.websocket ||
                 this.websocket.readyState !== this.websocket.OPEN)
            {

                try
                {

                    this.websocket = new WebSocket(
                                         this.csmsURL.value,
                                         this.csmsOCPPVersion.value.toLowerCase().replace("v", "").replace("_", ".")
                                     );

                    this.websocket.onopen = (e) => {

                        this.WriteToScreen("CONNECTED");

                        this.csmsURL.readOnly                = true;
                        this.controlDiv.style.pointerEvents  = 'auto';
                        this.csmsConnectButton.textContent   = "Disconnect";

                    };

                    this.websocket.onerror = (e) => {

                        // There is NO USEFUL error information!
                        this.WriteToScreen("<span class=error>Websocket error!</span>");

                        if (this.websocket?.readyState !== WebSocket.OPEN)
                        {
                            this.csmsURL.readOnly                = false;
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
                        this.buttonsDiv.style.pointerEvents  = 'none';
                        this.csmsConnectButton.textContent   = "Connect";

                    };

                    this.websocket.onmessage = (e) => {

                        try
                        {

                            const message = JSON.parse(e.data);

                            switch (message[0])
                            {

                                case 2:
                                    this.WriteToScreen("<span>COMMAND: " + e.data + "</span>");

                                    const commandView = document.createElement('div');
                                    commandView.className = "commandView";

                                    switch (message[2])
                                    {

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

                                        case "ChangeAvailability": {

                                            //#region Change Availability variants

                                            const textView = document.createElement('div');
                                            textView.className = "description";

                                            textView.innerHTML = "Set connector " + message[3]["connectorId"] + " ";

                                            switch (message[3]["type"])
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
                                                this.sendResponse(message[1], { "status": "Accepted" });
                                            }
                                            buttonsDiv.appendChild(buttonAccept);

                                            const buttonReject         = document.createElement("button");
                                            buttonReject.innerHTML     = "Reject";
                                            buttonReject.onclick       = () => {
                                                buttonAccept.disabled    = true;
                                                buttonReject.disabled    = true;
                                                buttonScheduled.disabled = true;
                                                this.sendResponse(message[1], { "status": "Rejected" });
                                            }
                                            buttonsDiv.appendChild(buttonReject);

                                            const buttonScheduled      = document.createElement("button");
                                            buttonScheduled.innerHTML  = "Schedule";
                                            buttonScheduled.onclick    = () => {
                                                buttonAccept.disabled    = true;
                                                buttonReject.disabled    = true;
                                                buttonScheduled.disabled = true;
                                                this.sendResponse(message[1], { "status": "Scheduled" });
                                            }
                                            buttonsDiv.appendChild(buttonScheduled);

                                            commandView.appendChild(buttonsDiv);

                                            //#endregion

                                            }
                                            break;


                                    }

                                    this.WriteToScreen(commandView);

                                    break;

                                case 3:
                                    this.WriteToScreen("<span>RESPONSE: " + e.data + "</span>");
                                    break;

                            }

                        }
                        catch (ex)
                        {
                            this.WriteToScreen("<span>ERROR: " + e.data + " => " + ex + "</span>");
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


    private showDialog(dialogDiv: HTMLDivElement) {

        for (const dialog of Array.from(document.querySelectorAll<HTMLDivElement>("#commands .command")))
            dialog.style.display = "none";

        dialogDiv.style.display = "block";

    }

    public sendRAWRequest(message: string) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            this.WriteToScreen("SENT: " + message);
            this.websocket.send(message);

        }

    }

    public sendRequest(command: string, request: any) {

        if (this.websocket &&
            this.websocket.readyState === WebSocket.OPEN)
        {

            // Some central systems dislike null-values...
            for (let key in request)
            {
                if (request[key] == null)
                {
                    delete(request[key]);
                }
            }

            const message = JSON.stringify([ 2,
                                            (this.requestId++).toString(),
                                            command,
                                            request != null ? request : {}
                                        ]);

            this.WriteToScreen("SENT: " + message);
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
            this.websocket.send(message);

        }

    }


    public SendBootNotificationRequest(RequestDivElement?: HTMLDivElement)
    {

      const bootNotificationRequestDiv  = RequestDivElement ?? document.querySelector("#BootNotificationRequest");
      const properties                  = bootNotificationRequestDiv?.querySelector(".properties")                       as HTMLDivElement;
      const ChargePointVendor           = (properties?.querySelector("#BootNotificationRequest_ChargePointVendor")       as HTMLInputElement)?.value;
      const ChargePointModel            = (properties?.querySelector("#BootNotificationRequest_ChargePointModel")        as HTMLInputElement)?.value;
      const ChargePointSerialNumber     = (properties?.querySelector("#BootNotificationRequest_ChargePointSerialNumber") as HTMLInputElement)?.value;
      const ChargeBoxSerialNumber       = (properties?.querySelector("#BootNotificationRequest_ChargeBoxSerialNumber")   as HTMLInputElement)?.value;
      const FirmwareVersion             = (properties?.querySelector("#BootNotificationRequest_FirmwareVersion")         as HTMLInputElement)?.value;
      const ICCId                       = (properties?.querySelector("#BootNotificationRequest_ICCId")                   as HTMLInputElement)?.value;
      const IMSI                        = (properties?.querySelector("#BootNotificationRequest_IMSI")                    as HTMLInputElement)?.value;
      const MeterType                   = (properties?.querySelector("#BootNotificationRequest_MeterType")               as HTMLInputElement)?.value;
      const MeterSerialNumber           = (properties?.querySelector("#BootNotificationRequest_MeterSerialNumber")       as HTMLInputElement)?.value;

      this.sendRequest("BootNotification",
                       {
                           "chargePointVendor":        ChargePointVendor,
                           "chargePointModel":         ChargePointModel,
                           "chargePointSerialNumber":  ChargePointSerialNumber != "" ? ChargePointSerialNumber : null,
                           "chargeBoxSerialNumber":    ChargeBoxSerialNumber   != "" ? ChargeBoxSerialNumber   : null,
                           "firmwareVersion":          FirmwareVersion         != "" ? FirmwareVersion         : null,
                           "iccid":                    ICCId                   != "" ? ICCId                   : null,
                           "imsi":                     IMSI                    != "" ? IMSI                    : null,
                           "meterType":                MeterType               != "" ? MeterType               : null,
                           "meterSerialNumber":        MeterSerialNumber       != "" ? MeterSerialNumber       : null
                       });

    }

    public SendHeartbeatRequest(RequestDivElement?: HTMLDivElement)
    {
        this.sendRequest("Heartbeat", null);
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

    public SendRAWRequest(RequestDivElement?: HTMLDivElement)
    {

      const RAWRequestDiv  = RequestDivElement ?? document.querySelector("#RAWRequest");
      const properties     = RAWRequestDiv?.querySelector(".properties")    as HTMLDivElement;
      const Request        = (properties?.querySelector("#RAWRequest_Text") as HTMLTextAreaElement)?.value;

      this.sendRAWRequest(Request);

    }

}
