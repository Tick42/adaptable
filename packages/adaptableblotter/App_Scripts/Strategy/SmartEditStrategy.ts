import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { MathOperation, DataType, MessageType, StateChangedTrigger } from '../Utilities/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { SmartEditState } from '../Redux/ActionsReducers/Interface/IState';
import { ICellInfo } from '../Utilities/Interface/ICellInfo';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellValidationRule } from '../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { IFunctionAppliedDetails } from '../Utilities/Interface/IAuditEvents';
import { BULK_UPDATE_APPLY } from '../Redux/ActionsReducers/BulkUpdateRedux';
import { SMARTEDIT_APPLY } from '../Redux/ActionsReducers/SmartEditRedux';

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SmartEditStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.SmartEditStrategyName,
      ScreenPopups.SmartEditPopup,
      StrategyConstants.SmartEditGlyph
    );
  }

  public ApplySmartEdit(newValues: ICellInfo[]): void {
    if (this.blotter.AuditLogService.isAuditFunctionEventsEnabled) {
      // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
      let functionAppliedDetails: IFunctionAppliedDetails = {
        name: StrategyConstants.SmartEditStrategyId,
        action: SMARTEDIT_APPLY,
        info: 'Smart Edit Applied',
        data: newValues,
      };
      this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }

    this.blotter.setValueBatch(newValues);
  }

  public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
    let selectedCellInfo: ISelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg: 'No cells are selected.\nPlease select some cells.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (selectedCellInfo.Columns.length != 1) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg: 'Smart Edit only supports single column edit.\nPlease adjust cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (selectedCellInfo.Columns[0].DataType != DataType.Number) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg:
            'Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    if (selectedCellInfo.Columns[0].ReadOnly) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg:
            'Smart Edit is not permitted on readonly columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    return { ActionReturn: true };
  }

  public BuildPreviewValues(
    smartEditValue: number,
    smartEditOperation: MathOperation
  ): IPreviewInfo {
    let selectedCells: ISelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    let previewResults: IPreviewResult[] = [];
    let columnId: string = selectedCells.Columns[0].ColumnId;

    for (let pair of selectedCells.Selection) {
      for (var selectedCell of pair[1]) {
        let newValue: number;
        switch (smartEditOperation) {
          case MathOperation.Add:
            newValue = Number(selectedCell.value) + smartEditValue;
            break;
          case MathOperation.Subtract:
            newValue = Number(selectedCell.value) - smartEditValue;
            break;
          case MathOperation.Multiply:
            newValue = Number(selectedCell.value) * smartEditValue;
            break;
          case MathOperation.Divide:
            newValue = Number(selectedCell.value) / smartEditValue;
            break;
        }
        //avoid the 0.0000000000x
        newValue = parseFloat(newValue.toFixed(12));

        let dataChangedEvent: IDataChangedInfo = {
          OldValue: Number(selectedCell.value),
          NewValue: newValue,
          ColumnId: selectedCell.columnId,
          IdentifierValue: pair[0],
          Record: null,
        };

        let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
          dataChangedEvent
        );

        let previewResult: IPreviewResult = {
          Id: pair[0],
          InitialValue: Number(selectedCell.value),
          ComputedValue: newValue,
          ValidationRules: validationRules,
        };
        previewResults.push(previewResult);
      }
    }

    return {
      ColumnId: columnId,
      PreviewResults: previewResults,
      PreviewValidationSummary: PreviewHelper.GetPreviewValidationSummary(previewResults),
    };
  }
}
