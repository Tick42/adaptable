import * as React from "react";
import * as Redux from "redux";
import { Button } from 'react-bootstrap';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from "../../Core/Interface/IColumn";
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IColumnCategory } from "../../Core/Interface/Interfaces";

export interface ColumnChooserSummaryProps extends StrategySummaryProps<ColumnChooserSummaryComponent> {
    ColumnCategories: IColumnCategory[]
   }

export class ColumnChooserSummaryComponent extends React.Component<ColumnChooserSummaryProps, EditableConfigEntityState> {
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__ColumnChoosers";
       // let ColumnChooser: IColumnChooser = this.props.ColumnChoosers.find(fc => fc.ColumnId == this.props.SummarisedColumn.ColumnId);

       
        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: <b>{'Column Category'}</b> });
        colItems.push({ Size: 5, Content: this.props.SummarisedColumn.Category? this.props.SummarisedColumn.Category: "None" });
        colItems.push({ Size: 3, Content: null });
        
        return <AdaptableObjectRow cssClassName={cssWizardClassName} colItems ={colItems} />
     }

 

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnCategories: state.UserInterface.ColumnCategories,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
     };
}

export let ColumnChooserSummary = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserSummaryComponent);