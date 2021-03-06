import * as React from 'react';
import * as Redux from 'redux';

import ListGroupItem from '../../../components/List/ListGroupItem';
import ListGroup, { ListGroupProps } from '../../../components/List/ListGroup';
import { Icon } from '../../../components/icons';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';

export interface ListBoxMenuProps extends ListGroupProps {
  MenuItems: AdaptableMenuItem[];
  onMenuItemClick: (action: Redux.Action) => Redux.Action;
}

export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {}

export class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
  constructor(props: ListBoxMenuProps) {
    super(props);

    this.state = {};
  }

  render() {
    let menuItems = this.props.MenuItems.map((menuItem: AdaptableMenuItem) => {
      return (
        <ListGroupItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
          <Icon name={menuItem.Icon} /> {menuItem.Label}
        </ListGroupItem>
      );
    });

    return (
      <div style={divStyle}>
        <ListGroup>{menuItems}</ListGroup>
      </div>
    );
  }

  onClick(menuItem: AdaptableMenuItem) {
    this.props.onMenuItemClick(menuItem.ReduxAction);
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '450px',
  marginBottom: '0',
};
