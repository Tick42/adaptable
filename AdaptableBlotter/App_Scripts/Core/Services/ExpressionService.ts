import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { INamedExpression, IRangeExpression } from '../Interface/IExpression';
import { ColumnType, LeafExpressionOperator } from '../Enums'
import { IExpressionService } from './Interface/IExpressionService';
import { StringExtensions } from '../../Core/Extensions';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo } from '../../Core/Expression/PredefinedExpressionHelper';


export class ExpressionService implements IExpressionService {

    private _namedExpressions: INamedExpression[];

    constructor(private blotter: IAdaptableBlotter) {
        this._namedExpressions = [];
    }

    // only doing this because we seem to lose hte "isExpressionSatisfied" bit when we persist so we cannot rely on it being in the object
    // so either we get it every time we load for every expression or we go via this method
    public EvaluateExpression(expressionId: string, valueToCheck: any): boolean {
        return this.GetNamedExpressions().find(e => e.Id == expressionId).isExpressionSatisfied(valueToCheck);
    }

    public ShouldShowNamedExpressionForColumn(namedExpression: INamedExpression, column: IColumn): boolean {

        // predefined expressions return if its right column type
        if (namedExpression.IsPredefined) {
            return namedExpression.ColumnType == column.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (namedExpression.Expression.ColumnValuesExpressions != null && namedExpression.Expression.ColumnValuesExpressions.length > 0) {
            return namedExpression.Expression.ColumnValuesExpressions[0].ColumnName == column.ColumnId; // might be that we have wrong id / friendly name => need to check
        }

        // see if there are any ranges and then get the first only
        if (namedExpression.Expression.RangeExpressions != null && namedExpression.Expression.RangeExpressions.length > 0) {
            return namedExpression.Expression.RangeExpressions[0].ColumnName == column.ColumnId; // might be that we have wrong id / friendly name => need to check
        }

        return false;
    }


    public GetNamedExpressions(): Array<INamedExpression> {

        // Create if first time called - is there a better way to lazy load?
        if (this._namedExpressions == null || this._namedExpressions.length == 0) {

            // Date Filters
            this._namedExpressions.push({
                Id: "Today",
                FriendlyName: "Today",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
                    return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "In Past",
                FriendlyName: "In Past",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck < Date.now();
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "In Future",
                FriendlyName: "In Future",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    return +dateToCheck > Date.now();
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "Yesterday",
                FriendlyName: "Yesterday",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
                    return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "Tomorrow",
                FriendlyName: "Tomorrow",
                ColumnType: ColumnType.Date,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (dateToCheck: Date): boolean => {
                    let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
                    return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
                },
                IsPredefined: true
            });

            // Numeric Filters
            this._namedExpressions.push({
                Id: "Positive",
                FriendlyName: "Positive",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck > 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "Negative",
                FriendlyName: "Negative",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck < 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "Zero",
                FriendlyName: "Zero",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck == 0);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "NumericBlanks",
                FriendlyName: "Blanks",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck == null);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "NumericNonBlanks",
                FriendlyName: "Non Blanks",
                ColumnType: ColumnType.Number,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (numberToCheck: number): boolean => {
                    return (numberToCheck != null);
                },
                IsPredefined: true
            });


            // String Filters
            this._namedExpressions.push({
                Id: "StringBlanks",
                FriendlyName: "Blanks",
                ColumnType: ColumnType.String,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (stringToCheck: string): boolean => {
                    return (StringExtensions.IsNullOrEmpty(stringToCheck));
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "StringNonBlanks",
                FriendlyName: "Non Blanks",
                ColumnType: ColumnType.String,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (stringToCheck: any): boolean => {
                    return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
                },
                IsPredefined: true
            });

            // Boolean Filters
            this._namedExpressions.push({
                Id: "True",
                FriendlyName: "True",
                ColumnType: ColumnType.Boolean,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (boolToCheck);
                },
                IsPredefined: true
            });

            this._namedExpressions.push({
                Id: "False",
                FriendlyName: "False",
                ColumnType: ColumnType.Boolean,
                Expression: ExpressionHelper.CreateEmptyExpression(),
                isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                    return (!boolToCheck);
                },
                IsPredefined: true
            });


            // this is going to mimic a named expression that is created by a user:  Currency = 'EUR' = uses a range expression
            let predefinedExpressionInfoCurrency: IPredefinedExpressionInfo = { ColumnValues: null, NamedExpression: null, ExpressionRange: { Operator: LeafExpressionOperator.Equals, Operand1: "EUR", Operand2: "" } };
            let rangeExpressionCurrency: Array<{ ColumnName: string, Ranges: Array<IRangeExpression> }> = PredefinedExpressionHelper.CreateRangeExpression("currency", predefinedExpressionInfoCurrency);

            this._namedExpressions.push({
                Id: "EuroCurrency",
                FriendlyName: "EuroCurrency",
                ColumnType: ColumnType.String,
                Expression: new Expression([], [], rangeExpressionCurrency),
                isExpressionSatisfied: (value: any): boolean => {
                    return null;
                },
                IsPredefined: false
            });

            // this is going to mimic a named expression that is created by a user:  Country IN 'France', 'Germany', 'Italy' = uses a column values expression
            let predefinedExpressionCountries: IPredefinedExpressionInfo = { ColumnValues: ["Belgium", "Luxemborg", "Holland"], NamedExpression: null, ExpressionRange: null };
            let columnsExpressionCountries: Array<{ ColumnName: string, ColumnValues: Array<any> }> = PredefinedExpressionHelper.CreateColumnValuesExpression("country", predefinedExpressionCountries);

            this._namedExpressions.push({
                Id: "Benelux",
                FriendlyName: "Benelux",
                ColumnType: ColumnType.String,
                Expression: new Expression(columnsExpressionCountries, [], []),
                isExpressionSatisfied: (value: any): boolean => {
                    return null;
                },
                IsPredefined: false
            });
        }

        return this._namedExpressions;
    }



    /*
        public GetFilterExpressionsold(): Array<INamedExpression> {
    
            // Create if first time called - is there a better way to lazy load?
            if (this._expressionFilters == null || this._expressionFilters.length == 0) {
    
               
    
              
             
                // String Filters
                this._expressionFilters.push({
                    ExpressionId: "StringBlanks",
                    ExpressionName: "Blanks",
                    ColumnType: ColumnType.String,
                    Expression: null,
                    isExpressionSatisfied: (stringToCheck: string): boolean => {
                        return (StringExtensions.IsNullOrEmpty(stringToCheck));
                    }
                });
    
                this._expressionFilters.push({
                    ExpressionId: "StringNonBlanks",
                    ExpressionName: "Non Blanks",
                    ColumnType: ColumnType.String,
                    Expression: null,
                    isExpressionSatisfied: (stringToCheck: any): boolean => {
                        return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
                    }
                });
    
    
                // Boolean Filters
                this._expressionFilters.push({
                    ExpressionId: "True",
                    ExpressionName: "True",
                    ColumnType: ColumnType.Boolean,
                    Expression: null,
                    isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (boolToCheck);
                    }
                });
    
                this._expressionFilters.push({
                    ExpressionId: "False",
                    ExpressionName: "False",
                    ColumnType: ColumnType.Boolean,
                    Expression: null,
                    isExpressionSatisfied: (boolToCheck: boolean): boolean => {
                        return (!boolToCheck);
                    }
                });
    
            }
    
            return this._expressionFilters;
        }
    
    
    */
}
