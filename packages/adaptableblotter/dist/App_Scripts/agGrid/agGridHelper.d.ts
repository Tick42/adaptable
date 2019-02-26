import { ICellRendererFunc, ColDef, GridOptions, SideBarDef, ToolPanelDef } from "ag-grid-community";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { LicenceType } from "../Utilities/Enums";
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 */
export declare module agGridHelper {
    function CheckLicenceKey(licenceType: LicenceType): void;
    function createCellRendererFunc(pcr: IPercentBar): ICellRendererFunc;
    function cleanValue(value: string): string;
    function getRenderedValue(percentBars: IPercentBar[], colDef: ColDef, valueToRender: any): any;
    function safeSetColDefs(colDefs: ColDef[], gridOptions: GridOptions): void;
    function createAdaptableBlotterSideBarDefs(showFilterPanel: boolean, showColumnsPanel: boolean): SideBarDef;
    function createAdaptableBlotterToolPanel(): ToolPanelDef;
}
