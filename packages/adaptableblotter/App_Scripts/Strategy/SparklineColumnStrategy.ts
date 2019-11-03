import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ISparklineColumnStrategy } from './Interface/ISparklineColumnStrategy';

import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { SparklineColumnState } from '../PredefinedConfig/DesignTimeState/SparklineColumnState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class SparklineColumnStrategy extends AdaptableStrategyBase
  implements ISparklineColumnStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklineColumnStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.SparklineColumnStrategyName,
      ComponentName: ScreenPopups.SparklineColumnPopup,
      Icon: StrategyConstants.SparklineColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'sparkline')) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
      };
      return this.createColumnMenuItemShowPopup(
        'Edit Sparkline Column',
        ScreenPopups.SparklineColumnPopup,
        StrategyConstants.SparklineColumnGlyph,
        popUpParams
      );
    }
  }

  protected InitState() {
    if (this.SparklinesState != this.GetSparklinesState()) {
      if (this.blotter.isInitialised) {
        // if we have made any changes then first delete them all
        this.SparklinesState.SparklineColumns.forEach(sparklineColumn => {
          this.blotter.removeSparkline(sparklineColumn);
        });

        this.GetSparklinesState().SparklineColumns.forEach(sparklineColumn => {
          this.blotter.editSparkline(sparklineColumn);
        });
        this.blotter.redraw();
      }
      this.SparklinesState = this.GetSparklinesState();
    }
  }

  protected GetSparklinesState(): SparklineColumnState {
    return this.blotter.api.sparklineColumnApi.getSparklineColumnState();
  }
}
