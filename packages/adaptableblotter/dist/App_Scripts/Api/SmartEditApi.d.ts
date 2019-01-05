import { ApiBase } from "./ApiBase";
import { ISmartEditApi } from './Interface/ISmartEditApi';
export declare class SmartEditApi extends ApiBase implements ISmartEditApi {
    EditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    GetMathOperation(): string;
    EditValue(smartEditValue: number): void;
    GetValue(): number;
}
