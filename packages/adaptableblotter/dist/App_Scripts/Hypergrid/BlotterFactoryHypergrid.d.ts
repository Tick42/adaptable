import { AdaptableBlotter } from "./AdaptableBlotter";
import { IAdaptableBlotterOptions } from "../Api/Interface/IAdaptableBlotterOptions";
export declare module BlotterFactoryHypergrid {
    function CreateAdaptableBlotter(blotterOptions: IAdaptableBlotterOptions, renderGrid: boolean): AdaptableBlotter;
}