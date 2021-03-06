import { ApiBase } from './ApiBase';
import { ActionColumnApi } from '../ActionColumnApi';
import { ActionColumnState, ActionColumn } from '../../PredefinedConfig/ActionColumnState';

export class ActionColumnApiImpl extends ApiBase implements ActionColumnApi {
  public getActionColumnState(): ActionColumnState {
    return this.getAdaptableState().ActionColumn;
  }

  public getAllActionColumn(): ActionColumn[] {
    let actionColumns: ActionColumn[] | undefined = this.getAdaptableState().ActionColumn
      .ActionColumns;
    if (actionColumns == undefined) {
      actionColumns = [];
    }
    return actionColumns;
  }
}
