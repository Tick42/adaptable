import * as Redux from 'redux';
import { ChartState } from './Interface/IState'
import { IChartDefinition, ICategoryChartProperties, IChartProperties } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { EMPTY_ARRAY, EMPTY_STRING, CHART_DEFAULT_SHOW_MODAL, CHART_DEFAULT_REFRESH_RATE } from '../../Utilities/Constants/GeneralConstants';

export const CHART_DEFINITION_ADD_UPDATE = 'CHART_DEFINITION_ADD_UPDATE';
export const CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';
export const CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
export const CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
export const CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';

export interface ChartDefinitionAddUpdateAction extends Redux.Action {
    Index: number
    ChartDefinition: IChartDefinition
}

export interface ChartPropertiesUpdateAction extends Redux.Action {
    ChartTitle: string
    ChartProperties: IChartProperties
}


export interface ChartDefinitionDeleteAction extends Redux.Action {
    ChartDefinition: IChartDefinition
}

export interface ChartDefinitionSelectAction extends Redux.Action {
    CurrentChartDefinition: string
}

export const ChartDefinitionAddUpdate = (Index: number, ChartDefinition: IChartDefinition): ChartDefinitionAddUpdateAction => ({
    type: CHART_DEFINITION_ADD_UPDATE,
    Index,
    ChartDefinition
})

export const ChartPropertiesUpdate = (ChartTitle: string, ChartProperties: IChartProperties): ChartPropertiesUpdateAction => ({
    type: CHART_PROPERTIES_UPDATE,
    ChartTitle,
    ChartProperties
})


export const ChartDefinitionDelete = (ChartDefinition: IChartDefinition): ChartDefinitionDeleteAction => ({
    type: CHART_DEFINITION_DELETE,
    ChartDefinition
})



export const ChartDefinitionSelect = (CurrentChartDefinition: string): ChartDefinitionSelectAction => ({
    type: CHART_DEFINITION_SELECT,
    CurrentChartDefinition
})

const initialChartState: ChartState = {
    ChartDefinitions: EMPTY_ARRAY,
    CurrentChartDefinition: EMPTY_STRING,
    ShowModal: CHART_DEFAULT_SHOW_MODAL,
    RefreshRate: CHART_DEFAULT_REFRESH_RATE
}

export const ChartReducer: Redux.Reducer<ChartState> = (state: ChartState = initialChartState, action: Redux.Action): ChartState => {
    let chartDefinitions: IChartDefinition[]

    switch (action.type) {

        case CHART_DEFINITION_ADD_UPDATE:
            let actionTypedAddUpdate = (<ChartDefinitionAddUpdateAction>action)
            chartDefinitions = [].concat(state.ChartDefinitions)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                chartDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.ChartDefinition
            } else {
                chartDefinitions.push(actionTypedAddUpdate.ChartDefinition)
            }
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions })

        case CHART_PROPERTIES_UPDATE:
            let actionTypedPropertiesUpdate = (<ChartPropertiesUpdateAction>action)
            chartDefinitions = [].concat(state.ChartDefinitions)
            let chartDefinition: IChartDefinition = chartDefinitions.find(c => c.Title == actionTypedPropertiesUpdate.ChartTitle)
            chartDefinition.ChartProperties = actionTypedPropertiesUpdate.ChartProperties;
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions })

        case CHART_DEFINITION_DELETE:
            chartDefinitions = [].concat(state.ChartDefinitions);
            let index = chartDefinitions.findIndex(x => x.Title == (<ChartDefinitionDeleteAction>action).ChartDefinition.Title)
            chartDefinitions.splice(index, 1);
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });

        case CHART_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartDefinition: (<ChartDefinitionSelectAction>action).CurrentChartDefinition })

        default:
            return state
    }
}