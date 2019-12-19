import XLSX from 'xlsx';
import AdaptableBlotter, {
  AdaptableBlotterWizard as ABWizard,
} from '../../adaptableblotter/App_Scripts/agGrid';

import { AdaptableBlotterOptions, BlotterApi } from '../../adaptableblotter/types';
import { IAdaptableBlotterWizardOptions } from '../../adaptableblotter/types';

export * from '../../adaptableblotter/types';

export const readJSONFile = async (file: File, toJSON?: (str: string) => Promise<any> | any) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      try {
        const fn = toJSON || JSON.parse;
        const json = fn((e as any).target.result);

        Promise.resolve(json).then(resolve);
      } catch (ex) {
        reject('Invalid JSON');
      }
    };
    reader.onerror = function(e) {
      reject(e);
    };
    reader.readAsText(file);
  });
};

export const readExcelFile = (file: File): Promise<any> => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const asBinary: boolean = !!reader.readAsBinaryString;

  return new Promise((resolve, reject) => {
    reader.onload = (e: any) => {
      const wb = XLSX.read(e.target.result, { type: asBinary ? 'binary' : 'array' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      resolve(data);
    };
    reader.onerror = reject;
    if (asBinary) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

export default class AdaptableBlotterWizard {
  public static init(
    adaptableBlotterOptions: AdaptableBlotterOptions,
    extraOptions?: IAdaptableBlotterWizardOptions
  ): Promise<BlotterApi> {
    let adaptableBlotter;

    let isJSON: boolean;

    return new Promise((resolve, reject) => {
      const wizard = new ABWizard(adaptableBlotterOptions, {
        defaultActionMessage:
          'Click here to select an Excel or JSON file to load — or drag it here',

        fileAccept:
          '.json,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        readFile: (file: File): Promise<any> => {
          isJSON = (file.type && file.type.indexOf('json')) != -1 || file.name.endsWith('.json');
          if (isJSON) {
            return readJSONFile(file);
          }

          return readExcelFile(file);
        },
        ...extraOptions,
        onInit: ({ adaptableBlotterOptions, gridOptions }) => {
          let onInitResult;
          if (extraOptions && typeof extraOptions.onInit === 'function') {
            onInitResult = extraOptions.onInit({ adaptableBlotterOptions, gridOptions });
          }

          if (!(onInitResult instanceof AdaptableBlotter)) {
            adaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);
          } else {
            adaptableBlotter = onInitResult;
          }

          resolve(adaptableBlotter.api);

          return adaptableBlotter;
        },
      });
    });
  }
}
