import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ChartEntityRow } from './ChartEntityRow'
import { ChartWizard } from './Wizard/ChartWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IChartDefinition, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";

interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onSelectChartDefinition: (chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionSelectAction,
    onShowChart: () => ChartRedux.ChartShowChartAction;
    ChartDefinitions: Array<IChartDefinition>
    CurrentChartDefinition: IChartDefinition
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ChartPopupComponent extends React.Component<ChartPopupProps, EditableConfigEntityState> {
    constructor(props: ChartPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {

            if (this.props.PopupParams == "New") {
                this.onNew()
            }
            if (this.props.PopupParams == "Edit") {
                let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.props.CurrentChartDefinition.Title)
                this.onEdit(index, this.props.CurrentChartDefinition)
            }
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__Chart";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__Chart";

        let infoBody: any[] = ["Use Charts to see youyr grid data visually."]

        let colItems: IColItem[] = [
            { Content: "Title", Size: 4 },
            { Content: "Subtitle", Size: 4 },
            { Content: "Show", Size: 1 },
            { Content: "", Size: 3 },
        ]

        let Charts = this.props.ChartDefinitions.map((Chart: IChartDefinition, index) => {
            return <ChartEntityRow
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={Chart}
                key={Chart.Title}
                Index={index}
                onEdit={(index, Chart) => this.onEdit(index, Chart as IChartDefinition)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(Chart)}
                onDeleteConfirm={ChartRedux.ChartDefinitionDelete(Chart)}
                onShowChart={(chartName) => this.onShowChart(chartName)}
                AccessLevel={this.props.AccessLevel}
            />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Chart Definition"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.ChartStrategyName} className="ab_main_popup" infoBody={infoBody}
                button={newButton} bsStyle="primary" glyphicon={StrategyConstants.ChartGlyph}>

                {Charts.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={Charts} />
                }

                {Charts.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a bespoke sort order for a selected column.</Well>
                }

                {this.state.EditedAdaptableBlotterObject &&
                    <ChartWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IChartDefinition}
                        ConfigEntities={this.props.ChartDefinitions}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }


    onShowChart(chartName: string) {
        let chartDefinition = this.props.ChartDefinitions.find(cd => cd.Title == chartName);
        this.props.onSelectChartDefinition(chartDefinition)
        this.props.onShowChart();
    }

    onEdit(index: number, Chart: IChartDefinition) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(Chart), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyChartDefinition(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let index: number = this.state.EditedAdaptableBlotterObjectIndex;
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateChartDefinition(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        let currentChartIndex: number = (this.props.CurrentChartDefinition == null) ?
            -1 :
            this.props.ChartDefinitions.findIndex(as => as.Title == this.props.CurrentChartDefinition.Title)

        if (index == -1 || index == currentChartIndex) {// its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectChartDefinition(clonedObject);
        }
    }

    canFinishWizard() {
        let Chart = this.state.EditedAdaptableBlotterObject as IChartDefinition
        return StringExtensions.IsNotNullOrEmpty(Chart.Title);
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.CurrentChartDefinition
    };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onShowChart: () => dispatch(ChartRedux.ChartShowChart()),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId))
    };
}

export let ChartPopup = connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
