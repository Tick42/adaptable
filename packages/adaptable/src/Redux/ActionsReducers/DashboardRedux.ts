import * as Redux from 'redux';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ButtonStyle, ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';
import {
  AdaptableDashboardToolbars,
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
import {
  DashboardState,
  CustomToolbar,
  DashboardFloatingPosition,
  DashboardTab,
} from '../../PredefinedConfig/DashboardState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

const DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
export const DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
const DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
const DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
const DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
const DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
const DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
const DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON = 'DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
const DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON = 'DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON';
const DASHBOARD_SHOW_GRID_INFO_BUTTON = 'DASHBOARD_SHOW_GRID_INFO_BUTTON';
const DASHBOARD_HIDE_GRID_INFO_BUTTON = 'DASHBOARD_HIDE_GRID_INFO_BUTTON';
const DASHBOARD_SHOW_FUNCTIONS_DROPDOWN = 'DASHBOARD_SHOW_FUNCTIONS_DROPDOWN';
const DASHBOARD_HIDE_FUNCTIONS_DROPDOWN = 'DASHBOARD_HIDE_FUNCTIONS_DROPDOWN';
const DASHBOARD_SHOW_COLUMNS_DROPDOWN = 'DASHBOARD_SHOW_COLUMNS_DROPDOWN';
const DASHBOARD_HIDE_COLUMNS_DROPDOWN = 'DASHBOARD_HIDE_COLUMNS_DROPDOWN';
const DASHBOARD_SHOW_TOOLBARS_DROPDOWN = 'DASHBOARD_SHOW_TOOLBARS_DROPDOWN';
const DASHBOARD_HIDE_TOOLBARS_DROPDOWN = 'DASHBOARD_HIDE_TOOLBARS_DROPDOWN';
const DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
const DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE =
  'DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE';
const DASHBOARD_CUSTOM_TOOLBAR_EDIT = 'DASHBOARD_CUSTOM_TOOLBAR_EDIT';
const DASHBOARD_SET_ACTIVE_TAB = 'DASHBOARD_SET_ACTIVE_TAB';
const DASHBOARD_SET_IS_COLLAPSED = 'DASHBOARD_SET_IS_COLLAPSED';
const DASHBOARD_SET_IS_FLOATING = 'DASHBOARD_SET_IS_FLOATING';
const DASHBOARD_SET_FLOATING_POSITION = 'DASHBOARD_SET_FLOATING_POSITION';
const DASHBOARD_SET_TABS = 'DASHBOARD_SET_TABS';
const DASHBOARD_CREATE_DEFAULT_TAB = 'DASHBOARD_CREATE_DEFAULT_TAB';

export interface DashboardSetAvailableToolbarsAction extends Redux.Action {
  toolbars: AdaptableDashboardToolbars;
}

export interface DashboardSetToolbarsAction extends Redux.Action {
  toolbars: AdaptableDashboardToolbars | string[];
}

export interface DashboardShowToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar | string;
}

export interface DashboardHideToolbarAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar | string;
}

export interface DashboardMoveItemAction extends Redux.Action {
  toolbar: AdaptableDashboardToolbar;
  NewIndex: number;
}

export interface DashboardSetFunctionButtonsAction extends Redux.Action {
  functionButtons: AdaptableFunctionButtons;
}

export interface DashboardSetVisibilityAction extends Redux.Action {
  Visibility: Visibility;
}

export interface DashboardShowFunctionsDropdownAction extends Redux.Action {}

export interface DashboardHideFunctionsDropdownAction extends Redux.Action {}

export interface DashboardShowColumnsDropdownAction extends Redux.Action {}

export interface DashboardHideColumnsDropdownAction extends Redux.Action {}

export interface DashboardShowToolbarsDropdownAction extends Redux.Action {}

export interface DashboardHideToolbarsDropdownAction extends Redux.Action {}
export interface DashboardSetHomeToolbarTitleAction extends Redux.Action {
  Title: string;
}

export interface DashboardSetMinimisedHomeToolbarButtonStyleAction extends Redux.Action {
  ButtonStyle: ButtonStyle;
}

export interface DashboardCustomToolbarEditAction extends Redux.Action {
  customToolbar: CustomToolbar;
}

export interface DashboardSetActiveTabAction extends Redux.Action {
  ActiveTab: number | null;
}

export interface DashboardSetIsCollapsedAction extends Redux.Action {
  IsCollapsed: boolean;
}

export interface DashboardSetIsFloatingAction extends Redux.Action {
  IsFloating: boolean;
}

export interface DashboardSetFloatingPositionAction extends Redux.Action {
  FloatingPosition: DashboardFloatingPosition;
}

export interface DashboardSetTabsAction extends Redux.Action {
  Tabs: DashboardTab[];
}

export interface DashboardCreateDefaultTabAction extends Redux.Action {}

export const DashboardSetAvailableToolbars = (
  toolbars: AdaptableDashboardToolbars
): DashboardSetAvailableToolbarsAction => ({
  type: DASHBOARD_SET_AVAILABLE_TOOLBARS,
  toolbars,
});

export const DashboardSetToolbars = (
  toolbars: AdaptableDashboardToolbar[] | string[]
): DashboardSetToolbarsAction => ({
  type: DASHBOARD_SET_TOOLBARS,
  toolbars,
});

export const DashboardShowToolbar = (
  toolbar: AdaptableDashboardToolbar | string
): DashboardShowToolbarAction => ({
  type: DASHBOARD_SHOW_TOOLBAR,
  toolbar,
});

export const DashboardHideToolbar = (
  toolbar: AdaptableDashboardToolbar | string
): DashboardHideToolbarAction => ({
  type: DASHBOARD_HIDE_TOOLBAR,
  toolbar,
});

export const DashboardMoveItem = (
  toolbar: AdaptableDashboardToolbar,

  NewIndex: number
): DashboardMoveItemAction => ({
  type: DASHBOARD_MOVE_ITEM,
  toolbar,
  NewIndex,
});

export const DashboardSetFunctionButtons = (
  functionButtons: AdaptableFunctionButtons
): DashboardSetFunctionButtonsAction => ({
  type: DASHBOARD_SET_FUNCTION_BUTTONS,
  functionButtons,
});

export const DashboardSetVisibility = (Visibility: Visibility): DashboardSetVisibilityAction => ({
  type: DASHBOARD_SET_VISIBILITY,
  Visibility,
});

export const DashboardShowFunctionsDropdown = (): DashboardShowFunctionsDropdownAction => ({
  type: DASHBOARD_SHOW_FUNCTIONS_DROPDOWN,
});

export const DashboardHideFunctionsDropdown = (): DashboardHideFunctionsDropdownAction => ({
  type: DASHBOARD_HIDE_FUNCTIONS_DROPDOWN,
});

export const DashboardShowColumnsDropdown = (): DashboardShowColumnsDropdownAction => ({
  type: DASHBOARD_SHOW_COLUMNS_DROPDOWN,
});

export const DashboardHideColumnsDropdown = (): DashboardHideColumnsDropdownAction => ({
  type: DASHBOARD_HIDE_COLUMNS_DROPDOWN,
});

export const DashboardShowToolbarsDropdown = (): DashboardShowToolbarsDropdownAction => ({
  type: DASHBOARD_SHOW_TOOLBARS_DROPDOWN,
});

export const DashboardHideToolbarsDropdown = (): DashboardHideToolbarsDropdownAction => ({
  type: DASHBOARD_HIDE_TOOLBARS_DROPDOWN,
});

export const DashboardSetHomeToolbarTitle = (
  Title: string
): DashboardSetHomeToolbarTitleAction => ({
  type: DASHBOARD_SET_HOME_TOOLBAR_TITLE,
  Title,
});

export const DashboardSetMinimisedHomeToolbarButtonStyle = (
  ButtonStyle: ButtonStyle
): DashboardSetMinimisedHomeToolbarButtonStyleAction => ({
  type: DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE,
  ButtonStyle,
});

export const DashboardCustomToolbarEdit = (
  customToolbar: CustomToolbar
): DashboardCustomToolbarEditAction => ({
  type: DASHBOARD_CUSTOM_TOOLBAR_EDIT,
  customToolbar,
});

export const DashboardSetActiveTab = (ActiveTab: number | null): DashboardSetActiveTabAction => ({
  type: DASHBOARD_SET_ACTIVE_TAB,
  ActiveTab,
});

export const DashboardSetIsCollapsed = (IsCollapsed: boolean): DashboardSetIsCollapsedAction => ({
  type: DASHBOARD_SET_IS_COLLAPSED,
  IsCollapsed,
});

export const DashboardSetIsFloating = (IsFloating: boolean): DashboardSetIsFloatingAction => ({
  type: DASHBOARD_SET_IS_FLOATING,
  IsFloating,
});

export const DashboardSetFloatingPosition = (
  FloatingPosition: DashboardFloatingPosition
): DashboardSetFloatingPositionAction => ({
  type: DASHBOARD_SET_FLOATING_POSITION,
  FloatingPosition,
});

export const DashboardSetTabs = (Tabs: DashboardTab[]): DashboardSetTabsAction => ({
  type: DASHBOARD_SET_TABS,
  Tabs,
});

export const DashboardCreateDefaultTab = (): DashboardCreateDefaultTabAction => ({
  type: DASHBOARD_CREATE_DEFAULT_TAB,
});

const initialDashboardState: DashboardState = {
  AvailableToolbars: [
    'AdvancedSearch',
    'Alert',
    'BulkUpdate',
    'CellSummary',
    'Chart',
    'ColumnFilter',
    'DataSource',
    'Export',
    'Glue42',
    'IPushPull',
    'Layout',
    'SmartEdit',
    'QuickSearch',
    'SystemStatus',
    'Theme',
  ],
  VisibleToolbars: ['QuickSearch', 'Layout', 'Export', 'ColumnFilter'],
  Tabs: null,
  ActiveTab: 0,
  IsCollapsed: false,
  IsFloating: false,
  FloatingPosition: { x: 100, y: 100 },
  VisibleButtons: ['SystemStatus', 'GridInfo', 'Dashboard', 'ColumnChooser', 'ConditionalStyle'],
  CustomToolbars: EMPTY_ARRAY,
  DashboardVisibility: Visibility.Visible,
  ShowFunctionsDropdown: true,
  ShowColumnsDropdown: true,
  ShowToolbarsDropdown: true,
  HomeToolbarTitle: '',
  MinimisedHomeToolbarButtonStyle: {
    Variant: 'outlined',
    Tone: 'neutral',
  },
};

export const DashboardReducer: Redux.Reducer<DashboardState> = (
  state: DashboardState = initialDashboardState,
  action: Redux.Action
): DashboardState => {
  let index: number;
  let dashboardControls: AdaptableDashboardToolbars | string[];

  const setToolbars = (
    state: DashboardState,
    toolbars: AdaptableDashboardToolbars | string[]
  ): DashboardState => {
    return { ...state, VisibleToolbars: toolbars };
  };

  switch (action.type) {
    case DASHBOARD_SET_AVAILABLE_TOOLBARS:
      return Object.assign({}, state, {
        AvailableToolbars: (action as DashboardSetAvailableToolbarsAction).toolbars,
      });
    case DASHBOARD_SET_TOOLBARS: {
      const actionTyped = action as DashboardSetToolbarsAction;
      const dashboardToolbars = actionTyped.toolbars;
      return setToolbars(state, dashboardToolbars);
    }
    case DASHBOARD_MOVE_ITEM: {
      const actionTyped = action as DashboardMoveItemAction;
      dashboardControls = [...state.VisibleToolbars!];
      index = dashboardControls.findIndex(a => a == actionTyped.toolbar);
      ArrayExtensions.moveArray(dashboardControls, index, actionTyped.NewIndex);
      return setToolbars(state, dashboardControls);
    }
    case DASHBOARD_SHOW_TOOLBAR: {
      const actionTyped = action as DashboardShowToolbarAction;
      const dashboardToolbars = [...state.VisibleToolbars!];
      dashboardToolbars.push(actionTyped.toolbar);
      return setToolbars(state, dashboardToolbars);
    }
    case DASHBOARD_HIDE_TOOLBAR: {
      const actionTyped = action as DashboardHideToolbarAction;
      const dashboardToolbars = (state.VisibleToolbars || []).filter(
        a => a !== actionTyped.toolbar
      );
      return setToolbars(state, dashboardToolbars);
    }

    case DASHBOARD_SET_FUNCTION_BUTTONS: {
      const actionTyped = action as DashboardSetFunctionButtonsAction;
      const dashboardFunctionButtons = actionTyped.functionButtons;
      return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
    }
    case DASHBOARD_SET_VISIBILITY: {
      const actionTyped = action as DashboardSetVisibilityAction;
      return Object.assign({}, state, { DashboardVisibility: actionTyped.Visibility });
    }

    case DASHBOARD_SHOW_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: true });
    }
    case DASHBOARD_HIDE_FUNCTIONS_DROPDOWN: {
      return Object.assign({}, state, { ShowFunctionsDropdown: false });
    }

    case DASHBOARD_SHOW_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: true });
    }
    case DASHBOARD_HIDE_COLUMNS_DROPDOWN: {
      return Object.assign({}, state, { ShowColumnsDropdown: false });
    }

    case DASHBOARD_SHOW_TOOLBARS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolbarsDropdown: true });
    }

    case DASHBOARD_HIDE_TOOLBARS_DROPDOWN: {
      return Object.assign({}, state, { ShowToolbarsDropdown: false });
    }

    case DASHBOARD_SET_HOME_TOOLBAR_TITLE: {
      const actionTyped = action as DashboardSetHomeToolbarTitleAction;
      return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
    }

    case DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE: {
      const actionTyped = action as DashboardSetMinimisedHomeToolbarButtonStyleAction;
      return Object.assign({}, state, {
        MinimisedHomeToolbarButtonStyle: actionTyped.ButtonStyle,
      });
    }

    case DASHBOARD_CUSTOM_TOOLBAR_EDIT: {
      const actionTyped = action as DashboardCustomToolbarEditAction;
      const actionCustomSort: CustomToolbar = actionTyped.customToolbar;
      let customToolbars: CustomToolbar[] = state.CustomToolbars.map(abObject =>
        abObject.Uuid === actionCustomSort.Uuid ? actionCustomSort : abObject
      );
      return Object.assign({}, state, {
        CustomToolbars: customToolbars,
      });
    }

    case DASHBOARD_SET_ACTIVE_TAB: {
      const { ActiveTab } = action as DashboardSetActiveTabAction;
      return { ...state, ActiveTab };
    }

    case DASHBOARD_SET_IS_COLLAPSED: {
      const { IsCollapsed } = action as DashboardSetIsCollapsedAction;
      return { ...state, IsCollapsed };
    }

    case DASHBOARD_SET_IS_FLOATING: {
      const { IsFloating } = action as DashboardSetIsFloatingAction;
      return { ...state, IsFloating };
    }

    case DASHBOARD_SET_FLOATING_POSITION: {
      const { FloatingPosition } = action as DashboardSetFloatingPositionAction;
      return { ...state, FloatingPosition };
    }

    case DASHBOARD_SET_TABS: {
      const { Tabs } = action as DashboardSetTabsAction;
      return { ...state, Tabs };
    }

    case DASHBOARD_CREATE_DEFAULT_TAB: {
      return {
        ...state,
        Tabs: [{ Name: 'Toolbars', Toolbars: state.VisibleToolbars }],
      };
    }

    default:
      return state;
  }
};
