import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}