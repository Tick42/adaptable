import { DataType, DistinctCriteriaPairValue } from '../Enums'
import {  IStrategy } from '../../Strategy/Interface/IStrategy'
import {  ICellInfo } from '../../Core/Interface/IAdaptableBlotter'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import {  IValidationService} from '../Services/Interface/IValidationService'
import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy'
import { AuditLogService } from '../Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../Services/Interface/ICalculatedColumnExpressionService";

export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    BlotterOptions: IAdaptableBlotterOptions
    Strategies: IAdaptableStrategyCollection

    // Services
    CalendarService: ICalendarService
    AuditService: IAuditService
    ValidationService: IValidationService
    AuditLogService: AuditLogService
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    InitAuditService(): void

    // Grid Events
    onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()

    // General
    createMenu(): void
    getPrimaryKeyValueFromRecord(record: any): any
    hideFilterForm(): void

    // cell selection
    getSelectedCells(): ISelectedCells
    getActiveCell(): ICellInfo
    selectCells(cells: ICellInfo[]): void


    // column related
    getColumnIndex(columnName: string): number
    setColumnIntoStore(): void
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>
    getDisplayValue(id: any, columnId: string): string
    getDisplayValueFromRecord(row: any, columnId: string): string
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void

    // editing related
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    cancelEdit(): any
    gridHasCurrentEditValue(): boolean
    getCurrentCellEditValue(): any

    // Row Methods
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;

    // Custom Sort
    setCustomSort(columnId: string, comparer: Function): void
    removeCustomSort(columnId: string): void

    //CalculatedColumn
    deleteCalculatedColumn(calculatedColumnId: string): void
    createCalculatedColumn(calculatedColumn: ICalculatedColumn): void
    getFirstRecord(): any

    // Filtering
    applyColumnFilters(): void
    //TEMPORARY : JO
    getIPPStyle(): IPPStyle
}

export interface IPPStyle {
    Header: {
        headerColor: string,
        headerBackColor: string,
        headerFontFamily: string,
        headerFontStyle: string,
        headerFontSize: string,
        headerFontWeight: string,
        height: number,
        Columns: { columnFriendlyName: string, width: number, textAlign: string }[]
    },
    Row: {
        color: string,
        backColor: string,
        altBackColor: string,
        fontFamily: string,
        fontStyle: string,
        fontSize: string,
        fontWeight: string,
        height: number
        Columns: { columnFriendlyName: string, width: number, textAlign: string }[]
    }
}

export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}

export interface IColumn {
    ColumnId: string,
    FriendlyName: string
    DataType: DataType
    Visible: boolean,
    Index: number
}

//make sure property names match DistinctCriteriaPairValue
export interface IRawValueDisplayValuePair {
    RawValue: any,
    DisplayValue: string
}

export interface IAdaptableBlotterOptions {
    enableAuditLog?: boolean,
    enableRemoteConfigServer?: boolean,
    userName?: string,
    primaryKey?: string,
    blotterId?: string,
    predefinedConfigUrl?: string,
    maxColumnValueItemsDisplayed: number
    iPushPullConfig?: {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    }
}

export interface IConfigEntity {
    IsPredefined: boolean
}

export interface IColItem {
    Size: number;
    Content: any;
}

export interface IEntitlement {
    FunctionName: string;
    AccessLevel: "ReadOnly" | "Hidden" | "Default";
}


export interface ICellInfo {
    Id: any,
    ColumnId: string,
    Value: any
}