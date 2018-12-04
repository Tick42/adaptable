import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectColumnStrategy } from "./Interface/ISelectColumnStrategy";
import { IColumn } from '../Api/Interface/IColumn';

export class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.SelectColumnStrategyId, blotter)
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.blotter.isSelectable()) {
            if (this.canCreateContextMenuItem(column, this.blotter)) {
       
                this.createContextMenuItemReduxAction(
                    StrategyConstants.SelectColumnStrategyName,
                    StrategyConstants.SelectColumnGlyph,
                    GridRedux.GridSelectColumn(column.ColumnId)
                )
            }
        }
    }
}