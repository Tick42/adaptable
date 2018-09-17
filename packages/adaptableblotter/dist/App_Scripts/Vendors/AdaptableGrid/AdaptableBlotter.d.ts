/// <reference path="../../../../App_Scripts/Vendors/AdaptableGrid/AdaptableBlotter.d.ts" />
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
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { ICalculatedColumn, IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs } from '../../Core/Api/Interface/ServerSearch';
import { IChartService } from '../../Core/Services/Interface/IChartService';
export declare class AdaptableBlotter implements IAdaptableBlotter {
    private grid;
    private container;
    private filterContainer;
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    VendorGridName: any;
    EmbedColumnMenu: boolean;
    CalendarService: ICalendarService;
    AuditService: IAuditService;
    ValidationService: IValidationService;
    StyleService: StyleService;
    ChartService: IChartService;
    AuditLogService: AuditLogService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    BlotterOptions: IAdaptableBlotterOptions;
    constructor(grid: AdaptableGrid.AdaptableGrid, container: HTMLElement, options?: IAdaptableBlotterOptions);
    Render(): void;
    InitAuditService(): void;
    private _onKeyDown;
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    private _onGridDataBound;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onSelectedCellsChanged;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    private _onRefresh;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    setColumnIntoStore(): void;
    hideFilterForm(): void;
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: any): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getActiveCell(): ICellInfo;
    setSelectedCells(): void;
    private getColumnDataType;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    cancelEdit(): void;
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: AdaptableGrid.Row, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getColumnIndex(columnId: string): number;
    setCustomSort(columnId: string, comparer: Function): void;
    removeCustomSort(columnId: string): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: AdaptableGrid.Row, columnId: string): string;
    getDisplayValueFromRawValue(colId: string, rawValue: any): any;
    getRawValueFromRecord(row: any, columnId: string): any;
    private getCellFromRowAndColumnId;
    addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void;
    addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void;
    removeAllCellStylesWithRegex(regex: RegExp): void;
    removeAllRowStylesWithRegex(regex: RegExp): void;
    removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void;
    removeRowStyle(rowIdentifierValue: any, style: string): void;
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    getAllRows(): any[];
    getAllVisibleRows(): any[];
    applyGridFiltering(): void;
    destroy(): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    isGroupRecord(record: any): boolean;
    getFirstRecord(): any;
    rendergrid(): void;
    getRecordFromRowId(rowId: string): any;
    getIPPStyle(): any;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    setGridSort(gridSorts: IGridSort[]): void;
    getVendorGridState(visibleCols: string[], forceFetch: boolean): any;
    setVendorGridState(vendorGridState: any): void;
    isSelectable(): boolean;
    isSortable(): boolean;
    isFilterable(): boolean;
}
