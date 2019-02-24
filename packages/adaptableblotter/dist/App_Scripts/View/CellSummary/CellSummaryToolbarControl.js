"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const SelectedCellsRedux = require("../../Redux/ActionsReducers/CellSummaryRedux");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const AdaptablePopover_1 = require("../AdaptablePopover");
const CellSummaryPopover_1 = require("./CellSummaryPopover");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
class CellSummaryToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SubFunc: (sender, event) => {
                this.onSelectionChanged();
            }
        };
    }
    componentDidMount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc);
        }
    }
    componentWillUnmount() {
        if (this.props.Blotter) {
            this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__CellSummary";
        let operationMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.CellSumaryOperation).map((summaryOperation, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: "index", onClick: () => this.props.onCellSummaryOperationChange(summaryOperation) }, summaryOperation);
        });
        let operationOptionalMenuItems = EnumExtensions_1.EnumExtensions.getNames(Enums_1.CellSumaryOptionalOperation).map((summaryOperation, index) => {
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.SystemSummaryOperations, summaryOperation)) {
                return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: "index", onClick: () => this.props.onCellSummaryOperationChange(summaryOperation) }, summaryOperation);
            }
        });
        let cellSummaryPopover = React.createElement(CellSummaryPopover_1.CellSummaryPopover, { cssClassName: cssClassName, CellSummary: this.props.CellSummary });
        let content = React.createElement("span", null,
            React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(react_bootstrap_1.InputGroup, null,
                    React.createElement(react_bootstrap_1.DropdownButton, { style: { marginRight: "3px", width: "75px" }, title: this.props.CellSumaryOperation, id: "CellSummary_Operation", bsSize: "small", componentClass: react_bootstrap_1.InputGroup.Button },
                        operationMenuItems,
                        operationOptionalMenuItems),
                    this.props.CellSummary != null &&
                        React.createElement("span", null,
                            React.createElement(react_bootstrap_1.ControlLabel, { style: { marginTop: "5px", marginLeft: "3px" } },
                                this.getOperationValue(),
                                " "),
                            ' ',
                            this.props.CellSummary != null && this.props.CellSummary.Count > 0 &&
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Cell Summary", bodyText: [cellSummaryPopover], tooltipText: "Show Cell Summary", useButton: true, triggerAction: "click", popoverMinWidth: 300 })))));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.CellSummaryStrategyName, glyphicon: StrategyConstants.CellSummaryGlyph, onClose: () => this.props.onClose(StrategyConstants.CellSummaryStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectionChanged() {
        this.props.onCreateCellSummary();
    }
    getOperationValue() {
        switch (this.props.CellSumaryOperation) {
            case Enums_1.CellSumaryOperation.Sum:
                return this.props.CellSummary.Sum;
            case Enums_1.CellSumaryOperation.Average:
                return this.props.CellSummary.Average;
            case Enums_1.CellSumaryOperation.Median:
                return this.props.CellSummary.Median;
            case Enums_1.CellSumaryOperation.Max:
                return this.props.CellSummary.Max;
            case Enums_1.CellSumaryOperation.Min:
                return this.props.CellSummary.Min;
            case Enums_1.CellSumaryOperation.Distinct:
                return this.props.CellSummary.Distinct;
            case Enums_1.CellSumaryOperation.Count:
                return this.props.CellSummary.Count;
            case Enums_1.CellSumaryOptionalOperation.Only:
                return this.props.CellSummary.Only;
            case Enums_1.CellSumaryOptionalOperation.VWAP:
                return this.props.CellSummary.VWAP;
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SelectedCellInfo: state.Grid.SelectedCellInfo,
        CellSumaryOperation: state.CellSummary.SummaryOperation,
        SystemSummaryOperations: state.CellSummary.SystemSummaryOperations,
        CellSummary: state.Grid.CellSummary,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onCellSummaryOperationChange: (summaryOperation) => dispatch(SelectedCellsRedux.CellSummaryChangeOperation(summaryOperation)),
        onCreateCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.CellSummaryStrategyId, ScreenPopups.CellSummaryPopup))
    };
}
exports.CellSummaryToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellSummaryToolbarControlComponent);