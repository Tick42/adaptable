import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTradeColumnGrouping(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'grouping-demo'
  );

  //adaptableBlotterOptions.predefinedConfig = demoConfig;

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
  global.adaptableblotter = adaptableblotter;
}

let demoConfig: PredefinedConfig = {
  CalculatedColumn: {
    CalculatedColumns: [
      {
        ColumnExpression: 'Col("notional") * 2',
        ColumnId: 'Double Notional',
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'counterparty', 'notional', 'price', 'bid', 'stars'],
        ColumnSorts: [],
        Name: 'no calc cols',
      },
    ],
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
