import { RpcDispatcher } from './RpcDispatcher';
import { ExcelWorkbook } from './ExcelWorkbook';
export declare class ExcelWorksheet extends RpcDispatcher {
  workbook: ExcelWorkbook;
  worksheetName: string;
  constructor(name: string, workbook: ExcelWorkbook);
  getDefaultMessage(): any;
  setCells(values: any[][], offset: string): void;
  getCells(start: string, offsetWidth: number, offsetHeight: number, callback: Function): void;
  getRow(start: string, width: number, callback: Function): void;
  getColumn(start: string, offsetHeight: number, callback: Function): void;
  activate(): void;
  activateCell(cellAddress: string): void;
  addButton(name: string, caption: string, cellAddress: string): void;
  setFilter(
    start: string,
    offsetWidth: number,
    offsetHeight: number,
    field: number,
    criteria1: string,
    op: string,
    criteria2: string,
    visibleDropDown: string
  ): void;
  formatRange(rangeCode: string, format: any, callback: Function): void;
  clearRange(rangeCode: string, callback: Function): void;
  clearRangeContents(rangeCode: string, callback: Function): void;
  clearRangeFormats(rangeCode: string, callback: Function): void;
  clearAllCells(callback: Function): void;
  clearAllCellContents(callback: Function): void;
  clearAllCellFormats(callback: Function): void;
  setCellName(cellAddress: string, cellName: string): void;
  calculate(): void;
  getCellByName(cellName: string, callback: Function): void;
  protect(password: string): void;
  toObject(): {
    addEventListener: any;
    dispatchEvent: any;
    removeEventListener: any;
    name: string;
    activate: any;
    activateCell: any;
    addButton: any;
    calculate: any;
    clearAllCellContents: any;
    clearAllCellFormats: any;
    clearAllCells: any;
    clearRange: any;
    clearRangeContents: any;
    clearRangeFormats: any;
    formatRange: any;
    getCellByName: any;
    getCells: any;
    getColumn: any;
    getRow: any;
    protect: any;
    setCellName: any;
    setCells: any;
    setFilter: any;
  };
}
