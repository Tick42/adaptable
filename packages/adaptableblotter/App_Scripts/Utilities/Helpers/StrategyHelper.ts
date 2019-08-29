import * as StrategyConstants from '../Constants/StrategyConstants';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Entitlement } from '../../PredefinedConfig/DesignTimeState/EntitlementsState';

export function IsEditStrategy(strategyId: string): boolean {
  return strategyId != StrategyConstants.SmartEditStrategyId;
}
export function IsFilterStrategy(strategyId: string): boolean {
  return strategyId != StrategyConstants.SmartEditStrategyId;
}
export function IsSortStrategy(strategyId: string): boolean {
  return strategyId != StrategyConstants.SmartEditStrategyId;
}

export function getEntitlementAccessLevelForStrategy(
  entitlements: Entitlement[],
  strategyId: string
): AccessLevel {
  if (ArrayExtensions.IsNotNullOrEmpty(entitlements)) {
    let entitlement: Entitlement = entitlements.find(e => e.FunctionName == strategyId);
    if (entitlement) {
      return entitlement.AccessLevel as AccessLevel;
    }
  }
  return AccessLevel.Full;
}

export const StrategyHelper = {
  IsEditStrategy,
  IsFilterStrategy,
  IsSortStrategy,
  getEntitlementAccessLevelForStrategy,
};
export default StrategyHelper;
