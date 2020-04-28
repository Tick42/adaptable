import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CalculatedColumnStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CalculatedColumnStrategyFriendlyName,
        ComponentName: ScreenPopups.CalculatedColumnPopup,
        Icon: StrategyConstants.CalculatedColumnGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      if (
        this.adaptable.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
        };

        return [
          this.createColumnMenuItemShowPopup(
            'Edit ' + StrategyConstants.CalculatedColumnStrategyFriendlyName,
            ScreenPopups.CalculatedColumnPopup,
            StrategyConstants.CalculatedColumnGlyph,
            popupParam
          ),
        ];
      }
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<CalculatedColumn> {
    return {
      FunctionEntities: this.adaptable.api.calculatedColumnApi.getAllCalculatedColumn(),
      AddAction: CalculatedColumnRedux.CalculatedColumnAdd,
      EditAction: CalculatedColumnRedux.CalculatedColumnEdit,
    };
  }
}
