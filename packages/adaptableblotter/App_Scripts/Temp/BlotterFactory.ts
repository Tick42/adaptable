import { AdaptableBlotterOptions } from '../BlotterOptions/AdaptableBlotterOptions';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { BlotterFactoryAgGrid } from '../agGrid/BlotterFactoryAgGrid';

/**
 * We would like to get rid of this annoying class.
 * Its ONLY being used by the React Wrapper as presently we use it to create either ag-Grid or Hypergrid instances.
 * This wil disappear when we move to React-aggrid only wrappers.
 */
export module BlotterFactory {
  export function CreateAdaptableBlotter(
    adaptableBlotterOptions: AdaptableBlotterOptions,
    vendorGridName: 'agGrid' | 'Hypergrid'
  ): IAdaptableBlotter {
    switch (vendorGridName) {
      case 'agGrid':
        return BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
      case 'Hypergrid':
        return null;
    }
  }
}
