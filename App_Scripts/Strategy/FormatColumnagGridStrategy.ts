import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IFormatColumnStrategy, IFormatColumn } from '../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IMenuItem } from '../Strategy/Interface/IStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Strategy/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { Helper } from '../Core/Helpers/Helper';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import { FormatColumnPopup } from '../Core/ScreenPopups';
import * as StyleConstants from '../Core/StyleConstants'

export class FormatColumnagGridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
    }

    protected InitStyles(): void {

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter as AdaptableBlotter

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {

            for (let column of columns) {
                let cellClassRules: any = {};
                this.FormatColumnState.FormatColumns.forEach((fc, index) => {
                    if (fc.ColumnId == column.ColumnId) {
                        cellClassRules[StyleConstants.FORMAT_COLUMN_STYLE + index] = function (params: any) {
                            return true;
                        }
                     }
                })
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "FormatColumn");
            }
        }

        theBlotter.redrawRows();
    }
   
}


