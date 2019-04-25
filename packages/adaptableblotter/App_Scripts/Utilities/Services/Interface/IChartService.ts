import { ICategoryChartDefinition, IPieChartDefinition } from "../../Interface/BlotterObjects/Charting/IChartDefinition";
import { IChartData } from "../../Interface/BlotterObjects/Charting/IChartData";
import { IPieChartDataItem } from "../../Interface/BlotterObjects/Charting/IPieChartDataItem";
import { IColumn } from "../../Interface/IColumn";

export interface IChartService {
  BuildCategoryChartData(chartDefinition: ICategoryChartDefinition , columns: IColumn[]): IChartData

  BuildPieChartData(chartDefinition:IPieChartDefinition): IChartData 
}
