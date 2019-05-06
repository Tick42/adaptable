import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from "../Interface/BlotterObjects/IFreeTextColumn";
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { FreeTextStoredValue } from '../../View/UIInterfaces';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux'
import { IDataChangedInfo } from '../Interface/IDataChangedInfo';

export class FreeTextColumnService implements IFreeTextColumnService {
    constructor(private blotter: IAdaptableBlotter) {
        this.blotter = blotter;
    }


    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            if (ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
                let pkValue: any = this.blotter.getPrimaryKeyValueFromRecord(record);
                let freeTextStoredValue: FreeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(fdx => fdx.PrimaryKey == pkValue)
                if (freeTextStoredValue) {
                    return freeTextStoredValue.FreeText;
                }
            }
            return freeTextColumn.DefaultValue;
        }
        catch (e) {
            LoggingHelper.LogAdaptableBlotterError(e);
            return null;
        }
    }

    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo): void {
        let freeTextColumn: IFreeTextColumn = this.blotter.api.freeTextColumnApi.getAllFreeTextColumn().find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
        if (freeTextColumn) {
            let freeTextStoredValue: FreeTextStoredValue = { PrimaryKey: dataChangedEvent.IdentifierValue, FreeText: dataChangedEvent.NewValue }
            this.blotter.api.freeTextColumnApi.addEditFreeTextColumnStoredValue(freeTextColumn, freeTextStoredValue);
        }
    }

    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.freeTextColumnApi.getAllFreeTextColumn())) {
            dataChangedEvents.forEach(dc => {
                this.CheckIfDataChangingColumnIsFreeText(dc);
            })
        }
    }


}
