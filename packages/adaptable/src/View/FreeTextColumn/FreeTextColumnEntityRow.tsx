import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';

export class FreeTextColumnEntityRow extends React.Component<
  SharedEntityExpressionRowProps<FreeTextColumnEntityRow>,
  {}
> {
  render(): any {
    let FreeTextColumn = this.props.AdaptableObject as FreeTextColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={FreeTextColumn.ColumnId} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(FreeTextColumn.DefaultValue)
            ? '[None]'
            : FreeTextColumn.DefaultValue
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          ArrayExtensions.IsNullOrEmpty(FreeTextColumn.FreeTextStoredValues)
            ? 0
            : FreeTextColumn.FreeTextStoredValues.length
        }
      />
    );
    colItems[3].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(FreeTextColumn)}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.FreeTextColumnStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
