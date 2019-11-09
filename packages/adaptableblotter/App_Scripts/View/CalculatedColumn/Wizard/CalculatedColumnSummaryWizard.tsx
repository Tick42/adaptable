import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { CalculatedColumnHelper } from '../../../Utilities/Helpers/CalculatedColumnHelper';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';

export interface CalculatedColumnSummaryWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}

export class CalculatedColumnSummaryWizard
  extends React.Component<CalculatedColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSummaryWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null };
  }
  render(): any {
    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.ColumnId },
      {
        Key: 'Expression',
        Value: CalculatedColumnHelper.getExpressionString(
          this.props.Data.ColumnExpression,
          this.props.Columns
        ),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CalculatedColumnStrategyName}
      />
    );
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
