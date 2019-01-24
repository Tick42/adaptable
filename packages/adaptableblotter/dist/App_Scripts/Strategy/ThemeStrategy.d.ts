import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
export declare class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private ThemeState;
    private style;
    private theme;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
}