import { ILayout, IGridSort } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Api/Interface/IColumn';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
export declare module LayoutHelper {
    function getLayoutDescription(layout: ILayout, columns: IColumn[]): string;
    function getGridSort(gridSorts: IGridSort[], columns: IColumn[]): string;
    function getSortOrder(sortOrder: 'Unknown' | 'Ascending' | 'Descending'): string;
    function autoSaveLayout(blotter: IAdaptableBlotter): void;
}