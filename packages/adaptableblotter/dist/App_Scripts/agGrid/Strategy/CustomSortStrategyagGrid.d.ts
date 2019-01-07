import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { ICustomSort } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare class CustomSortStrategyagGrid extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}