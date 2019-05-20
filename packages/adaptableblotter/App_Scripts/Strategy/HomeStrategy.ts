import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as GlyphConstants from '../Utilities/Constants/GlyphConstants';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
import { GridState } from '../Redux/ActionsReducers/Interface/IState';
import { IGridSort } from '../Utilities/Interface/IGridSort';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { SearchChangedTrigger } from '../Utilities/Enums';
import { LayoutHelper } from '../Utilities/Helpers/LayoutHelper';
import { IColumn } from '../Utilities/Interface/IColumn';

// This is a special strategy that the user can never remove but which is useful to us
// We use it to manage internal state changes and menu items that are not directly strategy related
export class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
  private GridSorts: IGridSort[];
  private GridState: GridState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.HomeStrategyId, blotter);
    this.blotter.onGridReloaded().Subscribe(() => this.handleGridReloaded());
  }

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      this.createContextMenuItemReduxAction(
        'Hide Column',
        StrategyConstants.ColumnChooserGlyph,
        GridRedux.GridHideColumn(column.ColumnId)
      );
    }

    if (this.canCreateContextMenuItem(column, this.blotter, 'floatingfilter')) {
      let isFilterActive: boolean = this.GridState.IsFloatingFilterActive;
      this.createContextMenuItemReduxAction(
        isFilterActive ? 'Hide Floating Filter Bar' : 'Show Floating Filter Bar',
        isFilterActive ? GlyphConstants.OK_GLYPH : GlyphConstants.REMOVE_GLYPH,
        isFilterActive ? GridRedux.FloatingFilterBarHide() : GridRedux.FloatingilterBarShow()
      );
    }

    if (this.blotter.isSelectable()) {
      if (this.canCreateContextMenuItem(column, this.blotter)) {
        this.createContextMenuItemReduxAction(
          'Select Column',
          'compressed',
          GridRedux.GridSelectColumn(column.ColumnId)
        );
      }
    }
  }

  protected InitState() {
    if (
      !ArrayExtensions.areArraysEqualWithOrderandProperties(
        this.GridSorts,
        this.GetGridState().GridSorts
      )
    ) {
      this.GridSorts = this.GetGridState().GridSorts;

      if (this.blotter.blotterOptions.generalOptions.serverSearchOption == 'AllSearchandSort') {
        this.publishSearchChanged(SearchChangedTrigger.Sort);
      }
    }

    if (this.GridState != this.GetGridState()) {
      if (
        this.GridState != null &&
        this.GridState.Columns != null &&
        this.GridState.GridSorts != null
      ) {
        if (
          this.GridState.Columns != this.GetGridState().Columns ||
          this.GridState.GridSorts != this.GetGridState().GridSorts
        ) {
          this.GridState = this.GetGridState();
          LayoutHelper.autoSaveLayout(this.blotter);
        }
      }
      this.GridState = this.GetGridState();
    }
  }

  // useful for when grid reloads (e.g. at midnight);
  private handleGridReloaded(): void {
    this.blotter.applyGridFiltering();
  }

  private GetGridState(): GridState {
    return this.blotter.api.gridApi.getGridState();
  }
}
