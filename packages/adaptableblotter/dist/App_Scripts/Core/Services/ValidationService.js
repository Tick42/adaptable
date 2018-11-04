"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const StrategyConstants = require("../Constants/StrategyConstants");
const ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ObjectFactory_1 = require("../ObjectFactory");
class ValidationService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
    ValidateCellChanging(dataChangedEvent) {
        let failedWarningRules = [];
        // first check that if primary key change, the new value is unique
        if (dataChangedEvent.ColumnId == this.blotter.BlotterOptions.primaryKey) {
            let displayValuePair = this.blotter.getColumnValueDisplayValuePairDistinctList(dataChangedEvent.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
            let existingItem = displayValuePair.find(dv => dv.DisplayValue == dataChangedEvent.NewValue);
            if (existingItem) {
                let range = ObjectFactory_1.ObjectFactory.CreateRange(Enums_1.LeafExpressionOperator.PrimaryKeyDuplicate, dataChangedEvent.ColumnId, null, Enums_1.RangeOperandType.Column, null);
                let cellValidationRule = ObjectFactory_1.ObjectFactory.CreateCellValidationRule(dataChangedEvent.ColumnId, range, Enums_1.ActionMode.StopEdit, ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression());
                failedWarningRules.push(cellValidationRule);
            }
        }
        let editingRules = this.GetCellValidationState().CellValidations.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
        if (ArrayExtensions_1.ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions_1.ArrayExtensions.IsNotEmpty(editingRules)) {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            // first check the rules which have expressions
            let expressionRules = editingRules.filter(r => ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(r.Expression));
            if (expressionRules.length > 0) {
                // loop through all rules with an expression (checking the prevent rules first)
                // if the expression is satisfied check if validation rule passes; if it fails then return immediately (if its prevent) or put the rule in return array (if its warning).
                // if expression isnt satisfied then we can ignore the rule but it means that we need subsequently to check all the rules with no expressions
                for (let expressionRule of expressionRules) {
                    let isSatisfiedExpression = ExpressionHelper_1.ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter);
                    if (isSatisfiedExpression && this.IsCellValidationRuleBroken(expressionRule, dataChangedEvent, columns)) {
                        // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
                        if (expressionRule.ActionMode == 'Stop Edit') {
                            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId, "CheckCellChanging", "Failed", { failedRules: [expressionRule], DataChangingEvent: dataChangedEvent });
                            return [expressionRule];
                        }
                        else {
                            failedWarningRules.push(expressionRule);
                        }
                    }
                }
            }
            // now check the rules without expressions
            let noExpressionRules = editingRules.filter(r => ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(r.Expression));
            for (let noExpressionRule of noExpressionRules) {
                if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedEvent, columns)) {
                    if (noExpressionRule.ActionMode == 'Stop Edit') {
                        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId, "CheckCellChanging", "Failed", { failedRules: [noExpressionRule], DataChangingEvent: dataChangedEvent });
                        return [noExpressionRule];
                    }
                    else {
                        failedWarningRules.push(noExpressionRule);
                    }
                }
            }
        }
        if (failedWarningRules.length > 0) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId, "CheckCellChanging", "Warning", { failedRules: failedWarningRules, DataChangingEvent: dataChangedEvent });
        }
        else {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId, "CheckCellChanging", "Ok", { DataChangingEvent: dataChangedEvent });
        }
        return failedWarningRules;
    }
    // changing this so that it now checks the opposite!
    IsCellValidationRuleBroken(cellValidationRule, dataChangedEvent, columns) {
        // if its none then validation fails immediately
        if (cellValidationRule.Range.Operator == Enums_1.LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let rangeEvaluation = ExpressionHelper_1.ExpressionHelper.GetRangeEvaluation(cellValidationRule.Range, dataChangedEvent.NewValue, this.blotter.AuditService.getExistingDataValue(dataChangedEvent), columns.find(c => c.ColumnId == dataChangedEvent.ColumnId), this.blotter, null);
        return ExpressionHelper_1.ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter);
    }
    GetCellValidationState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
    }
}
exports.ValidationService = ValidationService;
