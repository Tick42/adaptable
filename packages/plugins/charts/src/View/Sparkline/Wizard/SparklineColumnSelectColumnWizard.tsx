import * as React from 'react';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { SelectionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { ColumnSelector } from '@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector';
import { ColumnHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';

export interface SparklineColumnSelectColumnWizardProps
  extends AdaptableWizardStepProps<SparklineColumn> {}
export interface SparklineColumnSelectColumnWizardState extends SparklineColumn {}

export class SparklineColumnSelectColumnWizard
  extends React.Component<
    SparklineColumnSelectColumnWizardProps,
    SparklineColumnSelectColumnWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: SparklineColumnSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
      SparklineType: this.props.Data.SparklineType,
      MinimumValue: this.props.Data.MinimumValue,
      MaximumValue: this.props.Data.MaximumValue,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={ColumnHelper.getNumericArrayColumns(this.props.Columns)}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    if (columns.length > 0) {
      // let distinctColumnsValues: number[] = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
      //   columns[0].ColumnId,
      //   DistinctCriteriaPairValue.RawValue,
      //   false
      // ).map(pair => {
      //   return pair.RawValue;
      // });
      // let minValue = Math.min(...distinctColumnsValues);
      // let maxValue = Math.max(...distinctColumnsValues);
      this.setState(
        {
          ColumnId: columns[0].ColumnId,
          // MinimumValue: minValue,
          // MaximumValue: maxValue,
        } as SparklineColumnSelectColumnWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ColumnId: '' } as SparklineColumnSelectColumnWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.SparklineType = this.state.SparklineType;
    this.props.Data.MinimumValue = this.state.MinimumValue;
    this.props.Data.MaximumValue = this.state.MaximumValue;
  }

  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
