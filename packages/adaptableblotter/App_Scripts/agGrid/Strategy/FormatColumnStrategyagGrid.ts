import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

export class FormatColumnStrategyagGrid extends FormatColumnStrategy
  implements IFormatColumnStrategy {
  constructor(private blotterBypass: Adaptable) {
    super(blotterBypass);
    this.blotterBypass = blotterBypass;
  }

  public initStyles(): void {
    let columns = this.blotter.api.gridApi.getColumns();
    let formatColumns = this.blotter.api.formatColumnApi.getAllFormatColumn();
    let theBlotter = this.blotter as Adaptable;

    // adding this check as things can get mixed up during 'clean user data'
    if (columns.length > 0 && formatColumns.length > 0) {
      for (let column of columns) {
        let cellClassRules: any = {};
        formatColumns.forEach((fc, index) => {
          if (fc.ColumnId == column.ColumnId) {
            let styleName: string = StringExtensions.IsNullOrEmpty(fc.Style.ClassName)
              ? theBlotter.StyleService.CreateUniqueStyleName(
                  StrategyConstants.FormatColumnStrategyId,
                  fc
                )
              : fc.Style.ClassName;
            cellClassRules[styleName] = function(params: any) {
              return true;
            };
          }
        });
        theBlotter.setCellClassRules(cellClassRules, column.ColumnId, 'FormatColumn');
      }
    }

    this.blotter.redraw();
  }
}
