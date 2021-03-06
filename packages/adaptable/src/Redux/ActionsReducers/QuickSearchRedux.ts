import * as Redux from 'redux';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
import { DisplayAction } from '../../PredefinedConfig/Common/Enums';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import {
  QUICK_SEARCH_DEFAULT_BACK_COLOR,
  QUICK_SEARCH_DEFAULT_FORE_COLOR,
  EMPTY_STRING,
  QUICK_SEARCH_DEFAULT_DISPLAY_ACTION,
} from '../../Utilities/Constants/GeneralConstants';

export const QUICK_SEARCH_APPLY = 'QUICK_SEARCH_APPLY';
export const QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
export const QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';

export interface QuickSearchApplyAction extends Redux.Action {
  quickSearchText: string;
}

export interface QuickSearchClearAction extends Redux.Action {}

export interface QuickSearchSetDisplayAction extends Redux.Action {
  DisplayAction: DisplayAction;
}

export interface QuickSearchSetStyleAction extends Redux.Action {
  style: AdaptableStyle;
}

export const QuickSearchApply = (quickSearchText: string): QuickSearchApplyAction => ({
  type: QUICK_SEARCH_APPLY,
  quickSearchText,
});

export const QuickSearchSetDisplay = (
  DisplayAction: DisplayAction
): QuickSearchSetDisplayAction => ({
  type: QUICK_SEARCH_SET_DISPLAY,
  DisplayAction,
});

export const QuickSearchSetStyle = (style: AdaptableStyle): QuickSearchSetStyleAction => ({
  type: QUICK_SEARCH_SET_STYLE,
  style,
});

const initialQuickSearchState: QuickSearchState = {
  QuickSearchText: EMPTY_STRING,
  DisplayAction: QUICK_SEARCH_DEFAULT_DISPLAY_ACTION,
  Style: {
    BackColor: QUICK_SEARCH_DEFAULT_BACK_COLOR,
    ForeColor: QUICK_SEARCH_DEFAULT_FORE_COLOR,
  },
};

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (
  state: QuickSearchState = initialQuickSearchState,
  action: Redux.Action
): QuickSearchState => {
  switch (action.type) {
    case QUICK_SEARCH_APPLY:
      return Object.assign({}, state, {
        QuickSearchText: (action as QuickSearchApplyAction).quickSearchText,
      });
    case QUICK_SEARCH_SET_DISPLAY:
      return Object.assign({}, state, {
        DisplayAction: (action as QuickSearchSetDisplayAction).DisplayAction,
      });
    case QUICK_SEARCH_SET_STYLE:
      return Object.assign({}, state, { Style: (action as QuickSearchSetStyleAction).style });
    default:
      return state;
  }
};
