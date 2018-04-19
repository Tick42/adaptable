import { IUserFilterStrategy } from '../Strategy/Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters: UserFilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserFilterStrategyId, blotter)
      }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.UserFilterStrategyName, ScreenPopups.UserFilterPopupPopup, StrategyGlyphs.UserFilterGlyph);
    }

    protected addColumnMenuItem(columnId: string): void {
            this.createMenuItemColumnMenu(
                "Create User Filter",
                ScreenPopups.UserFilterPopupPopup,
                StrategyGlyphs.UserFilterGlyph,
                "New|" + columnId)
        
    }

    protected InitState() {
        if (this.userFilters != this.GetFilterState()) {
            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            this.userFilters = this.GetFilterState();
        }
    }

    private GetFilterState(): UserFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().UserFilter;
    }
}


