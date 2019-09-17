/**
 * Options for manging Layouts.
 *
 * Layouts (sometimes called views) are ways of managing Column visibility, order and - depending on the grid - grouping and width.
 *
 * Filters and search manage which **Rows** are displayed; Layouts decide which **Columns** are displayed.
 *
 * ```ts
 * layoutOptions = {
 *  includeVendorStateInLayouts: true,
 *  autoSaveLayouts: false
 *};
 * ```
 */
export interface LayoutOptions {
  /**
   * Whether the Layout should include vendor grid related state.
   *
   * Note: this option is currently only available in ag-Grid
   *
   * **Default Value: true**
   */
  includeVendorStateInLayouts?: boolean;

  /**
   * Whether layouts should save whenever the Grid's column order or sort information changes.
   *
   * If set to false (the default is true), the user needs to click the save button to persist changes to the layout.
   *
   * **Default Value: true**
   */
  autoSaveLayouts?: boolean;
}
