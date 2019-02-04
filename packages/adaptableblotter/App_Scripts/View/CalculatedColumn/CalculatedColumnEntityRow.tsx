import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ICalculatedColumn } from "../../Utilities/Interface/BlotterObjects/ICalculatedColumn";


export class CalculatedColumnEntityRow extends React.Component<SharedEntityRowProps<CalculatedColumnEntityRow>, {}> {
   
    render(): any {
        let calculatedColumn: ICalculatedColumn = this.props.AdaptableBlotterObject as ICalculatedColumn;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = calculatedColumn.ColumnId
        colItems[1].Content = calculatedColumn.ColumnExpression
      
        let buttons: any = <EntityListActionButtons
        cssClassName={this.props.cssClassName}
         ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, calculatedColumn)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            EntityName={StrategyConstants.CalculatedColumnStrategyName}>
        </EntityListActionButtons>
         colItems[2].Content = buttons
      

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />


    }

}