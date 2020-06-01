import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  MenuInfo,
  AdaptableMenuItem,
} from '../../../../src/types';
import { GlueExampleHelper } from '../../GlueExampleHelper';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import glue42Desktop from '@glue42/desktop';
import glue42office from '@glue42/office';
import { TickingDataHelper } from '../../TickingDataHelper';
import { GlueIntegrationExampleHelper } from '../../GlueIntegrationExampleHelper';
import { UserMenuItem } from '../../../../src/PredefinedConfig/UserInterfaceState';

async function InitAdaptableDemo() {
  const examplesHelper = new GlueIntegrationExampleHelper();
  const tradeCount: number = 30;
  const tradeData: any = await examplesHelper.getTrades(0);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = false;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'glue42 Demo',
    vendorGrid: {
      ...gridOptions,
      modules: [MenuModule, RangeSelectionModule],
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      {
        type: 'UserMenuItemClickedFunction',
        name: 'name',
        handler: (menuInfo: MenuInfo) => {
          console.log('hey!');
        },
      },
    ],
  };

  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.auditOptions = {
    auditTickingDataUpdates: {
      auditToConsole: true,
    },
    // no userFunctions?
  };

  const adaptableApi = Adaptable.init(adaptableOptions);

  if (useTickingData) {
    tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 1000, tradeCount);
  }
}

const generateMenuItem = (symbol: any) => {
  let name;
  let action = () => {};
  switch (symbol.symbol) {
    case 'Client':
      {
        name = `${symbol.displayValue} details`;
        action = () => {
          return () => {
            // adaptableApi....

            demoConfig!.Glue42!.Glue().then((g: any) => console.log(g.interop.methods()));
          };
        };
      }
      break;
    case 'Trade':
      {
        name = `Trade ${symbol.displayValue}`;
        action = () => {
          return () => {
            console.log(symbol);
          };
        };
      }
      break;
    default:
      break;
  }
  return {
    Label: name,
    UserMenuItemClickedFunction: action(),
  };
};

const generateItems = (symbols: any[]): any[] => {
  const values = symbols.map(symbol => generateMenuItem(symbol));
  return values;
};

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Glue42'],
  },
  Glue42: {
    Glue: glue42Desktop, // this is the glue object
    Glue4Office: glue42office, // this is the Glue4Office object
    Username: 'kparushev',
    Password: 'demopassword', // put in .env file
    Channels: true,
    Contexts: true,
  },
  UserInterface: {
    ContextMenuItems: [
      {
        Label: 'hey',
        UserMenuItemClickedFunction: 'name',
      },
    ],
  },
  FlashingCell: {
    FlashingCells: [
      {
        IsLive: true,
        ColumnId: 'notional',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'ask',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'bid',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'price',
        FlashingCellDuration: 500,
        UpColor: 'Blue',
        DownColor: 'Yellow',
      },
    ],
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
