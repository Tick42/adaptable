import * as React from 'react';
import { ExpressionBuilderConditionSelector } from './ExpressionBuilderConditionSelector';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { Grid, Row, Col } from 'react-bootstrap';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ExpressionBuilderPreview } from './ExpressionBuilderPreview';
import {
  ExpressionMode,
  DistinctCriteriaPairValue,
  QueryBuildStatus,
  QueryTab,
  AccessLevel,
} from '../../PredefinedConfig/Common/Enums';
import { IRawValueDisplayValuePair } from '../UIInterfaces';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonCondition } from '../Components/Buttons/ButtonCondition';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { NamedFilter } from '../../PredefinedConfig/RunTimeState/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/RunTimeState/ColumnCategoryState';

export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
  UserFilters: Array<UserFilter>;
  SystemFilters: Array<string>;
  NamedFilters: Array<NamedFilter>;
  ColumnCategories: Array<ColumnCategory>;
  ExpressionMode?: ExpressionMode;
  // these all need to be ptional because of wizard compatibility - todo: fix...
  UpdateGoBackState?(finish?: boolean): void;
  StepName?: string;
  cssClassName?: string;
  Columns?: Array<IColumn>;
  Blotter?: IAdaptableBlotter;
}

export interface ExpressionBuilderPageState {
  Expression: Expression;
  SelectedColumnId: string;
  SelectedTab: QueryTab;
}

export class ExpressionBuilderPage
  extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState>
  implements AdaptableWizardStep {
  render() {
    let cssClassName: string = this.props.cssClassName + '__querybuilder';
    let queryBuildStatus: QueryBuildStatus = this.getQueryBuildStatus();

    let newButton = (
      <ButtonCondition
        cssClassName={cssClassName}
        onClick={() => this.onSelectedColumnChanged()}
        overrideDisableButton={
          this.props.ExpressionMode == ExpressionMode.SingleColumn ||
          queryBuildStatus == QueryBuildStatus.SelectFirstColumn ||
          queryBuildStatus == QueryBuildStatus.SelectFurtherColumn ||
          queryBuildStatus == QueryBuildStatus.SingleConditionsAdded
        }
        overrideTooltip="Add Condition"
        style={{ width: '230px' }}
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={AccessLevel.Full}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          headerText="Query Builder"
          button={newButton}
          bsStyle="primary"
          style={{ height: '520px' }}
        >
          <Row>
            <Col xs={6}>
              <ExpressionBuilderConditionSelector
                ColumnsList={this.props.Columns}
                cssClassName={cssClassName}
                QueryBuildStatus={queryBuildStatus}
                UserFilters={this.props.UserFilters}
                SystemFilters={this.props.SystemFilters}
                NamedFilters={this.props.NamedFilters}
                ColumnCategories={this.props.ColumnCategories}
                Expression={this.state.Expression}
                ExpressionMode={
                  this.props.ExpressionMode != null
                    ? this.props.ExpressionMode
                    : ExpressionMode.MultiColumn
                }
                onExpressionChange={expression => this.onChangeExpression(expression)}
                onSelectedColumnChange={(columnId, tab) =>
                  this.onSelectedColumnChange(columnId, tab)
                }
                SelectedColumnId={this.state.SelectedColumnId}
                SelectedTab={this.state.SelectedTab}
                Blotter={this.props.Blotter}
              />
            </Col>
            <Col xs={6}>
              <ExpressionBuilderPreview
                Expression={this.state.Expression}
                cssClassName={cssClassName}
                UserFilters={this.props.UserFilters}
                onSelectedColumnChange={(columnId, tab) =>
                  this.onSelectedColumnChange(columnId, tab)
                }
                ColumnsList={this.props.Columns}
                DeleteColumnValue={(columnId, value) => this.DeleteColumnValue(columnId, value)}
                DeleteUserFilterExpression={(columnId, index) =>
                  this.DeleteUserFilterExpression(columnId, index)
                }
                DeleteRange={(columnId, index) => this.DeleteRange(columnId, index)}
                DeleteAllColumnExpression={columnId => this.DeleteAllColumnExpression(columnId)}
                ShowPanel={true}
              />
            </Col>
          </Row>
        </PanelWithButton>
      </div>
    );
  }

  getQueryBuildStatus(): QueryBuildStatus {
    // if no expression then assume its new  - fair?
    if (ExpressionHelper.IsNullOrEmptyExpression(this.state.Expression)) {
      if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
        return QueryBuildStatus.SelectFirstColumn; // you neeed to select a column
      } else {
        return QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
      }
    } else {
      // we have an expression
      if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
        return QueryBuildStatus.SelectFurtherColumn; // you neeed to select another column
      } else {
        return this.props.ExpressionMode == ExpressionMode.SingleColumn
          ? QueryBuildStatus.SingleConditionsAdded
          : QueryBuildStatus.MultipleConditionsAdded; // do we need this status???
      }
    }
  }

  onSelectedColumnChanged() {
    this.setState({ SelectedColumnId: '' } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteColumnValue(columnId: string, value: any) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnValues = this.state.Expression.ColumnValueExpressions.find(
      x => x.ColumnId == columnId
    );
    let index = columnValues.ColumnDisplayValues.indexOf(value);
    columnValues.ColumnDisplayValues.splice(index, 1);
    columnValues.ColumnRawValues.splice(index, 1);
    if (columnValues.ColumnDisplayValues.length == 0) {
      let columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteUserFilterExpression(columnId: string, index: number) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(
      x => x.ColumnId == columnId
    );
    columnUserFilterExpressions.Filters.splice(index, 1);
    if (columnUserFilterExpressions.Filters.length == 0) {
      let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteRange(columnId: string, index: number) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnRanges = this.state.Expression.RangeExpressions.find(x => x.ColumnId == columnId);
    columnRanges.Ranges.splice(index, 1);
    if (columnRanges.Ranges.length == 0) {
      let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteAllColumnExpression(columnId: string) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnValuesIndex: number = this.state.Expression.ColumnValueExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnValuesIndex >= 0) {
      this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
    }

    let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnUserFilterExpressionIndex >= 0) {
      this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
    }

    let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnRangesIndex >= 0) {
      this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
    }

    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  onChangeExpression(newExpression: Expression) {
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  onSelectedColumnChange(columnId: string, tab: QueryTab) {
    this.setState(
      { SelectedColumnId: columnId, SelectedTab: tab } as ExpressionBuilderPageState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return ExpressionHelper.IsNotEmptyOrInvalidExpression(this.state.Expression);
  }
  public canBack(): boolean {
    return this.props.ExpressionMode != ExpressionMode.SingleColumn;
  }
  public Next(): void {
    /*this.props.Data.Values = this.state.SelectedValues*/
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
  public StepName = 'Build Expression';
}
