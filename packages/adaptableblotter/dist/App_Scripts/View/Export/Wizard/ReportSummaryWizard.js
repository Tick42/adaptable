"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyNames = require("../../../Core/Constants/StrategyNames");
const ReportHelper_1 = require("../../../Core/Helpers/ReportHelper");
class ReportSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: ReportHelper_1.ReportHelper.GetReportColumnsDescription(this.props.Data, this.props.Columns) },
            { Key: "Rows", Value: ReportHelper_1.ReportHelper.GetReportExpressionDescription(this.props.Data, this.props.Columns, this.props.UserFilters) }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyNames.ExportStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ReportSummaryWizard = ReportSummaryWizard;