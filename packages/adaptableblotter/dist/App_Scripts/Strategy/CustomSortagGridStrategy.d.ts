import { CustomSortStrategy } from './CustomSortStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ICustomSort } from '../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class CustomSortagGridStrategy extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter);
    getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function;
}
