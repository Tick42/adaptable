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

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(5000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'entitlements demo'
  );

  adaptableBlotterOptions.filterOptions = {
    // useAdaptableBlotterFilterForm: false,
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

let demoConfig: PredefinedConfig = {
  Entitlements: {
    FunctionEntitlements: [
      {
        FunctionName: 'ColumnCategory',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'AdvancedSearch',
        AccessLevel: 'Hidden',
      },
      {
        FunctionName: 'Export',
        AccessLevel: 'ReadOnly',
      },
      {
        FunctionName: 'Layout',
        AccessLevel: 'ReadOnly',
      },
    ],
  },
  Export: {
    Reports: [
      {
        AutoExport: undefined,
        ColumnIds: [],
        Expression: {
          ColumnValueExpressions: [],
          FilterExpressions: [],
          RangeExpressions: [],
        },
        Name: 'Test',
        ReportColumnScope: 'AllColumns',
        ReportRowScope: 'AllRows',
      },
    ],
    CurrentReport: 'Test',
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
