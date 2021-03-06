import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '../PredefinedConfig/Common/Enums';

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnInfoStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ColumnInfoStrategyFriendlyName,
      ComponentName: ScreenPopups.ColumnInfoPopup,
      Icon: StrategyConstants.ColumnInfoGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable)) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        StrategyConstants.ColumnInfoStrategyFriendlyName,
        ScreenPopups.ColumnInfoPopup,
        StrategyConstants.ColumnInfoGlyph,
        popupParam
      );
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateColumnMenuItem(menuInfo.Column, this.adaptable)) {
      let popupParam: StrategyParams = {
        columnId: menuInfo.Column.ColumnId,
        source: 'ContextMenu',
      };
      if (menuInfo.Column) {
        menuItemShowPopup = this.createMainMenuItemShowPopup({
          Label: StrategyConstants.ColumnInfoStrategyFriendlyName,
          ComponentName: ScreenPopups.ColumnInfoPopup,
          Icon: StrategyConstants.ColumnInfoGlyph,
          PopupParams: popupParam,
        });
      }
    }
    return menuItemShowPopup;
  }
}
