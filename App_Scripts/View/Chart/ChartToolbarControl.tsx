﻿import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { SortOrder } from '../../Core/Enums';
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IChartDefinition } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";


interface ChartToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartName: string
    onSelectChartDefinition: (chartDefinitionName: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onShowChart: () => PopupRedux.PopupShowChartAction;
}


interface ChartState {
    currentChartDefinition: IChartDefinition
    chartData: any
}

class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, ChartState> {


    render() {
        const selectSearchString: string = "Select a Chart"
        let cssClassName: string = this.props.cssClassName + "__Chart";

        let savedSearch: IChartDefinition = this.props.ChartDefinitions.find(s => s.Name == this.props.CurrentChartName);

        let currentSearchName = StringExtensions.IsNullOrEmpty(this.props.CurrentChartName) ?
            selectSearchString : this.props.CurrentChartName

        let sortedChartes: IChartDefinition[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ChartDefinitions, "Name")

        let availablechartDefinitions: any[] = sortedChartes.filter(s => s.Name != this.props.CurrentChartName).map((chartDefinition, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedChartDefinitionChanged(chartDefinition.Name)} >{chartDefinition.Name}</MenuItem>
        })
        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availablechartDefinitions.length == 0} style={{ minWidth: "120px" }}
                    className={cssClassName} bsSize={"small"} bsStyle={"default"} title={currentSearchName} id="Chart" componentClass={InputGroup.Button}>
                    {availablechartDefinitions}
                </DropdownButton>
                {currentSearchName != selectSearchString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedChartDefinitionChanged("")}
                            size={"small"}
                            overrideTooltip="Clear Chart"
                            overrideDisableButton={currentSearchName == selectSearchString}
                            ConfigEntity={null}
                            DisplayMode="Glyph" />
                    </InputGroup.Button>
                }
            </InputGroup>

            <span className={this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <ButtonShowChart
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.onShowChart()}
                    size={"small"}
                    overrideTooltip="Show Chart"
                    overrideDisableButton={currentSearchName == selectSearchString}
                    DisplayMode="Glyph" />
                <ButtonNew
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onNewChartDefinition()}
                    size={"small"}
                    overrideTooltip="Create New Chart Definition"
                    DisplayMode="Glyph" />

                <ButtonEdit
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onEditChartDefinition()}
                    size={"small"}
                    overrideTooltip="Edit Chart Definition"
                    overrideDisableButton={currentSearchName == selectSearchString}
                    DisplayMode="Glyph" />
            </span>
        </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.ChartStrategyName} glyphicon={StrategyGlyphs.ChartGlyph} onClose={() => this.props.onClose(StrategyIds.ChartStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }

    onSelectedChartDefinitionChanged(chartDefinitionName: string) {
        this.props.onSelectChartDefinition(chartDefinitionName);
    }

    onShowChart() {
        this.props.onShowChart();
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentChartName: state.Chart.CurrentChartName,
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectChartDefinition: (ChartName: string) => dispatch(ChartRedux.ChartDefinitionSelect(ChartName)),
         onNewChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ChartPopup, false, "New")),
        onEditChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ChartPopup, false, "Edit")),
        onShowChart: () => dispatch(PopupRedux.PopupShowChart()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ChartPopup, isReadOnly))
    };
}

export let ChartToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);