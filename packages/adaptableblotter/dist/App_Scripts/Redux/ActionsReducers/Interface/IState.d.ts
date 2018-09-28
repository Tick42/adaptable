import { IScreenPopup, IConfirmationPopup, IPromptPopup, IAlertPopup, IChartPopup, ILoadingPopup } from '../../../Core/Interface/IMessage';
import { IMenuItem, IContextMenu } from '../../../Core/Interface/IMenu';
import { ISharedEntity } from '../../../Strategy/Interface/ITeamSharingStrategy';
import { IPreviewInfo } from '../../../Core/Interface/IPreviewResult';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IEntitlement, IPermittedColumnValues, ISystemStatus, IColumnCategory } from '../../../Core/Interface/Interfaces';
import { IAdvancedSearch, ICalculatedColumn, IGridSort, IShortcut, IReport, IFlashingCell, IPlusMinusRule, ICustomSort, IConditionalStyle, ICalendar, IColumnFilter, IUserFilter, ICellValidationRule, ILayout, IFormatColumn, IUserTheme, IStyle, IAlertDefinition, IChartDefinition } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { IPPDomain, ILiveReport } from '../../../Strategy/Interface/IExportStrategy';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../../Strategy/Interface/ISelectedCellsStrategy';
export interface GridState {
    Columns: IColumn[];
    GridSorts: IGridSort[];
    BlotterRestrictions: string[];
    SystemStatus: ISystemStatus;
    SelectedCellInfo: ISelectedCellInfo;
    LeftPinnedColumns: string[];
    RightPinnedColumns: string[];
}
export interface MenuState {
    MenuItems: IMenuItem[];
    ContextMenu: IContextMenu;
}
export interface PopupState {
    ScreenPopup: IScreenPopup;
    ChartPopup: IChartPopup;
    AlertPopup: IAlertPopup;
    ConfirmationPopup: IConfirmationPopup;
    PromptPopup: IPromptPopup;
    LoadingPopup: ILoadingPopup;
}
export interface TeamSharingState {
    Activated: boolean;
    SharedEntities: ISharedEntity[];
}
export interface BulkUpdateState {
    BulkUpdateValue: string;
    IsValidSelection: boolean;
    PreviewInfo: IPreviewInfo;
}
export interface EntitlementsState {
    FunctionEntitlements: IEntitlement[];
}
export interface UserInterfaceState {
    ColorPalette: string[];
    StyleClassNames: string[];
    PermittedColumnValues: IPermittedColumnValues[];
    ColumnCategories: IColumnCategory[];
}
export interface ApplicationState {
}
export interface QuickSearchState {
    QuickSearchText: string;
    Operator: 'Contains' | 'StartsWith';
    DisplayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
    Style: IStyle;
}
export interface DashboardState {
    AvailableToolbars: string[];
    VisibleToolbars: string[];
    VisibleButtons: string[];
    Zoom: number;
    DashboardVisibility: 'Minimised' | 'Visible' | 'Hidden';
    ShowSystemStatusButton: boolean;
    ShowFunctionsDropdown: boolean;
    ShowColumnsDropdown: boolean;
    HomeToolbarTitle: string;
    ApplicationToolbarTitle: string;
}
export interface SmartEditState {
    SmartEditValue: number;
    MathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
    IsValidSelection: boolean;
    PreviewInfo: IPreviewInfo;
}
export interface SelectedCellsState {
    SelectedCellOperation: 'Sum' | 'Average' | 'Mode' | 'Median' | 'Distinct' | 'Max' | 'Min' | 'Count' | 'Only';
    SelectedCellSummary: ISelectedCellSummmary;
}
export interface CalendarState {
    CurrentCalendar: string;
    AvailableCalendars: ICalendar[];
}
export interface ThemeState {
    CurrentTheme: string;
    SystemThemes: string[];
    UserThemes: IUserTheme[];
}
export interface AlertState {
    AlertDefinitions: IAlertDefinition[];
    MaxAlertsInStore: number;
    Alerts: any[];
}
export interface AdvancedSearchState {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearch: string;
}
export interface DataSourceState {
    DataSources: string[];
    CurrentDataSource: string;
}
export interface LayoutState {
    CurrentLayout: string;
    Layouts: ILayout[];
}
export interface CustomSortState {
    CustomSorts: ICustomSort[];
}
export interface FilterState {
    ColumnFilters: IColumnFilter[];
    SavedColumnFilters: IColumnFilter[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
}
export interface ShortcutState {
    Shortcuts: IShortcut[];
}
export interface PlusMinusState {
    PlusMinusRules: IPlusMinusRule[];
}
export interface ExportState {
    IPPDomainsPages: IPPDomain[];
    CurrentReport: string;
    CurrentLiveReports: ILiveReport[];
    Reports: IReport[];
    ErrorMsg: string;
}
export interface FlashingCellState {
    FlashingCells: IFlashingCell[];
}
export interface ConditionalStyleState {
    ConditionalStyles: IConditionalStyle[];
}
export interface CellValidationState {
    CellValidations: ICellValidationRule[];
}
export interface CalculatedColumnState {
    CalculatedColumns: ICalculatedColumn[];
    CalculatedColumnErrorMessage: string;
}
export interface FormatColumnState {
    FormatColumns: IFormatColumn[];
}
export interface ChartState {
    ChartDefinitions: IChartDefinition[];
    CurrentChartName: string;
    ChartData: any;
}