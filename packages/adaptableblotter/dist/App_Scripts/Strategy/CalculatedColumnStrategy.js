"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class CalculatedColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CalculatedColumnStrategyId, blotter);
    }
    InitState() {
        if (this.CalculatedColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyIds.CalculatedColumnGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            if (this.CalculatedColumns.find(cc => cc.ColumnId == columnId)) {
                this.createContextMenuItemShowPopup("Edit " + StrategyIds.CalculatedColumnStrategyName, ScreenPopups.CalculatedColumnPopup, StrategyIds.CalculatedColumnGlyph, "Edit|" + columnId);
            }
        }
    }
}
exports.CalculatedColumnStrategy = CalculatedColumnStrategy;