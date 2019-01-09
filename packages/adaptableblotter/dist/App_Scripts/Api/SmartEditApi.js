"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartEditRedux = require("../Redux/ActionsReducers/SmartEditRedux");
const ApiBase_1 = require("./ApiBase");
class SmartEditApi extends ApiBase_1.ApiBase {
    SetMathOperation(mathOperation) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation));
    }
    GetMathOperation() {
        return this.getState().SmartEdit.MathOperation;
    }
    SetValue(smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    }
    GetValue() {
        return this.getState().SmartEdit.SmartEditValue;
    }
}
exports.SmartEditApi = SmartEditApi;