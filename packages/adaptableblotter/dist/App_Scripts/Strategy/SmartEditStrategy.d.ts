import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { MathOperation } from '../Utilities/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { ICellInfo } from "../Utilities/Interface/ICellInfo";
import { IPreviewInfo } from '../Utilities/Interface/IPreview';
export declare class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
    private SmartEditState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    ApplySmartEdit(newValues: ICellInfo[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(smartEditValue: number, smartEditOperation: MathOperation): IPreviewInfo;
    private GetSmartEditState;
}
