import * as React from "react";
import { IColumnFilterContext } from "../../../Utilities/Interface/IColumnFilterContext";
import { DistinctCriteriaPairValue, ContextMenuTab } from '../../../Utilities/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
export interface FilterFormState {
    ColumnValuePairs: Array<IRawValueDisplayValuePair>;
    ShowWaitingMessage: boolean;
    SelectedTab: ContextMenuTab;
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}
export declare let FilterForm: React.ComponentClass<any, any>;
export declare const FilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
