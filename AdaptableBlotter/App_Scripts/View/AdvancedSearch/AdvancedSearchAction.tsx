/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as StrategyIds from '../../Core/StrategyIds'
import { Provider, connect } from 'react-redux';
import { FormControl, ControlLabel, Form, FormGroup, Button, OverlayTrigger, Row, Col, Tooltip } from 'react-bootstrap';
import { PanelWithButton } from '../PanelWithButton';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper } from '../../Core/Helper';
import { ExpressionBuilderPreview } from '../ExpressionBuilder/ExpressionBuilderPreview'
import { PopupState } from '../../Redux/ActionsReducers/Interface/IState'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IUserFilter } from '../../Core/Interface/IExpression'

interface AdvancedSearchActionProps extends IStrategyViewPopupProps<AdvancedSearchActionComponent> {
    AdvancedSearches: IAdvancedSearch[];
    Columns: IColumn[];
    CurrentAdvancedSearchUid: string;
    onAddUpdateAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddUpdateAction,
    onDeleteAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchDeleteAction,
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
    onClearPopupParams: () => PopupRedux.ClearPopupParamAction,
    PopupParams: any,
    UserFilters: IUserFilter[]
}

interface AdvancedSearchActionInternalState {
    EditedAdvancedSearch: IAdvancedSearch
    SelectedColumnId: string
}

class AdvancedSearchActionComponent extends React.Component<AdvancedSearchActionProps, AdvancedSearchActionInternalState> {
    constructor(props: AdvancedSearchActionProps) {
        super(props);
        this.state = { EditedAdvancedSearch: null, SelectedColumnId: "select" };
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNewAdvancedSearch()
        }
    }

    private getClonedSelectedAdvancedSearch() {
        //we clone the object since there are methods that change directly the object from the state and 
        //I'm rewrtting enough of the component like that
        let selectedAdvancedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(a => a.Uid == this.props.CurrentAdvancedSearchUid);
        if (selectedAdvancedSearch) {
            selectedAdvancedSearch = Helper.cloneObject(selectedAdvancedSearch)
        }
        return selectedAdvancedSearch
    }

    render() {
        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.Uid} key={x.Uid}>{x.Name}</option>
        })


        let selectedAdvancedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch()
        let currentAdvancedSearch: string = selectedAdvancedSearch != null ? selectedAdvancedSearch.Uid : "select";

        return (
            <div >
                <PanelWithButton bsStyle="primary" headerText="Advanced Search" buttonContent={"New Search"}
                    buttonClick={() => this.onNewAdvancedSearch()} glyphicon={"search"}>

                    {/* The main Search selection form */}
                    <div >
                        <FormGroup controlId="formInlineName">
                            <Col xs={3}>
                                <ControlLabel style={largeControlStyle}>Current:</ControlLabel>
                            </Col>
                            <Col xs={5}>
                                <FormControl componentClass="select" placeholder="select"
                                    value={currentAdvancedSearch}
                                    onChange={(x) => this.onSelectedSearchChanged(x)} >
                                    <option value="select" key="select">Select a Search</option>
                                    {advancedSearches}
                                </FormControl>
                            </Col>
                            <Col xs={4}>
                                <OverlayTrigger overlay={<Tooltip id="tooltipClear">Clear Search</Tooltip>}>
                                    <Button bsSize='small' style={smallButtonStyle} disabled={selectedAdvancedSearch == null} bsStyle='info' onClick={() => this.onClearAdvancedSearch()}>Clear</Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete Search</Tooltip>}>
                                    <Button bsSize='small' style={smallButtonStyle} disabled={selectedAdvancedSearch == null} onClick={() => this.onDeleteAdvancedSearch()}>Delete</Button>
                                </OverlayTrigger>
                            </Col>
                        </FormGroup>
                    </div>

                    {/* Wizard for creating or ediiting searches */}
                    {this.state.EditedAdvancedSearch != null &&
                        <AdaptableWizard Steps={
                            [
                                <AdvancedSearchExpressionWizard
                                    ColumnList={this.props.Columns}
                                    UserFilters={this.props.UserFilters}
                                    SelectedColumnId={this.state.SelectedColumnId}
                                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                                <AdvancedSearchSettingsWizard />
                            ]}
                            Data={this.state.EditedAdvancedSearch}
                            StepStartIndex={0}
                            onHide={() => this.onCloseWizard()}
                            onFinish={() => this.onFinishWizard()} >
                        </AdaptableWizard>}

                </PanelWithButton>

                {/* Search details screen - showing contents of current selected search (only visible if there is one) */}
                {selectedAdvancedSearch != null &&

                    <PanelWithButton headerText="Search Details" bsStyle="primary"
                        buttonContent={"Edit Search"}
                        buttonClick={() => this.onEditAdvancedSearch()}>
                        <div style={previewDivStyle}>
                            <ExpressionBuilderPreview Expression={selectedAdvancedSearch.Expression}
                                UserFilters={this.props.UserFilters}
                                onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                                SelectedColumnId={this.state.SelectedColumnId}
                                ColumnsList={this.props.Columns}
                                DeleteColumnValue={(columnId: string, value: any) => this.onDeleteColumnValue(columnId, value)}
                                DeleteUserFilterExpression={(columnId: string, index: number) => this.onDeleteUserFilterExpression(columnId, index)}
                                DeleteRange={(columnId: string, index: number) => this.onDeleteRange(columnId, index)}
                                ShowPanel={false}>
                            </ExpressionBuilderPreview>
                        </div>
                    </PanelWithButton>

                }

            </div>
        );
    }

    // New search: sets the edited search to a new blank search which will force the wizard to show
    onNewAdvancedSearch() {
        let advancedSearchStrategy: any = this.props.AdaptableBlotter.Strategies.get(StrategyIds.AdvancedSearchStrategyId);
        let _newAdvancedSearch: IAdvancedSearch = advancedSearchStrategy.CreateEmptyAdvancedSearch();
        this.setState({ EditedAdvancedSearch: _newAdvancedSearch, SelectedColumnId: "select" } as AdvancedSearchActionInternalState)
    }

    // Edit search: sets the edited search to the current selected search which will force the wizard to show
    onEditAdvancedSearch() {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        this.setState({ EditedAdvancedSearch: clonedSearch } as AdvancedSearchActionInternalState)
    }

    // Clear search:  sets the edited and selected searches to null and calles Redux Select Advanced Search
    onClearAdvancedSearch() {
        this.props.onSelectAdvancedSearch("");
    }

    // Delete search:  sets the selected search to null and calles Redux Delete Advanced Search
    onDeleteAdvancedSearch() {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        if (confirm("Are you sure you want to delete Advanced Search: '" + clonedSearch.Name + "'?")) {
            this.props.onDeleteAdvancedSearch(clonedSearch);
        }
    }

    onDeleteColumnValue(columnId: string, value: any) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnValues = clonedSearch.Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
        let index = columnValues.ColumnValues.indexOf(value)
        columnValues.ColumnValues.splice(index, 1)
        if (columnValues.ColumnValues.length == 0) {
            let columnValuesIndex = clonedSearch.Expression.ColumnDisplayValuesExpressions.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.ColumnDisplayValuesExpressions.splice(columnValuesIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onDeleteUserFilterExpression(columnId: string, index: number) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnUserFilterExpressions = clonedSearch.Expression.UserFilters.find(x => x.ColumnName == columnId)
        columnUserFilterExpressions.UserFilterUids.splice(index, 1)
        if (columnUserFilterExpressions.UserFilterUids.length == 0) {
            let columnUserFilterExpressionIndex = clonedSearch.Expression.UserFilters.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.UserFilters.splice(columnUserFilterExpressionIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onDeleteRange(columnId: string, index: number) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnRanges = clonedSearch.Expression.RangeExpressions.find(x => x.ColumnName == columnId)
        columnRanges.Ranges.splice(index, 1)
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = clonedSearch.Expression.RangeExpressions.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onSelectedColumnChange(columnName: string) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        this.setState({ SelectedColumnId: columnName, EditedAdvancedSearch: clonedSearch } as AdvancedSearchActionInternalState)
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdvancedSearch: null } as AdvancedSearchActionInternalState)
    }

    onFinishWizard() {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(this.state.EditedAdvancedSearch);
        this.props.onAddUpdateAdvancedSearch(clonedObject);
    }

    onSelectedSearchChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "select") {
            this.onClearAdvancedSearch();
        } else {
            this.props.onSelectAdvancedSearch(e.value);
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.AdaptableBlotter,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        Columns: state.Grid.Columns,
        PopupParams: state.Popup.ActionConfigurationPopup.Params,
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(advancedSearch)),
        onDeleteAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onClearPopupParams: () => dispatch(PopupRedux.ClearPopupParam()),
    };
}

export let AdvancedSearchAction = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '6px'
};

var previewDivStyle = {
    overflowY: 'auto',
    maxHeight: '350px',
};

let largeControlStyle = {
    margin: '6px'
}

let smallButtonStyle = {
    margin: '2px'
}