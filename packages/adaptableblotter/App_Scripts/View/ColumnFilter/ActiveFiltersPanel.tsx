import * as React from 'react';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { IColItem } from '../UIInterfaces';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';

export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
  ColumnFilters: ColumnFilter[];
  Columns: IColumn[];

  AccessLevel: AccessLevel;
  onClear: (columnFilter: ColumnFilter) => void;
  onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
}

export class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
  render(): any {
    let colItems: IColItem[] = [
      { Content: 'Column', Size: 4 },
      { Content: 'Filter', Size: 5 },
      { Content: '', Size: 3 },
    ];

    let rowElements: any[] = [];
    this.props.ColumnFilters.forEach((columnFilter: ColumnFilter, index: number) => {
      rowElements.push(this.createRow(colItems, columnFilter));
    });

    return (
      <div>
        <PanelWithRow colItems={colItems} />
        <div>{rowElements}</div>
      </div>
    );
  }

  private createRow(colItems: IColItem[], columnFilter: ColumnFilter): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(
      columnFilter.ColumnId,
      this.props.Columns
    );
    rowColItems[1].Content = ExpressionHelper.ConvertExpressionToString(
      columnFilter.Filter,
      this.props.Columns,
      false
    );
    rowColItems[2].Content = (
      <span style={{ alignContent: 'right' }}>
        <ButtonSave
          onClick={() => this.props.onSaveColumnFilterasUserFilter(columnFilter)}
          tooltip="Save as User Filter"
          disabled={
            columnFilter == null ||
            ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions)
          }
          AccessLevel={this.props.AccessLevel}
        />{' '}
        <ButtonClear
          onClick={() => this.props.onClear(columnFilter)}
          tooltip="Clear Column Filter"
          disabled={columnFilter == null}
          AccessLevel={this.props.AccessLevel}
        />
      </span>
    );

    let rowElement = <AdaptableObjectRow key={columnFilter.ColumnId} colItems={rowColItems} />;
    return rowElement;
  }
}
