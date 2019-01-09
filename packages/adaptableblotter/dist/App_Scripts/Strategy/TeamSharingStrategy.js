"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const BlotterHelper_1 = require("../Utilities/Helpers/BlotterHelper");
class TeamSharingStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.TeamSharingStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyConstants.TeamSharingGlyph);
    }
    hasPopupMenu() {
        return BlotterHelper_1.BlotterHelper.IsConfigServerEnabled(this.blotter.BlotterOptions);
    }
    InitState() {
        //nothing 
    }
}
exports.TeamSharingStrategy = TeamSharingStrategy;