"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ChartInternalRedux = require("../../Redux/ActionsReducers/ChartInternalRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ChartEntityRow_1 = require("./ChartEntityRow");
const ChartWizard_1 = require("./Wizard/ChartWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
class ChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            if (this.props.PopupParams == "New") {
                this.onNew();
            }
            if (this.props.PopupParams == "Edit") {
                let index = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.props.CurrentChartDefinition.Title);
                this.onEdit(index, this.props.CurrentChartDefinition);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Chart";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Chart";
        let infoBody = ["Use Charts to see youyr grid data visually."];
        let colItems = [
            { Content: "Title", Size: 4 },
            { Content: "Subtitle", Size: 4 },
            { Content: "Show", Size: 1 },
            { Content: "", Size: 3 },
        ];
        let Charts = this.props.ChartDefinitions.map((Chart, index) => {
            return React.createElement(ChartEntityRow_1.ChartEntityRow, { cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: Chart, key: Chart.Title, Index: index, onEdit: (index, Chart) => this.onEdit(index, Chart), TeamSharingActivated: this.props.TeamSharingActivated, onShare: () => this.props.onShare(Chart), onDeleteConfirm: ChartRedux.ChartDefinitionDelete(Chart), onShowChart: (chartName) => this.onShowChart(chartName), AccessLevel: this.props.AccessLevel });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Chart Definition", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.ChartStrategyName, className: "ab_main_popup", infoBody: infoBody, button: newButton, bsStyle: "primary", glyphicon: StrategyConstants.ChartGlyph },
                Charts.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: Charts }),
                Charts.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a bespoke sort order for a selected column."),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement(ChartWizard_1.ChartWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onShowChart(chartName) {
        let chartDefinition = this.props.ChartDefinitions.find(cd => cd.Title == chartName);
        this.props.onSelectChartDefinition(chartDefinition);
        this.props.onShowChart();
    }
    onEdit(index, Chart) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(Chart), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyChartDefinition(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let index = this.state.EditedAdaptableBlotterObjectIndex;
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateChartDefinition(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        let currentChartIndex = (this.props.CurrentChartDefinition == null) ?
            -1 :
            this.props.ChartDefinitions.findIndex(as => as.Title == this.props.CurrentChartDefinition.Title);
        if (index == -1 || index == currentChartIndex) { // its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectChartDefinition(clonedObject);
        }
    }
    canFinishWizard() {
        let Chart = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(Chart.Title);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.ChartInternal.CurrentChartDefinition
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartInternalRedux.ChartDefinitionSelect(chartDefinition)),
        onShowChart: () => dispatch(ChartInternalRedux.ChartInternalShowChart()),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId))
    };
}
exports.ChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);