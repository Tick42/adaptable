import { BulkUpdateState } from '../../PredefinedConfig/RunTimeState/BulkUpdateState';

export interface IBulkUpdateApi {
  /**
   * Returns the whole contents of the Bulk Update State
   */
  getBulkUpdateState(): BulkUpdateState;

  /**
   * Returns the current Bulk Update value
   */
  getBulkUpdateValue(): string;
}
