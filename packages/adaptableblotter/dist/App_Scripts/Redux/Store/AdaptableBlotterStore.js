"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
const Redux = require("redux");
const ReduxStorage = require("redux-storage");
const redux_storage_decorator_migrate_1 = require("redux-storage-decorator-migrate");
const DeepDiff = require("deep-diff");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const AdaptableBlotterReduxStorageClientEngine_1 = require("./AdaptableBlotterReduxStorageClientEngine");
const AdaptableBlotterReduxLocalStorageEngine_1 = require("./AdaptableBlotterReduxLocalStorageEngine");
const AdaptableBlotterReduxMerger_1 = require("./AdaptableBlotterReduxMerger");
const redux_storage_decorator_filter_1 = require("redux-storage-decorator-filter");
const MenuRedux = require("../ActionsReducers/MenuRedux");
const PopupRedux = require("../ActionsReducers/PopupRedux");
const AboutRedux = require("../ActionsReducers/AboutRedux");
const ChartRedux = require("../ActionsReducers/ChartRedux");
const AlertRedux = require("../ActionsReducers/AlertRedux");
const SmartEditRedux = require("../ActionsReducers/SmartEditRedux");
const BulkUpdateRedux = require("../ActionsReducers/BulkUpdateRedux");
const CustomSortRedux = require("../ActionsReducers/CustomSortRedux");
const CalculatedColumnRedux = require("../ActionsReducers/CalculatedColumnRedux");
const ShortcutRedux = require("../ActionsReducers/ShortcutRedux");
const GridRedux = require("../ActionsReducers/GridRedux");
const PlusMinusRedux = require("../ActionsReducers/PlusMinusRedux");
const ColumnChooserRedux = require("../ActionsReducers/ColumnChooserRedux");
const ExportRedux = require("../ActionsReducers/ExportRedux");
const FlashingCellsRedux = require("../ActionsReducers/FlashingCellsRedux");
const CalendarRedux = require("../ActionsReducers/CalendarRedux");
const ConditionalStyleRedux = require("../ActionsReducers/ConditionalStyleRedux");
const QuickSearchRedux = require("../ActionsReducers/QuickSearchRedux");
const AdvancedSearchRedux = require("../ActionsReducers/AdvancedSearchRedux");
const DataSourceRedux = require("../ActionsReducers/DataSourceRedux");
const FilterRedux = require("../ActionsReducers/FilterRedux");
const ThemeRedux = require("../ActionsReducers/ThemeRedux");
const FormatColumnRedux = require("../ActionsReducers/FormatColumnRedux");
const LayoutRedux = require("../ActionsReducers/LayoutRedux");
const DashboardRedux = require("../ActionsReducers/DashboardRedux");
const CellValidationRedux = require("../ActionsReducers/CellValidationRedux");
const EntitlementsRedux = require("../ActionsReducers/EntitlementsRedux");
const TeamSharingRedux = require("../ActionsReducers/TeamSharingRedux");
const UserInterfaceRedux = require("../ActionsReducers/UserInterfaceRedux");
const SelectedCellsRedux = require("../ActionsReducers/SelectedCellsRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const iPushPullHelper_1 = require("../../Core/Helpers/iPushPullHelper");
const GeneralConstants_1 = require("../../Core/Constants/GeneralConstants");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const PreviewHelper_1 = require("../../Core/Helpers/PreviewHelper");
const Helper_1 = require("../../Core/Helpers/Helper");
const AdaptableBlotterLogger_1 = require("../../Core/Helpers/AdaptableBlotterLogger");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const rootReducer = Redux.combineReducers({
    Popup: PopupRedux.ShowPopupReducer,
    Menu: MenuRedux.MenuReducer,
    About: AboutRedux.AboutReducer,
    Alert: AlertRedux.AlertReducer,
    Chart: ChartRedux.ChartReducer,
    SmartEdit: SmartEditRedux.SmartEditReducer,
    BulkUpdate: BulkUpdateRedux.BulkUpdateReducer,
    CustomSort: CustomSortRedux.CustomSortReducer,
    Shortcut: ShortcutRedux.ShortcutReducer,
    Grid: GridRedux.GridReducer,
    PlusMinus: PlusMinusRedux.PlusMinusReducer,
    Export: ExportRedux.ExportReducer,
    FlashingCell: FlashingCellsRedux.FlashingCellReducer,
    Calendar: CalendarRedux.CalendarReducer,
    ConditionalStyle: ConditionalStyleRedux.ConditionalStyleReducer,
    QuickSearch: QuickSearchRedux.QuickSearchReducer,
    AdvancedSearch: AdvancedSearchRedux.AdvancedSearchReducer,
    DataSource: DataSourceRedux.DataSourceReducer,
    Filter: FilterRedux.FilterReducer,
    Theme: ThemeRedux.ThemeReducer,
    CellValidation: CellValidationRedux.CellValidationReducer,
    Layout: LayoutRedux.LayoutReducer,
    Dashboard: DashboardRedux.DashboardReducer,
    Entitlements: EntitlementsRedux.EntitlementsReducer,
    CalculatedColumn: CalculatedColumnRedux.CalculatedColumnReducer,
    UserInterface: UserInterfaceRedux.UserInterfaceStateReducer,
    SelectedCells: SelectedCellsRedux.SelectedCellsReducer,
    TeamSharing: TeamSharingRedux.TeamSharingReducer,
    FormatColumn: FormatColumnRedux.FormatColumnReducer
});
const RESET_STATE = 'RESET_STATE';
const INIT_STATE = 'INIT_STATE';
exports.ResetUserData = () => ({
    type: RESET_STATE
});
exports.InitState = () => ({
    type: INIT_STATE
});
const rootReducerWithResetManagement = (state, action) => {
    if (action.type === RESET_STATE) {
        //This trigger the persist of the state with nothing
        state.About = undefined;
        state.AdvancedSearch = undefined;
        state.Alert = undefined;
        state.BulkUpdate = undefined;
        state.CalculatedColumn = undefined;
        state.Calendar = undefined;
        state.CellValidation = undefined;
        state.ConditionalStyle = undefined;
        state.Chart = undefined;
        state.CustomSort = undefined;
        state.Dashboard.AvailableToolbars = [];
        state.Dashboard.VisibleButtons = [];
        state.Dashboard.VisibleToolbars = [];
        state.Dashboard = undefined;
        state.DataSource = undefined;
        state.Entitlements = undefined;
        state.Export = undefined;
        state.FlashingCell = undefined;
        state.FormatColumn = undefined;
        state.Filter.ColumnFilters = [];
        state.Filter.UserFilters = [];
        state.Filter.SystemFilters = [];
        state.Filter = undefined;
        state.Grid = undefined;
        state.Layout = undefined;
        state.Menu.ContextMenu = undefined;
        state.Menu.MenuItems = [];
        state.Menu = undefined;
        state.PlusMinus = undefined;
        state.QuickSearch = undefined;
        state.Shortcut = undefined;
        state.SmartEdit = undefined;
        state.SelectedCells = undefined;
        state.TeamSharing = undefined;
        state.Theme = undefined;
        state.UserInterface = undefined;
    }
    return rootReducer(state, action);
};
const configServerUrl = "/adaptableblotter-config";
const configServerTeamSharingUrl = "/adaptableblotter-teamsharing";
class AdaptableBlotterStore {
    constructor(blotter) {
        let middlewareReduxStorage;
        let reducerWithStorage;
        let loadStorage;
        let engineWithFilter;
        let engineWithMigrate;
        let engineReduxStorage;
        if (blotter.BlotterOptions.enableRemoteConfigServer) {
            engineReduxStorage = AdaptableBlotterReduxStorageClientEngine_1.createEngine(configServerUrl, blotter.BlotterOptions.userName, blotter.BlotterOptions.blotterId, blotter);
        }
        else {
            engineReduxStorage = AdaptableBlotterReduxLocalStorageEngine_1.createEngine(blotter.BlotterOptions.blotterId, blotter.BlotterOptions.predefinedConfig);
        }
        // const someExampleMigration = {
        //     version: 1,
        //     migration: (state: AdaptableBlotterState) => {
        //         state.SmartEdit.SmartEditValue = "2"; return { ...state }
        //     }
        // }
        // engine with migrate is where we manage the bits that we dont want to persist, but need to keep in the store
        // perhaps would be better to have 2 stores - persistence store and in-memory store
        engineWithMigrate = redux_storage_decorator_migrate_1.default(engineReduxStorage, 0, "AdaptableStoreVersion", [] /*[someExampleMigration]*/);
        engineWithFilter = redux_storage_decorator_filter_1.default(engineWithMigrate, [], [
            "TeamSharing",
            "UserInterface",
            "Popup",
            "Entitlements",
            "Menu",
            "Grid",
            "About",
            "BulkUpdate",
            ["Alert", "Alerts"],
            ["Calendar", "AvailableCalendars"],
            ["Theme", "AvailableThemes"],
            ["Export", "CurrentLiveReports"],
            ["SmartEdit", "IsValidSelection"],
            ["SmartEdit", "PreviewInfo"],
            ["SelectedCells", "SelectedCellSummary"]
        ]);
        //we prevent the save to happen on few actions since they do not change the part of the state that is persisted.
        //I think that is a part where we push a bit redux and should have two distinct stores....
        middlewareReduxStorage = ReduxStorage.createMiddleware(engineWithFilter, [MenuRedux.SET_MENUITEMS, GridRedux.GRID_SET_COLUMNS, ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER,
            PopupRedux.POPUP_CANCEL_CONFIRMATION, PopupRedux.POPUP_CLEAR_PARAM, PopupRedux.POPUP_CONFIRM_CONFIRMATION,
            PopupRedux.POPUP_CONFIRM_PROMPT, PopupRedux.POPUP_SHOW_CONFIRMATION, PopupRedux.POPUP_HIDE_SCREEN, PopupRedux.POPUP_HIDE_ALERT,
            PopupRedux.POPUP_HIDE_PROMPT, PopupRedux.POPUP_SHOW_SCREEN, PopupRedux.POPUP_SHOW_ALERT,
            PopupRedux.POPUP_SHOW_CHART, PopupRedux.POPUP_HIDE_CHART,
            PopupRedux.POPUP_SHOW_PROMPT]);
        //here we use our own merger function which is derived from redux simple merger
        reducerWithStorage = ReduxStorage.reducer(rootReducerWithResetManagement, AdaptableBlotterReduxMerger_1.MergeState);
        loadStorage = ReduxStorage.createLoader(engineWithFilter);
        let composeEnhancers;
        if ("production" != process.env.NODE_ENV) {
            composeEnhancers = redux_devtools_extension_1.composeWithDevTools({
            // Specify here name, actionsBlacklist, actionsCreators and other options if needed
            });
        }
        else {
            composeEnhancers = (x) => x;
        }
        //TODO: need to check if we want the storage to be done before or after 
        //we enrich the state with the AB middleware
        this.TheStore = Redux.createStore(reducerWithStorage, composeEnhancers(Redux.applyMiddleware(diffStateAuditMiddleware(blotter), adaptableBlotterMiddleware(blotter), middlewareReduxStorage, functionLogMiddleware(blotter))));
        //We start to build the state once everything is instantiated... I dont like that. Need to change
        this.Load =
            //We load the previous saved session. Redux is pretty awesome in its simplicity!
            loadStorage(this.TheStore)
                .then(() => this.TheStore.dispatch(exports.InitState()), (e) => {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError('Failed to load previous adaptable blotter state : ', e);
                //for now i'm still initializing the AB even if loading state has failed.... 
                //we may revisit that later
                this.TheStore.dispatch(exports.InitState());
                this.TheStore.dispatch(PopupRedux.PopupShowAlert({ Header: "Configurtion", Msg: "Error loading your configuration:" + e, MessageType: Enums_1.MessageType.Error }));
            });
    }
}
exports.AdaptableBlotterStore = AdaptableBlotterStore;
var diffStateAuditMiddleware = (adaptableBlotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            let oldState = middlewareAPI.getState();
            let ret = next(action);
            if (action.type != ReduxStorage.SAVE) {
                let newState = middlewareAPI.getState();
                let diff = DeepDiff.diff(oldState, newState);
                adaptableBlotter.AuditLogService.AddStateChangeAuditLog(diff, action.type);
            }
            return ret;
        };
    };
};
// this function is responsible for sending any changes through functions to the audit - previously done in the strategies but better done here I think....
// ideally it should only audit grid actions that are effected by our function.  general state changes are picked up in the audit diff
// e.g. this should say when the current Advanced search has changed, or if a custom sort is being applied (it doesnt yet), but not when sorts have been added generally or seraches changed
var functionLogMiddleware = (adaptableBlotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            let state = middlewareAPI.getState();
            // Note: not done custom sort, and many others
            // also not done bulk update, smart edit as each has different issues...
            switch (action.type) {
                case AdvancedSearchRedux.ADVANCED_SEARCH_SELECT: {
                    let actionTyped = action;
                    let advancedSearch = state.AdvancedSearch.AdvancedSearches.find(as => as.Name == actionTyped.SelectedSearchName);
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AdvancedSearchStrategyId, "apply advanced search", actionTyped.SelectedSearchName, advancedSearch);
                    return next(action);
                }
                case AdvancedSearchRedux.ADVANCED_SEARCH_ADD_UPDATE: {
                    let actionTyped = action;
                    let currentAdvancedSearch = state.AdvancedSearch.CurrentAdvancedSearch; // problem here if they have changed the name potentially...
                    if (actionTyped.AdvancedSearch.Name == currentAdvancedSearch) {
                        adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AdvancedSearchStrategyId, "apply advanced search", actionTyped.AdvancedSearch.Name, actionTyped.AdvancedSearch);
                    }
                    return next(action);
                }
                case QuickSearchRedux.QUICK_SEARCH_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.QuickSearchStrategyId, "apply quick search", actionTyped.quickSearchText, actionTyped.quickSearchText);
                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.PlusMinusStrategyId, "apply plus minus", "KeyPressed:" + actionTyped.KeyEventString, actionTyped.CellInfos);
                    return next(action);
                }
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.ShortcutStrategyId, "apply shortcut", "KeyPressed:" + actionTyped.KeyEventString, { Shortcut: actionTyped.Shortcut, PrimaryKey: actionTyped.CellInfo.Id, ColumnId: actionTyped.CellInfo.ColumnId });
                    return next(action);
                }
                case FilterRedux.COLUMN_FILTER_ADD_UPDATE: {
                    // this is basically select as we immediately set filters and just audit them all for now
                    let actionTyped = action;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.ColumnFilterStrategyId, "apply column filters", "filters applied", state.Filter.ColumnFilters);
                    return next(action);
                }
                case FilterRedux.USER_FILTER_ADD_UPDATE: {
                    let actionTyped = action;
                    let userFilter = actionTyped.UserFilter;
                    adaptableBlotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.UserFilterStrategyId, "user filters changed", "filters applied", state.Filter.UserFilters);
                    return next(action);
                }
                default:
                    return next(action);
            }
        };
    };
};
var adaptableBlotterMiddleware = (blotter) => function (middlewareAPI) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case TeamSharingRedux.TEAMSHARING_SHARE: {
                    let actionTyped = action;
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev) => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("TeamSharing share error :" + ev.message, actionTyped.Entity);
                    xhr.ontimeout = (ev) => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("TeamSharing share timeout", actionTyped.Entity);
                    xhr.onload = (ev) => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("TeamSharing share error : " + xhr.statusText, actionTyped.Entity);
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error", Msg: "Couldn't share item: " + xhr.statusText, MessageType: Enums_1.MessageType.Error }));
                            }
                            else {
                                middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Shared Successfully", MessageType: Enums_1.MessageType.Info }));
                            }
                        }
                    };
                    //we make the request async
                    xhr.open("POST", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    let obj = {
                        entity: actionTyped.Entity,
                        user: blotter.BlotterOptions.userName,
                        blotter_id: blotter.BlotterOptions.blotterId,
                        strategy: actionTyped.Strategy,
                        timestamp: new Date()
                    };
                    xhr.send(JSON.stringify(obj));
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_GET: {
                    let returnAction = next(action);
                    let xhr = new XMLHttpRequest();
                    xhr.onerror = (ev) => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("TeamSharing get error :" + ev.message);
                    xhr.ontimeout = (ev) => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("TeamSharing get timeout");
                    xhr.onload = (ev) => {
                        if (xhr.readyState == 4) {
                            if (xhr.status != 200) {
                                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("TeamSharing get error : " + xhr.statusText);
                            }
                            else {
                                middlewareAPI.dispatch(TeamSharingRedux.TeamSharingSet(JSON.parse(xhr.responseText, (key, value) => {
                                    if (key == "timestamp") {
                                        return new Date(value);
                                    }
                                    return value;
                                })));
                            }
                        }
                    };
                    //we make the request async
                    xhr.open("GET", configServerTeamSharingUrl, true);
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.send();
                    return returnAction;
                }
                case TeamSharingRedux.TEAMSHARING_IMPORT_ITEM: {
                    let returnAction = next(action);
                    let actionTyped = action;
                    let importAction;
                    let overwriteConfirmation = false;
                    switch (actionTyped.Strategy) {
                        case StrategyIds.CellValidationStrategyId:
                            importAction = CellValidationRedux.CellValidationAddUpdate(-1, actionTyped.Entity);
                            break;
                        case StrategyIds.CalculatedColumnStrategyId: {
                            let calcCol = actionTyped.Entity;
                            let idx = middlewareAPI.getState().CalculatedColumn.CalculatedColumns.findIndex(x => x.ColumnId == calcCol.ColumnId);
                            if (idx > -1) {
                                overwriteConfirmation = true;
                                importAction = CalculatedColumnRedux.CalculatedColumnEdit(idx, calcCol);
                            }
                            else {
                                importAction = CalculatedColumnRedux.CalculatedColumnAdd(calcCol);
                            }
                            break;
                        }
                        case StrategyIds.ConditionalStyleStrategyId:
                            importAction = ConditionalStyleRedux.ConditionalStyleAddUpdate(-1, actionTyped.Entity);
                            break;
                        case StrategyIds.CustomSortStrategyId: {
                            let customSort = actionTyped.Entity;
                            if (middlewareAPI.getState().CustomSort.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
                                overwriteConfirmation = true;
                                importAction = CustomSortRedux.CustomSortEdit(customSort);
                            }
                            else {
                                importAction = CustomSortRedux.CustomSortAdd(customSort);
                            }
                            break;
                        }
                        case StrategyIds.FormatColumnStrategyId: {
                            let formatColumn = actionTyped.Entity;
                            if (middlewareAPI.getState().FormatColumn.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
                                overwriteConfirmation = true;
                                importAction = FormatColumnRedux.FormatColumnEdit(formatColumn);
                            }
                            else {
                                importAction = FormatColumnRedux.FormatColumnAdd(formatColumn);
                            }
                            break;
                        }
                        case StrategyIds.PlusMinusStrategyId: {
                            let plusMinus = actionTyped.Entity;
                            importAction = PlusMinusRedux.PlusMinusAddUpdateCondition(-1, plusMinus);
                            break;
                        }
                        case StrategyIds.ShortcutStrategyId: {
                            let shortcut = actionTyped.Entity;
                            let shortcuts;
                            shortcuts = middlewareAPI.getState().Shortcut.Shortcuts;
                            if (shortcuts) {
                                if (shortcuts.find(x => x.ShortcutKey == shortcut.ShortcutKey)) {
                                    middlewareAPI.dispatch(ShortcutRedux.ShortcutDelete(shortcut));
                                }
                                importAction = ShortcutRedux.ShortcutAdd(shortcut);
                            }
                            break;
                        }
                        case StrategyIds.UserFilterStrategyId: {
                            let filter = actionTyped.Entity;
                            //For now not too worry about that but I think we'll need to check ofr filter that have same name
                            //currently the reducer checks for UID
                            if (middlewareAPI.getState().Filter.UserFilters.find(x => x.Name == filter.Name)) {
                                overwriteConfirmation = true;
                            }
                            importAction = FilterRedux.UserFilterAddUpdate(1, filter);
                            // } 
                            break;
                        }
                        case StrategyIds.AdvancedSearchStrategyId: {
                            let search = actionTyped.Entity;
                            if (middlewareAPI.getState().AdvancedSearch.AdvancedSearches.find(x => x.Name == search.Name)) {
                                overwriteConfirmation = true;
                            }
                            importAction = AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, search);
                            break;
                        }
                        case StrategyIds.LayoutStrategyId: {
                            let layout = actionTyped.Entity;
                            let layoutIndex = middlewareAPI.getState().Layout.Layouts.findIndex(x => x.Name == layout.Name);
                            if (layoutIndex != -1) {
                                overwriteConfirmation = true;
                            }
                            importAction = LayoutRedux.LayoutPreSave(layoutIndex, layout);
                            break;
                        }
                        case StrategyIds.ExportStrategyId: {
                            let report = actionTyped.Entity;
                            let idx = middlewareAPI.getState().Export.Reports.findIndex(x => x.Name == report.Name);
                            if (idx > -1) {
                                overwriteConfirmation = true;
                            }
                            importAction = ExportRedux.ReportAddUpdate(idx, report);
                            break;
                        }
                    }
                    if (overwriteConfirmation) {
                        let confirmation = {
                            CancelText: "Cancel Import",
                            ConfirmationTitle: "Overwrite Config",
                            ConfirmationMsg: "This item will overwrite one of your config. Do you want to continue?",
                            ConfirmationText: "Import",
                            CancelAction: null,
                            ConfirmAction: importAction,
                            ShowCommentBox: false
                        };
                        middlewareAPI.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
                    }
                    else if (importAction) {
                        middlewareAPI.dispatch(importAction);
                        middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing", Msg: "Item Successfully Imported", MessageType: Enums_1.MessageType.Info }));
                    }
                    else {
                        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("Unknown item type", actionTyped.Entity);
                        middlewareAPI.dispatch(PopupRedux.PopupShowAlert({ Header: "Team Sharing Error:", Msg: "Item not recognized. Cannot import", MessageType: Enums_1.MessageType.Error }));
                    }
                    return returnAction;
                }
                case AboutRedux.ABOUT_INFO_CREATE: {
                    let aboutStrategy = (blotter.Strategies.get(StrategyIds.AboutStrategyId));
                    let returnAction = next(action);
                    let aboutInfo = aboutStrategy.CreateAboutInfo();
                    middlewareAPI.dispatch(AboutRedux.AboutInfoSet(aboutInfo));
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_IS_EXPRESSION_VALID: {
                    let returnObj = blotter.CalculatedColumnExpressionService.IsExpressionValid(action.Expression);
                    if (!returnObj.IsValid) {
                        middlewareAPI.dispatch(CalculatedColumnRedux.CalculatedColumnSetErrorMessage(returnObj.ErrorMsg));
                    }
                    else {
                        middlewareAPI.dispatch(CalculatedColumnRedux.CalculatedColumnSetErrorMessage(null));
                    }
                    return next(action);
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_ADD: {
                    let returnAction = next(action);
                    let calculatedColumn = action.CalculatedColumn;
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns.filter(c => c.Visible);
                    blotter.addCalculatedColumnToGrid(calculatedColumn);
                    let newCalculatedColumn = middlewareAPI.getState().Grid.Columns.find(x => x.ColumnId == action.CalculatedColumn.ColumnId);
                    if (newCalculatedColumn) {
                        //      columnsLocalLayout.push(newCalculatedColumn)
                    }
                    //otherwise it will show hidden columns in AgGrid as we are recreating the column collection
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout));
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_DELETE: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = action;
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;
                    let deletedCalculatedColumnIndex = middlewareAPI.getState().Grid.Columns.findIndex(x => x.ColumnId == calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId);
                    blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[actionTyped.Index].ColumnId);
                    if (deletedCalculatedColumnIndex > -1) {
                        columnsLocalLayout.splice(deletedCalculatedColumnIndex, 1);
                    }
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout));
                    let returnAction = next(action);
                    return returnAction;
                }
                case CalculatedColumnRedux.CALCULATEDCOLUMN_EDIT: {
                    let calculatedColumnState = middlewareAPI.getState().CalculatedColumn;
                    let actionTyped = action;
                    let columnsLocalLayout = middlewareAPI.getState().Grid.Columns;
                    let index = actionTyped.Index;
                    let isNameChanged = columnsLocalLayout.find(c => c.ColumnId == actionTyped.CalculatedColumn.ColumnId) == null;
                    if (isNameChanged) { // name has changed so we are going to delete and then add to ensure all col names are correct
                        blotter.removeCalculatedColumnFromGrid(calculatedColumnState.CalculatedColumns[index].ColumnId);
                        blotter.addCalculatedColumnToGrid(actionTyped.CalculatedColumn);
                        blotter.setColumnIntoStore();
                        columnsLocalLayout = middlewareAPI.getState().Grid.Columns; // need to get again
                    }
                    else { // it exists so just edit
                        blotter.editCalculatedColumnInGrid(actionTyped.CalculatedColumn);
                    }
                    middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(columnsLocalLayout));
                    let returnAction = next(action);
                    return returnAction;
                }
                case FilterRedux.HIDE_FILTER_FORM: {
                    blotter.hideFilterForm();
                    return next(action);
                }
                case LayoutRedux.LAYOUT_SELECT: {
                    let returnAction = next(action);
                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (currentLayout) {
                        let gridState = middlewareAPI.getState().Grid;
                        // set columns
                        let blotterColumns = [];
                        currentLayout.Columns.forEach(c => {
                            let column = gridState.Columns.find(x => x.ColumnId == c);
                            if (column) {
                                blotterColumns.push(column);
                            }
                            else {
                                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("Column '" + c + "' not found");
                            }
                        });
                        middlewareAPI.dispatch(ColumnChooserRedux.SetNewColumnListOrder(blotterColumns));
                        // set sort 
                        middlewareAPI.dispatch(GridRedux.GridSetSort(currentLayout.GridSorts));
                        blotter.setGridSort(currentLayout.GridSorts);
                        // set vendor specific info
                        blotter.setVendorGridState(currentLayout.VendorGridInfo);
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_DELETE: {
                    let returnAction = next(action);
                    let layoutState = middlewareAPI.getState().Layout;
                    let currentLayout = layoutState.Layouts.find(l => l.Name == layoutState.CurrentLayout);
                    if (!currentLayout) { // we have deleted the current layout (allowed) so lets make the layout default
                        middlewareAPI.dispatch(LayoutRedux.LayoutSelect(GeneralConstants_1.DEFAULT_LAYOUT));
                    }
                    return returnAction;
                }
                case LayoutRedux.LAYOUT_PRESAVE: {
                    let returnAction = next(action);
                    let actionTyped = action;
                    let layout = Helper_1.Helper.cloneObject(actionTyped.Layout);
                    layout.VendorGridInfo = blotter.getVendorGridState(layout.Columns);
                    middlewareAPI.dispatch(LayoutRedux.LayoutAddUpdate(actionTyped.Index, layout));
                    return returnAction;
                }
                case GridRedux.GRID_SET_VALUE_LIKE_EDIT: {
                    let actionTyped = action;
                    //We set the value in the grid
                    blotter.setValue(actionTyped.CellInfo);
                    //We AuditLog the Edit
                    //13/02: we now do the AuditLog in the SeValue function
                    // adaptableBlotter.AuditLogService.AddEditCellAuditLog(actionTyped.CellInfo.Id, actionTyped.CellInfo.ColumnId, actionTyped.OldValue, actionTyped.CellInfo.Value)
                    return next(action);
                }
                case GridRedux.GRID_HIDE_COLUMN: {
                    let actionTyped = action;
                    let columnList = [].concat(middlewareAPI.getState().Grid.Columns);
                    let columnIndex = columnList.findIndex(x => x.ColumnId == actionTyped.ColumnId);
                    columnList.splice(columnIndex, 1);
                    blotter.setNewColumnListOrder(columnList);
                    return next(action);
                }
                case GridRedux.GRID_SELECT_COLUMN: {
                    let actionTyped = action;
                    blotter.selectColumn(actionTyped.ColumnId);
                    return next(action);
                }
                case PopupRedux.POPUP_CONFIRM_PROMPT: {
                    let promptConfirmationAction = middlewareAPI.getState().Popup.PromptPopup.ConfirmAction;
                    if (promptConfirmationAction) {
                        let inputText = action.InputText;
                        promptConfirmationAction.InputText = inputText;
                        middlewareAPI.dispatch(promptConfirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CONFIRM_CONFIRMATION: {
                    let confirmationAction = middlewareAPI.getState().Popup.ConfirmationPopup.ConfirmAction;
                    if (confirmationAction) {
                        middlewareAPI.dispatch(confirmationAction);
                    }
                    return next(action);
                }
                case PopupRedux.POPUP_CANCEL_CONFIRMATION: {
                    let cancelAction = middlewareAPI.getState().Popup.ConfirmationPopup.CancelAction;
                    if (cancelAction) {
                        middlewareAPI.dispatch(cancelAction);
                    }
                    return next(action);
                }
                /*  *********
                SELECTED CELL ACTIONS
                ************ */
                case SelectedCellsRedux.SELECTED_CELLS_CREATE_SUMMARY: {
                    let SelectedCellsStrategy = (blotter.Strategies.get(StrategyIds.SelectedCellsStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let selectedCellInfo = middlewareAPI.getState().Grid.SelectedCellInfo;
                    let apiSummaryReturn = SelectedCellsStrategy.CreateSelectedCellSummary(selectedCellInfo);
                    middlewareAPI.dispatch(SelectedCellsRedux.SelectedCellSetSummary(apiSummaryReturn));
                    return returnAction;
                }
                /*  *********
                SMART EDIT ACTIONS
                ************ */
                case SmartEditRedux.SMARTEDIT_CHECK_CELL_SELECTION: {
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = SmartEditStrategy.CheckCorrectCellSelection();
                    if (apiReturn.Alert) {
                        // check if Smart Edit is showing as popup and then close and show error (dont want to do that if from toolbar)
                        let popup = state.Popup.ScreenPopup;
                        if (popup.ComponentName == ScreenPopups.SmartEditPopup) { //We close the SmartEditPopup
                            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                            //We show the alert Popup 
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                        }
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetValidSelection(false));
                    }
                    else {
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetValidSelection(true));
                        let apiPreviewReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                        middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }
                // Here we have all actions that triggers a refresh of the SmartEditPreview
                case SmartEditRedux.SMARTEDIT_CHANGE_OPERATION:
                case SmartEditRedux.SMARTEDIT_CHANGE_VALUE:
                case SmartEditRedux.SMARTEDIT_FETCH_PREVIEW: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let state = middlewareAPI.getState();
                    let apiReturn = SmartEditStrategy.BuildPreviewValues(state.SmartEdit.SmartEditValue, state.SmartEdit.MathOperation);
                    middlewareAPI.dispatch(SmartEditRedux.SmartEditSetPreview(apiReturn));
                    return returnAction;
                }
                case SmartEditRedux.SMARTEDIT_APPLY: {
                    let SmartEditStrategy = (blotter.Strategies.get(StrategyIds.SmartEditStrategyId));
                    let actionTyped = action;
                    let thePreview = middlewareAPI.getState().SmartEdit.PreviewInfo;
                    let newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings);
                    SmartEditStrategy.ApplySmartEdit(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                /*  *********
                BULK UPDATE ACTIONS
                ************ */
                case BulkUpdateRedux.BULK_UPDATE_CHECK_CELL_SELECTION: {
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();
                    let returnAction = next(action);
                    let apiReturn = BulkUpdateStrategy.CheckCorrectCellSelection();
                    if (apiReturn.Alert) {
                        // check if BulkUpdate is showing as popup
                        let popup = state.Popup.ScreenPopup;
                        if (popup.ComponentName == ScreenPopups.BulkUpdatePopup) {
                            //We close the BulkUpdatePopup
                            middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                            //We show the Error Popup -- assume that will alwasy be an Error
                            middlewareAPI.dispatch(PopupRedux.PopupShowAlert(apiReturn.Alert));
                        }
                        middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetValidSelection(false));
                    }
                    else {
                        middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetValidSelection(true));
                        let apiPreviewReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                        middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetPreview(apiPreviewReturn));
                    }
                    return returnAction;
                }
                // Here we have all actions that triggers a refresh of the BulkUpdatePreview
                case BulkUpdateRedux.BULK_UPDATE_CHANGE_VALUE: {
                    //all our logic needs to be executed AFTER the main reducers 
                    //so our state is up to date which allow us not to care about the data within each different action
                    let returnAction = next(action);
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let state = middlewareAPI.getState();
                    let apiReturn = BulkUpdateStrategy.BuildPreviewValues(state.BulkUpdate.BulkUpdateValue);
                    middlewareAPI.dispatch(BulkUpdateRedux.BulkUpdateSetPreview(apiReturn));
                    return returnAction;
                }
                case BulkUpdateRedux.BULK_UPDATE_APPLY: {
                    let BulkUpdateStrategy = (blotter.Strategies.get(StrategyIds.BulkUpdateStrategyId));
                    let actionTyped = action;
                    let thePreview = middlewareAPI.getState().BulkUpdate.PreviewInfo;
                    let newValues = PreviewHelper_1.PreviewHelper.GetCellInfosFromPreview(thePreview, actionTyped.bypassCellValidationWarnings);
                    BulkUpdateStrategy.ApplyBulkUpdate(newValues);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                case PlusMinusRedux.PLUSMINUS_APPLY: {
                    let plusMinusStrategy = (blotter.Strategies.get(StrategyIds.PlusMinusStrategyId));
                    let actionTyped = action;
                    plusMinusStrategy.ApplyPlusMinus(actionTyped.KeyEventString, actionTyped.CellInfos);
                    middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    return next(action);
                }
                case ShortcutRedux.SHORTCUT_APPLY: {
                    let shortcutStrategy = (blotter.Strategies.get(StrategyIds.ShortcutStrategyId));
                    let actionTyped = action;
                    shortcutStrategy.ApplyShortcut(actionTyped.CellInfo, actionTyped.NewValue);
                    return next(action);
                }
                case ExportRedux.EXPORT_APPLY: {
                    let exportStrategy = (blotter.Strategies.get(StrategyIds.ExportStrategyId));
                    let actionTyped = action;
                    if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull && iPushPullHelper_1.iPushPullHelper.IPPStatus != iPushPullHelper_1.iPushPullHelper.ServiceStatus.Connected) {
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen("IPushPullLogin", false, actionTyped.Report));
                    }
                    else if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull && !actionTyped.Folder) {
                        iPushPullHelper_1.iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages) => {
                            middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages));
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""));
                        }).catch((err) => {
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(err));
                        });
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen("IPushPullDomainPageSelector", false, actionTyped.Report));
                    }
                    else if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull) {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination, actionTyped.Folder, actionTyped.Page);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    }
                    else {
                        exportStrategy.Export(actionTyped.Report, actionTyped.ExportDestination);
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                    }
                    return next(action);
                }
                case ExportRedux.IPP_LOGIN: {
                    let actionTyped = action;
                    iPushPullHelper_1.iPushPullHelper.Login(actionTyped.Login, actionTyped.Password).then(() => {
                        let report = middlewareAPI.getState().Popup.ScreenPopup.Params;
                        middlewareAPI.dispatch(PopupRedux.PopupHideScreen());
                        middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""));
                        iPushPullHelper_1.iPushPullHelper.GetDomainPages(blotter.BlotterOptions.iPushPullConfig.api_key).then((domainpages) => {
                            middlewareAPI.dispatch(ExportRedux.SetDomainPages(domainpages));
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(""));
                        }).catch((error) => {
                            middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error));
                        });
                        middlewareAPI.dispatch(PopupRedux.PopupShowScreen("IPushPullDomainPageSelector", false, report));
                    }).catch((error) => {
                        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("Login failed", error);
                        middlewareAPI.dispatch(ExportRedux.ReportSetErrorMsg(error));
                    });
                    return next(action);
                }
                case ExportRedux.REPORT_STOP_LIVE: {
                    let actionTyped = action;
                    if (actionTyped.ExportDestination == Enums_1.ExportDestination.iPushPull) {
                        let currentLiveReports = middlewareAPI.getState().Export.CurrentLiveReports;
                        let lre = currentLiveReports.find(x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination);
                        iPushPullHelper_1.iPushPullHelper.UnloadPage(lre.WorkbookName);
                    }
                    return next(action);
                }
                //We rebuild the menu from scratch
                //the difference between the two is that RESET_STATE is handled before and set the state to undefined
                case INIT_STATE:
                case RESET_STATE: {
                    let returnAction = next(action);
                    //we set the column list from the datasource
                    blotter.setColumnIntoStore();
                    //create the default layout so we can revert to it if needed
                    let currentLayout = GeneralConstants_1.DEFAULT_LAYOUT;
                    let gridState = middlewareAPI.getState().Grid;
                    let layoutState = middlewareAPI.getState().Layout;
                    if (layoutState.Layouts.length == 0) {
                        let layout = ObjectFactory_1.ObjectFactory.CreateLayout(gridState.Columns, [], null, GeneralConstants_1.DEFAULT_LAYOUT);
                        middlewareAPI.dispatch(LayoutRedux.LayoutPreSave(0, layout));
                    }
                    else {
                        //update default layout with latest columns and sort
                        let layout = ObjectFactory_1.ObjectFactory.CreateLayout(gridState.Columns, gridState.GridSorts, null, GeneralConstants_1.DEFAULT_LAYOUT);
                        middlewareAPI.dispatch(LayoutRedux.LayoutPreSave(0, layout)); // think this is right that has to be 0
                        currentLayout = layoutState.CurrentLayout;
                    }
                    //Create all calculated columns before we load the layout
                    middlewareAPI.getState().CalculatedColumn.CalculatedColumns.forEach(x => {
                        blotter.addCalculatedColumnToGrid(x);
                    });
                    if (middlewareAPI.getState().CalculatedColumn.CalculatedColumns.length > 0) {
                        //     blotter.setColumnIntoStore();
                        //12/09/17 : fortunately it's not needed anymore as I changed the init process... That was dirty
                        // //We force clone of the state so strategies get reinitialized with the new column.
                        // //it's not ideal and will probably need optimization
                        // middlewareAPI.dispatch(CloneState())
                    }
                    //load either saved layout or default one
                    middlewareAPI.dispatch(LayoutRedux.LayoutSelect(currentLayout));
                    blotter.createMenu();
                    //we create default configuration for new Dashboard Items that are
                    //not existing in the user config
                    //    AdaptableDashboardViewFactory.forEach((control, strategyId) => {
                    //        if (!middlewareAPI.getState().Dashboard.DashboardFunctionToolbars.find(x => x == strategyId)) {
                    //      middlewareAPI.dispatch(DashboardRedux.DashboardCreateDefaultConfigurationItem(strategyId));
                    //        }
                    //    })
                    blotter.InitAuditService();
                    return returnAction;
                }
                case ColumnChooserRedux.SET_NEW_COLUMN_LIST_ORDER:
                    let actionTyped = action;
                    //not sure what is best still..... make the strategy generic enough so they work for all combos and put some of the logic in the AB class or do the opposite....
                    //Time will tell I guess
                    blotter.setNewColumnListOrder(actionTyped.VisibleColumnList);
                    return next(action);
                default:
                    return next(action);
            }
        };
    };
};