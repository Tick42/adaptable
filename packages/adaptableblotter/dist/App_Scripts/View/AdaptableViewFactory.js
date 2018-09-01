"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomSortPopup_1 = require("./CustomSort/CustomSortPopup");
const SmartEditPopup_1 = require("./SmartEdit/SmartEditPopup");
const ShortcutPopup_1 = require("./Shortcut/ShortcutPopup");
const PlusMinusPopup_1 = require("./PlusMinus/PlusMinusPopup");
const ColumnChooserPopup_1 = require("./ColumnChooser/ColumnChooserPopup");
const ColumnInfoPopup_1 = require("./ColumnInfo/ColumnInfoPopup");
const ExportPopup_1 = require("./Export/ExportPopup");
const FlashingCellsPopup_1 = require("./FlashingCells/FlashingCellsPopup");
const CalendarsPopup_1 = require("./Calendars/CalendarsPopup");
const ConditionalStylePopup_1 = require("./ConditionalStyle/ConditionalStylePopup");
const QuickSearchPopup_1 = require("./QuickSearch/QuickSearchPopup");
const QuickSearchToolbarControl_1 = require("./QuickSearch/QuickSearchToolbarControl");
const ColumnFilterToolbarControl_1 = require("./ColumnFilter/ColumnFilterToolbarControl");
const ApplicationToolbarControl_1 = require("./Application/ApplicationToolbarControl");
const AdvancedSearchPopup_1 = require("./AdvancedSearch/AdvancedSearchPopup");
const AdvancedSearchToolbarControl_1 = require("./AdvancedSearch/AdvancedSearchToolbarControl");
const BulkUpdateToolbarControl_1 = require("./BulkUpdate/BulkUpdateToolbarControl");
const SmartEditToolbarControl_1 = require("./SmartEdit/SmartEditToolbarControl");
const UserFilterPopup_1 = require("./UserFilter/UserFilterPopup");
const FormatColumnPopup_1 = require("./FormatColumn/FormatColumnPopup");
const ThemePopup_1 = require("./Theme/ThemePopup");
const CellValidationPopup_1 = require("./CellValidation/CellValidationPopup");
const LayoutPopup_1 = require("./Layout/LayoutPopup");
const LayoutToolbarControl_1 = require("./Layout/LayoutToolbarControl");
const ExportToolbarControl_1 = require("./Export/ExportToolbarControl");
const TeamSharingPopup_1 = require("./TeamSharing/TeamSharingPopup");
const IPushPullLogin_1 = require("./Export/IPushPullLogin");
const HomeToolbarControl_1 = require("./Home/HomeToolbarControl");
const HomeButtonsPopup_1 = require("./Home/HomeButtonsPopup");
const AboutPopup_1 = require("./About/AboutPopup");
const ApplicationPopup_1 = require("./Application/ApplicationPopup");
const DashboardPopup_1 = require("./Dashboard/DashboardPopup");
const DataManagementPopup_1 = require("./DataManagement/DataManagementPopup");
const ColumnFilterPopup_1 = require("./ColumnFilter/ColumnFilterPopup");
const StrategyIds = require("../Core/Constants/StrategyIds");
const CalculatedColumnPopup_1 = require("./CalculatedColumn/CalculatedColumnPopup");
const IPushPullDomainPageSelector_1 = require("./Export/IPushPullDomainPageSelector");
const BulkUpdatePopup_1 = require("./BulkUpdate/BulkUpdatePopup");
const DataSourcePopup_1 = require("./DataSource/DataSourcePopup");
const DataSourceToolbarControl_1 = require("./DataSource/DataSourceToolbarControl");
const SelectedCellsPopup_1 = require("./SelectedCells/SelectedCellsPopup");
const SelectedCellsToolbarControl_1 = require("./SelectedCells/SelectedCellsToolbarControl");
const AlertPopup_1 = require("./Alert/AlertPopup");
const AlertToolbarControl_1 = require("./Alert/AlertToolbarControl");
const ChartPopup_1 = require("./Chart/ChartPopup");
const ChartDisplayPopup_1 = require("./Chart/ChartDisplayPopup");
const ChartToolbarControl_1 = require("./Chart/ChartToolbarControl");
exports.AdaptableViewFactory = {
    AboutPopup: AboutPopup_1.AboutPopup,
    AdvancedSearchPopup: AdvancedSearchPopup_1.AdvancedSearchPopup,
    AlertPopup: AlertPopup_1.AlertPopup,
    ApplicationPopup: ApplicationPopup_1.ApplicationPopup,
    BulkUpdatePopup: BulkUpdatePopup_1.BulkUpdatePopup,
    CalculatedColumnPopup: CalculatedColumnPopup_1.CalculatedColumnPopup,
    CalendarsPopup: CalendarsPopup_1.CalendarsPopup,
    CellValidationPopup: CellValidationPopup_1.CellValidationPopup,
    ChartPopup: ChartPopup_1.ChartPopup,
    ColumnChooserPopup: ColumnChooserPopup_1.ColumnChooserPopup,
    ColumnFilterPopup: ColumnFilterPopup_1.ColumnFilterPopup,
    ColumnInfoPopup: ColumnInfoPopup_1.ColumnInfoPopup,
    ConditionalStylePopup: ConditionalStylePopup_1.ConditionalStylePopup,
    CustomSortPopup: CustomSortPopup_1.CustomSortPopup,
    DashboardPopup: DashboardPopup_1.DashboardPopup,
    DataManagementPopup: DataManagementPopup_1.DataManagementPopup,
    DataSourcePopup: DataSourcePopup_1.DataSourcePopup,
    ExportPopup: ExportPopup_1.ExportPopup,
    FlashingCellsPopup: FlashingCellsPopup_1.FlashingCellsPopup,
    FormatColumnPopup: FormatColumnPopup_1.FormatColumnPopup,
    HomeButtonsPopup: HomeButtonsPopup_1.HomeButtonsPopup,
    IPushPullLogin: IPushPullLogin_1.IPushPullLogin,
    IPushPullDomainPageSelector: IPushPullDomainPageSelector_1.IPushPullDomainPageSelector,
    LayoutPopup: LayoutPopup_1.LayoutPopup,
    PlusMinusPopup: PlusMinusPopup_1.PlusMinusPopup,
    QuickSearchPopup: QuickSearchPopup_1.QuickSearchPopup,
    SelectedCellsPopup: SelectedCellsPopup_1.SelectedCellsPopup,
    SmartEditPopup: SmartEditPopup_1.SmartEditPopup,
    ShortcutPopup: ShortcutPopup_1.ShortcutPopup,
    ThemePopup: ThemePopup_1.ThemePopup,
    TeamSharingPopup: TeamSharingPopup_1.TeamSharingPopup,
    UserFilterPopup: UserFilterPopup_1.UserFilterPopup,
    ChartDisplayPopup: ChartDisplayPopup_1.ChartDisplayPopup
};
//here we put the dashboard control for each strategy
exports.AdaptableDashboardViewFactory = new Map([
    [StrategyIds.AdvancedSearchStrategyId, AdvancedSearchToolbarControl_1.AdvancedSearchToolbarControl],
    [StrategyIds.DataSourceStrategyId, DataSourceToolbarControl_1.DataSourceToolbarControl],
    [StrategyIds.QuickSearchStrategyId, QuickSearchToolbarControl_1.QuickSearchToolbarControl],
    [StrategyIds.LayoutStrategyId, LayoutToolbarControl_1.LayoutToolbarControl],
    [StrategyIds.ColumnFilterStrategyId, ColumnFilterToolbarControl_1.ColumnFilterToolbarControl],
    [StrategyIds.ApplicationStrategyId, ApplicationToolbarControl_1.ApplicationToolbarControl],
    [StrategyIds.ExportStrategyId, ExportToolbarControl_1.ExportToolbarControl],
    [StrategyIds.BulkUpdateStrategyId, BulkUpdateToolbarControl_1.BulkUpdateToolbarControl],
    [StrategyIds.SmartEditStrategyId, SmartEditToolbarControl_1.SmartEditToolbarControl],
    [StrategyIds.SelectedCellsStrategyId, SelectedCellsToolbarControl_1.SelectedCellsToolbarControl],
    [StrategyIds.AlertStrategyId, AlertToolbarControl_1.AlertToolbarControl],
    [StrategyIds.ChartStrategyId, ChartToolbarControl_1.ChartToolbarControl],
]);
exports.AdaptableDashboardPermanentToolbarFactory = new Map([
    [StrategyIds.HomeStrategyId, HomeToolbarControl_1.HomeToolbarControl],
]);