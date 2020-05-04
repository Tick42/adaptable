import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import { ApiBase } from './ApiBase';
import { CalculatedColumnApi } from '../CalculatedColumnApi';
import {
  CalculatedColumnState,
  CalculatedColumn,
} from '../../PredefinedConfig/CalculatedColumnState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class CalculatedColumnApiImpl extends ApiBase implements CalculatedColumnApi {
  public getCalculatedColumnState(): CalculatedColumnState {
    return this.getAdaptableState().CalculatedColumn;
  }

  public getAllCalculatedColumn(): CalculatedColumn[] {
    return this.getCalculatedColumnState().CalculatedColumns;
  }

  public addCalculatedColumn(calculatedColumn: CalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
  }

  public editCalculatedColumn(calculatedColumn: CalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calculatedColumn));
  }

  public editCalculatedColumnExpression(column: string, columnExpression: string): void {
    let calcColumn: CalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumn));
  }

  public deleteCalculatedColumn(column: string): void {
    let calcColumn: CalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumn));
  }

  public showCalculatedColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.CalculatedColumnStrategyId,
      ScreenPopups.CalculatedColumnPopup
    );
  }
}
