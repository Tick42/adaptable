import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux';
import { ApiBase } from './ApiBase';
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState, IShortcut } from '../PredefinedConfig/IUserState Interfaces/ShortcutState';

export class ShortcutApi extends ApiBase implements IShortcutApi {
  public getShortcutState(): ShortcutState {
    return this.getBlotterState().Shortcut;
  }

  public getAllShortcut(): IShortcut[] {
    return this.getBlotterState().Shortcut.Shortcuts;
  }

  public addShortcut(shortcut: IShortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
  }

  public deleteShortcut(shortcut: IShortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
  }

  public deleteAllShortcut(): void {
    this.getAllShortcut().forEach(s => {
      this.deleteShortcut(s);
    });
  }
}
