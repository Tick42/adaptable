"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlotterApiBase_1 = require("../App_Scripts/Api/BlotterApiBase");
class BlotterApi extends BlotterApiBase_1.BlotterApiBase {
    constructor(blotter) {
        super(blotter);
        this.blotter = blotter;
    }
    setGridData(dataSource) {
        let theBlotter = this.blotter;
        theBlotter.setData(dataSource);
    }
}
exports.BlotterApi = BlotterApi;
