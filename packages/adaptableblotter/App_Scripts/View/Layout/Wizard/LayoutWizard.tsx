import * as React from 'react';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { LayoutSelectionWizard } from './LayoutSelectionWizard';
import { LayoutColumnWizard } from './LayoutColumnWizard';
import { LayoutSettingsWizard } from './LayoutSettingsWizard';
import { LayoutGridSortWizard } from './LayoutGridSortWizard';
import { LayoutSummaryWizard } from './LayoutSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout, ColumnSort } from '../../../PredefinedConfig/LayoutState';
import { LayoutGroupedColumnWizard } from './LayoutGroupedColumnWizard';
import ColumnHelper from '../../../Utilities/Helpers/ColumnHelper';
import { LayoutSetPivotingWizard } from './LayoutSetPivotingWizard';
import { LayoutPivotGroupedColumnWizard } from './LayoutPivotGroupedColumnWizard';
import { LayoutPivotHeaderColumnWizard } from './LayoutPivotHeaderColumnWizard';
import { LayoutPivotAggregationColumnWizard } from './LayoutPivotAggregationColumnWizard';

export interface LayoutWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: ColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: Layout[] = this.props.ConfigEntities as Layout[];
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.LayoutStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Source',
              Index: 0,
              Element: (
                <LayoutSelectionWizard Layouts={layouts} ColumnSorts={this.props.ColumnSorts} />
              ),
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <LayoutColumnWizard />,
            },
            {
              StepName: 'Sorting',
              Index: 2,
              Element: (
                <LayoutGridSortWizard
                  SortableColumns={ColumnHelper.getSortableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Grouping',
              Index: 3,
              Element: (
                <LayoutGroupedColumnWizard
                  GroupableColumns={ColumnHelper.getGroupableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 4,
              Element: <LayoutSetPivotingWizard />,
            },
            {
              StepName: 'Pivoting',
              Index: 5,
              Element: (
                <LayoutPivotGroupedColumnWizard
                  GroupableColumns={ColumnHelper.getGroupableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 6,
              Element: (
                <LayoutPivotHeaderColumnWizard
                  PivotableColumns={ColumnHelper.getPivotableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 7,
              Element: (
                <LayoutPivotAggregationColumnWizard
                  AggregetableColumns={ColumnHelper.getAggregetableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 8,
              Element: <LayoutSettingsWizard Layouts={layouts} />,
            },
            {
              StepName: 'Summary',
              Index: 9,
              Element: <LayoutSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
        >
      </div>
    );
  }
}
