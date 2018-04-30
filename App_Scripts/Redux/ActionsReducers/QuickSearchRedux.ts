import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, DisplayAction } from '../../Core/Enums';
import * as Redux from 'redux'
import { IStyle } from '../../Core/Api/Interface/AdaptableBlotterObjects';

export const QUICK_SEARCH_APPLY = 'QUICK_SEARCH_APPLY';
export const QUICK_SEARCH_SET_OPERATOR = 'QUICK_SEARCH_SET_OPERATOR';
export const QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
export const QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';
export const QUICK_SEARCH_DEFAULT_BACK_COLOR = '#FFFFCC';
export const QUICK_SEARCH_DEFAULT_FORE_COLOR = '#000000';


export interface QuickSearchApplyAction extends Redux.Action {
    quickSearchText: string
}

export interface QuickSearchClearAction extends Redux.Action {
}

export interface QuickSearchSetSearchOperatorAction extends Redux.Action {
    quickSearchOperator: LeafExpressionOperator
}

export interface QuickSearchSetSearchDisplayAction extends Redux.Action {
    DisplayAction: DisplayAction
}

export interface QuickSearchSetStyleAction extends Redux.Action {
    style: IStyle
}

export const QuickSearchApply = (quickSearchText: string): QuickSearchApplyAction => ({
    type: QUICK_SEARCH_APPLY,
    quickSearchText
})

export const QuickSearchSetOperator = (quickSearchOperator: LeafExpressionOperator): QuickSearchSetSearchOperatorAction => ({
    type: QUICK_SEARCH_SET_OPERATOR,
    quickSearchOperator
})

export const QuickSearchSetDisplay = (DisplayAction: DisplayAction): QuickSearchSetSearchDisplayAction => ({
    type: QUICK_SEARCH_SET_DISPLAY,
    DisplayAction
})

export const QuickSearchSetStyle = (style: IStyle): QuickSearchSetStyleAction => ({
    type: QUICK_SEARCH_SET_STYLE,
    style
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: "",
    Operator: LeafExpressionOperator.Contains,
    DisplayAction: DisplayAction.HighlightCell,
    Style:
    {
        BackColor: QUICK_SEARCH_DEFAULT_BACK_COLOR, 
        ForeColor: QUICK_SEARCH_DEFAULT_FORE_COLOR,
        //ClassName: "styleBackBlue"
    }
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_APPLY:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchApplyAction>action).quickSearchText })
        case QUICK_SEARCH_SET_OPERATOR:
            return Object.assign({}, state, { QuickSearchOperator: (<QuickSearchSetSearchOperatorAction>action).quickSearchOperator })
        case QUICK_SEARCH_SET_DISPLAY:
            return Object.assign({}, state, { DisplayAction: (<QuickSearchSetSearchDisplayAction>action).DisplayAction })
        case QUICK_SEARCH_SET_STYLE:
            return Object.assign({}, state, { QuickSearchStyle: (<QuickSearchSetStyleAction>action).style })
        default:
            return state
    }
}