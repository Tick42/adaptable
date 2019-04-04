import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { ExportDestination } from '../../Enums';
import { ISchedule } from './ISchedule';

export interface IReport extends IAdaptableBlotterObject {
  Name: string;
  ReportColumnScope: 'AllColumns' | 'VisibleColumns' | 'SelectedColumns' | 'BespokeColumns';
  ReportRowScope: 'AllRows' | 'VisibleRows' | 'SelectedRows' | 'ExpressionRows';
  ColumnIds: string[];
  Expression: Expression;
}


export interface IAutoExport extends IAdaptableBlotterObject {
  Schedule: ISchedule,
  Name: string;
  ExportDestination: ExportDestination;
} 