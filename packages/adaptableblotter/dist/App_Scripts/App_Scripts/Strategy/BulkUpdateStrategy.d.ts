import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { BulkUpdateState } from '../Redux/ActionsReducers/Interface/IState';
import { IPreviewInfo } from '../api/Interface/IPreview';
import { ICellInfo } from '../api/Interface/Interfaces';
export declare class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
    protected BulkUpdateState: BulkUpdateState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    ApplyBulkUpdate(newValues: ICellInfo[]): void;
    CheckCorrectCellSelection(): IStrategyActionReturn<boolean>;
    BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo;
    private GetBulkUpdateState;
}
