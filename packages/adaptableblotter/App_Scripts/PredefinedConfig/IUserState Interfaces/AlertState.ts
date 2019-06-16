import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import { IRange } from '../Common Objects/Expression/IRange';
import { Expression } from '../Common Objects/Expression/Expression';
export interface AlertState extends IUserState {
  AlertDefinitions?: IAlertDefinition[];
  MaxAlertsInStore?: number;
  AlertPopupDiv?: string;
}

export interface IAlertDefinition extends IAdaptableBlotterObject {
  ColumnId: string;
  Range: IRange;
  Expression?: Expression;
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';
  ShowAsPopup: boolean;
}
