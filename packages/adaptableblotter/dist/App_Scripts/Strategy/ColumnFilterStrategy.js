"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
const Enums_1 = require("../Core/Enums");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class ColumnFilterStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstantsColumnFilterStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstantsColumnFilterStrategyName, ScreenPopups.ColumnFilterPopup, StrategyConstantsColumnFilterGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter, "filter")) {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column) {
                let existingColumnFilter = this.columnFilterState.find(x => x.ColumnId == columnId);
                if (existingColumnFilter) {
                    this.createContextMenuItemReduxAction("Clear Column Filter", StrategyConstantsColumnFilterGlyph, ColumnFilterRedux.ColumnFilterClear(columnId));
                }
            }
        }
    }
    InitState() {
        if (this.columnFilterState != this.GetColumnFilterState()) {
            this.columnFilterState = this.GetColumnFilterState();
            setTimeout(() => this.blotter.applyGridFiltering(), 5);
            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(Enums_1.SearchChangedTrigger.ColumnFilter);
            }
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.ColumnFilter, this.columnFilterState);
            }
        }
    }
    GetColumnFilterState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters;
    }
}
exports.ColumnFilterStrategy = ColumnFilterStrategy;
