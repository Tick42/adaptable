import { IAuditLogEntry } from "../../Api/Interface/IAuditLogEntry";
import { IAdaptableBlotterOptions } from "../../Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedEvent } from "./Interface/IAuditService";
import { AuditLogTrigger } from "../Enums";
import { LoggingHelper } from "../Helpers/LoggingHelper";

export class AuditLogService {
    private auditLogQueue: Array<IAuditLogEntry>
    private canSendLog: boolean = true
    private numberOfMissedPing: number = 0
    private blotterOptions: IAdaptableBlotterOptions
    public IsAuditLogEnabled: boolean;
    public IsAuditStateChangesEnabled: boolean;
    public IsAuditCellEditsEnabled: boolean;
    public IsAuditFunctionEventsEnabled: boolean;
    public IsAuditUserStateChangesEnabled: boolean;
    public IsAuditInternalStateChangesEnabled: boolean;

    constructor(private blotter: IAdaptableBlotter, blotterOptions: IAdaptableBlotterOptions) {
        console.log(blotterOptions);
        this.auditLogQueue = []
        this.blotterOptions = blotterOptions
        this.setUpFlags(blotterOptions)
        if (this.IsAuditLogEnabled) {
            this.ping()
            setInterval(() => this.ping(), blotterOptions.auditLogOptions.pingInterval * 1000)
            setInterval(() => this.flushAuditQueue(), blotterOptions.auditLogOptions.sendAuditLogsInterval * 1000)
        }
    }

    private setUpFlags(blotterOptions: IAdaptableBlotterOptions) {
        // Internal State
        if (blotterOptions.auditLogOptions != null && blotterOptions.auditLogOptions.auditInternalStateChanges != null) {
            this.IsAuditInternalStateChangesEnabled = blotterOptions.auditLogOptions.auditInternalStateChanges;
        } else {
            this.IsAuditInternalStateChangesEnabled = false;
        }

        // User State
        if (blotterOptions.auditLogOptions != null && blotterOptions.auditLogOptions.auditUserStateChanges != null) {
            this.IsAuditUserStateChangesEnabled = blotterOptions.auditLogOptions.auditUserStateChanges;
        } else {
            this.IsAuditUserStateChangesEnabled = false;
        }

        // Function Events
        if (blotterOptions.auditLogOptions != null && blotterOptions.auditLogOptions.auditFunctionEvents != null) {
            this.IsAuditFunctionEventsEnabled = blotterOptions.auditLogOptions.auditFunctionEvents;
        } else {
            this.IsAuditFunctionEventsEnabled = false;
        }

        // Cell Edit
        if (blotterOptions.auditLogOptions != null && blotterOptions.auditLogOptions.auditCellEdits != null) {
            this.IsAuditCellEditsEnabled = blotterOptions.auditLogOptions.auditCellEdits;
        } else {
            this.IsAuditCellEditsEnabled = false;
        }

        // Log State
        this.IsAuditStateChangesEnabled = this.IsAuditInternalStateChangesEnabled || this.IsAuditUserStateChangesEnabled;

        // General Audit Flag
        this.IsAuditLogEnabled = this.IsAuditStateChangesEnabled || this.IsAuditFunctionEventsEnabled || this.IsAuditCellEditsEnabled;
    }

    public AddEditCellAuditLogBatch(dataChangedEvents: IDataChangedEvent[]) {
        dataChangedEvents.forEach(dce => { this.AddEditCellAuditLog(dce) })
    }

    public AddEditCellAuditLog(dataChangedEvent: IDataChangedEvent) {
        if (this.IsAuditCellEditsEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: AuditLogTrigger.CellEdit,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                adaptableblotter_editcell: {
                    primarykey: String(dataChangedEvent.IdentifierValue),
                    primarykey_column_id: this.blotterOptions.primaryKey,
                    column_id: dataChangedEvent.ColumnId,
                    previous_value: String(dataChangedEvent.OldValue),
                    new_value: String(dataChangedEvent.NewValue)
                }
            });
        }
    }

    public AddStateChangeAuditLog(stateChanges: any, actionType: string) {
        if (this.IsAuditStateChangesEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: AuditLogTrigger.StateChange,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                //we want to lose the type since you cannot have same field name with different types in logstash. So log it as a string...
                //it makes sense anyway
                adaptableblotter_state_change: this.convertToText(stateChanges),
                adaptableblotter_state_change_action: actionType
            });
        }
    }

    public AddAdaptableBlotterFunctionLog(functionName: string, action: string, info: string, data?: any) {
        if (this.IsAuditFunctionEventsEnabled) {
            this.auditLogQueue.push({
                adaptableblotter_auditlog_trigger: AuditLogTrigger.AdaptableBlotterFunction,
                adaptableblotter_client_timestamp: new Date(),
                adaptableblotter_username: this.blotterOptions.userName,
                adaptableblotter_id: this.blotterOptions.blotterId,
                adaptableblotter_function: {
                    name: functionName,
                    action: action,
                    info: info,
                    //not sure if it's best to leave undefined or null.... I think null is better
                    //same as adaptableblotter_state_change we log the obj as a string
                    data: data ? this.convertToText(data) : null
                }
            });
        }
    }

    private ping() {
        let pingMessage: IAuditLogEntry = {
            adaptableblotter_auditlog_trigger: AuditLogTrigger.Ping,
            adaptableblotter_client_timestamp: new Date(),
            adaptableblotter_username: this.blotterOptions.userName,
            adaptableblotter_id: this.blotterOptions.blotterId,
            adaptableblotter_number_of_missed_ping: this.numberOfMissedPing
        }
        let xhr = new XMLHttpRequest();
        xhr.onerror = (ev: any) => { LoggingHelper.LogMessage("error sending ping: " + ev.message); this.SetCanSendLog(false); }
        xhr.ontimeout = (ev: ProgressEvent) => { LoggingHelper.LogMessage("timeout sending ping"); this.SetCanSendLog(false); }
        xhr.onload = (ev: ProgressEvent) => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    this.SetCanSendLog(true);
                } else {
                    LoggingHelper.LogError("error sending ping: " + xhr.statusText);
                    this.SetCanSendLog(false);
                }

            }
        }
        var url = "/auditlog";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(pingMessage));
    }

    private SetCanSendLog(enable: boolean) {
        if (enable) {
            this.canSendLog = true;
            this.numberOfMissedPing = 0
        }
        else {
            this.canSendLog = false;
            this.numberOfMissedPing++;
        }
    }

    private flushAuditQueue() {
        //if we cannot send logs then we just clear the thing
        if (!this.canSendLog) {
            this.auditLogQueue.length = 0
        }

        let obj = this.auditLogQueue.shift()
        // while (obj && this.sockJS.readyState == SockJS.OPEN) {
        while (obj) {
            let xhr = new XMLHttpRequest();
            xhr.onerror = (ev: any) => LoggingHelper.LogMessage("error sending AuditLog: " + ev.message)
            xhr.ontimeout = (pe: ProgressEvent) => LoggingHelper.LogMessage("timeout sending AuditLog")
            xhr.onload = (pe: ProgressEvent) => {
                if (xhr.readyState == 4) {
                    if (xhr.status != 200) {
                        LoggingHelper.LogError("error sending AuditLog: " + xhr.statusText);
                    }
                }
            }
            var url = "/auditlog";
            //we make the request async
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.send(JSON.stringify(obj));
            obj = this.auditLogQueue.shift()
        }
    }

    private convertToText(obj: any): string {
        let stringArray: string[] = [];

        if (obj == undefined) {
            return String(obj);
        } else if (Array.isArray(obj)) {
            for (let prop in obj) {
                stringArray.push(this.convertToText(obj[prop]));
            }
            return "[" + stringArray.join(",") + "]";
        }
        if (typeof (obj) == "object") {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    stringArray.push(prop + ": " + this.convertToText(obj[prop]));
                }
            }
            return "{" + stringArray.join(",") + "}";
            //is function
        } else if (typeof (obj) == "function") {
            stringArray.push(obj.toString())

        } else {
            stringArray.push(String(obj))
        }

        return stringArray.join(",");
    }
}