﻿import * as React from 'react';
import { connect } from 'react-redux';
import { kebabCase } from 'lodash';
import * as Redux from 'redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { DashboardState, CustomToolbar } from '../../PredefinedConfig/DashboardState';
import { GridState } from '../../PredefinedConfig/GridState';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Visibility, DashboardSize, MessageType } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { UIHelper } from '../UIHelper';
import Checkbox from '../../components/CheckBox';
import SimpleButton from '../../components/SimpleButton';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';
import { Icon } from '../../components/icons';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import {
  AdaptableDashboardToolbar,
  AdaptableDashboardToolbars,
} from '../../PredefinedConfig/Common/Types';
import { string } from 'prop-types';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

interface HomeToolbarComponentProps
  extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
  GridState: GridState;
  DashboardState: DashboardState;
  Columns: AdaptableColumn[];
  StatusMessage: string;
  StatusType: string;
  HeaderText: string;
  DashboardSize: DashboardSize;
  onNewColumnListOrder: (
    VisibleColumnList: AdaptableColumn[]
  ) => SystemRedux.SetNewColumnListOrderAction;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
  onSetToolbarVisibility: (
    toolbars: AdaptableDashboardToolbars
  ) => DashboardRedux.DashboardSetToolbarsAction;
}

class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {
  constructor(props: HomeToolbarComponentProps) {
    super(props);
    this.state = { configMenuItems: [] };
  }

  render() {
    const functionsGlyph: any = <Icon name={'home'} />;
    const colsGlyph: any = <Icon name={'list'} />;
    const toolbarsGlyph: any = <Icon name={'align-justify'} />;

    // List strategies that are allowed - i.e. are offered by Adaptable instance and are not Hidden Entitlement
    let strategyKeys: string[] = [...this.props.Adaptable.strategies.keys()];
    let allowedMenuItems: AdaptableMenuItem[] = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && ArrayExtensions.NotContainsItem(strategyKeys, x)
    );
    // function menu items
    let menuItems = allowedMenuItems.map(menuItem => {
      return {
        disabled: this.props.AccessLevel == 'ReadOnly',
        onClick: () => this.onClick(menuItem),
        icon: <Icon name={menuItem.Icon} />,
        label: menuItem.Label,
      };
    });

    // column items
    let colItems: any = [
      {
        clickable: false,
        label: (
          <div key="colTitle">
            {' '}
            &nbsp;&nbsp;<b>{'Columns'}</b>
          </div>
        ),
      },
    ];

    this.props.Columns.forEach((col: AdaptableColumn, index) => {
      colItems.push({
        id: col.ColumnId,
        onClick: (e: React.SyntheticEvent) => {
          this.onSetColumnVisibility(col.ColumnId);
        },
        label: (
          <Checkbox
            as="div"
            className="ab-dd-checkbox"
            my={0}
            value={col.ColumnId}
            key={col.ColumnId}
            checked={col.Visible}
            onMouseDown={preventDefault}
          >
            {col.FriendlyName}
          </Checkbox>
        ),
      });
    });

    // toolbar items
    let toolbarItems: any = [];
    let allowedMenuNames: string[] = allowedMenuItems.map(vm => {
      return vm.FunctionName;
    });
    toolbarItems.push({
      clickable: false,
      label: (
        <div key="toolbarTitle">
          {' '}
          &nbsp;&nbsp;<b>{'Toolbars'}</b>
        </div>
      ),
    });

    this.props.DashboardState.AvailableToolbars.forEach(
      (toolbar: AdaptableDashboardToolbar, index) => {
        // let myToolbar: string = toolbar as string;
        if (ArrayExtensions.ContainsItem(allowedMenuNames, toolbar)) {
          let isVisible: boolean = ArrayExtensions.ContainsItem(
            this.props.DashboardState.VisibleToolbars,
            toolbar
          );
          let functionName: string = StrategyConstants.getFriendlyNameForStrategyId(toolbar);
          let toolbarItem: any = this.createToolbar(toolbar, functionName, isVisible);
          toolbarItems.push(toolbarItem);
        }
      }
    );

    this.props.DashboardState.CustomToolbars.forEach((toolbar: CustomToolbar, index) => {
      let isVisible: boolean = ArrayExtensions.ContainsItem(
        this.props.DashboardState.VisibleToolbars,
        toolbar.Name
      );
      let toolbarItem: any = this.createToolbar(toolbar.Name, toolbar.Title, isVisible);
      toolbarItems.push(toolbarItem);
    });

    // functions dropdown
    let functionsDropdown = (
      <DropdownButton
        variant="text"
        items={menuItems}
        tooltip="Adaptable Functions"
        className="ab-DashboardToolbar__Home__functions"
        key={'dropdown-functions'}
        id={'dropdown-functions'}
      >
        {functionsGlyph}
      </DropdownButton>
    );

    // columns dropdown
    let columnsDropDown = (
      <DropdownButton
        variant="text"
        collapseOnItemClick={false}
        items={colItems}
        columns={['label']}
        className="ab-DashboardToolbar__Home__columns"
        key={'dropdown-cols'}
        id={'dropdown-cols'}
        tooltip="Select Columns"
      >
        {colsGlyph}
      </DropdownButton>
    );

    // toolbars dropdown
    let toolbarsDropDown = (
      <DropdownButton
        variant="text"
        collapseOnItemClick={false}
        key={'dropdown-toolbars'}
        id={'dropdown-toolbars'}
        className="ab-DashboardToolbar__Home__toolbars"
        columns={['label']}
        items={toolbarItems}
        tooltip="Manage Toolbars"
      >
        {toolbarsGlyph}
      </DropdownButton>
    );

    // shortcuts
    let shortcutsArray: string[] = this.props.DashboardState.VisibleButtons;

    let shortcuts: any;
    if (shortcutsArray) {
      shortcuts = shortcutsArray.map(x => {
        let menuItem = this.props.GridState.MainMenuItems.find(
          y => y.IsVisible && y.FunctionName == x
        );
        if (menuItem) {
          return menuItem.FunctionName === 'SystemStatus' ? (
            <SimpleButton
              key={menuItem.Label}
              variant="text"
              className={`ab-DashboardToolbar__Home__SystemStatus`}
              tooltip={menuItem.Label}
              disabled={this.props.AccessLevel == 'ReadOnly'}
              onClick={() => this.onClick(menuItem!)}
              AccessLevel={'Full'}
              // icon={UIHelper.getGlyphForMessageType(this.props.StatusType as MessageType)}
              icon={menuItem.Icon}
              style={UIHelper.getStyleForMessageType(this.props.StatusType as MessageType)}
            />
          ) : (
            <SimpleButton
              key={menuItem.Label}
              icon={menuItem.Icon}
              variant="text"
              className={`ab-DashboardToolbar__Home__${kebabCase(menuItem.Label)}`}
              tooltip={menuItem.Label}
              disabled={this.props.AccessLevel == 'ReadOnly'}
              onClick={() => this.onClick(menuItem!)}
              AccessLevel={'Full'}
            />
          );
        }
      });
    }

    let toolbarTitle = this.props.Adaptable.api.internalApi.setToolbarTitle();

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Home"
        showCloseButton={false}
        showMinimiseButton={true}
        onMinimise={() => this.props.onSetDashboardVisibility(Visibility.Minimised)}
        headerText={toolbarTitle}
        glyphicon={'home'}
        showGlyphIcon={false}
        onConfigure={() => this.props.onConfigure()}
      >
        <Flex flexDirection="row">
          {this.props.DashboardState.ShowFunctionsDropdown && functionsDropdown}

          {shortcuts}

          {this.props.DashboardState.ShowColumnsDropdown && columnsDropDown}

          {this.props.DashboardState.ShowToolbarsDropdown && toolbarsDropDown}
        </Flex>
      </PanelDashboard>
    );
  }

  createToolbar(
    toolbar: AdaptableDashboardToolbar | string,
    title: string,
    isVisible: boolean
  ): any {
    let test: any = {
      id: toolbar,
      onClick: (e: React.SyntheticEvent) => {
        this.onSetToolbarVisibility(toolbar, !isVisible);
      },
      label: (
        <Checkbox
          className="ab-dd-checkbox"
          my={0}
          as="div"
          value={toolbar}
          key={toolbar}
          checked={isVisible}
          onMouseDown={preventDefault}
        >
          {title}
        </Checkbox>
      ),
    };
    return test;
  }

  onClick(menuItem: AdaptableMenuItem) {
    this.props.onClick(menuItem.ReduxAction);
  }

  onShowSystemStatus() {
    this.props.Adaptable.api.systemStatusApi.showSystemStatusPopup();
  }

  onSetColumnVisibility(name: string) {
    let changedColumn: AdaptableColumn = ColumnHelper.getColumnFromId(name, this.props.Columns);

    let columns: AdaptableColumn[] = [].concat(this.props.Columns);
    changedColumn = Object.assign({}, changedColumn, {
      Visible: !changedColumn.Visible,
    });
    let index = columns.findIndex(x => x.ColumnId == name);
    columns[index] = changedColumn;
    this.props.onNewColumnListOrder(columns.filter(c => c.Visible));
  }

  onSetToolbarVisibility(name: string, checked: boolean) {
    //const strategy: string = this.props.DashboardState.AvailableToolbars.find(at => at == name);
    const visibleToolbars = [].concat(this.props.DashboardState.VisibleToolbars);
    if (checked) {
      visibleToolbars.push(name);
    } else {
      let index: number = visibleToolbars.findIndex(vt => vt == name);
      visibleToolbars.splice(index, 1);
    }
    this.props.onSetToolbarVisibility(visibleToolbars);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    GridState: state.Grid,
    DashboardState: state.Dashboard,
    Columns: state.Grid.Columns,
    StatusMessage: state.SystemStatus.StatusMessage,
    StatusType: state.SystemStatus.StatusType,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClick: (action: Redux.Action) => dispatch(action),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) =>
      dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
    onSetToolbarVisibility: (toolbars: AdaptableDashboardToolbars) =>
      dispatch(DashboardRedux.DashboardSetToolbars(toolbars)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.DashboardStrategyId,
          ScreenPopups.DashboardPopup
        )
      ),
  };
}

export const HomeToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeToolbarControlComponent);
