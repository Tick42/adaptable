"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdvancedSearchApi_1 = require("./AdvancedSearchApi");
const AlertApi_1 = require("./AlertApi");
const CalendarApi_1 = require("./CalendarApi");
const CalculatedColumnApi_1 = require("./CalculatedColumnApi");
const CellValidationApi_1 = require("./CellValidationApi");
const ColumnCategoryApi_1 = require("./ColumnCategoryApi");
const ColumnFilterApi_1 = require("./ColumnFilterApi");
const ConfigApi_1 = require("./ConfigApi");
const CustomSortApi_1 = require("./CustomSortApi");
const DashboardApi_1 = require("./DashboardApi");
const DataSourceApi_1 = require("./DataSourceApi");
const EntitlementApi_1 = require("./EntitlementApi");
const EventApi_1 = require("./EventApi");
const ExportApi_1 = require("./ExportApi");
const FormatColumnApi_1 = require("./FormatColumnApi");
const FreeTextColumnApi_1 = require("./FreeTextColumnApi");
const GridApi_1 = require("./GridApi");
const LayoutApi_1 = require("./LayoutApi");
const PercentBarApi_1 = require("./PercentBarApi");
const QuickSearchApi_1 = require("./QuickSearchApi");
const ShortcutApi_1 = require("./ShortcutApi");
const SmartEditApi_1 = require("./SmartEditApi");
const SystemFilterApi_1 = require("./SystemFilterApi");
const SystemStatusApi_1 = require("./SystemStatusApi");
const ThemeApi_1 = require("./ThemeApi");
const UserInterfaceApi_1 = require("./UserInterfaceApi");
class BlotterApi {
    constructor(blotter) {
        this.blotter = blotter;
        this.advancedSearchApi = new AdvancedSearchApi_1.AdvancedSearchApi(blotter);
        this.alertApi = new AlertApi_1.AlertApi(blotter);
        this.calendarApi = new CalendarApi_1.CalendarApi(blotter);
        this.calculatedColumnApi = new CalculatedColumnApi_1.CalculatedColumnApi(blotter);
        this.cellValidationApi = new CellValidationApi_1.CellValidationApi(blotter);
        this.columnCategoryApi = new ColumnCategoryApi_1.ColumnCategoryApi(blotter);
        this.columnFilterApi = new ColumnFilterApi_1.ColumnFilterApi(blotter);
        this.configApi = new ConfigApi_1.ConfigApi(blotter);
        this.customSortApi = new CustomSortApi_1.CustomSortApi(blotter);
        this.dashboardApi = new DashboardApi_1.DashboardApi(blotter);
        this.dataSourceApi = new DataSourceApi_1.DataSourceApi(blotter);
        this.entitlementApi = new EntitlementApi_1.EntitlementApi(blotter);
        this.eventApi = new EventApi_1.EventApi(blotter);
        this.exportApi = new ExportApi_1.ExportApi(blotter);
        this.formatColumnApi = new FormatColumnApi_1.FormatColumnApi(blotter);
        this.freeTextColumnApi = new FreeTextColumnApi_1.FreeTextColumnApi(blotter);
        this.gridApi = new GridApi_1.GridApi(blotter);
        this.layoutApi = new LayoutApi_1.LayoutApi(blotter);
        this.percentBarApi = new PercentBarApi_1.PercentBarApi(blotter);
        this.quickSearchApi = new QuickSearchApi_1.QuickSearchApi(blotter);
        this.shortcutApi = new ShortcutApi_1.ShortcutApi(blotter);
        this.smartEditApi = new SmartEditApi_1.SmartEditApi(blotter);
        this.systemFilterApi = new SystemFilterApi_1.SystemFilterApi(blotter);
        this.systemStatusApi = new SystemStatusApi_1.SystemStatusApi(blotter);
        this.themeApi = new ThemeApi_1.ThemeApi(blotter);
        this.userInterfaceApi = new UserInterfaceApi_1.UserInterfaceApi(blotter);
    }
}
exports.BlotterApi = BlotterApi;
