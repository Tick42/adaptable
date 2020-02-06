import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ApplicationApi } from '../ApplicationAPI';
import { ApplicationApiImpl } from './ApplicationApiImpl';
import { ActionColumnApiImpl } from './ActionColumnApiImpl';
import { AdvancedSearchApiImpl } from './AdvancedSearchApiImpl';
import { AlertApiImpl } from './AlertApiImpl';
import { PluginsApiImpl } from './PluginsApiImpl';
import { AuditEventApiImpl } from './AuditEventApiImpl';
import { BulkUpdateApiImpl } from './BulkUpdateApiImpl';
import { CalendarApiImpl } from './CalendarApiImpl';
import { CalculatedColumnApiImpl } from './CalculatedColumnApiImpl';
import { CellSummaryApiImpl } from './CellSummaryApiImpl';
import { CellValidationApiImpl } from './CellValidationApiImpl';
import { ChartApiImpl } from './ChartApiImpl';
import { ColumnCategoryApiImpl } from './ColumnCategoryApiImpl';
import { ColumnFilterApiImpl } from './ColumnFilterApiImpl';
import { ConditionalStyleApiImpl } from './ConditionalStyleApiImpl';
import { ConfigApiImpl } from './ConfigApiImpl';
import { CustomSortApiImpl } from './CustomSortApiImpl';
import { DashboardApiImpl } from './DashboardApiImpl';
import { ToolPanelApiImpl } from './ToolPanelApiImpl';
import { DataSourceApiImpl } from './DataSourceApiImpl';
import { EntitlementsApiImpl } from './EntitlementsApiImpl';
import { EventApiImpl } from './EventApiImpl';
import { ExportApiImpl } from './ExportApiImpl';
import { FlashingCellApiImpl } from './FlashingCellApiImpl';
import { UpdatedRowApiImpl } from './UpdatedRowApiImpl';
import { FormatColumnApiImpl } from './FormatColumnApiImpl';
import { FreeTextColumnApiImpl } from './FreeTextColumnApiImpl';
import { GridApiImpl } from './GridApiImpl';
import { LayoutApiImpl } from './LayoutApiImpl';
import { PercentBarApiImpl } from './PercentBarApiImpl';
import { PlusMinusApiImpl } from './PlusMinusApiImpl';
import { QuickSearchApiImpl } from './QuickSearchApiImpl';
import { ReminderApiImpl } from './ReminderApiImpl';
import { ShortcutApiImpl } from './ShortcutApiImpl';
import { SmartEditApiImpl } from './SmartEditApiImpl';
import { SparklineColumnApiImpl } from './SparklineColumnApiImpl';
import { SystemFilterApiImpl } from './SystemFilterApiImpl';
import { SystemStatusApiImpl } from './SystemStatusApiImpl';
import { ThemeApiImpl } from './ThemeApiImpl';
import { UserInterfaceApiImpl } from './UserInterfaceApiImpl';
import { UserFilterApiImpl } from './UserFilterApiImpl';
import { NamedFilterApiImpl } from './NamedFilterApiImpl';
import { IPushPullApiImpl } from './IPushPullApiImpl';
import { InternalApiImpl } from './InternalApiImpl';
import { Glue42ApiImpl } from './Glue42ApiImpl';
import { ColumnChooserApiImpl } from './ColumnChooserApiImpl';
import { AdaptableApi } from '../../types';
import { ActionColumnApi } from '../ActionColumnApi';
import { AdvancedSearchApi } from '../AdvancedSearchApi';
import { AlertApi } from '../AlertApi';
import { AuditEventApi } from '../AuditEventApi';
import { BulkUpdateApi } from '../BulkUpdateApi';
import { CalendarApi } from '../CalendarApi';
import { CalculatedColumnApi } from '../CalculatedColumnApi';
import { CellSummaryApi } from '../CellSummaryApi';
import { CellValidationApi } from '../CellValidationApi';
import { ChartApi } from '../ChartApi';
import { ColumnCategoryApi } from '../ColumnCategoryApi';
import { ColumnChooserAPI } from '../ColumnChooserAPI';
import { ColumnFilterApi } from '../ColumnFilterApi';
import { ConditionalStyleApi } from '../ConditionalStyleApi';
import { ConfigApi } from '../ConfigApi';
import { CustomSortApi } from '../CustomSortApi';
import { DashboardApi } from '../DashboardApi';
import { ToolPanelApi } from '../ToolPanelApi';
import { DataSourceApi } from '../DataSourceApi';
import { EntitlementsApi } from '../EntitlementsApi';
import { EventApi } from '../EventApi';
import { PluginsApi } from '../PluginsApi';
import { ExportApi } from '../ExportApi';
import { FlashingCellApi } from '../FlashingCellApi';
import { UpdatedRowApi } from '../UpdatedRowApi';
import { FormatColumnApi } from '../FormatColumnApi';
import { FreeTextColumnApi } from '../FreeTextColumnApi';
import { InternalApi } from '../InternalApi';
import { LayoutApi } from '../LayoutApi';
import { PlusMinusApi } from '../PlusMinusApi';
import { PercentBarApi } from '../PercentBarApi';
import { QuickSearchApi } from '../QuickSearchApi';
import { ReminderApi } from '../ReminderApi';
import { ShortcutApi } from '../ShortcutApi';
import { SmartEditApi } from '../SmartEditApi';
import { SparklineColumnApi } from '../SparklineColumnApi';
import { SystemFilterApi } from '../SystemFilterApi';
import { SystemStatusApi } from '../SystemStatusApi';
import { UserInterfaceApi } from '../UserInterfaceApi';
import { UserFilterApi } from '../UserFilterApi';
import { NamedFilterApi } from '../NamedFilterApi';
import { ThemeApi } from '../ThemeApi';
import { GridApi } from '../GridApi';
import { IPushPullApi } from '../IPushPullApi';
import { ScheduleApi } from '../ScheduleApi';
import { ScheduleApiImpl } from './ScheduleApiImpl';
import { GradientColumnApi } from '../GradientColumnApi';
import { GradientColumnApiImpl } from './GradientColumnApiImpl';

export class AdaptableApiImpl implements AdaptableApi {
  public actionColumnApi: ActionColumnApi;
  public applicationApi: ApplicationApi;
  public advancedSearchApi: AdvancedSearchApi;
  public alertApi: AlertApi;
  public auditEventApi: AuditEventApi;
  public bulkUpdateApi: BulkUpdateApi;
  public calendarApi: CalendarApi;
  public calculatedColumnApi: CalculatedColumnApi;
  public cellSummaryApi: CellSummaryApi;
  public cellValidationApi: CellValidationApi;
  public chartApi: ChartApi;
  public columnCategoryApi: ColumnCategoryApi;
  public columnChooserApi: ColumnChooserAPI;
  public columnFilterApi: ColumnFilterApi;
  public conditionalStyleApi: ConditionalStyleApi;
  public configApi: ConfigApi;
  public customSortApi: CustomSortApi;
  public dashboardApi: DashboardApi;
  public dataSourceApi: DataSourceApi;
  public entitlementsApi: EntitlementsApi;
  public eventApi: EventApi;
  public exportApi: ExportApi;
  public flashingCellApi: FlashingCellApi;
  public updatedRowApi: UpdatedRowApi;
  public formatColumnApi: FormatColumnApi;
  public freeTextColumnApi: FreeTextColumnApi;
  public gradientColumnApi: GradientColumnApi;
  public gridApi: GridApi;
  public internalApi: InternalApi;
  public layoutApi: LayoutApi;
  public plusMinusApi: PlusMinusApi;
  public percentBarApi: PercentBarApi;
  public quickSearchApi: QuickSearchApi;
  public reminderApi: ReminderApi;
  public scheduleApi: ScheduleApi;
  public shortcutApi: ShortcutApi;
  public smartEditApi: SmartEditApi;
  public sparklineColumnApi: SparklineColumnApi;
  public systemFilterApi: SystemFilterApi;
  public systemStatusApi: SystemStatusApi;
  public pluginsApi: PluginsApi;
  public themeApi: ThemeApi;
  public userInterfaceApi: UserInterfaceApi;
  public userFilterApi: UserFilterApi;
  public namedFilterApi: NamedFilterApi;
  public iPushPullApi: IPushPullApi;
  public glue42Api: Glue42ApiImpl;
  public toolPanelApi: ToolPanelApi;

  constructor(protected adaptable: IAdaptable) {
    this.adaptable = adaptable;
    this.actionColumnApi = new ActionColumnApiImpl(adaptable);
    this.applicationApi = new ApplicationApiImpl(adaptable);
    this.advancedSearchApi = new AdvancedSearchApiImpl(adaptable);
    this.alertApi = new AlertApiImpl(adaptable);
    this.pluginsApi = new PluginsApiImpl(adaptable);
    this.auditEventApi = new AuditEventApiImpl(adaptable);
    this.bulkUpdateApi = new BulkUpdateApiImpl(adaptable);
    this.calendarApi = new CalendarApiImpl(adaptable);
    this.calculatedColumnApi = new CalculatedColumnApiImpl(adaptable);
    this.cellSummaryApi = new CellSummaryApiImpl(adaptable);
    this.cellValidationApi = new CellValidationApiImpl(adaptable);
    this.chartApi = new ChartApiImpl(adaptable);
    this.columnCategoryApi = new ColumnCategoryApiImpl(adaptable);
    this.columnChooserApi = new ColumnChooserApiImpl(adaptable);
    this.columnFilterApi = new ColumnFilterApiImpl(adaptable);
    this.conditionalStyleApi = new ConditionalStyleApiImpl(adaptable);
    this.configApi = new ConfigApiImpl(adaptable);
    this.customSortApi = new CustomSortApiImpl(adaptable);
    this.dashboardApi = new DashboardApiImpl(adaptable);
    this.dataSourceApi = new DataSourceApiImpl(adaptable);
    this.entitlementsApi = new EntitlementsApiImpl(adaptable);
    this.eventApi = new EventApiImpl(adaptable);
    this.exportApi = new ExportApiImpl(adaptable);
    this.flashingCellApi = new FlashingCellApiImpl(adaptable);
    this.gradientColumnApi = new GradientColumnApiImpl(adaptable);
    this.updatedRowApi = new UpdatedRowApiImpl(adaptable);
    this.formatColumnApi = new FormatColumnApiImpl(adaptable);
    this.freeTextColumnApi = new FreeTextColumnApiImpl(adaptable);
    this.gridApi = new GridApiImpl(adaptable);
    this.layoutApi = new LayoutApiImpl(adaptable);
    this.percentBarApi = new PercentBarApiImpl(adaptable);
    this.plusMinusApi = new PlusMinusApiImpl(adaptable);
    this.quickSearchApi = new QuickSearchApiImpl(adaptable);
    this.reminderApi = new ReminderApiImpl(adaptable);
    this.scheduleApi = new ScheduleApiImpl(adaptable);
    this.shortcutApi = new ShortcutApiImpl(adaptable);
    this.smartEditApi = new SmartEditApiImpl(adaptable);
    this.sparklineColumnApi = new SparklineColumnApiImpl(adaptable);
    this.systemFilterApi = new SystemFilterApiImpl(adaptable);
    this.systemStatusApi = new SystemStatusApiImpl(adaptable);
    this.themeApi = new ThemeApiImpl(adaptable);
    this.userInterfaceApi = new UserInterfaceApiImpl(adaptable);
    this.userFilterApi = new UserFilterApiImpl(adaptable);
    this.namedFilterApi = new NamedFilterApiImpl(adaptable);
    this.iPushPullApi = new IPushPullApiImpl(adaptable);
    this.glue42Api = new Glue42ApiImpl(adaptable);
    this.toolPanelApi = new ToolPanelApiImpl(adaptable);

    this.internalApi = new InternalApiImpl(adaptable);
  }
}
