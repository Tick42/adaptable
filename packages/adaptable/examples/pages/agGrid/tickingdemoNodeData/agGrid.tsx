import React, { useEffect } from 'react';

import Adaptable from '../../../../App_Scripts/agGrid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { AdaptableOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid updateRowData method which does NOT call cell value changed
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(tradeCount);

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'ticking demo node help'
  );
  adaptableOptions.predefinedConfig = json;
  const adaptableApi = Adaptable.init(adaptableOptions);

  // turn on mimicing ticking data
  tickingDataHelper.useTickingDataagGrid(gridOptions, tradeData, 2000, tradeCount);
}

let json: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Alert'],
  },
  FlashingCell: {
    FlashingCells: [
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
        FlashingCellDuration: 1000,
        UpColor: 'Blue',
        DownColor: 'Yellow',
      },
    ],
  },
  Alert: {
    AlertDefinitions: [
      {
        ColumnId: 'notional',
        Expression: undefined,
        MessageType: 'Info',
        Range: {
          Operand1: '',
          Operand1Type: 'Value',
          Operand2: '',
          Operand2Type: 'Value',
          Operator: 'AnyChange',
        },
        AlertProperties: {
          ShowPopup: false,
        },
      },
    ],
    AlertDisplayDiv: '',
    MaxAlertsInStore: 50,
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