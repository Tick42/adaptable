import { CalculatedColumnState, CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';

export interface CalculatedColumnApi {
  getCalculatedColumnState(): CalculatedColumnState;
  getAllCalculatedColumn(): CalculatedColumn[];
  addCalculatedColumn(calculatedColumn: CalculatedColumn): void;
  editCalculatedColumnExpression(column: string, columnExpression: string): void;
  deleteCalculatedColumn(column: string): void;

  /**
   * Opens the Calculated Column popup screen
   */
  showCalculatedColumnPopup(): void;
}
