import '../../Styles/stylesheets/adaptableblotter-style.css';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService';
import { IAuditService } from '../../Core/Services/Interface/IAuditService';
import { IValidationService } from '../../Core/Services/Interface/IValidationService';
import { StyleService } from '../../Core/Services/StyleService';
import { AuditLogService } from '../../Core/Services/AuditLogService';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher';
import { DistinctCriteriaPairValue } from '../../Core/Enums';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { ICalculatedColumn, IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs } from '../../Core/Api/Interface/ServerSearch';
import { IChartService } from '../../Core/Services/Interface/IChartService';
export declare class AdaptableBlotter implements IAdaptableBlotter {
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    VendorGridName: any;
    EmbedColumnMenu: boolean;
    CalendarService: ICalendarService;
    AuditService: IAuditService;
    ValidationService: IValidationService;
    ChartService: IChartService;
    StyleService: StyleService;
    AuditLogService: AuditLogService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    BlotterOptions: IAdaptableBlotterOptions;
    private contextMenuContainer;
    private vendorGrid;
    private abContainerElement;
    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid?: boolean);
    InitAuditService(): void;
    private kendoPopup;
    hideFilterForm(): void;
    private createFilterForm;
    private populateFilterForm;
    setColumnIntoStore(): void;
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void;
    private _onKeyDown;
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    private _onGridDataBound;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onSelectedCellsChanged;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onRefresh;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    createMenu(): void;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getPrimaryKeyValueFromRecord(record: any): any;
    getActiveCell(): ICellInfo;
    private isGridColumnVisible;
    private getcurrentEditedCell;
    setSelectedCells(): void;
    private getColumnDataType;
    private getTypeFromFirstRecord;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    cancelEdit(): void;
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    selectCells(cells: ICellInfo[]): void;
    getColumnIndex(columnId: string): number;
    private getColumnFromColumnId;
    private isColumnReadonly;
    setCustomSort(columnId: string, comparer: Function): void;
    removeCustomSort(columnId: string): void;
    private ReInitGrid;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    private getRowByRowIdentifier;
    private getCellByColumnIndexAndRow;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: any, columnId: string): string;
    getDisplayValueFromRawValue(colId: string, rawValue: any): any;
    getRawValueFromRecord(row: any, columnId: string): any;
    addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void;
    addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void;
    private applyStyleToJQuerySelector;
    removeAllCellStylesWithRegex(regex: RegExp): void;
    removeAllRowStylesWithRegex(regex: RegExp): void;
    removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void;
    removeRowStyle(rowIdentifierValue: any, style: string): void;
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    applyGridFiltering(): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    isGroupRecord(record: any): boolean;
    getFirstRecord(): any;
    destroy(): void;
    getIPPStyle(): IPPStyle;
    private GetGridState;
    private initInternalGridLogic;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    private onSortChanged;
    setGridSort(gridSorts: IGridSort[]): void;
    getVendorGridState(visibleCols: string[]): any;
    setVendorGridState(vendorGridState: any): void;
    isSelectable(): boolean;
    isSortable(): boolean;
}