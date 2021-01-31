"use strict";
/*
 * Copyright (c) 2021 GraphDefined GmbH <achim.friedland@graphdefined.com>
 * This file is part of Chargy Desktop App <https://github.com/OpenChargingCloud/ChargingStation>
 *
 * Licensed under the Affero GPL license, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.gnu.org/licenses/agpl.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class chargingStationApp {
    //#endregion
    constructor() {
        this.button = document.querySelector("button");
        this.output = document.querySelector("#output");
        this.textarea = document.querySelector("textarea");
        // wsUri    = "ws://echo.websocket.org/",
        var wsUri = "ws://127.0.0.1:8000/webServices/ocpp/CP3211";
        this.websocket = new WebSocket(wsUri);
        //button.addEventListener("click", this.onClickButton);
        this.button.onclick = () => this.onClickButton;
        this.websocket.onopen = (e) => {
            this.writeToScreen("CONNECTED");
            this.doSend("Grundlegende Vorgaben zur Rechnungsstellung an öffentliche Auftraggeber macht die Richtlinie 2010/45/EU. Sie wird in Bezug auf elektronische Rechnungen ergänzt durch die vom Europäischen Parlament am 11. März 2014 beschlossene Richtlinie 2014/55/EU. Diese gibt den Mitgliedstaaten vor, öffentliche Auftraggeber und Vergabestellen zur Annahme und Verarbeitung elektronischer Rechnungen zu verpflichten. Anschließend wird eine neue europäische Norm für die elektronische Rechnungsstellung in Europa eingeführt: 36 Monate nach Inkrafttreten der Richtlinie soll ein semantisches Datenmodell für die elektronische Rechnungsstellung vorliegen, das die verschiedenen nationalen Standards in Einklang bringt. Nach weiteren 18 Monaten wird die Umsetzung zwingend vorgeschrieben --- Seit dem 1. Juli 2011 sind in Deutschland gemäß Steuervereinfachungsgesetz 2011[5], mit dem die Richtlinie 2010/45/EU[6] umgesetzt wurde, elektronische Rechnungen und klassische Papierrechnungen durch Änderung des § 14 des Umsatzsteuergesetzes gleichgestellt, um Geschäftsprozesse einfacher und effizienter zu machen. Als nationale Umsetzung der Richtlinie 2014/55/EU trat im Mai 2017 der neue § 4a des E-Government-Gesetzes in Kraft, der die Bundesregierung ermächtigt, Vorgaben über die Ausgestaltung elektronischer Rechnungen durch Rechtsverordnung zu erlassen.[7] Davon machte sie mit der E-Rechnungsverordnung (ERechV)[8] Gebrauch, die überwiegend im November 2018 in Kraft (§ 11 ERechV) getreten ist und seit ihrem Inkrafttreten für die Rechnungsstellung an öffentliche Auftraggebern anzuwenden ist. Die Verordnung macht durch einen Verweis auf den kurz zuvor verkündeten[9] Datenaustauschstandard XRechnung detaillierte Vorgaben über die technische Ausgestaltung elektronischer Rechnungen.");
        };
        this.websocket.onclose = (e) => {
            this.writeToScreen("DISCONNECTED");
        };
        this.websocket.onmessage = (e) => {
            this.writeToScreen("<span>RESPONSE: " + e.data + "</span>");
        };
        this.websocket.onerror = (e) => {
            this.writeToScreen("<span class=error>ERROR:</span> " + e.data);
        };
        this.commandsDiv = document.querySelector("#commands");
        this.bootNotificationRequestDiv = this.commandsDiv.querySelector("#BootNotificationRequest");
        this.heartbeatRequestDiv = this.commandsDiv.querySelector("#HeartbeatRequest");
        this.authorizeRequestDiv = this.commandsDiv.querySelector("#AuthorizeRequest");
        this.startTransactionRequestDiv = this.commandsDiv.querySelector("#StartTransactionRequest");
        this.statusNotificationRequestDiv = this.commandsDiv.querySelector("#StatusNotificationRequest");
        this.meterValuesRequestDiv = this.commandsDiv.querySelector("#MeterValuesRequest");
        this.stopTransactionRequestDiv = this.commandsDiv.querySelector("#StopTransactionRequest");
        this.dataTransferRequestDiv = this.commandsDiv.querySelector("#DataTransferRequest");
        this.diagnosticsStatusNotificationRequestDiv = this.commandsDiv.querySelector("#DiagnosticsStatusNotificationRequest");
        this.firmwareStatusNotificationRequestDiv = this.commandsDiv.querySelector("#FirmwareStatusNotificationRequest");
        this.sendBootNotificationRequestButton = this.bootNotificationRequestDiv.querySelector("#BootNotificationRequestButton");
        this.sendHeartbeatRequestButton = this.heartbeatRequestDiv.querySelector("#HeartbeatRequestButton");
        this.sendAuthorizeRequestButton = this.authorizeRequestDiv.querySelector("#AuthorizeRequestButton");
        this.sendStartTransactionRequestButton = this.startTransactionRequestDiv.querySelector("#StartTransactionRequestButton");
        this.sendStatusNotificationRequestButton = this.statusNotificationRequestDiv.querySelector("#StatusNotificationRequestButton");
        this.sendMeterValuesRequestButton = this.meterValuesRequestDiv.querySelector("#MeterValuesRequestButton");
        this.sendStopTransactionRequestButton = this.stopTransactionRequestDiv.querySelector("#StopTransactionRequestButton");
        this.sendDataTransferRequestButton = this.dataTransferRequestDiv.querySelector("#DataTransferRequestButton");
        this.sendDiagnosticsStatusNotificationRequestButton = this.diagnosticsStatusNotificationRequestDiv.querySelector("#DiagnosticsStatusNotificationRequestButton");
        this.sendFirmwareStatusNotificationRequestButton = this.firmwareStatusNotificationRequestDiv.querySelector("#FirmwareStatusNotificationRequestButton");
        this.sendBootNotificationRequestButton.onclick = () => this.SendBootNotificationRequest();
        this.sendHeartbeatRequestButton.onclick = () => this.SendHeartbeatRequest();
        this.sendAuthorizeRequestButton.onclick = () => this.SendAuthorizeRequest();
        this.sendStartTransactionRequestButton.onclick = () => this.SendStartTransactionRequest();
        this.sendStatusNotificationRequestButton.onclick = () => this.SendStatusNotificationRequest();
        this.sendMeterValuesRequestButton.onclick = () => this.SendMeterValuesRequest();
        this.sendStopTransactionRequestButton.onclick = () => this.SendStopTransactionRequest();
        this.sendDataTransferRequestButton.onclick = () => this.SendDataTransferRequest();
        this.sendDiagnosticsStatusNotificationRequestButton.onclick = () => this.SendDiagnosticsStatusNotificationRequest();
        this.sendFirmwareStatusNotificationRequestButton.onclick = () => this.SendFirmwareStatusNotificationRequest();
        this.buttonsDiv = document.querySelector("#buttons");
        this.showBootNotificationRequestButton = this.buttonsDiv.querySelector("#ShowBootNotificationRequestButton");
        this.showHeartbeatRequestButton = this.buttonsDiv.querySelector("#ShowHeartbeatRequestButton");
        this.showAuthorizeRequestButton = this.buttonsDiv.querySelector("#ShowAuthorizeRequestButton");
        this.showStartTransactionRequestButton = this.buttonsDiv.querySelector("#ShowStartTransactionRequestButton");
        this.showStatusNotificationRequestButton = this.buttonsDiv.querySelector("#ShowStatusNotificationRequestButton");
        this.showMeterValuesRequestButton = this.buttonsDiv.querySelector("#ShowMeterValuesRequestButton");
        this.showStopTransactionRequestButton = this.buttonsDiv.querySelector("#ShowStopTransactionRequestButton");
        this.showDataTransferRequestButton = this.buttonsDiv.querySelector("#ShowDataTransferRequestButton");
        this.showDiagnosticsStatusNotificationRequestButton = this.buttonsDiv.querySelector("#ShowDiagnosticsStatusNotificationRequestButton");
        this.showFirmwareStatusNotificationRequestButton = this.buttonsDiv.querySelector("#ShowFirmwareStatusNotificationRequestButton");
        this.showBootNotificationRequestButton.onclick = () => this.showDialog(this.bootNotificationRequestDiv);
        this.showHeartbeatRequestButton.onclick = () => this.showDialog(this.heartbeatRequestDiv);
        this.showAuthorizeRequestButton.onclick = () => this.showDialog(this.authorizeRequestDiv);
        this.showStartTransactionRequestButton.onclick = () => this.showDialog(this.startTransactionRequestDiv);
        this.showStatusNotificationRequestButton.onclick = () => this.showDialog(this.statusNotificationRequestDiv);
        this.showMeterValuesRequestButton.onclick = () => this.showDialog(this.meterValuesRequestDiv);
        this.showStopTransactionRequestButton.onclick = () => this.showDialog(this.stopTransactionRequestDiv);
        this.showDataTransferRequestButton.onclick = () => this.showDialog(this.dataTransferRequestDiv);
        this.showDiagnosticsStatusNotificationRequestButton.onclick = () => this.showDialog(this.diagnosticsStatusNotificationRequestDiv);
        this.showFirmwareStatusNotificationRequestButton.onclick = () => this.showDialog(this.firmwareStatusNotificationRequestDiv);
    }
    showDialog(dialogDiv) {
        for (const dialog of Array.from(document.querySelectorAll("#commands .command")))
            dialog.style.display = "none";
        dialogDiv.style.display = "block";
    }
    doSend(message) {
        this.writeToScreen("SENT: " + message);
        this.websocket.send(message);
    }
    writeToScreen(message) {
        this.output.insertAdjacentHTML("afterbegin", "<p>" + message + "</p>");
    }
    onClickButton() {
        var text = this.textarea.value;
        text && this.doSend(text);
        this.textarea.value = "";
        this.textarea.focus();
    }
    sendRequest(command, request) {
        var message = JSON.stringify([2,
            "19223201",
            command,
            request != null ? request : {}]);
        this.writeToScreen("SENT: " + message);
        this.websocket.send(message);
    }
    SendBootNotificationRequest() {
        var bootNotificationRequestDiv = document.querySelector("#BootNotificationRequest");
        var properties = bootNotificationRequestDiv === null || bootNotificationRequestDiv === void 0 ? void 0 : bootNotificationRequestDiv.querySelector(".properties");
        var ChargePointVendor = properties.querySelector("#BootNotificationRequest_ChargePointVendor").value;
        var ChargePointModel = properties.querySelector("#BootNotificationRequest_ChargePointModel").value;
        var ChargePointSerialNumber = properties.querySelector("#BootNotificationRequest_ChargePointSerialNumber").value;
        var ChargeBoxSerialNumber = properties.querySelector("#BootNotificationRequest_ChargeBoxSerialNumber").value;
        var FirmwareVersion = properties.querySelector("#BootNotificationRequest_FirmwareVersion").value;
        var ICCId = properties.querySelector("#BootNotificationRequest_ICCId").value;
        var IMSI = properties.querySelector("#BootNotificationRequest_IMSI").value;
        var MeterType = properties.querySelector("#BootNotificationRequest_MeterType").value;
        var MeterSerialNumber = properties.querySelector("#BootNotificationRequest_MeterSerialNumber").value;
        this.sendRequest("BootNotification", {
            "chargePointVendor": ChargePointVendor,
            "chargePointModel": ChargePointModel,
            "chargePointSerialNumber": ChargePointSerialNumber != "" ? ChargePointSerialNumber : null,
            "chargeBoxSerialNumber": ChargeBoxSerialNumber != "" ? ChargeBoxSerialNumber : null,
            "firmwareVersion": FirmwareVersion != "" ? FirmwareVersion : null,
            "iccid": ICCId != "" ? ICCId : null,
            "imsi": IMSI != "" ? IMSI : null,
            "meterType": MeterType != "" ? MeterType : null,
            "meterSerialNumber": MeterSerialNumber != "" ? MeterSerialNumber : null
        });
    }
    SendHeartbeatRequest() {
        this.sendRequest("Heartbeat", null);
    }
    SendAuthorizeRequest() {
        var authorizeRequestDiv = document.querySelector("#AuthorizeRequest");
        var properties = authorizeRequestDiv === null || authorizeRequestDiv === void 0 ? void 0 : authorizeRequestDiv.querySelector(".properties");
        var IdTag = properties.querySelector("#AuthorizeRequest_IdTag").value;
        this.sendRequest("Authorize", {
            "idTag": IdTag
        });
    }
    SendStartTransactionRequest() {
        var startTransactionRequestDiv = document.querySelector("#StartTransactionRequest");
        var properties = startTransactionRequestDiv === null || startTransactionRequestDiv === void 0 ? void 0 : startTransactionRequestDiv.querySelector(".properties");
        var ConnectorId = properties.querySelector("#StartTransactionRequest_ConnectorId").value;
        var IdTag = properties.querySelector("#StartTransactionRequest_IdTag").value;
        var Timestamp = properties.querySelector("#StartTransactionRequest_Timestamp").value;
        var MeterStart = properties.querySelector("#StartTransactionRequest_MeterStart").value;
        var ReservationId = properties.querySelector("#StartTransactionRequest_ReservationId").value;
        this.sendRequest("StartTransaction", {
            "connectorId": parseInt(ConnectorId),
            "idTag": IdTag,
            "timestamp": Timestamp != "" ? Timestamp : new Date().toISOString(),
            "meterStart": parseInt(MeterStart),
            "reservationId": ReservationId != "" ? parseInt(ReservationId) : null
        });
    }
    SendStatusNotificationRequest() {
        var StatusNotificationRequestDiv = document.querySelector("#StatusNotificationRequest");
        var properties = StatusNotificationRequestDiv === null || StatusNotificationRequestDiv === void 0 ? void 0 : StatusNotificationRequestDiv.querySelector(".properties");
        var ConnectorId = properties.querySelector("#StatusNotificationRequest_ConnectorId").value;
        var Status = properties.querySelector("#StatusNotificationRequest_Status").value;
        var ErrorCode = properties.querySelector("#StatusNotificationRequest_ErrorCode").value;
        var Info = properties.querySelector("#StatusNotificationRequest_Info").value;
        var Timestamp = properties.querySelector("#StatusNotificationRequest_Timestamp").value;
        var VendorId = properties.querySelector("#StatusNotificationRequest_VendorId").value;
        var VendorErrorCode = properties.querySelector("#StatusNotificationRequest_VendorErrorCode").value;
        this.sendRequest("StatusNotification", {
            "connectorId": parseInt(ConnectorId),
            "status": Status,
            "errorCode": ErrorCode,
            "info": Info,
            "timestamp": Timestamp != "" ? Timestamp : new Date().toISOString(),
            "vendorId": VendorId,
            "vendorErrorCode": VendorErrorCode
        });
    }
    SendMeterValuesRequest() {
        var MeterValuesRequestDiv = document.querySelector("#MeterValuesRequest");
        var properties = MeterValuesRequestDiv === null || MeterValuesRequestDiv === void 0 ? void 0 : MeterValuesRequestDiv.querySelector(".properties");
        var ConnectorId = properties.querySelector("#MeterValuesRequest_ConnectorId").value;
        var TransactionId = properties.querySelector("#MeterValuesRequest_TransactionId").value;
        var Timestamp = properties.querySelector("#MeterValuesRequest_MeterValue1_Timestamp").value;
        var SampledValues = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValues");
        var Value = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Value").value;
        var Context = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Context").value;
        var Format = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Format").value;
        var Measurand = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Measurand").value;
        var Phase = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Phase").value;
        var Location = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Location").value;
        var Unit = properties.querySelector("#MeterValuesRequest_MeterValue1_SampledValue1_Unit").value;
        this.sendRequest("MeterValues", {
            "connectorId": parseInt(ConnectorId),
            "transactionId": TransactionId != "" ? parseInt(TransactionId) : null,
            "meterValue": [
                {
                    "timestamp": Timestamp != "" ? Timestamp : new Date().toISOString(),
                    "sampledValue": [
                        {
                            "value": Value,
                            "context": Context != "-" ? Context : null,
                            "format": Format != "-" ? Format : null,
                            "measurand": Measurand != "-" ? Measurand : null,
                            "phase": Phase != "-" ? Phase : null,
                            "location": Location != "-" ? Location : null,
                            "unit": Unit != "-" ? Unit : null
                        }
                    ]
                }
            ]
        });
    }
    SendStopTransactionRequest() {
        var StopTransactionRequestDiv = document.querySelector("#StopTransactionRequest");
        var properties = StopTransactionRequestDiv === null || StopTransactionRequestDiv === void 0 ? void 0 : StopTransactionRequestDiv.querySelector(".properties");
        var TransactionId = properties.querySelector("#StopTransactionRequest_TransactionId").value;
        var IdTag = properties.querySelector("#StopTransactionRequest_IdTag").value;
        var Timestamp = properties.querySelector("#StopTransactionRequest_Timestamp").value;
        var MeterStop = properties.querySelector("#StopTransactionRequest_MeterStop").value;
        var Reason = properties.querySelector("#StopTransactionRequest_Reason").value;
        var Timestamp1 = properties.querySelector("#StopTransactionRequest_TransactionData1_Timestamp").value;
        var SampledValues = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValues");
        var Value = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Value").value;
        var Context = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Context").value;
        var Format = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Format").value;
        var Measurand = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Measurand").value;
        var Phase = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Phase").value;
        var Location = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Location").value;
        var Unit = properties.querySelector("#StopTransactionRequest_TransactionData1_SampledValue1_Unit").value;
        this.sendRequest("StopTransaction", {
            "transactionId": TransactionId != "" ? parseInt(TransactionId) : null,
            "idTag": IdTag,
            "timestamp": Timestamp != "" ? Timestamp : new Date().toISOString(),
            "meterStop": MeterStop != "" ? parseInt(MeterStop) : null,
            "reason": Reason != "-" ? Reason : null,
            "meterValue": [
                {
                    "timestamp": Timestamp1 != "" ? Timestamp1 : new Date().toISOString(),
                    "sampledValue": [
                        {
                            "value": Value,
                            "context": Context != "-" ? Context : null,
                            "format": Format != "-" ? Format : null,
                            "measurand": Measurand != "-" ? Measurand : null,
                            "phase": Phase != "-" ? Phase : null,
                            "location": Location != "-" ? Location : null,
                            "unit": Unit != "-" ? Unit : null
                        }
                    ]
                }
            ]
        });
    }
    SendDataTransferRequest() {
        var dataTransferRequestDiv = document.querySelector("#DataTransferRequest");
        var properties = dataTransferRequestDiv === null || dataTransferRequestDiv === void 0 ? void 0 : dataTransferRequestDiv.querySelector(".properties");
        var VendorId = properties.querySelector("#DataTransferRequest_VendorId").value;
        var MessageId = properties.querySelector("#DataTransferRequest_MessageId").value;
        var Data = properties.querySelector("#DataTransferRequest_Data").value;
        this.sendRequest("DataTransfer", {
            "vendorId": VendorId,
            "messageId": MessageId,
            "data": Data
        });
    }
    SendDiagnosticsStatusNotificationRequest() {
        var DiagnosticsStatusNotificationRequestDiv = document.querySelector("#DiagnosticsStatusNotificationRequest");
        var properties = DiagnosticsStatusNotificationRequestDiv === null || DiagnosticsStatusNotificationRequestDiv === void 0 ? void 0 : DiagnosticsStatusNotificationRequestDiv.querySelector(".properties");
        var Status = properties.querySelector("#DiagnosticsStatusNotificationRequest_Status").value;
        this.sendRequest("DiagnosticsStatusNotification", {
            "status": Status
        });
    }
    SendFirmwareStatusNotificationRequest() {
        var FirmwareStatusNotificationRequestDiv = document.querySelector("#FirmwareStatusNotificationRequest");
        var properties = FirmwareStatusNotificationRequestDiv === null || FirmwareStatusNotificationRequestDiv === void 0 ? void 0 : FirmwareStatusNotificationRequestDiv.querySelector(".properties");
        var Status = properties.querySelector("#FirmwareStatusNotificationRequest_Status").value;
        this.sendRequest("FirmwareStatusNotification", {
            "status": Status
        });
    }
}
//# sourceMappingURL=chargingStationApp.js.map