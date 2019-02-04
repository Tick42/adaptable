import { IStyle } from "../../Utilities/Interface/IStyle";
import { IFormatColumn } from "../../Utilities/Interface/BlotterObjects/IFormatColumn";
export interface IFormatColumnApi {
    GetAll(): IFormatColumn[];
    Add(column: string, style: IStyle): void;
    Update(column: string, style: IStyle): void;
    Delete(formatColumn: IFormatColumn): void;
    DeleteAll(): void;
}
