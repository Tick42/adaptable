import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';

import { ApplicationApi } from '../ApplicationAPI';
import { ApplicationApiImpl } from './ApplicationApiImpl';

import { GridApi } from 'ag-grid-community';
import { ActionColumnApiImpl } from './ActionColumnApiImpl';
import { AdvancedSearchApiImpl } from './AdvancedSearchApiImpl';
import { AlertApiImpl } from './AlertApiImpl';
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
import { DataSourceApiImpl } from './DataSourceApiImpl';
import { EntitlementApiImpl } from './EntitlementApiImpl';
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
import { InternalApiImpl } from './InternalApiImpl';
import { PartnerConfigApiImpl } from './PartnerConfigApiImpl';
import { ColumnChooserApiImpl } from './ColumnChooserApiImpl';
import { BlotterApi } from '../../types';
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
import { DataSourceApi } from '../DataSourceApi';
import { EntitlementApi } from '../EntitlementApi';
import { EventApi } from '../EventApi';
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
import { PartnerConfigAPI } from '../PartnerConfigAPI';
import { ThemeApi } from '../ThemeApi';
import { DataGridApi } from '../DataGridApi';

export class BlotterApiImpl implements BlotterApi {
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
  public entitlementApi: EntitlementApi;
  public eventApi: EventApi;
  public exportApi: ExportApi;
  public flashingCellApi: FlashingCellApi;
  public updatedRowApi: UpdatedRowApi;
  public formatColumnApi: FormatColumnApi;
  public freeTextColumnApi: FreeTextColumnApi;
  public gridApi: DataGridApi;
  public internalApi: InternalApi;
  public layoutApi: LayoutApi;
  public plusMinusApi: PlusMinusApi;
  public percentBarApi: PercentBarApi;
  public quickSearchApi: QuickSearchApi;
  public reminderApi: ReminderApi;
  public shortcutApi: ShortcutApi;
  public smartEditApi: SmartEditApi;
  public sparklineColumnApi: SparklineColumnApi;
  public systemFilterApi: SystemFilterApi;
  public systemStatusApi: SystemStatusApi;
  public themeApi: ThemeApi;
  public userInterfaceApi: UserInterfaceApi;
  public userFilterApi: UserFilterApi;
  public namedFilterApi: NamedFilterApi;
  public partnerConfigApi: PartnerConfigAPI;

  constructor(protected blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    this.actionColumnApi = new ActionColumnApiImpl(blotter);
    this.applicationApi = new ApplicationApiImpl(blotter);
    this.advancedSearchApi = new AdvancedSearchApiImpl(blotter);
    this.alertApi = new AlertApiImpl(blotter);
    this.auditEventApi = new AuditEventApiImpl(blotter);
    this.bulkUpdateApi = new BulkUpdateApiImpl(blotter);
    this.calendarApi = new CalendarApiImpl(blotter);
    this.calculatedColumnApi = new CalculatedColumnApiImpl(blotter);
    this.cellSummaryApi = new CellSummaryApiImpl(blotter);
    this.cellValidationApi = new CellValidationApiImpl(blotter);
    this.chartApi = new ChartApiImpl(blotter);
    this.columnCategoryApi = new ColumnCategoryApiImpl(blotter);
    this.columnChooserApi = new ColumnChooserApiImpl(blotter);
    this.columnFilterApi = new ColumnFilterApiImpl(blotter);
    this.conditionalStyleApi = new ConditionalStyleApiImpl(blotter);
    this.configApi = new ConfigApiImpl(blotter);
    this.customSortApi = new CustomSortApiImpl(blotter);
    this.dashboardApi = new DashboardApiImpl(blotter);
    this.dataSourceApi = new DataSourceApiImpl(blotter);
    this.entitlementApi = new EntitlementApiImpl(blotter);
    this.eventApi = new EventApiImpl(blotter);
    this.exportApi = new ExportApiImpl(blotter);
    this.flashingCellApi = new FlashingCellApiImpl(blotter);
    this.updatedRowApi = new UpdatedRowApiImpl(blotter);
    this.formatColumnApi = new FormatColumnApiImpl(blotter);
    this.freeTextColumnApi = new FreeTextColumnApiImpl(blotter);
    this.gridApi = new GridApiImpl(blotter);
    this.layoutApi = new LayoutApiImpl(blotter);
    this.percentBarApi = new PercentBarApiImpl(blotter);
    this.plusMinusApi = new PlusMinusApiImpl(blotter);
    this.quickSearchApi = new QuickSearchApiImpl(blotter);
    this.reminderApi = new ReminderApiImpl(blotter);
    this.shortcutApi = new ShortcutApiImpl(blotter);
    this.smartEditApi = new SmartEditApiImpl(blotter);
    this.sparklineColumnApi = new SparklineColumnApiImpl(blotter);
    this.systemFilterApi = new SystemFilterApiImpl(blotter);
    this.systemStatusApi = new SystemStatusApiImpl(blotter);
    this.themeApi = new ThemeApiImpl(blotter);
    this.userInterfaceApi = new UserInterfaceApiImpl(blotter);
    this.userFilterApi = new UserFilterApiImpl(blotter);
    this.namedFilterApi = new NamedFilterApiImpl(blotter);
    this.partnerConfigApi = new PartnerConfigApiImpl(blotter);

    this.internalApi = new InternalApiImpl(blotter);
  }
}
