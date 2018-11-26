import { IAdaptableBlotterOptions } from "./Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "./Interface/IAdaptableBlotter";
import { BlotterFactoryHypergrid } from "../Vendors/Hypergrid/BlotterFactoryHypergrid";
import { BlotterFactoryAgGrid } from "../Vendors/agGrid/BlotterFactoryAgGrid";

export module BlotterFactory {

  export function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions,  vendorGridName: 'agGrid' | 'Hypergrid' ): IAdaptableBlotter {
          switch (vendorGridName) {
          case 'agGrid':
            return BlotterFactoryAgGrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
          case 'Hypergrid':
            return BlotterFactoryHypergrid.CreateAdaptableBlotter(adaptableBlotterOptions, false);
            }
    }
}
