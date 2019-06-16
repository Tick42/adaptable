import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { FreeTextColumn } from '../../../PredefinedConfig/RunTimeState/FreeTextColumnState';

export interface IFreeTextColumnService {
  GetFreeTextValue(column: FreeTextColumn, record: any): any;

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo): void;

  CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void;
}
