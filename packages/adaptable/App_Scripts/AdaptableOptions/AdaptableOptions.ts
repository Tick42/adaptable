import { ContainerOptions } from './ContainerOptions';
import { AuditOptions } from './AuditOptions';
import { ConfigServerOptions } from './ConfigServerOptions';
import { LayoutOptions } from './LayoutOptions';
import { FilterOptions } from './FilterOptions';
import { QueryOptions } from './QueryOptions';
import { GeneralOptions } from './GeneralOptions';
import { ChartOptions } from './ChartOptions';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { EditOptions } from './EditOptions';
import { StateOptions } from './StateOptions';
import { UserInterfaceOptions } from './UserInterfaceOptions';
import { AdaptablePlugin } from './AdaptablePlugin';

/**
 * `AdaptableOptions` is the class injected into Adaptable at startup.
 *
 * **This forms the only parameter requried by Adaptable's static constructor.**
 *
 * `AdaptableOptions` provides all the layout, DataGrid, config and other information required to ensure a full, rich user experience.
 *
 * The `AdaptableOptions` class contains a few regular properties of which 2 (`vendorGrid` and `primaryKey`) are mandatory - and a number of `xxxOptions` properties where the type is itself a collection of related properties.
 *
 * Typically users will only populate a few of the properties in `AdaptableOptions`, and only a few properties in each class.
 *
 * Any property that is not supplied by the user when populating the object, will use the default value (which is listed here for each property).
 */
export interface AdaptableOptions {
  /**
   * **MANDATORY property**
   *
   * This is the underlying vendor grid or grid object which Adaptable will interact with.
   *
   * Depending on the vendor it is either a Grid or an Options object.
   *
   * The `vendorGrid` object should contain all the column definitions and data sources required.
   *
   * Note: if you are using the *React Wrapper* or the *Angular Wrapper* then **you do not need to populate this property** (as `gridOptions` is a separate parameter).
   *
   * **Default Value: N/A**
   */
  vendorGrid?: any;

  /**
   * **MANDATORY property**
   *
   * The name of unique column in the grid
   *
   * Required for cell identification purpose when using Audit and other related functions.
   *
   * Note: The column does not need to be visible but it does need to exist in the grid's data source.
   *
   * **Default Value: N/A**
   */
  primaryKey: string;

  /**
   * Identifier for this instance of Adaptable
   *
   * Useful if Audit Log is turned on or you are using multiple grids
   *
   * **Note** it cannot contain a '.' (as this value is used to name styles which raises issues if it contains a full stop).
   *
   * The value provided here is also that used to name the *Home Toolbar* (the toolbar that appears first in the Dashboard on the left).
   *
   * **Default Value: adaptable_id**
   */

  adaptableId?: string;

  /**
   * Deprecated and no long required - please use the `adaptableId` key instead
   */
  blotterId?: string;

  /**
   * The name of the current Adaptable user
   *
   * Strongly recommended to be set if using Config Server
   *
   * Also used in Audit Log to identify the current user who has made edits or changed state.
   *
   * **Default Value: anonymous**
   */
  userName?: string;

  /**
   * User State (a.ka. `predefinedConfig`) set at design-time and shipped with Adaptable for first use.
   *
   * Contains a mixture of objects and properties.
   *
   * Only used when Config Server is not enabled.
   *
   * Can be either an *PredefinedConfig* object or a url to the file which contains the config.
   *
   * See full details at [Predefined Configuration](./interfaces/_predefinedconfig_predefinedconfig_.predefinedconfig.html)
   *
   * **Default Value: undefined**
   */
  predefinedConfig?: PredefinedConfig | string;

  plugins?: AdaptablePlugin[];

  /**
   * **This property is deprecated.  It is no longer used or required; licencing by key was removed in version 5**
   */
  licenceKey?: string;

  /**
   * Options for setting the *Div elements* in which Adaptable and the underlying grid are placed.
   *
   * Also allows you to set where popups appear relative to the page and where charts are displayed.
   */
  containerOptions?: ContainerOptions;

  /**
   * Options for mananging the **Audit Log**.
   *
   * Depending on the options you set audit messages will send details of actions in Adaptable to an Audit destination.
   *
   * You can choose to listen to any mixture of Audits for: **CellEdit**, **TickingDataChange**, **FunctionEvent**, **UserStateChange** and **InternalStateChange**.
   *
   * You additionally choose to send each audit message (which is packaged as a simple JSON object) to any mixture of: **Http Channel**, **Console**, **Alert** or **Event**.
   *
   * If you select HttpChannel, you can subsequently see these message using reporting software such as the Elastic Stack.
   */
  auditOptions?: AuditOptions;

  /**
   * Options for setting Config Server.
   *
   * This feature allows for storing user state remotely (as opposed to in local storage, which is the default).
   */
  configServerOptions?: ConfigServerOptions;

  /**
   * Options for running queries (or Expressions) in Adaptable.
   *
   * Lets you specify how (and how many) values are returned when doing a column lookup, how to deal with case and what is in the Query.
   *
   * Also includes a callback function allowing devs to populate column lookups dynamically.
   */
  queryOptions?: QueryOptions;

  /**
   * Options related to Editing in Adaptable.
   *
   * Includes a function enabling you to perform custom validation when a cell changes values.
   */
  editOptions?: EditOptions;

  /**
   * Options related to Layouts (ie. saveable views of column order, visibility and sort).
   *
   * Includes properties for whether to include vendor state in the Layout (e.g. Column Grouping) and whether layouts shoudl save automatically on clicking save.
   */
  layoutOptions?: LayoutOptions;

  /**
   * Related to creating and managing filters in Adaptable.
   *
   * Includes options concerning whether to use Adaptable's filters (or those provided by the vendor grid).
   *
   * Also contains options to set if, how and when the Grid should repaint and refilter after user data edits and ticking data edits.
   */
  filterOptions?: FilterOptions;

  /**
   * Options to manage Adaptable charting.
   *
   * Primarily concerned with how and where charts appear.
   */
  chartOptions?: ChartOptions;

  /**
   * General options to manage  Adaptable.
   *
   * Essentially those options that didn't fit into of the specific categories.
   *
   * Includes options for managing Server Searching, and how to manage Primary Keys.
   */
  generalOptions?: GeneralOptions;

  /**
   * Options for managing the User Interface Adaptable.
   *
   * Includes options for themes, menus, tool panels etc.
   */
  userInterfaceOptions?: UserInterfaceOptions;

  /**
   * Options related to state hydration/dehydration - allows users to intercept state persistence and state loading.
   *
   * By default, Adaptable state is persisted in the local storage of the user browser, under the `adaptableId` key.
   *
   * Using various state options allows you to change this default behavior and also add custom properties in the persisted state.
   *
   */
  stateOptions?: StateOptions;
}
