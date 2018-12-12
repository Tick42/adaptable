"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = require("../EventDispatcher");
/*
For now this is a very rough and ready Audit Service which will recieve notifications of changes in data - either via an event fired in the blotter or through other strategies.
This means that we are able to work out old and new values - though for the first pass its a bit brittle as we look at _pristineData via a method in the Blotter...
*/
class AuditService {
    constructor(blotter) {
        this.blotter = blotter;
        this._onDataSourceChanged = new EventDispatcher_1.EventDispatcher();
        this._columnDataValueList = new Map();
    }
    //This is a bad idea as it duplicates all data but in the end that what getdirtyvalue was doing....
    //just need to refactor the whole lot. For now it's called only from aggrid and kendo
    Init(initialData) {
        let colummns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let blotterOptions = this.blotter.BlotterOptions;
        for (let record of initialData) {
            for (let prop in record) {
                if (record.hasOwnProperty(prop) && colummns.find(x => x.ColumnId == prop)) {
                    let primaryKey = record[blotterOptions.primaryKey];
                    var dataChangedEvent = { OldValue: null, NewValue: record[prop], ColumnId: prop, IdentifierValue: primaryKey, Timestamp: Date.now(), Record: record };
                    this.InitAddDataValuesToList(dataChangedEvent);
                }
            }
        }
    }
    //slightly optimized version of the AddDataValuesToList so we don't check for data already present
    InitAddDataValuesToList(dataChangedEvent) {
        let myList = this.getDataEventsForColumn(dataChangedEvent.ColumnId);
        let datechangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
        myList.set(dataChangedEvent.IdentifierValue, datechangedInfo);
    }
    CreateAuditChangedEvent(dataChangedEvent) {
        this.AddDataValuesToList(dataChangedEvent);
        if (dataChangedEvent.NewValue != dataChangedEvent.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedEvent);
        }
    }
    CreateAuditEvent(identifierValue, newValue, columnId, record) {
        var dataChangedEvent = { OldValue: null, NewValue: newValue, ColumnId: columnId, IdentifierValue: identifierValue, Timestamp: Date.now(), Record: record };
        this.CreateAuditChangedEvent(dataChangedEvent);
    }
    AddDataValuesToList(dataChangedEvent) {
        // add it to the list if not exist for that row - at the moment there is not maximum and no streaming...
        let myList = this.getDataEventsForColumn(dataChangedEvent.ColumnId);
        let localdatachangedInfo = myList.get(dataChangedEvent.IdentifierValue);
        if (localdatachangedInfo) {
            dataChangedEvent.OldValue = localdatachangedInfo.NewValue;
            localdatachangedInfo.OldValue = dataChangedEvent.OldValue;
            localdatachangedInfo.NewValue = dataChangedEvent.NewValue;
            localdatachangedInfo.Timestamp = dataChangedEvent.Timestamp;
        }
        else {
            let datechangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
            myList.set(dataChangedEvent.IdentifierValue, datechangedInfo);
        }
    }
    getExistingDataValue(dataChangingEvent) {
        let myList = this.getDataEventsForColumn(dataChangingEvent.ColumnId);
        let localdatachangedInfo = myList.get(dataChangingEvent.IdentifierValue);
        if (localdatachangedInfo) {
            return localdatachangedInfo.NewValue;
        }
        return null;
    }
    getDataEventsForColumn(columnId) {
        // first check the list exists
        if (this._columnDataValueList.size == 0) {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            columns.forEach(c => {
                this._columnDataValueList.set(c.ColumnId, new Map());
            });
        }
        // get the item
        let myList = this._columnDataValueList.get(columnId);
        //in case we created a new calculated column
        if (!myList) {
            myList = new Map();
            this._columnDataValueList.set(columnId, myList);
        }
        return myList;
    }
    OnDataSourceChanged() {
        return this._onDataSourceChanged;
    }
}
exports.AuditService = AuditService;