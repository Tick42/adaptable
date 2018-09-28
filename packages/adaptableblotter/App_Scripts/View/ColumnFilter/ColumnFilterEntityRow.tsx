import * as React from "react";
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { IColumnFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { ButtonSave } from "../Components/Buttons/ButtonSave";
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter:(columnFilter:IColumnFilter)=> void;
    ColumnFilter: IColumnFilter;
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {

    render(): any {
        let colItems: IColItem[] = [].concat(this.props.colItems)
        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(this.props.ColumnFilter.ColumnId, this.props.Columns)
        colItems[1].Content = ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns)
        colItems[2].Content = <span>
            <ButtonSave cssClassName={this.props.cssClassName} onClick={() => this.props.onSaveColumnFilterasUserFilter(this.props.ColumnFilter)}
                overrideTooltip="Save as User Filter"
                bsStyle={"primary"}
                DisplayMode="Glyph"
                size={"small"}
                overrideDisableButton={this.props.ColumnFilter == null || ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.Filter.FilterExpressions) } />
            {' '}
            <ButtonClear cssClassName={this.props.cssClassName} onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
                bsStyle={"danger"}
                DisplayMode="Glyph"
                size={"small"}
                overrideDisableButton={this.props.ColumnFilter == null} />
        </span>

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} key={this.props.Index} />



    }

}