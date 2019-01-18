import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { ICustomSort } from '../../Utilities/Interface/IAdaptableBlotterObjects';
export declare class CustomSortStrategyagGrid extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
