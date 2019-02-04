export interface ISmartEditApi {
  SetMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
  GetMathOperation(): string;
  SetValue(smartEditValue: number): void;
  GetValue(): number;
}
