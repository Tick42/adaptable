import { ShortcutState, Shortcut } from '../PredefinedConfig/ShortcutState';
export interface ShortcutApi {
  /**
   * Retrieves the Shortcut section from Adaptable State
   */
  getShortcutState(): ShortcutState;

  /**
   * Gets all Shortcuts in Adaptable State
   */
  getAllShortcut(): Shortcut[];

  /**
   * Adds a new shortcut to the state
   * @param shortcut the shortcut to add
   */
  addShortcut(shortcut: Shortcut): void;

  /**
   * Deletes a shortcut from the state
   * @param shortcut the shortcut to delete
   */
  deleteShortcut(shortcut: Shortcut): void;

  /**
   * Deletes all shortcuts in Adaptable State
   */
  deleteAllShortcut(): void;

  /**
   * Opens the Shortcut popup screen
   */
  showShortcutPopup(): void;
}
