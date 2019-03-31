"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../Utilities/Enums");
class ApplicationToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__Application";
        let headerText = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle) ?
            this.props.ApplicationToolbarTitle :
            StrategyConstants.ApplicationStrategyName;
        let minHeight = (this.props.DashboardSize == Enums_1.DashboardSize.XSmall) ? '22px' : '30px';
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, useDefaultPanelStyle: this.props.UseSingleColourForButtons, headerText: headerText, glyphicon: StrategyConstants.ApplicationGlyph, onClose: () => this.props.onClose(StrategyConstants.ApplicationStrategyId), onConfigure: () => this.props.onConfigure() },
            React.createElement("div", { className: "ApplicationToolBarContents", style: { minHeight: minHeight } }));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ApplicationStrategyId, ScreenPopups.ApplicationPopup))
    };
}
exports.ApplicationToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ApplicationToolbarControlComponent);
