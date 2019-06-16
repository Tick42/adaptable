import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { ICellValidationRule } from '../../../PredefinedConfig/IUserState/CellValidationState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { CellValidationHelper } from '../../../Utilities/Helpers/CellValidationHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { IUserFilter } from '../../../PredefinedConfig/IUserState/UserFilterState';

export interface CellValidationSummaryWizardProps
  extends AdaptableWizardStepProps<ICellValidationRule> {
  UserFilters: IUserFilter[];
}

export class CellValidationSummaryWizard
  extends React.Component<CellValidationSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CellValidationSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let keyValuePairs: IKeyValuePair[] = [
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
        Value: CellValidationHelper.createCellValidationDescription(
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

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CellValidationStrategyName}
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
