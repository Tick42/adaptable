import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy';
import { IColumn } from '../Api/Interface/IColumn';
export declare class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
}