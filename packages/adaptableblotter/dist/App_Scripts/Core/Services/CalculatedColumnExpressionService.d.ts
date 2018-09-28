import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICalculatedColumnExpressionService } from "./Interface/ICalculatedColumnExpressionService";
export declare class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
    private blotter;
    private colFunctionValue;
    constructor(blotter: IAdaptableBlotter, colFunctionValue: (columnId: string, record: any) => any);
    IsExpressionValid(expression: string): {
        IsValid: Boolean;
        ErrorMsg?: string;
    };
    ComputeExpressionValue(expression: string, record: any): any;
    getColumnListFromExpression(expression: string): string[];
}