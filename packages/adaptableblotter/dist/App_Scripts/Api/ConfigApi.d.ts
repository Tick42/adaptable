import { IUserState, AdvancedSearchState, AlertState, BulkUpdateState, CalculatedColumnState, CalendarState, CellValidationState, ChartState, ColumnFilterState, ConditionalStyleState, CustomSortState, DashboardState, DataSourceState, ExportState, FlashingCellState, FormatColumnState, LayoutState, PlusMinusState, QuickSearchState, SelectedCellsState, ShortcutState, SmartEditState, ThemeState, UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { ApiBase } from './ApiBase';
export interface IConfigApi {
    /**
     * Clears the  configuration for the current user, reverting everyting to system defaults.
     * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
     *  */
    configClear(): void;
    configDeleteLocalStorage(): void;
    configloadUserState(state: {
        [s: string]: IUserState;
    }): void;
    configGetAllState(): AdaptableBlotterState;
    configGetAllUserState(): IUserState[];
    configGetUserStateByFunction(functionName: 'AdvancedSearch' | 'Alert' | 'BulkUpdate' | 'CalculatedColumn' | 'Calendar' | 'CellValidation' | 'Chart' | 'ColumnFilter' | 'ConditionalStyle' | 'CustomSort' | 'Dashboard' | 'DataSource' | 'Export' | 'FlashingCell' | 'FormatColumn' | 'Layout' | 'PlusMinus' | 'QuickSearch' | 'SelectedCells' | 'Shortcut' | 'SmartEdit' | 'Theme' | 'UserFilter', returnJson: boolean): IUserState;
    configGetAdvancedSearchState(returnJson: boolean): AdvancedSearchState;
    configGetAlertSearchState(returnJson: boolean): AlertState;
    configGetBulkUpdateState(returnJson: boolean): BulkUpdateState;
    configGetCalculatedColumnState(returnJson: boolean): CalculatedColumnState;
    configGetCalendarState(returnJson: boolean): CalendarState;
    configGetCellValidationState(returnJson: boolean): CellValidationState;
    configGetChartState(returnJson: boolean): ChartState;
    configGetColumnFilterState(returnJson: boolean): ColumnFilterState;
    configGetConditionalStyleState(returnJson: boolean): ConditionalStyleState;
    configGetCustomSortState(returnJson: boolean): CustomSortState;
    configGetDashboardState(returnJson: boolean): DashboardState;
    configGetDataSourceState(returnJson: boolean): DataSourceState;
    configGetExportState(returnJson: boolean): ExportState;
    configGetFlashingCellState(returnJson: boolean): FlashingCellState;
    configGetFormatColumnState(returnJson: boolean): FormatColumnState;
    configGetLayoutState(returnJson: boolean): LayoutState;
    configGetPlusMinusState(returnJson: boolean): PlusMinusState;
    configGetQuickSearchState(returnJson: boolean): QuickSearchState;
    configGetSelectedCellsState(returnJson: boolean): SelectedCellsState;
    configGetShortcutState(returnJson: boolean): ShortcutState;
    configGetSmartEditState(returnJson: boolean): SmartEditState;
    configGetThemeState(returnJson: boolean): ThemeState;
    configGetUserFilterState(returnJson: boolean): UserFilterState;
}
export declare class ConfigApi extends ApiBase implements IConfigApi {
    configClear(): void;
    configDeleteLocalStorage(): void;
    configGetAllState(): AdaptableBlotterState;
    private getUserStateKeys;
    configGetAllUserState(): IUserState[];
    configloadUserState(state: {
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
}