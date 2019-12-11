import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/AdaptableBlotterMenuItem';

export class AdvancedSearchStrategy extends AdaptableStrategyBase
  implements IAdvancedSearchStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.AdvancedSearchStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.AdvancedSearchStrategyName,
      ComponentName: ScreenPopups.AdvancedSearchPopup,
      Icon: StrategyConstants.AdvancedSearchGlyph,
    });
  }
}
