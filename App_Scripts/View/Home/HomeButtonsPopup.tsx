﻿import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IStrategyViewPopupProps } from '../Components/SharedProps/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { DualListBoxEditor } from './../DualListBoxEditor'

interface HomeButtonsPopupComponentProps extends IStrategyViewPopupProps<HomeButtonsPopupComponent> {
    DashboardShortcutsDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean,
    MenuState: MenuState,
    EntitlementsState: EntitlementsState
    onDashboardControlConfigChange: (strategyId: string, newConfig: any) => DashboardRedux.DashboardSetConfigurationItemAction
}

class HomeButtonsPopupComponent extends React.Component<HomeButtonsPopupComponentProps, {}> {
    render() {
        let config: string[] = [];
        if(this.props.DashboardShortcutsDashboardControl.ControlConfiguration!=null){
            config = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        }
        return <PanelWithImage header="Function Buttons Configuration" bsStyle="primary" glyphicon={StrategyGlyphs.FunctionsGlyph}>
            <DualListBoxEditor AvailableValues={this.props.MenuState.MenuItems.filter(x => config.indexOf(x.Label) == -1).map(x=>x.Label)}
                SelectedValues={config}
                HeaderAvailable="Available Function Buttons"
                HeaderSelected="Visible Function Buttons"
                onChange={(SelectedValues) => this.ListChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithImage>
    }

    ListChange(SelectedValues: string[]){
        this.props.onDashboardControlConfigChange(StrategyIds.HomeStrategyId, SelectedValues)
    }

    onClick(item: React.FormEvent<any>, controlName: string) {
        let e = item.target as HTMLInputElement;
        let originalConf = this.props.DashboardShortcutsDashboardControl.ControlConfiguration
        if (!originalConf) {
            originalConf = []
        }
        let arrayConfig: Array<string> = [].concat(originalConf)
        if (e.checked) {
            arrayConfig.push(controlName)
        }
        else {
            let index = arrayConfig.indexOf(controlName)
            arrayConfig.splice(index, 1)
        }
        this.props.onDashboardControlConfigChange(StrategyIds.HomeStrategyId, arrayConfig)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardShortcutsDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.HomeStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDashboardControlConfigChange: (strategyId: string, newConfig: any) => dispatch(DashboardRedux.DashboardSetConfigurationItem(strategyId, newConfig))
    };
}

export let HomeButtonsPopup = connect(mapStateToProps, mapDispatchToProps)(HomeButtonsPopupComponent);

