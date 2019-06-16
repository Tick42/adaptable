import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { IUserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';

export class UserFilterEntityRow extends React.Component<
  SharedEntityExpressionRowProps<UserFilterEntityRow>,
  {}
> {
  render(): any {
    let userFilter: IUserFilter = this.props.AdaptableBlotterObject as IUserFilter;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={userFilter.Name} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumnId(userFilter.ColumnId, this.props.Columns)}
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={ExpressionHelper.ConvertExpressionToString(
          userFilter.Expression,
          this.props.Columns
        )}
      />
    );
    colItems[3].Content = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        editClick={() => this.props.onEdit(userFilter)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={false}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.UserFilterStrategyName}
      />
    );

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }
}
