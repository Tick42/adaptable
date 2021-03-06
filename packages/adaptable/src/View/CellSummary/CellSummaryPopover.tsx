import * as React from 'react';
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import { CellSummaryDetails } from './CellSummaryDetails';

export interface CellSummaryPopoverProps extends React.ClassAttributes<CellSummaryPopover> {
  CellSummary: CellSummmary;
}

export class CellSummaryPopover extends React.Component<CellSummaryPopoverProps, {}> {
  render(): any {
    return <CellSummaryDetails CellSummary={this.props.CellSummary} />;
  }
}
