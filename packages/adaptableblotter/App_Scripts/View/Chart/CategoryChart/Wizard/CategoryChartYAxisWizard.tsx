import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { ICategoryChartDefinition } from '../../../../PredefinedConfig/IUserState Interfaces/ChartState';
import { AxisTotal } from '../../../../PredefinedConfig/Common Objects/ChartEnums';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { Panel, FormGroup, Row, Col, ControlLabel, Radio } from 'react-bootstrap';
import { AdaptableBlotterForm } from '../../../Components/Forms/AdaptableBlotterForm';
import { AdaptablePopover } from '../../../AdaptablePopover';
import { DualListBoxEditor, DisplaySize } from '../../../Components/ListBox/DualListBoxEditor';

export interface CategoryChartYAxisWizardProps
  extends AdaptableWizardStepProps<ICategoryChartDefinition> {}

export interface CategoryChartYAxisWizardState {
  YAxisColumnIds: string[];
  YAxisTotal: AxisTotal;
}

export class CategoryChartYAxisWizard
  extends React.Component<CategoryChartYAxisWizardProps, CategoryChartYAxisWizardState>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartYAxisWizardProps) {
    super(props);
    this.state = {
      YAxisColumnIds: props.Data.YAxisColumnIds,
      YAxisTotal: props.Data.YAxisTotal as AxisTotal,
    };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';

    let numericColumnIds = ColumnHelper.getNumericColumns(this.props.Columns).map(c => {
      return c.ColumnId;
    });
    let availableColumns: string[] = numericColumnIds
      .filter(c => ArrayExtensions.NotContainsItem(this.state.YAxisColumnIds, c))
      .map(ac => {
        return ColumnHelper.getFriendlyNameFromColumnId(ac, this.props.Columns);
      });

    let existingColumns: string[] = this.state.YAxisColumnIds.map(ec => {
      return ColumnHelper.getFriendlyNameFromColumnId(ec, this.props.Columns);
    });

    return (
      <div className={cssClassName}>
        <Panel header="Chart: Y (Vertical) Axis Column(s)" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="yAxisColumn">
              <Row>
                <Col xs={3} componentClass={ControlLabel}>
                  Display Total:
                </Col>
                <Col xs={7}>
                  <Radio
                    inline
                    value="Sum"
                    checked={this.state.YAxisTotal == AxisTotal.Sum}
                    onChange={e => this.onYAisTotalChanged(e)}
                  >
                    Sum
                  </Radio>
                  <Radio
                    inline
                    value="Average"
                    checked={this.state.YAxisTotal == AxisTotal.Average}
                    onChange={e => this.onYAisTotalChanged(e)}
                  >
                    Average
                  </Radio>{' '}
                  <AdaptablePopover
                    cssClassName={cssClassName}
                    headerText={'Chart Y Axis: Display Total'}
                    bodyText={[
                      'Choose whether the X Axis is grouped according to the sum of it values (by X Axis) or their average.',
                    ]}
                  />
                </Col>
              </Row>
            </FormGroup>
          </AdaptableBlotterForm>

          <DualListBoxEditor
            AvailableValues={availableColumns}
            cssClassName={cssClassName}
            SelectedValues={existingColumns}
            HeaderAvailable="Numeric Columns"
            HeaderSelected="Y Axis Columns"
            onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
            DisplaySize={DisplaySize.XSmall}
          />
        </Panel>
      </div>
    );
  }

  OnSelectedValuesChange(newValues: Array<string>) {
    let yAxisColumnIds = ColumnHelper.getColumnIdsFromFriendlyNames(newValues, this.props.Columns);
    this.setState({ YAxisColumnIds: yAxisColumnIds } as CategoryChartYAxisWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onYAisTotalChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let axisTotal: AxisTotal = e.value == 'Sum' ? AxisTotal.Sum : AxisTotal.Average;
    this.setState({ YAxisTotal: axisTotal } as CategoryChartYAxisWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds);
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds;
    this.props.Data.YAxisTotal = this.state.YAxisTotal;
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
