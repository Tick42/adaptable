import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux'
import { ApiBase } from "./ApiBase";
import { IColumnCategory } from './Interface/Interfaces';
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';


export class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {

  public GetAll(): IColumnCategory[] {
    return this.getState().ColumnCategory.ColumnCategories;
  }

  public Add(columnCategory: IColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory))
  }

  public Create(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns
    }
    this.Add(columnCategory);
  }

  public Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void {
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public AddColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public RemoveColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c)
      columnCategory.ColumnIds.splice(ccIndex, 1);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }


  public Delete(columnCategoryId: string): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory))
  }

}