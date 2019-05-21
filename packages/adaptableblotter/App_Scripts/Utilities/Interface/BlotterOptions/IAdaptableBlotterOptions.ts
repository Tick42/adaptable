import { IContainerOptions } from './IContainerOptions';
import { IAuditOptions } from './IAuditOptions';
import { IConfigServerOptions } from './IConfigServerOptions';
import { ILayoutOptions } from './ILayoutOptions';
import { IFilterOptions } from './IFilterOptions';
import { IQueryOptions } from './IQueryOptions';
import { IGeneralOptions } from './IGeneralOptions';
import { IChartOptions } from './IChartOptions';
import { IConfigDashboardOptions } from './ConfigOptions/IConfigDashboardOptions';
import { IConfigLayoutOptions } from './ConfigOptions/IConfigLayoutOptions';

/**
 * The class injected into the Adaptable Blotter at startup
 * providing all the user, grid and config information required
 * Contains a few properties (of which 2 are mandatory) and a number of 'Options' classes
 * Any property that is not supplied by the user will use the default one as suppied in DefaultAdaptableBlotterOptions
 */
export interface IAdaptableBlotterOptions {
  /**
   * MANDATORY property
   * The underlying vendor grid or grid object
   * This is the actual grid that the Blotter interacts with
   */
  vendorGrid?: any;
  /**
   * MANDATORY property
   * Unique column in the grid
   * Required for cell identification purpose
   */
  primaryKey: string;
  /**
   * Identifier for this instance of the Adaptable Blotter
   * Useful if Audit Log is turned on or you are using multiple Blotters
   */
  blotterId?: string;
  /**
   * Current user of the Adaptable Blotter
   * Strongly recommended to be set if using Config Server
   * Also used in Audit Log to identify the current user
   */
  userName?: string;
  /**
   * Configuration properties and objects set at design-time
   * Only used when Config Server is not enabled
   */
  predefinedConfig?: any;
  // Dashboard?: IConfigDashboardOptions;
  //   Layout?: IConfigLayoutOptions;
  // };
  // TODO we should list them all here
  // and fill in all those config types,
  // so people using TS can get validation
  // for the config they are passing

  /**
   * A unique key - provided by the Adaptable Tools team that uniquely identifies the user / team
   * Required to get access to Standard or Enterprise functionality.
   * If not supplied then user has Community / Evaluation access where state cannot be saved or loaded.
   */
  licenceKey?: string;
  /**
   * Options for setting the <div>s which the Adaptable Blotter and underlying grid are placed.
   * Also can set where popups are displayed relative to the page.
   */
  containerOptions?: IContainerOptions;

  /**
   * The name of the theme to apply to the blotter UI. If not specified, will default to "light"
   */
  // theme?: string;
  /**
   * Options for mananging the Audit Log
   * Depending on your options, every keystroke, data change, user action etc. is logged
   * This is then sent as JSON to and Audit Http Channel for you to listen to using the software of your choice
   */
  auditOptions?: IAuditOptions;
  /**
   * Options for setting Config Server
   * This allows you to store user state not in local storage (the default)
   */
  configServerOptions?: IConfigServerOptions;
  /**
   * Options for running queries
   * Lets you specify how (and how many) values are returned
   */
  queryOptions?: IQueryOptions;
  /**
   * Options for use in Layouts
   * (ie. saveable view of column order, visibility and sorts)
   */
  layoutOptions?: ILayoutOptions;
  /**
   * Options for running filters
   * Whether to use Adaptable Blotter or vendor grid forms
   */
  filterOptions?: IFilterOptions;
  /**
   * Manage Adaptable Blotter charting
   */
  chartOptions?: IChartOptions;
  /**
   * General options to manage the Adaptable Blotter
   */
  generalOptions?: IGeneralOptions;
  /**
   * Configuration settings for iPushPull
   * Required if using iPushPull to display / send live report data
   * NOTE: an iPushPull licence is required to access this functionality
   */
  iPushPullConfig?: {
    api_url?: string;
    ws_url?: string;
    api_key: string;
    api_secret: string;
    transport?: string;
    storage_prefix?: string;
    hsts?: boolean;
  };
}
