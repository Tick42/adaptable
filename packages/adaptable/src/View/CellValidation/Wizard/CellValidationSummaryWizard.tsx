import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';

export interface CellValidationSummaryWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {
  UserFilters: UserFilter[];
}

export class CellValidationSummaryWizard
  extends React.Component<CellValidationSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CellValidationSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      { Key: 'Mode', Value: this.props.Data.ActionMode },
      {
        Key: 'Rule',
        Value: this.props.Adaptable.ValidationService.createCellValidationDescription(
          this.props.Data,
          this.props.Columns
        ),
      },
      {
        Key: 'Query',
        Value: ExpressionHelper.IsNotNullOrEmptyExpression(this.props.Data.Expression)
          ? ExpressionHelper.ConvertExpressionToString(
              this.props.Data.Expression,
              this.props.Columns
            )
          : 'None',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CellValidationStrategyFriendlyName}
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
    /* no implementation */
  }

  public Back(): void {
    /* no implementation */
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.Expression) ? 2 : 1;
  }
}
