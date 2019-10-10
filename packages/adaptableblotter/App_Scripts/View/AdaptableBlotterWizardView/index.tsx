import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { useReducer, Reducer, useState } from 'react';
import { GridOptions } from 'ag-grid-community';
import theme from '../../theme';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';

import join from '../../components/utils/join';

import FileDroppable from '../../components/FileDroppable';

import { prepareDataSource, WizardDataSourceInfo, prepareGridOptions } from './helper';
import ConfigurationDialog from './AdaptableBlotterConfigurationDialog';

interface AdaptableBlotterWizardViewProps {
  adaptableBlotterOptions: AdaptableBlotterOptions;
  onInit: (adaptableBlotterOptions: AdaptableBlotterOptions) => any;
  prepareData?: (
    data: any,
    file: File
  ) => {
    columns: string[];
    data: any[];
    primaryKey?: string;
  };
}

const AdaptableBlotterWizardView = (props: AdaptableBlotterWizardViewProps) => (
  <ThemeProvider theme={theme}>
    <Wizard {...props} />
  </ThemeProvider>
);

interface WizardState {
  dropped: boolean;
  error: any;
  adaptableBlotterOptions: AdaptableBlotterOptions;
}
const initialState: Partial<WizardState> = {
  dropped: false,
};

const reducer: Reducer<WizardState, any> = (state: WizardState, action: any) => {
  if (action.type === 'DROPPED') {
    return {
      ...state,
      adaptableBlotterOptions: action.payload,
      dropped: true,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      dropped: false,
      error: action.payload,
    };
  }

  if (action.type === 'CANCEL') {
    return {
      ...state,
      error: null,
      dropped: false,
    };
  }

  return state;
};

const validDataSource = (dataSourceInfo: any) => {
  if (!dataSourceInfo || !Array.isArray(dataSourceInfo.columns)) {
    throw `We can't find any columns in your configuration`;
  }

  if (!dataSourceInfo.columns.length) {
    throw 'You should have at least one column';
  }

  const allStringColumns = dataSourceInfo.columns.reduce((acc: boolean, col: any) => {
    if (!col || typeof col !== 'string') {
      return false;
    }
    return acc;
  }, true);

  if (!allStringColumns) {
    throw `Some of your columns are not strings`;
  }

  if (!Array.isArray(dataSourceInfo.data)) {
    throw `We can't find the data array in your configuration`;
  }

  return true;
};

const Wizard = (props: AdaptableBlotterWizardViewProps) => {
  const [state, dispatch] = useReducer<Reducer<WizardState, any>>(reducer, {
    ...initialState,
    adaptableBlotterOptions: props.adaptableBlotterOptions,
  } as WizardState);

  const [droppableKey, setDroppableKey] = useState(Date.now());

  const onDropSuccess = (array: any, file: File) => {
    const dataSourceInfo: WizardDataSourceInfo = (props.prepareData || prepareDataSource)(
      array,
      file
    );

    try {
      validDataSource(dataSourceInfo);
    } catch (err) {
      return dispatch({
        type: 'ERROR',
        payload: `Invalid blotter configuration - ${err}`,
      });
    }
    const gridOptions: GridOptions = prepareGridOptions(dataSourceInfo);

    const adaptableBlotterOptions = { ...props.adaptableBlotterOptions };

    adaptableBlotterOptions.blotterId = adaptableBlotterOptions.blotterId || file.name;
    adaptableBlotterOptions.vendorGrid = gridOptions;
    if (dataSourceInfo.primaryKey) {
      adaptableBlotterOptions.primaryKey = dataSourceInfo.primaryKey;
    }
    dispatch({
      type: 'DROPPED',
      payload: adaptableBlotterOptions,
    });
  };

  let wizard;

  if (state.dropped) {
    wizard = (
      <ConfigurationDialog
        adaptableBlotterOptions={state.adaptableBlotterOptions}
        onCancel={() => {
          // change the file droppable component key
          // so it's remounted and it's in the initial state
          setDroppableKey(Date.now());
          dispatch({
            type: 'CANCEL',
          });
        }}
        onFinish={adaptableBlotterOptions => {
          props.onInit(adaptableBlotterOptions);
        }}
      />
    );
  }

  return (
    <>
      <FileDroppable
        key={droppableKey}
        className={join('ab-Wizard')}
        alignItems="center"
        justifyContent="center"
        message={state.error}
        onDropSuccess={onDropSuccess}
      ></FileDroppable>
      {wizard}
    </>
  );
};

export default AdaptableBlotterWizardView;
