"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchStrategy_1 = require("./QuickSearchStrategy");
class QuickSearchStrategyagGrid extends QuickSearchStrategy_1.QuickSearchStrategy {
    constructor(blotter) {
        super(blotter);
    }
    postSearch() {
        let theBlotter = this.blotter;
        if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            theBlotter.redrawRows();
        }
    }
}
exports.QuickSearchStrategyagGrid = QuickSearchStrategyagGrid;