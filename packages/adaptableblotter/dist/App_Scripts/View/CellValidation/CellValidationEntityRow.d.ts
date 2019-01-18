import * as React from "react";
import { IColumn } from '../../Utilities/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ICellValidationRule } from "../../Utilities/Interface/IAdaptableBlotterObjects";
import { ActionMode } from "../../Utilities/Enums";
export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: IColumn;
    onChangeActionMode: (index: number, ActionMode: ActionMode) => void;
}
export declare class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any;
    setExpressionDescription(CellValidation: ICellValidationRule): string;
    private getColumnandRule;
    onActionModeChanged(index: number, event: React.FormEvent<any>): void;
}
