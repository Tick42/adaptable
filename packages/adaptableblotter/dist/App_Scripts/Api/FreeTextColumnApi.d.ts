import { IFreeTextColumn } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";
export declare class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {
    GetAll(): IFreeTextColumn[];
    Add(freeTextColumn: IFreeTextColumn): void;
    Create(columnId: string, defaultValue?: string): void;
    Delete(columnId: string): void;
}