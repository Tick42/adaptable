import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/base.scss';

import '../../../../App_Scripts/themes/dark.scss';
import '../../../../App_Scripts/themes/light.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { DataType } from '../../../../App_Scripts/PredefinedConfig/Common/Enums';

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  //gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'named filters demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;

  adaptableBlotterOptions.advancedOptions = {
    userFunctions: {
      namedFilterFunctions: [
        {
          name: 'USD Currency',
          func: (_record, _columnId, cellValue) => {
            return cellValue === 'USD';
          },
        },
        {
          name: 'Older than Jonny',
          func: (_record, _columnId, cellValue) => {
            return cellValue > 49;
          },
        },
      ],
    },
  };

  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
  adaptableblotter.applyLightTheme();
}

let demoConfig: PredefinedConfig = {
  NamedFilter: {
    NamedFilters: [
      {
        Name: '$ Trades',
        DataType: DataType.String,
        PredicateName: 'USD Currency',
      },
      {
        Name: 'Ancient',
        DataType: DataType.Number,
        PredicateName: 'Older than Jonny',
      },
    ],
  },
  ColumnFilter: {
    ColumnFilters: [
      {
        ColumnId: 'currency',
        Filter: {
          FilterExpressions: [
            {
              Filters: ['$ Trades'],
              ColumnId: 'currency',
            },
          ],
        },
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
