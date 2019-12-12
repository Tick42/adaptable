import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AdaptableBlotterMenuItem } from '../../../../App_Scripts/PredefinedConfig/Common/Menu';
import { ColumnFilter } from '../../../../App_Scripts/PredefinedConfig/ColumnFilterState';
import { UserMenuItem } from '../../../../App_Scripts/PredefinedConfig/UserInterfaceState';
import FilterHelper from '../../../../App_Scripts/Utilities/Helpers/FilterHelper';
import ExpressionHelper from '../../../../App_Scripts/Utilities/Helpers/ExpressionHelper';
import { DataType } from '../../../../App_Scripts/PredefinedConfig/Common/Enums';
import { GridCell } from '../../../../App_Scripts/Utilities/Interface/Selection/GridCell';

var blotterApi: BlotterApi;
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'context menu demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
    //showAdaptableBlotterContextMenu: true,
    //showAdaptableBlotterContextMenu: false,

    showAdaptableBlotterContextMenu: (menuItem: AdaptableBlotterMenuItem) => {
      if (menuItem.StrategyId === 'ColumnChooser' || menuItem.StrategyId === 'SmartEdit') {
        return false;
      }
      return true;
    },
  };

  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'SystemStatus'],
  },
  SystemStatus: {
    ShowAlert: false,
  },
  UserInterface: {
    /*
    ContextMenuItems: [
      {
        Label: 'Set System Status',
        SubMenuItems: [
          {
            Label: 'Set Error',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setErrorSystemStatus('System Down');
            },
          },
          {
            Label: 'Set Warning',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setWarningSystemStatus('System Slow');
            },
          },
          {
            Label: 'Set Success',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setSuccessSystemStatus('System Fine');
            },
          },
          {
            Label: 'Set Info',
            UserMenuItemClickedFunction: () => {
              blotterApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
            },
          },
        ],
      },
    ],
    */

    ContextMenuItems: contextMenuInfo => {
      console.warn(contextMenuInfo);
      return [
        {
          Label: 'Set as Filter',
          UserMenuItemClickedFunction: contextMenuInfo => {
            blotterApi.columnFilterApi.createColumnFilterForValues(
              contextMenuInfo.column.ColumnId,
              [contextMenuInfo.gridCell.value]
            );
          },
        },
        {
          Label: 'Double Value',
          UserMenuItemClickedFunction: contextMenuInfo => {
            if (contextMenuInfo.column && contextMenuInfo.column.DataType == DataType.Number) {
              blotterApi.gridApi.setCellValue(
                contextMenuInfo.gridCell.columnId,
                contextMenuInfo.gridCell.value * 2,
                contextMenuInfo.gridCell.primaryKeyValue
              );
            } else {
              return null;
            }
          },
        },
      ];
    },
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
