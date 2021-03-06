import { EntitlementState, Entitlement } from '../../PredefinedConfig/EntitlementState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export const ENTITLEMENT_ADD = 'ENTITLEMENT_ADD';
export const ENTITLEMENT_UPDATE = 'ENTITLEMENT_UPDATE';
export const ENTITLEMENT_DELETE = 'ENTITLEMENT_DELETE';

export interface EntitlementAddAction extends Redux.Action {
  entitlement: Entitlement;
}

export interface EntitlementUpdateAction extends Redux.Action {
  entitlement: Entitlement;
}

export interface EntitlementDeleteAction extends Redux.Action {
  functionName: AdaptableFunctionName;
}

export const EntitlementAdd = (entitlement: Entitlement): EntitlementAddAction => ({
  type: ENTITLEMENT_ADD,
  entitlement,
});

export const EntitlementUpdate = (entitlement: Entitlement): EntitlementUpdateAction => ({
  type: ENTITLEMENT_UPDATE,
  entitlement,
});

export const EntitlementDelete = (
  functionName: AdaptableFunctionName
): EntitlementDeleteAction => ({
  type: ENTITLEMENT_DELETE,
  functionName,
});

const initialEntitlementState: EntitlementState = {
  FunctionEntitlements: EMPTY_ARRAY,
};

export const EntitlementsReducer: Redux.Reducer<EntitlementState> = (
  state: EntitlementState = initialEntitlementState,
  action: Redux.Action
): EntitlementState => {
  let index: number;
  let functionEntitlements: Entitlement[];

  switch (action.type) {
    case ENTITLEMENT_ADD:
      const actionTypedAdd = action as EntitlementAddAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      functionEntitlements.push(actionTypedAdd.entitlement);
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    case ENTITLEMENT_UPDATE:
      const actionTypedUpdate = action as EntitlementUpdateAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      index = functionEntitlements.findIndex(
        fe => fe.FunctionName == actionTypedUpdate.entitlement.FunctionName
      );
      functionEntitlements[index] = actionTypedUpdate.entitlement;
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    case ENTITLEMENT_DELETE:
      const actionTypedDelete = action as EntitlementDeleteAction;
      functionEntitlements = [].concat(state.FunctionEntitlements);
      index = functionEntitlements.findIndex(a => a.FunctionName == actionTypedDelete.functionName);
      functionEntitlements.splice(index, 1);
      return Object.assign({}, state, { FunctionEntitlements: functionEntitlements });
    default:
      return state;
  }
};
