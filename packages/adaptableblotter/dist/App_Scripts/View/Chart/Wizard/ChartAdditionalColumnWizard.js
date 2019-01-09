"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const SingleListBox_1 = require("../../Components/ListBox/SingleListBox");
const GeneralConstants = require("../../../Utilities/Constants/GeneralConstants");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
class ChartAdditionalColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        let hasDistinctColumnValues = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(props.Data.AdditionalColumnValues) && props.Data.AdditionalColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES;
        this.state = {
            AdditionalColumn: props.Data.AdditionalColumnId,
            AdditionalColumnValues: props.Data.AdditionalColumnValues ? props.Data.AdditionalColumnValues : [],
            UseAllAdditionalColumnValues: (hasDistinctColumnValues) ? false : true,
            AvailableAdditionalColumnValues: (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.AdditionalColumnId)) ?
                props.Blotter.getColumnValueDisplayValuePairDistinctList(props.Data.AdditionalColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue) :
                null
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "X Axis Additional Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "additionalColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            "  ",
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.Well, null, "You can, optionally, segment the X Axis further by grouping totals against the values in another column")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Additional Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.AdditionalColumn], ColumnList: this.props.Columns, onColumnChange: columns => this.onAdditionalColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Additional Column Values:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "All", checked: this.state.UseAllAdditionalColumnValues == true, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "All"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Bespoke", checked: this.state.UseAllAdditionalColumnValues == false, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "Bespoke"))))),
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn) && this.state.UseAllAdditionalColumnValues == false &&
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(SingleListBox_1.SingleListBox, { Values: this.state.AvailableAdditionalColumnValues, cssClassName: cssClassName, UiSelectedValues: this.state.AdditionalColumnValues, DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], onSelectedChange: (list) => this.onColumnValuesChange(list), SelectionMode: Enums_1.SelectionMode.Multi })),
                        React.createElement(react_bootstrap_1.Col, { xs: 2 }))));
    }
    onUseAllColumnValuesChanged(event) {
        let e = event.target;
        let showAll = e.value == "All";
        let colValues = (showAll) ? [GeneralConstants.ALL_COLUMN_VALUES] : [];
        this.setState({ UseAllAdditionalColumnValues: showAll, AdditionalColumnValues: colValues }, () => this.props.UpdateGoBackState());
    }
    onColumnValuesChange(list) {
        this.setState({ AdditionalColumnValues: list }, () => this.props.UpdateGoBackState());
    }
    onAdditionalColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            AdditionalColumn: isColumn ? columns[0].ColumnId : "",
            UseAllAdditionalColumnValues: true,
            AdditionalColumnValues: [GeneralConstants.ALL_COLUMN_VALUES],
            AvailableAdditionalColumnValues: isColumn ?
                this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columns[0].ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue) :
                []
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn) && ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.state.AdditionalColumnValues)) {
            return false;
        }
        return true;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.AdditionalColumnId = this.state.AdditionalColumn;
        this.props.Data.AdditionalColumnValues = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn) ? this.state.AdditionalColumnValues : [];
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1;
    }
}
exports.ChartAdditionalColumnWizard = ChartAdditionalColumnWizard;