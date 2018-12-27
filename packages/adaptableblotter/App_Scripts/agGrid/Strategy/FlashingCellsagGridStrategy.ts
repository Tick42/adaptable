import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy'
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy'
import { DataType } from '../../Utilities/Enums'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants'
import { IFlashingCell } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
//import { IDataChangedEvent } from '../../Api/Interface/IDataChanges';

export class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
        this.currentFlashing = new Map()
    }
    private currentFlashing: Map<any, number>

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedInfo) {
        // no implementation required

    }

    protected FlashCell(dataChangedEvent: IDataChangedInfo, flashingCell: IFlashingCell, index: number): void {
        // no implementation required
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let numericColumns = ColumnHelper.getNumericColumns(this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            let theBlotter = this.blotter as AdaptableBlotter
            let currentFlashing = this.currentFlashing

            numericColumns.forEach(col => {
                let fc = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive)
                let index = this.FlashingCellState.FlashingCells.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params: any) {
                       
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let oldValue = theBlotter.getOldFlashingCellValue(col.ColumnId, primaryKey, params.value);
                        if (params.value > oldValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            theBlotter.refreshCells(params.node, [col.ColumnId])
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer: any = setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration)
                            currentFlashing.set(key, timer)
                            return true
                        } else {
                            return false;
                        }
                    }

                    cellClassRules[StyleConstants.FLASH_DOWN_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let oldValue = theBlotter.getOldFlashingCellValue(col.ColumnId, primaryKey, params.value);
                        if (oldValue && params.value < oldValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer: number = window.setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration)
                            currentFlashing.set(key, timer)
                            return true
                        }
                        return false
                    }

                }
                //   alert("i do this once for: " + col.ColumnId)
                theBlotter.setCellClassRules(cellClassRules, col.ColumnId, "FlashingCell");
            })
        }
    }
}
