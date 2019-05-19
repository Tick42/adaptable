import { CalculatedColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { ICalculatedColumn } from '../../Utilities/Interface/BlotterObjects/ICalculatedColumn';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
export const CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
export const CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';

export interface CalculatedColumnAddAction extends Redux.Action {
  calculatedColumn: ICalculatedColumn;
}

export interface CalculatedColumnEditAction extends Redux.Action {
  index: number;
  calculatedColumn: ICalculatedColumn;
}

export interface CalculatedColumnDeleteAction extends Redux.Action {
  index: number;
  calculatedColumn: ICalculatedColumn;
}

export const CalculatedColumnAdd = (
  calculatedColumn: ICalculatedColumn
): CalculatedColumnAddAction => ({
  type: CALCULATEDCOLUMN_ADD,
  calculatedColumn,
});

export const CalculatedColumnEdit = (
  index: number,
  calculatedColumn: ICalculatedColumn
): CalculatedColumnEditAction => ({
  type: CALCULATEDCOLUMN_EDIT,
  index,
  calculatedColumn,
});

export const CalculatedColumnDelete = (
  index: number,
  calculatedColumn: ICalculatedColumn
): CalculatedColumnDeleteAction => ({
  type: CALCULATEDCOLUMN_DELETE,
  index,
  calculatedColumn,
});

const initialCalculatedColumnState: CalculatedColumnState = {
  CalculatedColumns: EMPTY_ARRAY,
};

export const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState> = (
  state: CalculatedColumnState = initialCalculatedColumnState,
  action: Redux.Action
): CalculatedColumnState => {
  switch (action.type) {
    case CALCULATEDCOLUMN_ADD: {
      let items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);

      items.push((<CalculatedColumnAddAction>action).calculatedColumn);
      return Object.assign({}, state, {
        CalculatedColumns: items,
      });
    }
    case CALCULATEDCOLUMN_EDIT: {
      let items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);
      let index = (<CalculatedColumnEditAction>action).index;
      items[index] = (<CalculatedColumnEditAction>action).calculatedColumn;

      return Object.assign({}, state, {
        CalculatedColumns: items,
      });
    }
    case CALCULATEDCOLUMN_DELETE:
      var items: Array<ICalculatedColumn> = [].concat(state.CalculatedColumns);
      let index = (<CalculatedColumnDeleteAction>action).index;
      items.splice(index, 1);
      return Object.assign({}, state, {
        CalculatedColumns: items,
      });
    default:
      return state;
  }
};
