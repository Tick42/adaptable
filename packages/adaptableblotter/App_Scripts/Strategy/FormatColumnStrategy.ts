import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy'
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { StateChangedTrigger } from '../Core/Enums';

export abstract class FormatColumnStrategy extends AdaptableStrategyBase implements IFormatColumnStrategy {
    protected FormatColumnState: FormatColumnState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FormatColumnStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.FormatColumnStrategyName, ScreenPopups.FormatColumnPopup, StrategyIds.FormatColumnGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            let formatExists: boolean = ArrayExtensions.ContainsItem(this.FormatColumnState.FormatColumns.map(f => f.ColumnId), columnId)
            let label = formatExists ? "Edit " : "Create "
            let popupParam = formatExists ? "Edit|" : "New|"

            this.createContextMenuItemShowPopup(
                label + StrategyIds.FormatColumnStrategyName,
                ScreenPopups.FormatColumnPopup,
                StrategyIds.FormatColumnGlyph,
                popupParam + columnId)
        }
    }

    protected InitState() {
        if (this.FormatColumnState != this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn) {
            this.FormatColumnState = this.blotter.AdaptableBlotterStore.TheStore.getState().FormatColumn;

            this.InitStyles();

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.FormatColumn, this.FormatColumnState)
            }
        }
    }

    protected abstract InitStyles(): void;
}