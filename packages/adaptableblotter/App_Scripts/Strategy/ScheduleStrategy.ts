import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IScheduleStrategy } from './Interface/IScheduleStrategy'
import { ScheduleState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ScheduleStrategy extends AdaptableStrategyBase implements IScheduleStrategy {
    protected ScheduleState: ScheduleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ScheduleStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ScheduleStrategyName, ScreenPopups.SchedulePopup, StrategyConstants.ScheduleGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            // to do
        }
    }

    protected InitState() {
        if (this.ScheduleState != this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule) {
          
            // just clear all jobs and recreate - simplest thing to do...
            this.blotter.ScheduleService.ClearAllJobs();

          this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule.Schedules.forEach(s => {
            this.blotter.ScheduleService.AddSchedule(s);
        })
            this.ScheduleState = this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Schedule, this.ScheduleState)
            }
        }
    }


}