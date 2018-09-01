"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const FilterRedux = require("../../Redux/ActionsReducers/FilterRedux");
const SummaryRowItem_1 = require("../Components/StrategySummary/SummaryRowItem");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class ColumnFilterSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__columnfilter";
        let columnFilter = this.props.ColumnFilters.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let description = (columnFilter == null) ? "No Column Filter Active" : ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, this.props.UserFilters);
        let summaryItems = [];
        summaryItems.push(React.createElement("b", null, React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyIds.ColumnFilterStrategyId })));
        summaryItems.push(description);
        summaryItems.push(React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName, bsStyle: "primary", size: "small", onClick: () => this.props.onDeleteFilter(columnFilter), overrideTooltip: "Clear Column Filter", DisplayMode: "Glyph", overrideDisableButton: columnFilter == null }));
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { cssClassName: cssWizardClassName, SummaryItems: summaryItems });
    }
}
exports.ColumnFilterSummaryComponent = ColumnFilterSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDeleteFilter: (columnFilter) => dispatch(FilterRedux.ColumnFilterDelete(columnFilter)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ColumnFilterStrategyId))
    };
}
exports.ColumnFilterSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);