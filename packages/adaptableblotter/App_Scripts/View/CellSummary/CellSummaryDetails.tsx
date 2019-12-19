import * as React from 'react';
import { IColItem } from '../UIInterfaces';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { ICellSummmary } from '../../Utilities/Interface/Selection/ICellSummmary';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';
import EmptyContent from '../../components/EmptyContent';

interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
  CellSummary: ICellSummmary;
}

export class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
  render() {
    let colItems: IColItem[] = [
      { Content: 'Operation', Size: 5 },
      { Content: 'Value', Size: 7 },
    ];

    let rowElements: any[] = [];
    if (this.props.CellSummary != null) {
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Sum, this.props.CellSummary.Sum)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Average, this.props.CellSummary.Average)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Median, this.props.CellSummary.Median)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Mode, this.props.CellSummary.Mode)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Distinct, this.props.CellSummary.Distinct)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Max, this.props.CellSummary.Max)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Min, this.props.CellSummary.Min)
      );
      rowElements.push(
        this.createRow(colItems, CellSummaryOperation.Count, this.props.CellSummary.Count)
      );
      if (this.props.CellSummary.Only != null) {
        rowElements.push(
          this.createRow(colItems, CellSummaryOptionalOperation.Only, this.props.CellSummary.Only)
        );
      }
      if (this.props.CellSummary.VWAP != null) {
        rowElements.push(
          this.createRow(colItems, CellSummaryOptionalOperation.VWAP, this.props.CellSummary.VWAP)
        );
      }
    }

    return (
      <div>
        <PanelWithRow colItems={colItems} />
        {this.props.CellSummary != null ? (
          <div>{rowElements}</div>
        ) : (
          <EmptyContent>
            <p>No cells are selected - please select some cells.</p>
          </EmptyContent>
        )}
      </div>
    );
  }

  private createRow(colItems: IColItem[], key: any, value: any): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = key;
    rowColItems[1].Content = value;
    let rowElement = (
      <AdaptableObjectRow style={{ minWidth: 185 }} key={key} colItems={rowColItems} />
    );
    return rowElement;
  }
}
