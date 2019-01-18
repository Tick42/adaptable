import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux'
import { ApiBase } from "./ApiBase";
import { ICellValidationRule } from '../Utilities/Interface/IAdaptableBlotterObjects';
import { ICellValidationApi } from './Interface/ICellValidationApi';




export class CellValidationApi extends ApiBase implements ICellValidationApi {

  public GetAll(): ICellValidationRule[] {
    return this.getState().CellValidation.CellValidations;
  }

  public Add(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule))
  }

  public Delete(cellValidationRule: ICellValidationRule): void {
    let index: number = this.GetAll().findIndex(cv => cv == cellValidationRule)
    this.dispatchAction(CellValidationRedux.CellValidationDelete(index))
  }




}