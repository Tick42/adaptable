"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const BlotterHelper_1 = require("../Utilities/Helpers/BlotterHelper");
class DataManagementStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.DataManagementStrategyId, blotter);
    }
    addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV && !BlotterHelper_1.BlotterHelper.isDemoSite()) {
            return;
        }
        this.createMenuItemShowPopup(StrategyConstants.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyConstants.DataManagementGlyph);
    }
}
exports.DataManagementStrategy = DataManagementStrategy;
