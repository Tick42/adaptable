import * as React from 'react';

import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '../../../../PredefinedConfig/ChartState';
import ColumnHelper from '../../../../Utilities/Helpers/ColumnHelper';
import { WizardSummaryPage } from '../../../Components/WizardSummaryPage';
import { KeyValuePair } from '../../../../Utilities/Interface/KeyValuePair';
import { Expression } from '../../../../PredefinedConfig/Common/Expression';
import ExpressionHelper from '../../../../Utilities/Helpers/ExpressionHelper';

export interface SparklinesChartSummaryWizardProps
  extends AdaptableWizardStepProps<SparklinesChartDefinition> {}

export class SparklinesChartSummaryWizard
  extends React.Component<SparklinesChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: SparklinesChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      { Key: 'Values', Value: this.getExpressionString(this.props.Data.Expression) },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ChartStrategyFriendlyName}
      />
    );
    return <div>{summaryPage}</div>;
  }
  private getExpressionString(expression: Expression): string {
    if (ExpressionHelper.IsNullOrEmptyExpression(expression)) {
      return '[All Column Values]';
    } else {
      return ExpressionHelper.ConvertExpressionToString(expression, this.props.Columns, false);
    }
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    //
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}