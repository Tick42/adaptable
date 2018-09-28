import '../../Styles/stylesheets/adaptableblotter-style.css';
import * as _ from 'lodash';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService';
import { IAuditService } from '../../Core/Services/Interface/IAuditService';
import { IValidationService } from '../../Core/Services/Interface/IValidationService';
import { StyleService } from '../../Core/Services/StyleService';
import { AuditLogService } from '../../Core/Services/AuditLogService';
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import { IChartService } from '../../Core/Services/Interface/IChartService';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher';
import { DistinctCriteriaPairValue } from '../../Core/Enums';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { ICalculatedColumn, IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs } from '../../Core/Api/Interface/ServerSearch';
import { RowNode } from "ag-grid";
export declare class AdaptableBlotter implements IAdaptableBlotter {
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    BlotterOptions: IAdaptableBlotterOptions;
    VendorGridName: any;
    CalendarService: ICalendarService;
    AuditService: IAuditService;
    ValidationService: IValidationService;
    AuditLogService: AuditLogService;
    StyleService: StyleService;
    ChartService: IChartService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    private calculatedColumnPathMap;
    private abContainerElement;
    private gridOptions;
    EmbedColumnMenu: boolean;
    isInitialised: boolean;
    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid?: boolean);
    private getState;
    setVendorGridState(vendorGridState: any): void;
    private createFilterWrapper;
    private createFloatingFilterWrapper;
    InitAuditService(): void;
    private _currentEditor;
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
    applyGridFiltering(): void;
    hideFilterFormPopup: Function;
    hideFilterForm(): void;
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void;
    setColumnIntoStore(): void;
    private createColumn;
    private getQuickSearchClassName;
    private addQuickSearchStyleToColumn;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: RowNode): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getActiveCell(): ICellInfo;
    debouncedSetSelectedCells: (() => void) & _.Cancelable;
    setSelectedCells(): void;
    private getColumnDataType;
    private getabColDefValue;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    cancelEdit(): void;
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: RowNode, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getColumnIndex(columnId: string): number;
    private isColumnReadonly;
    private isColumnSortable;
    private isColumnFilterable;
    setCustomSort(columnId: string, comparer: Function): void;
    removeCustomSort(columnId: string): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: RowNode, columnId: string): string;
    getDisplayValueFromRawValue(columnId: string, rawValue: any): any;
    private getRenderedValue;
    private cleanValue;
    getRawValueFromRecord(row: RowNode, columnId: string): any;
    setCellClassRules(cellClassRules: any, columnId: string, type: "ConditionalStyle" | "QuickSearch" | "FlashingCell" | "FormatColumn"): void;
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    redrawRows(): void;
    refreshCells(rowNode: RowNode, columnIds: string[]): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    isGroupRecord(record: any): boolean;
    getFirstRecord(): RowNode;
    destroy(): void;
    getIPPStyle(): IPPStyle;
    private initInternalGridLogic;
    private onSortChanged;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    setGridSort(gridSorts: IGridSort[]): void;
    setData(dataSource: any): void;
    private checkColumnsDataTypeSet;
    getVendorGridState(visibleCols: string[], forceFetch: boolean): any;
    private tempSetColumnVisibleFixForBuild;
    private tempMoveColumnFixForBuild;
    private tempSetColumnStateFixForBuild;
    isSelectable(): boolean;
    isSortable(): boolean;
    isFilterable(): boolean;
    applyLightTheme(): void;
    applyDarkTheme(): void;
}