import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common Objects/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IDataChangedInfo } from '../../Utilities/Interface/IDataChangedInfo';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IConditionalStyle } from '../../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';
import { IColumnCategory } from '../../PredefinedConfig/IUserState Interfaces/ColumnCategoryState';

export class ConditionalStyleStrategyHypergrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  // Called when a single piece of data changes, ie. usually the result of an inline edit
  protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
    let conditionalStyles: IConditionalStyle[] = this.blotter.api.conditionalStyleApi.getAllConditionalStyle();
    if (ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
      let theBlotter = this.blotter as AdaptableBlotter;
      let columns = this.blotter.api.gridApi.getColumns();
      //here we don't call Repaint as we consider that we already are in the repaint loop
      for (let column of columns) {
        theBlotter.removeCellStyleHypergrid(
          dataChangedEvent.IdentifierValue,
          column.ColumnId,
          'csColumn'
        );
        theBlotter.removeCellStyleHypergrid(
          dataChangedEvent.IdentifierValue,
          column.ColumnId,
          'csRow'
        );
      }

      conditionalStyles.forEach(c => {
        if (c.Expression) {
          if (dataChangedEvent.Record) {
            if (
              ExpressionHelper.checkForExpressionFromRecord(
                c.Expression,
                dataChangedEvent.Record,
                columns,
                this.blotter
              )
            ) {
              if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, {
                  conditionalStyleRow: c.Style,
                });
              } else if (c.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                let columnCategory: IColumnCategory = this.blotter.api.columnCategoryApi
                  .getAllColumnCategory()
                  .find(lc => lc.ColumnCategoryId == c.ColumnCategoryId);
                columnCategory.ColumnIds.forEach(cc => {
                  theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, {
                    conditionalStyleColumn: c.Style,
                  });
                });
              } else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, {
                  conditionalStyleColumn: c.Style,
                });
              }
            }
          } else {
            if (
              ExpressionHelper.checkForExpression(
                c.Expression,
                dataChangedEvent.IdentifierValue,
                columns,
                this.blotter
              )
            ) {
              if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, {
                  conditionalStyleRow: c.Style,
                });
              } else if (c.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                let columnCategory: IColumnCategory = this.blotter.api.columnCategoryApi.getColumnCategoryById(
                  c.ColumnCategoryId
                );
                columnCategory.ColumnIds.forEach(cc => {
                  theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, {
                    conditionalStyleColumn: c.Style,
                  });
                });
              } else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, {
                  conditionalStyleColumn: c.Style,
                });
              }
            }
          }
        }
      });
    }
  }

  public initStyles(): void {
    let theBlotter = this.blotter as AdaptableBlotter;
    let columns = this.blotter.api.gridApi.getColumns();
    let conditionalStyles: IConditionalStyle[] = theBlotter.api.conditionalStyleApi.getAllConditionalStyle();
    theBlotter.removeAllCellStyleHypergrid('csColumn');
    theBlotter.removeAllCellStyleHypergrid('csRow');

    // adding this check as things can get mixed up during 'clean user data'
    if (columns.length > 0 && conditionalStyles.length > 0) {
      let rowConditionalStyles = conditionalStyles.filter(
        x => x.ConditionalStyleScope == ConditionalStyleScope.Row
      );

      let columnConditionalStyles = conditionalStyles
        .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
        .map(cs => cs);

      let columnConditionalStylesGroupedByColumn = ArrayExtensions.groupArrayBy(
        columnConditionalStyles,
        'ColumnId'
      );
      theBlotter.forAllRecordsDo((row: any) => {
        //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
        //an object with properties that have the name of the groupbykey
        for (let column in columnConditionalStylesGroupedByColumn) {
          //we just need to find one that match....
          for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
            let localCS: IConditionalStyle = columnCS;
            if (
              ExpressionHelper.checkForExpressionFromRecord(
                localCS.Expression,
                row,
                columns,
                this.blotter
              )
            ) {
              theBlotter.addCellStyleHypergrid(
                theBlotter.getPrimaryKeyValueFromRecord(row),
                localCS.ColumnId,
                { conditionalStyleColumn: localCS.Style }
              );
              break;
            }
          }
        }
        //we just need to find one that match....
        for (let rowCS of rowConditionalStyles) {
          if (
            ExpressionHelper.checkForExpressionFromRecord(
              rowCS.Expression,
              row,
              columns,
              this.blotter
            )
          ) {
            theBlotter.addRowStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), {
              conditionalStyleRow: rowCS.Style,
            });
            break;
          }
        }
      });
    }
    theBlotter.ReindexAndRepaint();
  }
}
