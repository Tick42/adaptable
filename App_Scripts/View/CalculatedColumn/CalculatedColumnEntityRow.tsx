import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';

export class CalculatedColumnEntityRow extends React.Component<SharedEntityRowProps<CalculatedColumnEntityRow>, {}> {
   
    render(): any {
        let calculatedColumn: ICalculatedColumn = this.props.ConfigEntity as ICalculatedColumn;

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = calculatedColumn.ColumnId
        colItems[1].Content = calculatedColumn.GetValueFunc
      
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, calculatedColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={calculatedColumn}
            EntityName="Calculated Column">
        </EntityListActionButtons>
         colItems[2].Content = buttons
      

        return <ConfigEntityRowItem ColItems={colItems} />


    }

}