import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import AdaptableBlotter from '../../../../App_Scripts/agGrid';

import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';
import '../../../../App_Scripts/themes/dark.scss';

import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getGridOptionsFTSE(50);
  const adaptableBlotterOptions: IAdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsFtse(
    gridOptions,
    'ftse demo'
  );
  const adaptableblotter: IAdaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
