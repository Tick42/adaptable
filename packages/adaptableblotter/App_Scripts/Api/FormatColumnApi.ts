import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IFormatColumn, IStyle } from "../Utilities/Interface/IAdaptableBlotterObjects";
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux'
import { ApiBase } from "./ApiBase";
import { IFormatColumnApi } from './Interface/IFormatColumnApi';

export class FormatColumnApi extends ApiBase implements IFormatColumnApi {

  // Format Column api methods
  public GetAll(): IFormatColumn[] {
    return this.getState().FormatColumn.FormatColumns;
  }

  public Add(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn))
  }

  public Update(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn))
  }

  public Delete(formatColumn: IFormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn))
  }

  public DeleteAll(): void {
    this.GetAll().forEach(fc => {
      this.Delete(fc);
    })
  }

}