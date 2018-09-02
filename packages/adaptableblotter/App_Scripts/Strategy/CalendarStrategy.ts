import { ICalendarStrategy } from './Interface/ICalendarStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
         }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyGlyphs.CalendarGlyph);
    }
   
}