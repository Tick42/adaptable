import { SmartEditState } from '../../PredefinedConfig/SmartEditState';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import {
  SMART_EDIT_DEFAULT_OPERATION,
  SMART_EDIT_DEFAULT_VALUE,
} from '../../Utilities/Constants/GeneralConstants';

export const SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
export const SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
export const SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';

export interface SmartEditApplyAction extends Redux.Action {
  bypassCellValidationWarnings: boolean;
}

export interface SmartEditChangeValueAction extends Redux.Action {
  value: number;
}

export interface SmartEditChangeOperationAction extends Redux.Action {
  MathOperation: MathOperation;
}

export const SmartEditApply = (bypassCellValidationWarnings: boolean): SmartEditApplyAction => ({
  type: SMARTEDIT_APPLY,
  bypassCellValidationWarnings,
});

export const SmartEditChangeValue = (value: number): SmartEditChangeValueAction => ({
  type: SMARTEDIT_CHANGE_VALUE,
  value,
});

export const SmartEditChangeOperation = (
  MathOperation: MathOperation
): SmartEditChangeOperationAction => ({
  type: SMARTEDIT_CHANGE_OPERATION,
  MathOperation,
});

const initialSmartEditState: SmartEditState = {
  SmartEditValue: SMART_EDIT_DEFAULT_VALUE,
  MathOperation: SMART_EDIT_DEFAULT_OPERATION,
};

export const SmartEditReducer: Redux.Reducer<SmartEditState> = (
  state: SmartEditState = initialSmartEditState,
  action: Redux.Action
): SmartEditState => {
  switch (action.type) {
    case SMARTEDIT_CHANGE_VALUE:
      return Object.assign({}, state, {
        SmartEditValue: (action as SmartEditChangeValueAction).value,
      });
    case SMARTEDIT_CHANGE_OPERATION:
      return Object.assign({}, state, {
        MathOperation: (action as SmartEditChangeOperationAction).MathOperation,
      });
    default:
      return state;
  }
};
