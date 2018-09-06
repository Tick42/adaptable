"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ExpressionHelper_1 = require("../../../Core/Helpers/ExpressionHelper");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyIds = require("../../../Core/Constants/StrategyIds");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class PlusMinusSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Nudge Value", Value: this.props.Data.NudgeValue },
            { Key: "Is Column Default", Value: this.props.Data.IsDefaultNudge ? "True" : "False" },
            {
                Key: "Custom Rule", Value: this.props.Data.IsDefaultNudge ?
                    "None" : ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters)
            },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyIds.PlusMinusStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() { }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return this.props.Data.IsDefaultNudge ? 2 : 1;
    }
}
exports.PlusMinusSummaryWizard = PlusMinusSummaryWizard;
