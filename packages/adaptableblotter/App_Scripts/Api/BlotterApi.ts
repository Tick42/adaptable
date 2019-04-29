import { IBlotterApi } from "./Interface/IBlotterApi";
import { IAdvancedSearchApi } from "./Interface/IAdvancedSearchApi";
import { IAlertApi } from "./Interface/IAlertApi";
import { ICalendarApi } from "./Interface/ICalendarApi";
import { ICalculatedColumnApi } from "./Interface/ICalculatedColumnApi";
import { ICellValidationApi } from "./Interface/ICellValidationApi";
import { IColumnCategoryApi } from "./Interface/IColumnCategoryApi";
import { IColumnFilterApi } from "./Interface/IColumnFilterApi";
import { IConfigApi } from "./Interface/IConfigApi";
import { ICustomSortApi } from "./Interface/ICustomSortApi";
import { IDashboardApi } from "./Interface/IDashboardApi";
import { IDataSourceApi } from "./Interface/IDataSourceApi";
import { IEntitlementApi } from "./Interface/IEntitlementApi";
import { IEventApi } from "./Interface/IEventApi";
import { IExportApi } from "./Interface/IExportApi";
import { IFormatColumnApi } from "./Interface/IFormatColumnApi";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";
import { IGridApi } from "./Interface/IGridApi";
import { ILayoutApi } from "./Interface/ILayoutApi";
import { IPercentBarApi } from "./Interface/IPercentBarApi";
import { IQuickSearchApi } from "./Interface/IQuickSearchApi";
import { IShortcutApi } from "./Interface/IShortcutApi";
import { ISmartEditApi } from "./Interface/ISmartEditApi";
import { ISystemFilterApi } from "./Interface/ISystemFilterApi";
import { ISystemStatusApi } from "./Interface/ISystemStatusApi";
import { IThemeApi } from "./Interface/IThemeApi";
import { IUserInterfaceApi } from "./Interface/IUserInterfaceApi";
import { IAdaptableBlotter } from "../Utilities/Interface/IAdaptableBlotter";
import { AdvancedSearchApi } from "./AdvancedSearchApi";
import { AlertApi } from "./AlertApi";
import { CalendarApi } from "./CalendarApi";
import { CalculatedColumnApi } from "./CalculatedColumnApi";
import { CellValidationApi } from "./CellValidationApi";
import { ColumnCategoryApi } from "./ColumnCategoryApi";
import { ColumnFilterApi } from "./ColumnFilterApi";
import { ConfigApi } from "./ConfigApi";
import { CustomSortApi } from "./CustomSortApi";
import { DashboardApi } from "./DashboardApi";
import { DataSourceApi } from "./DataSourceApi";
import { EntitlementApi } from "./EntitlementApi";
import { EventApi } from "./EventApi";
import { ExportApi } from "./ExportApi";
import { FormatColumnApi } from "./FormatColumnApi";
import { FreeTextColumnApi } from "./FreeTextColumnApi";
import { GridApi } from "./GridApi";
import { LayoutApi } from "./LayoutApi";
import { PercentBarApi } from "./PercentBarApi";
import { QuickSearchApi } from "./QuickSearchApi";
import { ShortcutApi } from "./ShortcutApi";
import { SmartEditApi } from "./SmartEditApi";
import { SystemFilterApi } from "./SystemFilterApi";
import { SystemStatusApi } from "./SystemStatusApi";
import { ThemeApi } from "./ThemeApi";
import { UserInterfaceApi } from "./UserInterfaceApi";
import { IInternalApi } from "./Interface/IInternalApi";
import { InternalApi } from "./InternalApi";
import { IConditionalStyleApi } from "./Interface/IConditionalStyleApi";
import { ConditionalStyleApi } from "./ConditionalStyleApi";
import { IReminderApi } from "./Interface/IReminderApi";
import { ReminderApi } from "./ReminderApi";
import { IFlashingCellApi } from "./Interface/IFlashingCellApi";
import { FlashingCellApi } from "./FlashingCellApi";
import { IChartApi } from "./Interface/IChartApi";
import { ChartApi } from "./ChartApi";
import { ICellSummaryApi } from "./Interface/ICellSummaryApi";
import { CellSummaryApi } from "./CellSummaryApi";
import { IUserFilterApi } from "./Interface/IUserFilterApi";
import { UserFilterApi } from "./UserFilterApi";



export class BlotterApi implements IBlotterApi {

  public advancedSearchApi: IAdvancedSearchApi;
  public alertApi: IAlertApi;
  public calendarApi: ICalendarApi;
  public calculatedColumnApi: ICalculatedColumnApi;
  public cellSummaryApi: ICellSummaryApi;
  public cellValidationApi: ICellValidationApi;
  public chartApi: IChartApi;
  public columnCategoryApi: IColumnCategoryApi;
  public columnFilterApi: IColumnFilterApi;
  public conditionalStyleApi: IConditionalStyleApi;
  public configApi: IConfigApi;
  public customSortApi: ICustomSortApi;
  public dashboardApi: IDashboardApi;
  public dataSourceApi: IDataSourceApi;
  public entitlementApi: IEntitlementApi;
  public eventApi: IEventApi;
  public exportApi: IExportApi;
  public flashingCellApi: IFlashingCellApi;
  public formatColumnApi: IFormatColumnApi;
  public freeTextColumnApi: IFreeTextColumnApi;
  public gridApi: IGridApi
  public internalApi: IInternalApi
  public layoutApi: ILayoutApi;
  public percentBarApi: IPercentBarApi;
  public quickSearchApi: IQuickSearchApi;
  public reminderApi: IReminderApi;
  public shortcutApi: IShortcutApi;
  public smartEditApi: ISmartEditApi;
   public systemFilterApi: ISystemFilterApi;
  public systemStatusApi: ISystemStatusApi;
  public themeApi: IThemeApi;
  public userInterfaceApi: IUserInterfaceApi;
  public userFilterApi: IUserFilterApi;


  constructor(protected blotter: IAdaptableBlotter) {
    this.advancedSearchApi = new AdvancedSearchApi(blotter);
    this.alertApi = new AlertApi(blotter);
    this.calendarApi = new CalendarApi(blotter);
    this.calculatedColumnApi = new CalculatedColumnApi(blotter);
    this.cellSummaryApi = new CellSummaryApi(blotter);
    this.cellValidationApi = new CellValidationApi(blotter);
    this.chartApi = new ChartApi(blotter);
    this.columnCategoryApi = new ColumnCategoryApi(blotter);
    this.columnFilterApi = new ColumnFilterApi(blotter);
    this.conditionalStyleApi = new ConditionalStyleApi(blotter);
    this.configApi = new ConfigApi(blotter);
    this.customSortApi = new CustomSortApi(blotter);
    this.dashboardApi = new DashboardApi(blotter);
    this.dataSourceApi = new DataSourceApi(blotter);
    this.entitlementApi = new EntitlementApi(blotter);
    this.eventApi = new EventApi(blotter);
    this.exportApi = new ExportApi(blotter);
    this.flashingCellApi = new FlashingCellApi(blotter);
    this.formatColumnApi = new FormatColumnApi(blotter);
    this.freeTextColumnApi = new FreeTextColumnApi(blotter);
    this.gridApi = new GridApi(blotter);
    this.layoutApi = new LayoutApi(blotter);
    this.percentBarApi = new PercentBarApi(blotter);
    this.quickSearchApi = new QuickSearchApi(blotter);
    this.reminderApi = new ReminderApi(blotter);
    this.shortcutApi = new ShortcutApi(blotter);
    this.smartEditApi = new SmartEditApi(blotter);
    this.systemFilterApi = new SystemFilterApi(blotter);
    this.systemStatusApi = new SystemStatusApi(blotter);
    this.themeApi = new ThemeApi(blotter);
    this.userInterfaceApi = new UserInterfaceApi(blotter);
    this.userFilterApi = new UserFilterApi(blotter);

    this.internalApi = new InternalApi(blotter);
   
  }

}
