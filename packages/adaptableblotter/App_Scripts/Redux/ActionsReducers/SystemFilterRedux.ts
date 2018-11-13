import { SystemFilterState } from './Interface/IState';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import * as Redux from 'redux'

export const SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';


export interface SystemFilterSetAction extends Redux.Action {
    SystemFilters: string[]
}


export const SystemFilterSet = (SystemFilters: string[]): SystemFilterSetAction => ({
    type: SYSTEM_FILTER_SET,
    SystemFilters
})



const initialFilterState:
    SystemFilterState = {
    SystemFilters: FilterHelper.GetAllSystemFilters(),
}

export const SystemFilterReducer: Redux.Reducer<SystemFilterState> = (state: SystemFilterState = initialFilterState, action: Redux.Action): SystemFilterState => {

    switch (action.type) {

        case SYSTEM_FILTER_SET:
            return Object.assign({}, state, { SystemFilters: (<SystemFilterSetAction>action).SystemFilters })

        default:
            return state
    }
}

