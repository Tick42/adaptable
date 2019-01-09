import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
export declare class FreeTextColumnService implements IFreeTextColumnService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any;
    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo): void;
    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void;
}