import * as React from "react";
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColumn } from "../../Core/Interface/IColumn";
import { SortOrder } from "../../Core/Enums";
import { IGridSort } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface GridSortRowProps<GridSortRow> extends SharedEntityExpressionRowProps<GridSortRow> {
    GridSort: IGridSort;
    onGridSortColumnChanged: (column: IColumn) => void;
    onGridSortOrderChanged: (sortOrder: SortOrder) => void;
    onDeleteGridSort: () => void;
}
export declare class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {
    render(): any;
    private onColumnSelectedChanged;
    private onSortOrderChanged;
}