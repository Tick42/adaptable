/**
 * The class injected into the Adaptable Blotter at startup
 * providing all the user, grid and config information required
 */
export interface IAdaptableBlotterOptions {
    /**
     * Unique column in the grid (required for cell identification purposes)
     * One of the three MANDATORY properties
     */
    primaryKey: string;
    /**
    * The underlying vendor grid or grid object
    * One of the three MANDATORY properties (except for Hypergrid Angular wrapper)
    */
    vendorGrid?: any;
    /**
     * How to identifier this Blotter
     * Useful if Audit Log is turned on or you are using multiple Blotters
     */
    blotterId?: string;
    /**
    * Current user of the Adaptable Blotter
    */
    userName?: string;
    /**
    * Configuration properties and objects set at design-time
    * Only used when Config Server is not enabled
    */
    predefinedConfig?: any;
    /**
      * Options for setting the <div>s which the Adaptable Blotter and underlying grid are placed.
      * Also can set where popups are dispalyed relative to the page.
      */
    containerOptions?: IContainerOptions;
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
     * Options for filters
     * Whether to use Adaptable Blotter or vendor grid forms
     */
    filterOptions?: IFilterOptions;
    /**
    * General options to manage the Adaptable Blotter
    */
    generalOptions?: IGeneralOptions;
    /**
    * Required if using iPushPull to display / send live report data
    */
    iPushPullConfig?: {
        api_url?: string;
        ws_url?: string;
        api_key: string;
        api_secret: string;
        transport?: string;
        storage_prefix?: string;
    };
}
export interface IServerColumnValues {
    DistinctCriteriaPairValue: 'RawValue' | 'DisplayValue';
    ColumnValues: string[];
}
export interface IAuditOptions {
    auditCellEdits?: boolean;
    auditFunctionEvents?: boolean;
    auditUserStateChanges?: boolean;
    auditInternalStateChanges?: boolean;
    pingInterval?: number;
    auditLogsSendInterval?: number;
}
export interface IConfigServerOptions {
    /**
     * If true, config is stored at server location of your choice
     * Otherwise it is stored in the local cache
     */
    enableConfigServer?: boolean;
    /**
     * Config server that will persist the user state and give it back on demand.
     * Only used if enableConfigServer is true.
     *
     * AdaptableBlotter will send a POST request to this URL to persist the state with the follower parameters:
     * Headers: { ab_username: string, ab_id: string }
     * Body: Stringified user state
     *
     * Each ab_username & ab_id combination is unique, so your server should persist the state and use that combination as a key.
     *
     * AdaptableBlotter will send a GET request to this URL to get the persisted state with the follower parameters:
     * Headers: { ab_username: string, ab_id: string }
     *
     * Your server should return the user state related to the given ab_username and ab_id combination as a JSON object.
     */
    configServerUrl?: string;
}
export interface ILayoutOptions {
    /**
    * Whether layouts should include vendor-related state
    * Defaults to false - only currently available in ag-Grid
    */
    includeVendorStateInLayouts?: boolean;
    /**
     * Whether layouts should save as soon as column order or sorts change
     * Defaults to false - user needs to click save to persist changes
     */
    autoSaveLayouts?: boolean;
}
export interface IFilterOptions {
    /**
    * Whether to make the font in the Column header for filtered columns to be bold and italicised
    * This will make it easier for users to see at a glance which columns are currently filtered
    */
    indicateFilteredColumns?: boolean;
    /**
     * Use the Adaptable Blotter filter form in column menu
     * If false, the one supplied by the vendor grid will be used
     * Only applicable in grids where the vendor offers a filter form
     */
    useAdaptableBlotterFilterForm?: boolean;
    /**
    * Use the Adaptable Blotter quick filter row
    * If false, the one supplied by the vendor grid will be used
    * Only applicable in grids where the vendor offers a filter row
    */
    useAdaptableBlotterFloatingFilter?: boolean;
}
export interface IQueryOptions {
    /**
     * How many items to dispay in column value listboxes when building queries
     * Useful when datasource is very large
     */
    maxColumnValueItemsDisplayed?: number;
    /**
     * Whether the query builder will include just ColumnValues
     * Or should also include Filters and Ranges (the default)
     * Used primarily if running search on Server
     */
    columnValuesOnlyInQueries?: boolean;
    /**
     * When running queries on text columns to ignore case
     * Defaults to true - case is ignored by default
     * (e.g. [StartsWith 'c'] will return true for the value 'Canada')
     */
    ignoreCaseInQueries?: boolean;
    /**
     * Promise providing list of column values
     * Called each time a query is built or filter is opened
     */
    getColumnValues?: (column: string) => Promise<IServerColumnValues>;
}
export interface IContainerOptions {
    /**
     * Name of the <div> which contains the Adaptable Blotter
     * Defaults to "adaptableBlotter"
     */
    adaptableBlotterContainer?: string;
    /**
    * Name of the <div> which contains the underlying vendor grid
    * Defaults to "grid"
    */
    vendorContainer?: string;
    /**
     * Name of the <div> where the modals should appear
     * If not set, modals will be displayed in the middle of the page
     */
    modalContainer?: string;
}
export interface IGeneralOptions {
    /**
  * Which searching and filtering options, if any, should take place on the server
  * Leave unset (default is 'None') to perform everything on the client
  */
    serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';
    /**
      * Use the default theme that we provide for the vendor grid
      * There is one each for 'Light Theme' and 'Dark Theme'
      * See Help for more details
      */
    useDefaultVendorGridThemes?: boolean;
    /**
    * Whether to show a warning if the primary key column identified in this Options does not exist
    * Recommended to set to true (default) as a wrongly applied primary key can affect many functions
    */
    showMissingPrimaryKeyWarning?: boolean;
}
