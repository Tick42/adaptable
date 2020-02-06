import { IStrategy } from './IStrategy';
import { Glue42Report } from '../../PredefinedConfig/Glue42State';

export interface IGlue42Strategy extends IStrategy {
  sendSnapshot(report: Glue42Report, isLive: boolean): void;
  startLiveData(report: Glue42Report): void;
}
