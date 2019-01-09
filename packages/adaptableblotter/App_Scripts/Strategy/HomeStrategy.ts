import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants'
import * as HomeRedux from '../Redux/ActionsReducers/HomeRedux'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter'
import { IHomeStrategy } from './Interface/IHomeStrategy'
import { GridState } from '../Redux/ActionsReducers/Interface/IState';
import { IGridSort } from '../Api/Interface/IAdaptableBlotterObjects';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { SearchChangedTrigger } from '../Utilities/Enums';
import { LayoutHelper } from '../Utilities/Helpers/LayoutHelper';
import { IColumn } from '../Api/Interface/IColumn';

// This is a special strategy that the user can never remove but which is useful to us 
// We use it to manage internal state changes and menu items that are not directly strategy related
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    private GridSorts: IGridSort[]
    private GridState: GridState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.HomeStrategyId, blotter)
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter, "floatingfilter")) {
            let isFilterActive: boolean = this.blotter.isFloatingFilterActive();
            this.createContextMenuItemReduxAction(
                isFilterActive ? "Hide Floating Filter Bar" : "Show Floating Filter Bar",
                isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
                isFilterActive ? HomeRedux.QuickFilterBarHide() : HomeRedux.QuickFilterBarShow())
        }
    }


    protected InitState() {
        if (!ArrayExtensions.areArraysEqualWithOrderandProperties(this.GridSorts, this.GetGridState().GridSorts)) {
            this.GridSorts = this.GetGridState().GridSorts

            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == "AllSearchandSort") {
                this.publishSearchChanged(SearchChangedTrigger.Sort)
            }
        }

        if (this.GridState != this.GetGridState()) {
            if (this.GridState != null && this.GridState.Columns != null && this.GridState.GridSorts != null) {

                if (this.GridState.Columns != this.GetGridState().Columns || this.GridState.GridSorts != this.GetGridState().GridSorts) {
                    this.GridState = this.GetGridState();
                    LayoutHelper.autoSaveLayout(this.blotter);
                }
            }
            this.GridState = this.GetGridState();
        }
    }


    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }

}