"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Strategy Ids
exports.AboutStrategyId = "About";
exports.AlertStrategyId = "Alert";
exports.ApplicationStrategyId = "Application";
exports.AdvancedSearchStrategyId = "AdvancedSearch";
exports.BulkUpdateStrategyId = "BulkUpdate";
exports.CalculatedColumnStrategyId = "CalculatedColumn";
exports.CalendarStrategyId = "Calendar";
exports.CellValidationStrategyId = "CellValidation";
exports.ChartStrategyId = "Chart";
exports.ColumnChooserStrategyId = "ColumnChooser";
exports.ColumnFilterStrategyId = "ColumnFilter";
exports.ColumnInfoStrategyId = "ColumnInfo";
exports.ConditionalStyleStrategyId = "ConditionalStyle";
exports.CustomSortStrategyId = "CustomSort";
exports.DashboardStrategyId = "Dashboard";
exports.DataSourceStrategyId = "DataSource";
exports.ExportStrategyId = "Export";
exports.FlashingCellsStrategyId = "FlashingCells";
exports.FormatColumnStrategyId = "FormatColumn";
exports.HomeStrategyId = "Home";
exports.LayoutStrategyId = "Layout";
exports.PlusMinusStrategyId = "PlusMinus";
exports.QuickSearchStrategyId = "QuickSearch";
exports.ShortcutStrategyId = "Shortcut";
exports.SelectColumnStrategyId = "SelectColumn";
exports.SelectedCellsStrategyId = "SelectedCells";
exports.SmartEditStrategyId = "SmartEdit";
exports.TeamSharingStrategyId = "TeamSharing";
exports.ThemeStrategyId = "Theme";
exports.DataManagementStrategyId = "UserDataManagement";
exports.UserFilterStrategyId = "UserFilter";
// Strategy Names
exports.AboutStrategyName = "About";
exports.AlertStrategyName = "Alert";
exports.ApplicationStrategyName = "Application";
exports.AdvancedSearchStrategyName = "Advanced Search";
exports.BulkUpdateStrategyName = "Bulk Update";
exports.CalculatedColumnStrategyName = "Calculated Column";
exports.CalendarStrategyName = "Calendar";
exports.CellValidationStrategyName = "Cell Validation";
exports.ChartStrategyName = "Chart";
exports.ColumnChooserStrategyName = "Column Chooser";
exports.ColumnFilterStrategyName = "Column Filter";
exports.ColumnInfoStrategyName = "Column Information";
exports.ConditionalStyleStrategyName = "Conditional Style";
exports.CustomSortStrategyName = "Custom Sort";
exports.DashboardStrategyName = "Dashboard";
exports.DataManagementStrategyName = "Manage State";
exports.DataSourceStrategyName = "Data Source";
exports.ExportStrategyName = "Export";
exports.FlashingCellsStrategyName = "Flashing Cells";
exports.FormatColumnStrategyName = "Format Column";
exports.LayoutStrategyName = "Layout";
exports.PlusMinusStrategyName = "Plus Minus";
exports.QuickSearchStrategyName = "Quick Search";
exports.ShortcutStrategyName = "Shortcut";
exports.SelectColumnStrategyName = "Select Column";
exports.SelectedCellsStrategyName = "Selected Cells";
exports.SmartEditStrategyName = "Smart Edit";
exports.TeamSharingStrategyName = "Team Sharing";
exports.ThemeStrategyName = "Theme";
exports.UserFilterStrategyName = "User Filter";
//
exports.AboutGlyph = "info-sign";
exports.AlertGlyph = "bullhorn";
exports.AdvancedSearchGlyph = "search";
exports.ApplicationGlyph = "font";
exports.BulkUpdateGlyph = "hand-up";
exports.CalculatedColumnGlyph = "th-list";
exports.CalendarGlyph = "calendar";
exports.CellValidationGlyph = "flag";
exports.ChartGlyph = "signal";
exports.ColumnChooserGlyph = "list-alt";
exports.ColumnFilterGlyph = "filter";
exports.ColumnInfoGlyph = "italic";
exports.ConditionalStyleGlyph = "tint";
exports.CustomSortGlyph = "sort-by-attributes";
exports.DashboardGlyph = "dashboard";
exports.DataSourceGlyph = "book";
exports.DataManagementGlyph = "folder-close";
exports.ExportGlyph = "export";
exports.FlashingCellGlyph = "flash";
exports.FormatColumnGlyph = "picture";
exports.FunctionsGlyph = "home";
exports.LayoutGlyph = "th";
exports.PlusMinusGlyph = "plus-sign";
exports.QuickSearchGlyph = "eye-open";
exports.ShortcutGlyph = "road";
exports.SelectColumnGlyph = "compressed";
exports.SelectedCellsGlyph = "th-large";
exports.SmartEditGlyph = "pencil";
exports.TeamSharingGlyph = "share";
exports.ThemeGlyph = "leaf";
exports.UserFilterGlyph = "user";
function getIdForStrategyName(strategyName) {
    switch (strategyName) {
        case exports.AboutStrategyName:
            return exports.AboutStrategyId;
        case exports.ApplicationStrategyName:
            return exports.ApplicationStrategyId;
        case exports.AdvancedSearchStrategyName:
            return exports.AdvancedSearchStrategyId;
        case exports.BulkUpdateStrategyName:
            return exports.BulkUpdateStrategyId;
        case exports.CalculatedColumnStrategyName:
            return exports.CalculatedColumnStrategyId;
        case exports.CalendarStrategyName:
            return exports.CalendarStrategyId;
        case exports.CellValidationStrategyName:
            return exports.CellValidationStrategyId;
        case exports.ChartStrategyName:
            return exports.ChartStrategyId;
        case exports.ColumnChooserStrategyName:
            return exports.ColumnChooserStrategyId;
        case exports.ColumnInfoStrategyName:
            return exports.ColumnInfoStrategyId;
        case exports.ConditionalStyleStrategyName:
            return exports.ConditionalStyleStrategyId;
        case exports.CustomSortStrategyName:
            return exports.CustomSortStrategyId;
        case exports.DashboardStrategyName:
            return exports.DashboardStrategyId;
        case exports.DataSourceStrategyName:
            return exports.DataSourceStrategyId;
        case exports.ExportStrategyName:
            return exports.ExportStrategyId;
        case exports.UserFilterStrategyName:
            return exports.UserFilterStrategyId;
        case exports.ColumnFilterStrategyName:
            return exports.ColumnFilterStrategyId;
        case exports.FlashingCellsStrategyName:
            return exports.FlashingCellsStrategyId;
        case exports.FormatColumnStrategyName:
            return exports.FormatColumnStrategyId;
        case exports.LayoutStrategyName:
            return exports.LayoutStrategyId;
        case exports.PlusMinusStrategyName:
            return exports.PlusMinusStrategyId;
        case exports.QuickSearchStrategyName:
            return exports.QuickSearchStrategyId;
        case exports.ShortcutStrategyName:
            return exports.ShortcutStrategyId;
        case exports.SelectColumnStrategyName:
            return exports.SelectColumnStrategyId;
        case exports.SelectedCellsStrategyName:
            return exports.SelectedCellsStrategyId;
        case exports.SmartEditStrategyName:
            return exports.SmartEditStrategyId;
        case exports.TeamSharingStrategyName:
            return exports.TeamSharingStrategyId;
        case exports.ThemeStrategyName:
            return exports.ThemeStrategyId;
        case exports.DataManagementStrategyName:
            return exports.DataManagementStrategyId;
    }
}
exports.getIdForStrategyName = getIdForStrategyName;
function getNameForStrategyId(strategyID) {
    switch (strategyID) {
        case exports.AboutStrategyId:
            return exports.AboutStrategyName;
        case exports.AlertStrategyId:
            return exports.AlertStrategyName;
        case exports.ApplicationStrategyId:
            return exports.ApplicationStrategyName;
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchStrategyName;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateStrategyName;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnStrategyName;
        case exports.CalendarStrategyId:
            return exports.CalendarStrategyName;
        case exports.CellValidationStrategyId:
            return exports.CellValidationStrategyName;
        case exports.ChartStrategyId:
            return exports.ChartStrategyName;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserStrategyName;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoStrategyName;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterStrategyName;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleStrategyName;
        case exports.CustomSortStrategyId:
            return exports.CustomSortStrategyName;
        case exports.DashboardStrategyId:
            return exports.DashboardStrategyName;
        case exports.DataManagementStrategyId:
            return exports.DataManagementStrategyName;
        case exports.DataSourceStrategyId:
            return exports.DataSourceStrategyName;
        case exports.ExportStrategyId:
            return exports.ExportStrategyName;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellsStrategyName;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnStrategyName;
        case exports.LayoutStrategyId:
            return exports.LayoutStrategyName;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusStrategyName;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchStrategyName;
        case exports.ShortcutStrategyId:
            return exports.ShortcutStrategyName;
        case exports.SelectColumnStrategyId:
            return exports.SelectColumnStrategyName;
        case exports.SelectedCellsStrategyId:
            return exports.SelectedCellsStrategyName;
        case exports.SmartEditStrategyId:
            return exports.SmartEditStrategyName;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingStrategyName;
        case exports.ThemeStrategyId:
            return exports.ThemeStrategyName;
        case exports.UserFilterStrategyId:
            return exports.UserFilterStrategyName;
    }
}
exports.getNameForStrategyId = getNameForStrategyId;
function getGhyphiconForStrategyId(strategyID) {
    switch (strategyID) {
        case exports.AboutStrategyId:
            return exports.AboutGlyph;
        case exports.AdvancedSearchStrategyId:
            return exports.AdvancedSearchGlyph;
        case exports.ApplicationStrategyId:
            return exports.ApplicationGlyph;
        case exports.BulkUpdateStrategyId:
            return exports.BulkUpdateGlyph;
        case exports.CalculatedColumnStrategyId:
            return exports.CalculatedColumnGlyph;
        case exports.CalendarStrategyId:
            return exports.CalendarGlyph;
        case exports.CellValidationStrategyId:
            return exports.CellValidationGlyph;
        case exports.ChartStrategyId:
            return exports.ChartGlyph;
        case exports.ColumnChooserStrategyId:
            return exports.ColumnChooserGlyph;
        case exports.ColumnFilterStrategyId:
            return exports.ColumnFilterGlyph;
        case exports.ColumnInfoStrategyId:
            return exports.ColumnInfoGlyph;
        case exports.ConditionalStyleStrategyId:
            return exports.ConditionalStyleGlyph;
        case exports.CustomSortStrategyId:
            return exports.CustomSortGlyph;
        case exports.DataManagementStrategyId:
            return exports.DataManagementGlyph;
        case exports.ExportStrategyId:
            return exports.ExportGlyph;
        case exports.FlashingCellsStrategyId:
            return exports.FlashingCellGlyph;
        case exports.FormatColumnStrategyId:
            return exports.FormatColumnGlyph;
        case exports.LayoutStrategyId:
            return exports.LayoutGlyph;
        case exports.PlusMinusStrategyId:
            return exports.PlusMinusGlyph;
        case exports.QuickSearchStrategyId:
            return exports.QuickSearchGlyph;
        case exports.ShortcutStrategyId:
            return exports.ShortcutGlyph;
        case exports.SelectColumnStrategyId:
            return exports.SelectColumnGlyph;
        case exports.SelectedCellsStrategyId:
            return exports.SelectedCellsGlyph;
        case exports.SmartEditStrategyId:
            return exports.SmartEditGlyph;
        case exports.TeamSharingStrategyId:
            return exports.TeamSharingGlyph;
        case exports.ThemeStrategyId:
            return exports.ThemeGlyph;
        case exports.UserFilterStrategyId:
            return exports.UserFilterGlyph;
    }
}
exports.getGhyphiconForStrategyId = getGhyphiconForStrategyId;