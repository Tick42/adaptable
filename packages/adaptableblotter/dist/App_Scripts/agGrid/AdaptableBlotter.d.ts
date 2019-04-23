import '../Styles/stylesheets/adaptableblotter-style.css';
import * as _ from 'lodash';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IAdaptableBlotterStore } from '../Redux/Store/Interface/IAdaptableStore';
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../Utilities/Services/AuditLogService';
import { StyleService } from '../Utilities/Services/StyleService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IFreeTextColumnService } from '../Utilities/Services/Interface/IFreeTextColumnService';
import { IAdaptableStrategyCollection } from '../Strategy/Interface/IStrategy';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { DistinctCriteriaPairValue } from '../Utilities/Enums';
import { IPPStyle } from "../Utilities/Interface/Reports/IPPStyle";
import { ICellInfo } from "../Utilities/Interface/ICellInfo";
import { IVendorGridInfo } from "../Utilities/Interface/IVendorGridInfo";
import { IColumn } from '../Utilities/Interface/IColumn';
import { IGridSort } from "../Utilities/Interface/IGridSort";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { IFreeTextColumn } from "../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { IBlotterApi } from '../Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs, IAlertFiredEventArgs } from '../Utilities/Interface/IStateEvents';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { Grid, RowNode } from "ag-grid-community";
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { IEvent } from '../Utilities/Interface/IEvent';
import { ILicenceService } from '../Utilities/Services/Interface/ILicenceService';
import 'ag-grid-enterprise';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
export declare class AdaptableBlotter implements IAdaptableBlotter {
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    BlotterOptions: IAdaptableBlotterOptions;
    VendorGridName: any;
    CalendarService: ICalendarService;
    DataService: IDataService;
    ValidationService: IValidationService;
    AuditLogService: AuditLogService;
    StyleService: StyleService;
    ChartService: IChartService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    FreeTextColumnService: IFreeTextColumnService;
    LicenceService: ILicenceService;
    ScheduleService: IScheduleService;
    private _calculatedColumnPathMap;
    private useRowNodeLookUp;
    private abContainerElement;
    private gridOptions;
    EmbedColumnMenu: boolean;
    isInitialised: boolean;
    private throttleOnDataChangedUser;
    private throttleOnDataChangedExternal;
    hasFloatingFilter: boolean;
    grid: Grid;
    gridContainer: HTMLElement;
    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid?: boolean);
    private instantiateAgGrid;
    debouncedSetColumnIntoStore: (() => void) & _.Cancelable;
    debouncedSaveGridLayout: (() => void) & _.Cancelable;
    debouncedSetSelectedCells: (() => void) & _.Cancelable;
    debouncedFilterGrid: (() => void) & _.Cancelable;
    private filterOnUserDataChange;
    private filterOnExternalDataChange;
    private createFilterWrapper;
    private createFloatingFilterWrapper;
    private _currentEditor;
    private _onKeyDown;
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    private _onGridDataBound;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onSelectedCellsChanged;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onRefresh;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onGridReloaded;
    onGridReloaded(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onSearchChanged;
    onSearchChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    AlertFired: EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>;
    reloadGrid(): void;
    applyGridFiltering(): void;
    private applyDataChange;
    clearGridFiltering(): void;
    clearColumnFiltering(columnIds: string[]): void;
    hideFilterFormPopup: Function;
    hideFilterForm(): void;
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void;
    setColumnIntoStore(): void;
    private createColumn;
    private addFiltersToVendorColumn;
    private getQuickSearchClassName;
    private addQuickSearchStyleToColumn;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: RowNode): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getActiveCell(): ICellInfo;
    saveGridLayout(): void;
    setSelectedCells(): void;
    private getColumnDataType;
    private getabColDefValue;
    setValue(cellInfo: ICellInfo): void;
    private updateValue;
    setValueBatch(batchValues: ICellInfo[]): void;
    private updateBatchValue;
    cancelEdit(): void;
    getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: RowNode, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    private isColumnReadonly;
    private isColumnSortable;
    private isColumnFilterable;
    setCustomSort(columnId: string, comparer: Function): void;
    removeCustomSort(columnId: string): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue, visibleRowsOnly: boolean): Array<IRawValueDisplayValuePair>;
    private addDistinctColumnValue;
    private useRawValueForColumn;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: RowNode, columnId: string): string;
    getDisplayValueFromRawValue(columnId: string, rawValue: any): any;
    private getRenderedValue;
    getRawValueFromRecord(row: RowNode, columnId: string): any;
    setCellClassRules(cellClassRules: any, columnId: string, type: "ConditionalStyle" | "QuickSearch" | "FlashingCell" | "FormatColumn"): void;
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    redraw(): void;
    testredrawRow(rowNode: RowNode): void;
    refreshCells(rowNode: RowNode, columnIds: string[]): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn): void;
    private addSpecialColumnToState;
    isGroupRecord(record: any): boolean;
    getFirstRecord(): RowNode;
    destroy(): void;
    getIPPStyle(): IPPStyle;
    private initInternalGridLogic;
    addPercentBar(pcr: IPercentBar): void;
    removePercentBar(pcr: IPercentBar): void;
    editPercentBar(pcr: IPercentBar): void;
    private onSortChanged;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    setGridSort(gridSorts: IGridSort[]): void;
    setGridData(dataSource: any): void;
    private updateQuickSearchRangeVisibleColumn;
    private checkColumnsDataTypeSet;
    getVendorGridState(visibleCols: string[], forceFetch: boolean): IVendorGridInfo;
    setVendorGridState(vendorGridState: IVendorGridInfo): void;
    private setColumnVisible;
    private moveColumn;
    private setColumnState;
    isSelectable(): boolean;
    private isFloatingFilterActive;
    showFloatingFilter(): void;
    hideFloatingFilter(): void;
    applyLightTheme(): void;
    applyDarkTheme(): void;
    private applyFinalRendering;
    private getState;
    private dispatchAction;
}
