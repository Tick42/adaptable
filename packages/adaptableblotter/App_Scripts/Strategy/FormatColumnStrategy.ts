import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export abstract class FormatColumnStrategy extends AdaptableStrategyBase
  implements IFormatColumnStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.FormatColumnStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.FormatColumnStrategyName,
      ComponentName: ScreenPopups.FormatColumnPopup,
      Icon: StrategyConstants.FormatColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'style')) {
      let formatExists: boolean = ArrayExtensions.ContainsItem(
        this.blotter.api.formatColumnApi.getAllFormatColumn().map(f => f.ColumnId),
        column.ColumnId
      );
      let label = formatExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: formatExists ? 'Edit' : 'New',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.FormatColumnStrategyName,
        ScreenPopups.FormatColumnPopup,
        StrategyConstants.FormatColumnGlyph,
        popupParam
      );
    }
  }

  public abstract initStyles(): void;
}
