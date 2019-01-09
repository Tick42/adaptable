import { IColumn } from '../../../Api/Interface/IColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject } from '../../../Api/Interface/IAdaptableBlotterObjects';
export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
    SummarisedColumn: IColumn;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}