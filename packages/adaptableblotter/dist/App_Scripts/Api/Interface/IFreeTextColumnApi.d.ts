import { IFreeTextColumn } from "./IAdaptableBlotterObjects";
export interface IFreeTextColumnApi {
    GetAll(): IFreeTextColumn[];
    Add(freeTextColumn: IFreeTextColumn): void;
    Create(columnId: string, defaultValue: string): void;
    Delete(columnId: string): void;
}