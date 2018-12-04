import { IAdaptableBlotter } from "../Api/Interface/IAdaptableBlotter";
import { IEvent } from "./Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from "./Interface/IStateEvents";
import { ILayout, IAdvancedSearch, IStyle, ICustomSort, IColumnFilter, IUserFilter, IUserTheme, IShortcut, ICalculatedColumn, ICellValidationRule, IFormatColumn, IReport, IFreeTextColumn, IPercentBar } from "./Interface/IAdaptableBlotterObjects";
import { IEntitlement, IColumnCategory } from "../Api/Interface/Interfaces";
import { ExportDestination } from "../Utilities/Enums";
import { AdaptableBlotterState } from "../Redux/Store/Interface/IAdaptableStore";
import { ILiveReport } from "../Strategy/Interface/IExportStrategy";
import { AdvancedSearchState, AlertState, BulkUpdateState, CalculatedColumnState, CalendarState, CellValidationState, ChartState, ColumnFilterState, ConditionalStyleState, CustomSortState, DashboardState, DataSourceState, ExportState, FlashingCellState, FormatColumnState, PlusMinusState, QuickSearchState, SelectedCellsState, ShortcutState, SmartEditState, ThemeState, UserFilterState, LayoutState, IUserState } from "../Redux/ActionsReducers/Interface/IState";
export declare abstract class BlotterApiBase implements IBlotterApi {
    protected blotter: IAdaptableBlotter;
    constructor(blotter: IAdaptableBlotter);
    setGridData(dataSource: any): void;
    layoutSet(layoutName: string): void;
    layoutClear(): void;
    layoutGetCurrent(): ILayout;
    layoutgetAll(): ILayout[];
    layoutSave(): void;
    dashboardSetAvailableToolbars(availableToolbars: string[]): void;
    dashboardSetVisibleToolbars(visibleToolbars: string[]): void;
    dashboardShowToolbar(visibleToolbar: string): void;
    dashboardHideToolbar(visibleToolbar: string): void;
    dashboardSetVisibleButtons(functionButtons: string[]): void;
    dashboardSetZoom(zoom: Number): void;
    dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;
    dashboardShow(): void;
    dashboardHide(): void;
    dashboardMinimise(): void;
    dashboardShowSystemStatusButton(): void;
    dashboardHideSystemStatusButton(): void;
    dashboardShowAboutButton(): void;
    dashboardHideAboutButton(): void;
    dashboardShowFunctionsDropdown(): void;
    dashboardHideFunctionsDropdown(): void;
    dashboardShowColumnsDropdown(): void;
    dashboardHideColumnsDropdown(): void;
    dashboardSetHomeToolbarTitle(title: string): void;
    dashboardSetApplicationToolbarTitle(title: string): void;
    quickSearchRun(quickSearchText: string): void;
    quickSearchClear(): void;
    quickSearchGetValue(): string;
    quickSearchSetOperator(operator: 'Contains' | 'StartsWith'): void;
    quickSearchSetDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    quickSearchSetStyle(style: IStyle): void;
    calendarSetCurrent(calendar: string): void;
    calendarGetCurrent(): string;
    themeSetCurrent(theme: string): void;
    themeGetCurrent(): string;
    themeSetSystemThemes(systemThemes: string[]): void;
    themeSetUserThemes(userThemes: string[]): void;
    themeSystemThemeGetAll(): string[];
    themeUserThemeGetAll(): IUserTheme[];
    shortcutGetAll(): IShortcut[];
    shortcutAdd(shortcut: IShortcut): void;
    shortcutDelete(shortcut: IShortcut): void;
    shortcutDeleteAll(): void;
    smartEditSetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    smartEditGetMathOperation(): string;
    smartEditSetValue(smartEditValue: number): void;
    smartEditGetValue(): number;
    uiSetColorPalette(colorPalette: string[]): void;
    uiAddColorsToPalette(colorPalette: string[]): void;
    uiAddStyleClassNames(styleClassNames: string[]): void;
    uiSetColumnPermittedValues(column: string, permittedValues: string[]): void;
    uiClearColumnPermittedValues(column: string): void;
    columnFilterSet(columnFilters: IColumnFilter[]): void;
    columnFilterSetUserFilter(userFilter: string): void;
    columnFilterClear(columnFilter: IColumnFilter): void;
    columnFilterClearByColumns(columns: string[]): void;
    columnFilterClearByColumn(column: string): void;
    columnFilterClearAll(): void;
    columnFiltersGetCurrent(): IColumnFilter[];
    userFilterSet(userFilters: IUserFilter[]): void;
    systemFilterSet(systemFilters: string[]): void;
    systemFilterClear(): void;
    systemFilterGetCurrent(): string[];
    systemFilterGetAll(): string[];
    dataSourceSet(dataSourceName: string): void;
    dataSourceClear(): void;
    advancedSearchSet(advancedSearchName: string): void;
    advancedSearchClear(): void;
    advancedSearchAdd(advancedSearch: IAdvancedSearch): void;
    advancedSearchEdit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
    advancedSearchDelete(advancedSearchName: string): void;
    advancedSearchGetCurrent(): IAdvancedSearch;
    advancedSearchGetByName(advancedSearchName: string): IAdvancedSearch;
    advancedSearchGetAll(): IAdvancedSearch[];
    entitlementGetAll(): IEntitlement[];
    entitlementGetByFunction(functionName: string): IEntitlement;
    entitlementGetAccessLevelForFunction(functionName: string): string;
    entitlementAddOrUpdate(functionName: string, accessLevel: "ReadOnly" | "Hidden" | "Full"): void;
    entitlementDelete(functionName: string): void;
    customSortGetAll(): ICustomSort[];
    customSortGetByColumn(columnn: string): ICustomSort;
    customSortAdd(column: string, values: string[]): void;
    customSortEdit(column: string, values: string[]): void;
    customSortDelete(column: string): void;
    calculatedColumnGetAll(): ICalculatedColumn[];
    calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void;
    calculatedColumnEditExpression(column: string, columnExpression: string): void;
    calculatedColumnDelete(column: string): void;
    cellValidationGetAll(): ICellValidationRule[];
    cellValidationAdd(cellValidationRule: ICellValidationRule): void;
    cellValidationDelete(cellValidationRule: ICellValidationRule): void;
    formatColumnGetAll(): IFormatColumn[];
    formatColumnnAdd(column: string, style: IStyle): void;
    formatColumnnUpdate(column: string, style: IStyle): void;
    formatColumnDelete(formatColumn: IFormatColumn): void;
    formatColumnDeleteAll(): void;
    systemStatusSet(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void;
    systemStatusSetRed(statusMessage: string): void;
    systemStatusSetAmber(statusMessage: string): void;
    systemStatusSetGreen(statusMessage: string): void;
    systemStatusClear(): void;
    alertShow(alertHeader: string, alertMessage: string, MessageType: "Info" | "Warning" | "Error", showAsPopup: boolean): void;
    alertShowMessage(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    alertShowWarning(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    alertShowError(alertHeader: string, alertMessage: string, showAsPopup: boolean): void;
    exportSendReport(reportName: string, destination: ExportDestination): void;
    exportReportsGetAll(): IReport[];
    exportLiveReportsGetAll(): ILiveReport[];
    columnCategoryGetAll(): IColumnCategory[];
    columnCategoryAdd(columnCategory: IColumnCategory): void;
    columnCategoryCreate(columnCategoryId: string, columns: string[]): void;
    columnCategoryEdit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
    columnCategoryAddColumns(columnCategoryId: string, columns: string[]): void;
    columnCategoryRemoveColumns(columnCategoryId: string, columns: string[]): void;
    columnCategoryDelete(columnCategoryId: string): void;
    freeTextColumnGetAll(): IFreeTextColumn[];
    freeTextColumnAdd(freeTextColumn: IFreeTextColumn): void;
    freeTextColumnCreate(columnId: string, defaultValue?: string): void;
    freeTextColumnDelete(columnId: string): void;
    percentBarGetAll(): IPercentBar[];
    percentBarGetByColumn(columnId: string): IPercentBar;
    percentBarAdd(percentBar: IPercentBar): void;
    percentBarCreate(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void;
    percentBarEditByIndex(index: number, percentBar: IPercentBar): void;
    percentBarEdit(percentBar: IPercentBar): void;
    percentBarEditMinValue(minValue: number, columnId: string): void;
    percentBarEditMaxValue(maxValue: number, columnId: string): void;
    percentBarEditPositiveColor(positiveColor: string, columnId: string): void;
    percentBarEditNegativeColor(negativeColor: string, columnId: string): void;
    percentBarEditShowValue(showValue: boolean, columnId: string): void;
    percentBarDelete(columnId: string): void;
    configClear(): void;
    configDeleteLocalStorage(): void;
    configGetAllState(): AdaptableBlotterState;
    private getUserStateKeys;
    configGetAllUserState(): IUserState[];
    loadUserState(state: {
        [s: string]: IUserState;
    }): void;
    configGetUserStateByFunction(functionName: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'SelectedCells' | 'Shortcut' | 'SmartEdit' | 'Theme' | 'UserFilter', returnJson?: boolean): IUserState;
    configGetAdvancedSearchState(returnJson?: boolean): AdvancedSearchState;
    configGetAlertSearchState(returnJson?: boolean): AlertState;
    configGetBulkUpdateState(returnJson?: boolean): BulkUpdateState;
    configGetCalculatedColumnState(returnJson?: boolean): CalculatedColumnState;
    configGetCalendarState(returnJson?: boolean): CalendarState;
    configGetCellValidationState(returnJson?: boolean): CellValidationState;
    configGetChartState(returnJson?: boolean): ChartState;
    configGetColumnFilterState(returnJson?: boolean): ColumnFilterState;
    configGetConditionalStyleState(returnJson?: boolean): ConditionalStyleState;
    configGetCustomSortState(returnJson?: boolean): CustomSortState;
    configGetDashboardState(returnJson?: boolean): DashboardState;
    configGetDataSourceState(returnJson?: boolean): DataSourceState;
    configGetExportState(returnJson?: boolean): ExportState;
    configGetFlashingCellState(returnJson?: boolean): FlashingCellState;
    configGetFormatColumnState(returnJson?: boolean): FormatColumnState;
    configGetLayoutState(returnJson?: boolean): LayoutState;
    configGetPlusMinusState(returnJson?: boolean): PlusMinusState;
    configGetQuickSearchState(returnJson?: boolean): QuickSearchState;
    configGetSelectedCellsState(returnJson?: boolean): SelectedCellsState;
    configGetShortcutState(returnJson?: boolean): ShortcutState;
    configGetSmartEditState(returnJson?: boolean): SmartEditState;
    configGetThemeState(returnJson?: boolean): ThemeState;
    configGetUserFilterState(returnJson?: boolean): UserFilterState;
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
    onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;
    onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    private dispatchAction;
    private checkItemExists;
    private getState;
}
