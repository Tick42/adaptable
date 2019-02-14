"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
exports.GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
exports.GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
exports.GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
exports.GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
exports.GRID_SET_SORT = 'GRID_SET_SORT';
exports.GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
exports.GRID_CREATE_CELLS_SUMMARY = 'GRID_CREATE_CELLS_SUMMARY';
exports.GRID_SET_CELLS_SUMMARY = 'GRID_SET_CELLS_SUMMARY';
exports.GRID_FLOATING_FILTER_BAR_SHOW = 'GRID_FLOATING_FILTER_BAR_SHOW';
exports.GRID_FLOATING_FILTER_BAR_HIDE = 'GRID_FLOATING_FILTER_BAR_HIDE';
exports.GridSetColumns = (Columns) => ({
    type: exports.GRID_SET_COLUMNS,
    Columns
});
exports.GridAddColumn = (Column) => ({
    type: exports.GRID_ADD_COLUMN,
    Column
});
exports.GridHideColumn = (ColumnId) => ({
    type: exports.GRID_HIDE_COLUMN,
    ColumnId
});
exports.GridSetValueLikeEdit = (CellInfo, OldValue) => ({
    type: exports.GRID_SET_VALUE_LIKE_EDIT,
    CellInfo,
    OldValue
});
exports.GridSelectColumn = (ColumnId) => ({
    type: exports.GRID_SELECT_COLUMN,
    ColumnId
});
exports.GridSetSort = (GridSorts) => ({
    type: exports.GRID_SET_SORT,
    GridSorts
});
exports.GridSetSelectedCells = (SelectedCellInfo) => ({
    type: exports.GRID_SET_SELECTED_CELLS,
    SelectedCellInfo
});
exports.GridCreateCellSummary = () => ({
    type: exports.GRID_CREATE_CELLS_SUMMARY
});
exports.GridSetCellSummary = (CellSummary) => ({
    type: exports.GRID_SET_CELLS_SUMMARY,
    CellSummary
});
exports.FloatingilterBarShow = () => ({
    type: exports.GRID_FLOATING_FILTER_BAR_SHOW
});
exports.FloatingFilterBarHide = () => ({
    type: exports.GRID_FLOATING_FILTER_BAR_HIDE
});
const initialGridState = {
    Columns: GeneralConstants_1.EMPTY_ARRAY,
    GridSorts: GeneralConstants_1.EMPTY_ARRAY,
    SelectedCellInfo: null,
    CellSummary: null,
    IsFloatingFilterActive: false
};
exports.GridReducer = (state = initialGridState, action) => {
    switch (action.type) {
        case exports.GRID_SET_COLUMNS:
            return Object.assign({}, state, { Columns: [].concat(action.Columns) });
        case exports.GRID_ADD_COLUMN:
            let actionTypedAddUpdate = action;
            let columns = [].concat(state.Columns);
            columns.push(actionTypedAddUpdate.Column);
            return Object.assign({}, state, { Columns: columns });
        case exports.GRID_SET_SORT:
            return Object.assign({}, state, { GridSorts: action.GridSorts });
        case exports.GRID_SET_SELECTED_CELLS:
            return Object.assign({}, state, { SelectedCellInfo: action.SelectedCellInfo });
        case exports.GRID_SET_CELLS_SUMMARY:
            return Object.assign({}, state, { CellSummary: action.CellSummary });
        case exports.GRID_FLOATING_FILTER_BAR_SHOW:
            return Object.assign({}, state, { IsFloatingFilterActive: true });
        case exports.GRID_FLOATING_FILTER_BAR_HIDE:
            return Object.assign({}, state, { IsFloatingFilterActive: false });
        default:
            return state;
    }
};
