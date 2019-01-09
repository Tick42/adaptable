import { IShortcut } from './IAdaptableBlotterObjects';
export interface IShortcutApi {
  GetAll(): IShortcut[];
  Add(shortcut: IShortcut): void;
  Delete(shortcut: IShortcut): void;
  DeleteAll(): void;
}