import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    `calculated column demo`
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const adaptableApi: AdaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  CalculatedColumn: {
    CalculatedColumns: [
      {
        ColumnExpression: 'Col("notional") * 2',
        ColumnId: 'Dob Notional',
      },
    ],
  },
  Layout: {
    CurrentLayout: 'with calc cols',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'Dob Notional'],
        GroupedColumns: ['currency'],
        ColumnSorts: [],
        Name: 'with calc cols',
      },
    ],
  },
  ConditionalStyle: {
    ConditionalStyles: [
      {
        Style: {
          BackColor: '#0000ff',
          ForeColor: undefined,
          FontWeight: 'Normal',
          FontStyle: 'Normal',
          FontSize: undefined,
          ClassName: '',
        },
        ConditionalStyleScope: 'Row',
        Expression: {
          ColumnValueExpressions: [
            {
              ColumnId: 'country',
              ColumnDisplayValues: ['France', 'China'],
              ColumnRawValues: ['France', 'China'],
            },
          ],
        },
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
