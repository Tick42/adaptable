import { ICalendarStrategy, ICalendar, ICalendarEntry } from './Interface/ICalendarStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class CalendarStrategy extends AdaptableStrategyBase implements ICalendarStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalendarStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyGlyphs.CalendarGlyph);
    }
   
}