import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { ApiBase } from './ApiBase';
import { ICellValidationApi } from './Interface/ICellValidationApi';
import {
  CellValidationState,
  CellValidationRule,
} from '../PredefinedConfig/RunTimeState/CellValidationState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class CellValidationApi extends ApiBase implements ICellValidationApi {
  public getCellValidationState(): CellValidationState {
    return this.getBlotterState().CellValidation;
  }

  public getAllCellValidation(): CellValidationRule[] {
    return this.getCellValidationState().CellValidations;
  }

  public addCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAdd(cellValidationRule));
  }

  public deleteCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationDelete(cellValidationRule));
  }

  public showCellValidationPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.CellValidationStrategyId,
      ScreenPopups.CellValidationPopup
    );
  }
}
