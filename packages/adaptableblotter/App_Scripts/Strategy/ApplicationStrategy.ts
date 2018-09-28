import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ApplicationStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ApplicationStrategyName, ScreenPopups.ApplicationPopup, StrategyIds.ApplicationGlyph);
    }

    
}