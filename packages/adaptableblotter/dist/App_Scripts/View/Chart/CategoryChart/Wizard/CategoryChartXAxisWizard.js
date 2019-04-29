"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ExpressionHelper_1 = require("../../../../Utilities/Helpers/ExpressionHelper");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
class CategoryChartXAxisWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            XAxisColumnId: props.Data.XAxisColumnId,
            UseAllXAsisColumnValues: ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.XAxisExpression),
            XAxisExpression: this.props.Data.XAxisExpression
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart: X (Horizontal) Axis Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "xAxisColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.HelpBlock, null,
                                    "Select a column for the X Axis.",
                                    React.createElement("br", null),
                                    "Choose whether to show all values for this column or to filter them (performed in next step)")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "X Axis Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.XAxisColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onXAxisColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "X Axis Column Values:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "All", checked: this.state.UseAllXAsisColumnValues == true, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "All"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Filtered", checked: this.state.UseAllXAsisColumnValues == false, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "Filtered")))))));
    }
    onUseAllColumnValuesChanged(event) {
        let e = event.target;
        let showAll = e.value == "All";
        let expression = this.state.XAxisExpression;
        if (!showAll && ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(expression)) {
            expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
        this.setState({ UseAllXAsisColumnValues: showAll, XAxisExpression: expression }, () => this.props.UpdateGoBackState());
    }
    onXAxisColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            XAxisColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllXAsisColumnValues: true,
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumnId));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.XAxisColumnId = this.state.XAxisColumnId;
        this.props.Data.XAxisExpression = (this.state.UseAllXAsisColumnValues) ? null : this.state.XAxisExpression;
        if (this.props.Data.XAxisColumnId != this.state.XAxisColumnId) {
            this.props.Data.XAxisExpression = null;
        }
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return (this.state.UseAllXAsisColumnValues) ? 2 : 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CategoryChartXAxisWizard = CategoryChartXAxisWizard;
