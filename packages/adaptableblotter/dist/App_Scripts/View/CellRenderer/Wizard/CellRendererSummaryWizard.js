"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
const StyleVisualItem_1 = require("../../Components/StyleVisualItem");
const ObjectFactory_1 = require("../../../Core/ObjectFactory");
class CellRendererSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let positiveStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        positiveStyle.BackColor = this.props.Data.PositiveColor;
        positiveStyle.ForeColor = this.props.Data.PositiveColor;
        let negativeStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        negativeStyle.BackColor = this.props.Data.NegativeColor;
        negativeStyle.ForeColor = this.props.Data.NegativeColor;
        let keyValuePairs = [
            { Key: "Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Minimum Value", Value: this.props.Data.MinValue },
            { Key: "Maximum Value", Value: this.props.Data.MaxValue },
            { Key: "Positive Colour", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: positiveStyle }) },
            { Key: "Negative Colour", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: negativeStyle }) },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.CellRendererStrategyName });
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
        return 1;
    }
}
exports.CellRendererSummaryWizard = CellRendererSummaryWizard;
