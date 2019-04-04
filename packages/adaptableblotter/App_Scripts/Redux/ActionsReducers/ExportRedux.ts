import { ExportState } from './Interface/IState';
import { ExportDestination } from '../../Utilities/Enums';
import * as Redux from 'redux'
import { IReport, IAutoExport } from "../../Utilities/Interface/BlotterObjects/IReport";
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const IPP_LOGIN = 'IPP_LOGIN';
export const REPORT_SELECT = 'REPORT_SELECT';
export const REPORT_ADD_UPDATE = 'REPORT_ADD_UPDATE';
export const REPORT_DELETE = 'REPORT_DELETE';
export const AUTOEXPORT_ADD_UPDATE = 'AUTOEXPORT_ADD_UPDATE';
export const AUTOEXPORT_DELETE = 'AUTOEXPORT_DELETE';

export interface ExportApplyAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination
    Folder?: string
    Page?: string
}

export interface IPPLoginAction extends Redux.Action {
    Login: string;
    Password: string;
}

export interface ReportSelectAction extends Redux.Action {
    SelectedReport: string;
}

export interface ReportAddUpdateAction extends Redux.Action {
    Index: number,
    Report: IReport
}

export interface ReportDeleteAction extends Redux.Action {
    Index: number
}

export interface AutoExportAddUpdateAction extends Redux.Action {
    Index: number,
    AutoExport: IAutoExport
}

export interface AutoExportDeleteAction extends Redux.Action {
    Index: number
}

export const ReportSelect = (SelectedReport: string): ReportSelectAction => ({
    type: REPORT_SELECT,
    SelectedReport
})

export const ReportAddUpdate = (Index: number, Report: IReport): ReportAddUpdateAction => ({
    type: REPORT_ADD_UPDATE,
    Index,
    Report
})

export const ReportDelete = (Index: number): ReportDeleteAction => ({
    type: REPORT_DELETE,
    Index
})

export const AutoExportAddUpdate = (Index: number, AutoExport: IAutoExport): AutoExportAddUpdateAction => ({
    type: AUTOEXPORT_ADD_UPDATE,
    Index,
    AutoExport
})

export const AutoExportDelete = (Index: number): AutoExportDeleteAction => ({
    type: AUTOEXPORT_DELETE,
    Index
})


export const ExportApply = (Report: string, ExportDestination: ExportDestination, Folder?: string, Page?: string): ExportApplyAction => ({
    type: EXPORT_APPLY,
    Report,
    ExportDestination,
    Folder,
    Page
})

export const IPPLogin = (Login: string, Password: string): IPPLoginAction => ({
    type: IPP_LOGIN,
    Login,
    Password
})

const initialExportState: ExportState = {
    Reports: EMPTY_ARRAY,
    CurrentReport: EMPTY_STRING,
    AutoExports: EMPTY_ARRAY
}

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case REPORT_SELECT:
            return Object.assign({}, state, { CurrentReport: (<ReportSelectAction>action).SelectedReport })
        case REPORT_ADD_UPDATE: {
            let Reports: IReport[] = [].concat(state.Reports);

            let actionTypedAddUpdate = (<ReportAddUpdateAction>action)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                Reports[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Report
            } else {
                Reports.push(actionTypedAddUpdate.Report)
            }
            return Object.assign({}, state, { Reports: Reports, CurrentReport: actionTypedAddUpdate.Report.Name });
        }
        case REPORT_DELETE: {
            let Reports: IReport[] = [].concat(state.Reports);

            let actionTypedDelete = (<ReportDeleteAction>action)
            Reports.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Reports: Reports, CurrentReport: "" })
        }
        case AUTOEXPORT_ADD_UPDATE: {
            let autoExports: IAutoExport[] = [].concat(state.AutoExports);
            console.log("current exorports")
            console.log(autoExports);
            let actionTypedAddUpdate = (<AutoExportAddUpdateAction>action)
            console.log("the thing")
            console.log(actionTypedAddUpdate.AutoExport)

            if (actionTypedAddUpdate.Index != -1) {  // it exists
                autoExports[actionTypedAddUpdate.Index] = actionTypedAddUpdate.AutoExport
            } else {
                autoExports.push(actionTypedAddUpdate.AutoExport)
            }
            return Object.assign({}, state, { AutoExports: autoExports, });
        }
        case AUTOEXPORT_DELETE: {
            let autoExports: IAutoExport[] = [].concat(state.Reports);

            let actionTypedDelete = (<AutoExportDeleteAction>action)
            autoExports.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { AutoExports: autoExports })
        }
        default:
            return state
    }
}