import '../App_Scripts/Styles/stylesheets/adaptableblotter-style.css';
import { IAdaptableBlotterStore } from '../App_Scripts/Redux/Store/Interface/IAdaptableStore';
import { IEvent } from '../App_Scripts/api/Interface/IEvent';
import { EventDispatcher } from '../App_Scripts/Core/EventDispatcher';
import { DataType, DistinctCriteriaPairValue } from '../App_Scripts/Utilities/Enums';
import { IAdaptableBlotter } from '../App_Scripts/api/Interface/IAdaptableBlotter';
import { IPPStyle } from '../App_Scripts/Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../App_Scripts/View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo, IVendorGridInfo } from '../App_Scripts/api/Interface/Interfaces';
import { IColumn } from '../App_Scripts/api/Interface/IColumn';
import { ICalculatedColumn, IStyle, IFreeTextColumn, IPercentBar } from '../App_Scripts/Api/Interface/IAdaptableBlotterObjects';
import { IBlotterApi } from '../App_Scripts/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../App_Scripts/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from '../App_Scripts/Api/Interface/IStateEvents';
import * as _ from 'lodash';
import { IChartService } from '../App_Scripts/Utilities/Services/Interface/IChartService';
import { ICalculatedColumnExpressionService } from '../App_Scripts/Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IAuditService } from '../App_Scripts/Utilities/Services/Interface/IAuditService';
import { ICalendarService } from '../App_Scripts/Utilities/Services/Interface/ICalendarService';
import { IValidationService } from '../App_Scripts/Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../App_Scripts/Utilities/Services/AuditLogService';
export declare class AdaptableBlotter implements IAdaptableBlotter {
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    CalendarService: ICalendarService;
    AuditService: IAuditService;
    ValidationService: IValidationService;
    AuditLogService: AuditLogService;
    ChartService: IChartService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    BlotterOptions: IAdaptableBlotterOptions;
    VendorGridName: any;
    EmbedColumnMenu: boolean;
    private cellStyleHypergridMap;
    private cellFlashIntervalHypergridMap;
    private abContainerElement;
    private hyperGrid;
    private filterContainer;
    isInitialised: boolean;
    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid?: boolean);
    private getState;
    InitAuditService(): void;
    private buildFontCSSShorthand;
    private buildFontCSSProperties;
    setColumnIntoStore(): void;
    hideFilterForm(): void;
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
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: any): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getActiveCell(): ICellInfo;
    debouncedSetSelectedCells: (() => void) & _.Cancelable;
    setSelectedCells(): void;
    getColumnDataType(column: any): DataType;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    private ClearSelection;
    cancelEdit(): void;
    forAllRecordsDo(func: (record: any) => any): any;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    getColumnIndex(columnId: string): number;
    private isColumnReadonly;
    private isColumnSortable;
    setCustomSort(columnId: string): void;
    removeCustomSort(columnId: string): void;
    ReindexAndRepaint(): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: any, columnId: string): any;
    getDisplayValueFromRawValue(colId: string, rawValue: any): any;
    getRawValueFromRecord(row: any, columnId: string): any;
    getColumnFormatter(columnId: string): any;
    addCellStyleHypergrid(rowIdentifierValue: any, columnId: string, style: CellStyleHypergrid, timeout?: number): void;
    addRowStyleHypergrid(rowIdentifierValue: any, style: CellStyleHypergrid): void;
    getRowIndexHypergrid(rowIdentifierValue: any): number;
    removeCellStyleHypergrid(rowIdentifierValue: any, columnId: string, style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'): void;
    removeAllCellStyleHypergrid(style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'): void;
    applyGridFiltering(): void;
    clearGridFiltering(): void;
    clearColumnFiltering(columnIds: string[]): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn): void;
    isGroupRecord(): boolean;
    getFirstRecord(): any;
    destroy(): void;
    private valOrFunc;
    getHypergridColumn(columnId: string): any;
    getIPPStyle(): IPPStyle;
    private initInternalGridLogic;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    onSortSaved(gridColumnIndex: number): void;
    setGridSort(): void;
    setGridData(data: any): void;
    getVendorGridState(): IVendorGridInfo;
    setVendorGridState(vendorGridState: IVendorGridInfo): void;
    isSelectable(): boolean;
    isSortable(): boolean;
    isFilterable(): boolean;
    isQuickFilterable(): boolean;
    isQuickFilterActive(): boolean;
    showQuickFilter(): void;
    hideQuickFilter(): void;
    applyLightTheme(): void;
    applyDarkTheme(): void;
    private applyAlternateRowStyle;
    addPercentBar(pcr: IPercentBar): void;
    removePercentBar(pcr: IPercentBar): void;
    editPercentBar(pcr: IPercentBar): void;
    redraw(): void;
}
export interface CellStyleHypergrid {
    conditionalStyleColumn?: IStyle;
    conditionalStyleRow?: IStyle;
    flashBackColor?: string;
    quickSearchStyle?: IStyle;
    formatColumnStyle?: IStyle;
}
