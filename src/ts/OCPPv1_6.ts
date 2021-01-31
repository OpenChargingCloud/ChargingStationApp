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

interface WriteToScreenDelegate {
    (message: string): void;
}

class OCPPv1_6 {

    //#region Data

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

    private readonly websocket:                                          WebSocket;

    private readonly WriteToScreen:                                      WriteToScreenDelegate;

    //#endregion

    //#region Constructor

    constructor(WriteToScreen:  WriteToScreenDelegate,
                wsUri?:         string)
    {

        this.WriteToScreen = WriteToScreen;

        // var wsUri    = "ws://echo.websocket.org/",
        this.websocket  = new WebSocket(wsUri ?? "ws://127.0.0.1:8000/webServices/ocpp/CP3211");
    
        this.websocket.onopen = (e) => {
            this.WriteToScreen("CONNECTED");
            //this.sendRAWRequest("Grundlegende Vorgaben zur Rechnungsstellung an öffentliche Auftraggeber macht die Richtlinie 2010/45/EU. Sie wird in Bezug auf elektronische Rechnungen ergänzt durch die vom Europäischen Parlament am 11. März 2014 beschlossene Richtlinie 2014/55/EU. Diese gibt den Mitgliedstaaten vor, öffentliche Auftraggeber und Vergabestellen zur Annahme und Verarbeitung elektronischer Rechnungen zu verpflichten. Anschließend wird eine neue europäische Norm für die elektronische Rechnungsstellung in Europa eingeführt: 36 Monate nach Inkrafttreten der Richtlinie soll ein semantisches Datenmodell für die elektronische Rechnungsstellung vorliegen, das die verschiedenen nationalen Standards in Einklang bringt. Nach weiteren 18 Monaten wird die Umsetzung zwingend vorgeschrieben --- Seit dem 1. Juli 2011 sind in Deutschland gemäß Steuervereinfachungsgesetz 2011[5], mit dem die Richtlinie 2010/45/EU[6] umgesetzt wurde, elektronische Rechnungen und klassische Papierrechnungen durch Änderung des § 14 des Umsatzsteuergesetzes gleichgestellt, um Geschäftsprozesse einfacher und effizienter zu machen. Als nationale Umsetzung der Richtlinie 2014/55/EU trat im Mai 2017 der neue § 4a des E-Government-Gesetzes in Kraft, der die Bundesregierung ermächtigt, Vorgaben über die Ausgestaltung elektronischer Rechnungen durch Rechtsverordnung zu erlassen.[7] Davon machte sie mit der E-Rechnungsverordnung (ERechV)[8] Gebrauch, die überwiegend im November 2018 in Kraft (§ 11 ERechV) getreten ist und seit ihrem Inkrafttreten für die Rechnungsstellung an öffentliche Auftraggebern anzuwenden ist. Die Verordnung macht durch einen Verweis auf den kurz zuvor verkündeten[9] Datenaustauschstandard XRechnung detaillierte Vorgaben über die technische Ausgestaltung elektronischer Rechnungen.");
        };
    
        this.websocket.onclose = (e) => {
            this.WriteToScreen("DISCONNECTED");
        };
    
        this.websocket.onmessage = (e) => {
            this.WriteToScreen("<span>RESPONSE: " + e.data + "</span>");
        };
    
        this.websocket.onerror = (e) => {
            this.WriteToScreen("<span class=error>ERROR:</span> " + (e as any).data);
        };


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

    }

    //#endregion


    private showDialog(dialogDiv: HTMLDivElement) {

        for (const dialog of Array.from(document.querySelectorAll<HTMLDivElement>("#commands .command")))
            dialog.style.display = "none";

        dialogDiv.style.display = "block";

    }

    public sendRAWRequest(message: string) {
        this.WriteToScreen("SENT: " + message);
        this.websocket.send(message);
    }

    public sendRequest(command: string, request: any) {

        const message = JSON.stringify([ 2,
                                       "19223201",
                                       command,
                                       request != null ? request : {} ]);

        this.WriteToScreen("SENT: " + message);
        this.websocket.send(message);

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
