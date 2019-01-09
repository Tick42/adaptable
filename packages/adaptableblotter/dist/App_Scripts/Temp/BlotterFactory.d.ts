import { IAdaptableBlotterOptions } from "./../Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../Api/Interface/IAdaptableBlotter";
export declare module BlotterFactory {
    function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions, vendorGridName: 'agGrid' | 'Hypergrid'): IAdaptableBlotter;
}