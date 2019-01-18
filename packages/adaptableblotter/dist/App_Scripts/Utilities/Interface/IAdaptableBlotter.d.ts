import { DistinctCriteriaPairValue } from '../Enums';
import { ICellInfo } from "./ICellInfo";
import { IVendorGridInfo } from "./IVendorGridInfo";
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { ICalculatedColumn, IGridSort, IFreeTextColumn, IPercentBar } from './IAdaptableBlotterObjects';
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from './IStateEvents';
import { IAdaptableBlotterOptions } from './IAdaptableBlotterOptions';
import { ICalendarService } from '../Services/Interface/ICalendarService';
import { IDataService } from '../Services/Interface/IDataService';
import { IValidationService } from '../Services/Interface/IValidationService';
import { AuditLogService } from '../Services/AuditLogService';
import { ICalculatedColumnExpressionService } from '../Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Services/Interface/IChartService';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IEvent } from './IEvent';
import { IAdaptableStrategyCollection } from '../../Strategy/Interface/IStrategy';
export interface IAdaptableBlotter {
    /**
     * The main external interface for users of the Blotter (e.g. Devs).  Ideally the methods contained there should be all they ever require...
     */
    api: IBlotterApi;
    BlotterOptions: IAdaptableBlotterOptions;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection;
    VendorGridName: 'agGrid' | 'Hypergrid';
    EmbedColumnMenu: boolean;
    isInitialised: boolean;
    CalendarService: ICalendarService;
    DataService: IDataService;
    ValidationService: IValidationService;
    AuditLogService: AuditLogService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    ChartService: IChartService;
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: any): any;
    getActiveCell(): ICellInfo;
    selectColumn(columnId: string): void;
    getColumnIndex(columnId: string): number;
    setColumnIntoStore(): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: any, columnId: string): string;
    getRawValueFromRecord(row: any, columnId: string): any;
    getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any;
    setNewColumnListOrder(visibleColumnList: Array<IColumn>): void;
    getDisplayValueFromRawValue(columnId: string, rawValue: any): any;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    cancelEdit(): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getFirstRecord(): any;
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    isGroupRecord(record: any): boolean;
    setCustomSort(columnId: string, comparer: Function): void;
    removeCustomSort(columnId: string): void;
    setGridSort(gridSorts: IGridSort[]): void;
    addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    removePercentBar(percentBar: IPercentBar): void;
    addPercentBar(percentBar: IPercentBar): void;
    editPercentBar(percentBar: IPercentBar): void;
    hideFilterForm(): void;
    applyGridFiltering(): void;
    clearGridFiltering(): void;
    clearColumnFiltering(columnIds: string[]): void;
    getIPPStyle(): IPPStyle;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    getVendorGridState(visibleCols: string[], forceFetch: boolean): IVendorGridInfo;
    setVendorGridState(vendorGridState: IVendorGridInfo): void;
    isSelectable(): boolean;
    isSortable(): boolean;
    hasFloatingFilter(): boolean;
    isFloatingFilterActive(): boolean;
    showFloatingFilter(): void;
    hideFloatingFilter(): void;
    applyLightTheme(): void;
    applyDarkTheme(): void;
    redraw(): void;
    setGridData(dataSource: any): void;
}
