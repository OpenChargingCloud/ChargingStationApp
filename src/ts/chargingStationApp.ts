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

///<reference path="OCPPv1_6.ts" />

class chargingStationApp {

    //#region Data

    private readonly proxyOCPPv1_6:                                      OCPPv1_6;

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

    private readonly button:                                             HTMLButtonElement;
    private readonly output:                                             HTMLDivElement;
    private readonly textarea:                                           HTMLTextAreaElement;

    //#endregion

    constructor()
    {

        this.proxyOCPPv1_6  = new OCPPv1_6((t) => this.writeToScreen(t));

        this.button     = document.querySelector("button")  as HTMLButtonElement;
        this.output     = document.querySelector("#output") as HTMLDivElement;
        this.textarea   = document.querySelector("textarea")!;

        this.button.onclick = () => this.onClickButton;

        this.commandsDiv                                             = document.querySelector("#commands")                                      as HTMLDivElement;
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

        this.sendBootNotificationRequestButton.onclick               = () => this.proxyOCPPv1_6.SendBootNotificationRequest();
        this.sendHeartbeatRequestButton.onclick                      = () => this.proxyOCPPv1_6.SendHeartbeatRequest();
        this.sendAuthorizeRequestButton.onclick                      = () => this.proxyOCPPv1_6.SendAuthorizeRequest();
        this.sendStartTransactionRequestButton.onclick               = () => this.proxyOCPPv1_6.SendStartTransactionRequest();
        this.sendStatusNotificationRequestButton.onclick             = () => this.proxyOCPPv1_6.SendStatusNotificationRequest();
        this.sendMeterValuesRequestButton.onclick                    = () => this.proxyOCPPv1_6.SendMeterValuesRequest();
        this.sendStopTransactionRequestButton.onclick                = () => this.proxyOCPPv1_6.SendStopTransactionRequest();
        this.sendDataTransferRequestButton.onclick                   = () => this.proxyOCPPv1_6.SendDataTransferRequest();
        this.sendDiagnosticsStatusNotificationRequestButton.onclick  = () => this.proxyOCPPv1_6.SendDiagnosticsStatusNotificationRequest();
        this.sendFirmwareStatusNotificationRequestButton.onclick     = () => this.proxyOCPPv1_6.SendFirmwareStatusNotificationRequest();

        this.buttonsDiv                                              = document.querySelector("#buttons")                                               as HTMLDivElement;
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

    }


    private showDialog(dialogDiv: HTMLDivElement) {

        for (const dialog of Array.from(document.querySelectorAll<HTMLDivElement>("#commands .command")))
            dialog.style.display = "none";

        dialogDiv.style.display = "block";

    }

    private writeToScreen(message: string) {
        this.output?.insertAdjacentHTML("afterbegin", "<p>" + message + "</p>");
    }

    private onClickButton() {

        const text = this.textarea.value;

        text && this.proxyOCPPv1_6.sendRAWRequest(text);
        this.textarea.value = "";
        this.textarea.focus();

    }

 }
