import { ChartState } from '../../PredefinedConfig/RunTimeState/ChartState';
import { UserFilterState } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { ThemeState } from '../../PredefinedConfig/RunTimeState/ThemeState';
import { SmartEditState } from '../../PredefinedConfig/RunTimeState/SmartEditState';
import { ShortcutState } from '../../PredefinedConfig/RunTimeState/ShortcutState';
import { QuickSearchState } from '../../PredefinedConfig/RunTimeState/QuickSearchState';
import { LayoutState } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { FormatColumnState } from '../../PredefinedConfig/RunTimeState/FormatColumnState';
import { FlashingCellState } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { ExportState } from '../../PredefinedConfig/RunTimeState/ExportState';
import { DataSourceState } from '../../PredefinedConfig/RunTimeState/DataSourceState';
import { DashboardState } from '../../PredefinedConfig/RunTimeState/DashboardState';
import { CustomSortState } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import { ConditionalStyleState } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { ColumnFilterState } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { CellValidationState } from '../../PredefinedConfig/RunTimeState/CellValidationState';
import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';
import { CalendarState } from '../../PredefinedConfig/RunTimeState/CalendarState';
import { CalculatedColumnState } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { BulkUpdateState } from '../../PredefinedConfig/RunTimeState/BulkUpdateState';
import { AlertState } from '../../PredefinedConfig/RunTimeState/AlertState';
import { AdvancedSearchState } from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { RunTimeState } from '../../PredefinedConfig/RunTimeState/RunTimeState';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { PlusMinusState } from '../../PredefinedConfig/RunTimeState/PlusMinusState';

export interface IConfigApi {
  // General Config
  configInit(): void;
  /**
   * Clears the  configuration for the current user, reverting everyting to system defaults.
   * This includes clearing all predefined items that have been created fo the users (though they will subsequently be re-applied if the local cache is cleared).
   *  */
  configClear(): void;
  configDeleteLocalStorage(): void;

  configloadUserState(state: { [s: string]: RunTimeState }): void;

  configGetAllState(): AdaptableBlotterState;

  configGetAllUserState(): RunTimeState[];
  configGetUserStateByFunction(
    functionName:
      | 'AdvancedSearch'
      | 'Alert'
      | 'BulkUpdate'
      | 'CalculatedColumn'
      | 'Calendar'
      | 'CellValidation'
      | 'Chart'
      | 'ColumnFilter'
      | 'ConditionalStyle'
      | 'CustomSort'
      | 'Dashboard'
      | 'DataSource'
      | 'Export'
      | 'FlashingCell'
      | 'FormatColumn'
      | 'Layout'
      | 'PlusMinus'
      | 'QuickSearch'
      | 'CellSummary'
      | 'Shortcut'
      | 'SmartEdit'
      | 'Theme'
      | 'UserFilter',
    returnJson: boolean
  ): RunTimeState;

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
  configGetCellSummaryState(returnJson: boolean): CellSummaryState;
  configGetShortcutState(returnJson: boolean): ShortcutState;
  configGetSmartEditState(returnJson: boolean): SmartEditState;
  configGetThemeState(returnJson: boolean): ThemeState;
  configGetUserFilterState(returnJson: boolean): UserFilterState;
}
