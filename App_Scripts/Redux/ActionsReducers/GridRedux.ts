import * as Redux from 'redux';
import { GridState } from './Interface/IState'
import { ICellInfo, IGridSort } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotterOptions';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
export const GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
export const GRID_SET_SORT = 'GRID_SET_SORT';
export const GRID_SET_BLOTTER_OPTIONS = 'GRID_SET_BLOTTER_OPTIONS';
export const GRID_SET_BLOTTER_RESTRICTIONS = 'GRID_SET_BLOTTER_RESTRICTIONS';


export interface GridSetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}
export interface GridHideColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface GridSetValueLikeEditAction extends Redux.Action {
    CellInfo: ICellInfo,
    OldValue: any,
}

export interface GridSelectColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface GridSetSortAction extends Redux.Action {
    GridSorts: IGridSort[];
}

export interface GridSetBlotterOptionsAction extends Redux.Action {
    BlotterOptions: IAdaptableBlotterOptions;
}

export interface GridSetBlotterRestrictionsAction extends Redux.Action {
    BlotterRestrictions: string[];
}


export const GridSetColumns = (Columns: IColumn[]): GridSetColumnsAction => ({
    type: GRID_SET_COLUMNS,
    Columns
})

export const GridHideColumn = (ColumnId: string): GridHideColumnAction => ({
    type: GRID_HIDE_COLUMN,
    ColumnId
})

export const GridSetValueLikeEdit = (CellInfo: ICellInfo, OldValue: any): GridSetValueLikeEditAction => ({
    type: GRID_SET_VALUE_LIKE_EDIT,
    CellInfo,
    OldValue
})

export const GridSelectColumn = (ColumnId: string): GridSelectColumnAction => ({
    type: GRID_SELECT_COLUMN,
    ColumnId
})

export const GridSetSort = (GridSorts: IGridSort[]): GridSetSortAction => ({
    type: GRID_SET_SORT,
    GridSorts
})

export const GridSetBlotterOptions = (BlotterOptions: IAdaptableBlotterOptions): GridSetBlotterOptionsAction => ({
    type: GRID_SET_BLOTTER_OPTIONS,
    BlotterOptions
})

export const GridSetBlotterRestrictions = (BlotterRestrictions: string[]): GridSetBlotterRestrictionsAction => ({
    type: GRID_SET_BLOTTER_RESTRICTIONS,
    BlotterRestrictions
})

const initialGridState: GridState = {
    Columns: [],
    GridSorts: [],
    BlotterOptions: null,
    BlotterRestrictions: []
}

export const GridReducer: Redux.Reducer<GridState> = (state: GridState = initialGridState, action: Redux.Action): GridState => {
    switch (action.type) {
        case GRID_SET_COLUMNS:
            return Object.assign({}, state, { Columns: [].concat((<GridSetColumnsAction>action).Columns) })
        case GRID_SET_SORT:
            return Object.assign({}, state, { GridSorts: (<GridSetSortAction>action).GridSorts })
        case GRID_SET_BLOTTER_OPTIONS:
            let actionTypedOptions = <GridSetBlotterOptionsAction>action;
            let blotterOptions = actionTypedOptions.BlotterOptions
            return Object.assign({}, state, { BlotterOptions: blotterOptions })
        case GRID_SET_BLOTTER_RESTRICTIONS:
            let actionTypedRestrictions = <GridSetBlotterRestrictionsAction>action;
            let blotterRestrictions = actionTypedRestrictions.BlotterRestrictions
            return Object.assign({}, state, { BlotterRestrictions: blotterRestrictions })
        default:
            return state
    }
}