import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';

export class AboutStrategy extends AdaptableStrategyBase implements IStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AboutStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.AboutStrategyName, ScreenPopups.AboutPopup, StrategyIds.AboutGlyph);
    }
   
}