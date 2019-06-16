import * as React from 'react';
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from '../../../../PredefinedConfig/IUserState/ChartState';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../../Utilities/Interface/IKeyValuePair';
import { WizardSummaryPage } from '../../../Components/WizardSummaryPage';
import { Expression } from '../../../../PredefinedConfig/Common/Expression/Expression';
import { ExpressionHelper } from '../../../../Utilities/Helpers/ExpressionHelper';

export interface CategoryChartSummaryWizardProps
  extends AdaptableWizardStepProps<ICategoryChartDefinition> {}

export class CategoryChartSummaryWizard extends React.Component<CategoryChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-summary';
    let friendlyNames = this.props.Data.YAxisColumnIds.map(c => {
      return ColumnHelper.getFriendlyNameFromColumnId(c, this.props.Columns);
    });
    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
      { Key: 'Y Axis Column(s)', Value: friendlyNames.join(', ') },
      { Key: 'Total', Value: this.props.Data.YAxisTotal },
      {
        Key: 'X Axis Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.XAxisColumnId,
          this.props.Columns
        ),
      },
      { Key: 'X Axis Values', Value: this.getExpressionString(this.props.Data.XAxisExpression) },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ChartStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
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
