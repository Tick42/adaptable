import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { IPieChartStrategy } from './IPieChartStrategy';
import { MenuItemShowPopup } from '@adaptabletools/adaptable/src/Utilities/MenuItem';
import {
  AdaptableMenuItem,
  MenuInfo,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
import { DataType } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { StrategyParams } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.PieChartStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PieChartStrategyFriendlyName,
      ComponentName: ScreenPopups.PieChartPopup,
      Icon: StrategyConstants.PieChartGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (
      this.canCreateColumnMenuItem(column, this.adaptable) &&
      column.DataType !== DataType.NumberArray
    ) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
        source: 'ColumnMenu',
      };

      return this.createColumnMenuItemShowPopup(
        'View as Pie Chart',
        ScreenPopups.PieChartPopup,
        StrategyConstants.PieChartGlyph,
        popUpParams
      );
    }
  }

  // Add a context menu item - ONLY if the cell clicked one which is part of the current cell selection
  // and if the cell selection is a single column
  // not that we pass the primary kev values in the Strategy params
  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup | undefined = undefined;
    if (menuInfo.Column && menuInfo.IsSelectedCell && menuInfo.IsSingleSelectedColumn) {
      let pkValues: any[] = this.adaptable.api.gridApi.getSelectedCellInfo().GridCells.map(gc => {
        return gc.primaryKeyValue;
      });
      let popUpParams: StrategyParams = {
        columnId: menuInfo.Column.ColumnId,
        primaryKeyValues: pkValues,
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'View as Pie Chart',
        ComponentName: ScreenPopups.PieChartPopup,
        Icon: StrategyConstants.PieChartGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }
}
