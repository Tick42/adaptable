"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class ConditionalStyleStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
        this.blotter.onGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyGlyphs.ConditionalStyleGlyph);
    }
    InitState() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;
            this.InitStyles();
        }
    }
    addContextMenuItem(columnId) {
        this.createContextMenuItemShowPopup("Create " + StrategyNames.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyGlyphs.ConditionalStyleGlyph, "New|" + columnId);
    }
    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    handleGridDataBound(blotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            this.InitStyles();
        }
    }
}
exports.ConditionalStyleStrategy = ConditionalStyleStrategy;