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
import { AdaptableMenuItem, MenuInfo } from '../../../../App_Scripts/PredefinedConfig/Common/Menu';
import { ALL_DATA_REPORT } from '../../../../App_Scripts/Utilities/Constants/GeneralConstants';

var blotterApi: BlotterApi;
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  //gridOptions.getContextMenuItems = getContextMenuItems;

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'column menu demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  adaptableBlotterOptions.userInterfaceOptions = {
    // showAdaptableColumnMenu: true,
    // showAdaptableColumnMenu: false,

    showAdaptableColumnMenu: (menuItem: AdaptableMenuItem, menuInfo: MenuInfo) => {
      if (
        menuInfo.column.ColumnId === 'counterparty' &&
        (menuItem.FunctionName === 'ColumnChooser' || menuItem.FunctionName === 'PieChart')
      ) {
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
    ColumnMenuItems: (menuinfo: MenuInfo) => {
      return [
        {
          Label: 'hello',
          UserMenuItemClickedFunction: (menuInfo: MenuInfo) => null,
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
