"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
class FreeTextColumnService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    GetFreeTextValue(freeTextColumn, record) {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
                let pkValue = this.blotter.getPrimaryKeyValueFromRecord(record);
                let freeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(fdx => fdx.PrimaryKey == pkValue);
                if (freeTextStoredValue) {
                    return freeTextStoredValue.FreeText;
                }
            }
            return freeTextColumn.DefaultValue;
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogError(e);
            return null;
        }
    }
    CheckIfDataChangingColumnIsFreeText(dataChangedEvent) {
        let freeTextColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn.FreeTextColumns.find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
        if (freeTextColumn) {
            let freeTextStoredValue = { PrimaryKey: dataChangedEvent.IdentifierValue, FreeText: dataChangedEvent.NewValue };
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, freeTextStoredValue));
        }
    }
    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents) {
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn.FreeTextColumns)) {
            dataChangedEvents.forEach(dc => {
                this.CheckIfDataChangingColumnIsFreeText(dc);
            });
        }
    }
}
exports.FreeTextColumnService = FreeTextColumnService;