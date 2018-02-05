import { ICellValidationStrategy } from '../Strategy/Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CellValidationStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.CellValidationStrategyName, ScreenPopups.CellValidationPopup,  StrategyGlyphs.CellValidationGlyph);
    }

    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                "Create Cell Validation Rule",
                ScreenPopups.CellValidationPopup,
                StrategyGlyphs.CellValidationGlyph,
                "New|" + columnId)))
    }
}


