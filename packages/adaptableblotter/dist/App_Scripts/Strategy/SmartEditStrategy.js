"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
const PreviewHelper_1 = require("../Utilities/Helpers/PreviewHelper");
class SmartEditStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.SmartEditStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.SmartEditStrategyName, ScreenPopups.SmartEditPopup, StrategyConstants.SmartEditGlyph);
    }
    InitState() {
        if (this.SmartEditState != this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit) {
            this.SmartEditState = this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.SmartEdit, this.SmartEditState);
            }
        }
    }
    ApplySmartEdit(newValues) {
        this.blotter.setValueBatch(newValues);
    }
    CheckCorrectCellSelection() {
        let selectedCellInfo = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "No cells are selected.\nPlease select some cells.",
                    MessageType: Enums_1.MessageType.Error
                }
            };
        }
        if (selectedCellInfo.Columns.length != 1) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit only supports single column edit.\nPlease adjust cell selection.",
                    MessageType: Enums_1.MessageType.Error
                }
            };
        }
        if (selectedCellInfo.Columns[0].DataType != Enums_1.DataType.Number) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection.",
                    MessageType: Enums_1.MessageType.Error
                }
            };
        }
        if (selectedCellInfo.Columns[0].ReadOnly) {
            return {
                Alert: {
                    Header: "Smart Edit Error",
                    Msg: "Smart Edit is not allowed on readonly columns.\nPlease adjust the cell selection.",
                    MessageType: Enums_1.MessageType.Error
                }
            };
        }
        return { ActionReturn: true };
    }
    BuildPreviewValues(smartEditValue, smartEditOperation) {
        let selectedCells = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        let previewResults = [];
        let columnId = selectedCells.Columns[0].ColumnId;
        for (let pair of selectedCells.Selection) {
            for (var selectedCell of pair[1]) {
                let newValue;
                switch (smartEditOperation) {
                    case Enums_1.MathOperation.Add:
                        newValue = Number(selectedCell.value) + smartEditValue;
                        break;
                    case Enums_1.MathOperation.Subtract:
                        newValue = Number(selectedCell.value) - smartEditValue;
                        break;
                    case Enums_1.MathOperation.Multiply:
                        newValue = Number(selectedCell.value) * smartEditValue;
                        break;
                    case Enums_1.MathOperation.Divide:
                        newValue = Number(selectedCell.value) / smartEditValue;
                        break;
                }
                //avoid the 0.0000000000x 
                newValue = parseFloat(newValue.toFixed(12));
                let dataChangedEvent = {
                    OldValue: Number(selectedCell.value),
                    NewValue: newValue,
                    ColumnId: selectedCell.columnId,
                    IdentifierValue: pair[0],
                    Timestamp: Date.now(),
                    Record: null
                };
                let validationRules = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                let previewResult = { Id: pair[0], InitialValue: Number(selectedCell.value), ComputedValue: newValue, ValidationRules: validationRules };
                previewResults.push(previewResult);
            }
        }
        return {
            ColumnId: columnId,
            PreviewResults: previewResults,
            PreviewValidationSummary: PreviewHelper_1.PreviewHelper.GetPreviewValidationSummary(previewResults)
        };
    }
    GetSmartEditState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().SmartEdit;
    }
}
exports.SmartEditStrategy = SmartEditStrategy;