import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { ICellValidationRule } from '../../../PredefinedConfig/IUserState/CellValidationState';

export interface CellValidationSelectColumnWizardProps
  extends AdaptableWizardStepProps<ICellValidationRule> {}
export interface CellValidationSelectColumnWizardState {
  ColumnId: string;
}

export class CellValidationSelectColumnWizard
  extends React.Component<
    CellValidationSelectColumnWizardProps,
    CellValidationSelectColumnWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CellValidationSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-selectcolumn';

    return (
      <div className={cssClassName}>
        <Panel header="Select a Column" bsStyle="primary">
          <ColumnSelector
            cssClassName={cssClassName}
            SelectedColumnIds={[this.state.ColumnId]}
            ColumnList={this.props.Columns}
            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
            SelectionMode={SelectionMode.Single}
          />
        </Panel>
      </div>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as CellValidationSelectColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
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
