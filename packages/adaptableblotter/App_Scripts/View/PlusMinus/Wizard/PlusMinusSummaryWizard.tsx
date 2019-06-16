import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { PlusMinusRule } from '../../../PredefinedConfig/RunTimeState/PlusMinusState';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';

export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {
  UserFilters: UserFilter[];
}

export class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: PlusMinusSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let keyValuePairs: IKeyValuePair[] = [
      {
        Key: 'Name',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      { Key: 'Nudge Value', Value: this.props.Data.NudgeValue },
      { Key: 'Is Column Default', Value: this.props.Data.IsDefaultNudge ? 'True' : 'False' },
      {
        Key: 'Custom Rule',
        Value: this.props.Data.IsDefaultNudge
          ? 'None'
          : ExpressionHelper.ConvertExpressionToString(
              this.props.Data.Expression,
              this.props.Columns
            ),
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.PlusMinusStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    /* No implementation */
  }
  public Back(): void {
    /* No implementation */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return this.props.Data.IsDefaultNudge ? 2 : 1;
  }
}
