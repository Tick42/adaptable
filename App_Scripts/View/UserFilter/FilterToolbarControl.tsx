﻿import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { IColumnFilter } from '../../Core/Interface/IFilterStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import * as StrategyIds from '../../Core/StrategyIds'
import { AdaptablePopover } from './../AdaptablePopover';
import { PopoverType } from '../../Core/Enums';

interface FilterToolbarControlComponentProps extends IStrategyViewPopupProps<FilterToolbarControlComponent> {
    onClearFilters: () => FilterRedux.ColumnFilterClearAction,
    FilterDashboardControl: IDashboardStrategyControlConfiguration,
    IsReadOnly: boolean,
    ColumnFilters: IColumnFilter[],
    Columns: IColumn[]
}
class FilterToolbarControlComponent extends React.Component<FilterToolbarControlComponentProps, {}> {

    render(): any {

        let collapsedText = this.props.ColumnFilters.length == 0 ?
            "None" :
            this.props.ColumnFilters.length == 1 ?
                "1 Column" :
                this.props.ColumnFilters.length + " Columns";

        let columnFilterNames: string = "";
        this.props.ColumnFilters.forEach(x => {
            let column: IColumn = this.props.Columns.find(c => c.ColumnId == x.ColumnId);
            if (column) {
                columnFilterNames = columnFilterNames + column.FriendlyName + ", "
            }
        })
        columnFilterNames = StringExtensions.RemoveTrailingComma(columnFilterNames);

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Button bsStyle="primary">
                    {' '}<Glyphicon glyph="filter" />{' '}Filters
                </Button>
                {' '}
                {collapsedText}{' '}
                <AdaptablePopover headerText="" bodyText={[columnFilterNames]} popoverType={PopoverType.Info} />
                {' '}
                <ButtonClear onClick={() => this.props.onClearFilters()}
                    overrideTooltip="Clear Filters"
                    DisplayMode="Glyph"
                    overrideDisableButton={this.props.ColumnFilters.length == 0} />
            </div>
        </span>

        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm inline>
                {content}
            </AdaptableBlotterForm>
        </Panel>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FilterDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.FilterStrategyId),
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearFilters: () => dispatch(FilterRedux.ColumnFilterClear()),
    };
}

export let FilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FilterToolbarControlComponent);