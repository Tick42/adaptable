import { ICellValidationRule } from '../../Utilities/Interface/IAdaptableBlotterObjects';
export interface ICellValidationApi {
    GetAll(): ICellValidationRule[];
    Add(cellValidationRule: ICellValidationRule): void;
    Delete(cellValidationRule: ICellValidationRule): void;
}