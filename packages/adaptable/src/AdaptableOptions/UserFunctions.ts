import {
  ActionColumnRenderFunction,
  ActionColumnShouldRenderPredicate,
} from '../PredefinedConfig/ActionColumnState';
import { CustomSortCompareFunction } from '../PredefinedConfig/CustomSortState';
import { CellSummaryOperationFunction } from '../PredefinedConfig/CellSummaryState';
import { EntitlementLookUpFunction } from '../PredefinedConfig/EntitlementState';
import { NamedFilterPredicate } from '../PredefinedConfig/NamedFilterState';
import {
  ContextMenuItemClickedFunction,
  ColumnMenuItemClickedFunction,
  ContextMenuItemShowPredicate,
  ColumnMenuItemShowPredicate,
} from '../PredefinedConfig/UserInterfaceState';

/**
 * The actual implementations of functions that users reference in Predefined Config.
 *
 * Predefined Config is stored as JSON - and often remotely - which means that it is not possible to store function implementations (as they cannot be serialised).
 *
 * So, instead, in Predefined Config the **name** of the function is provided and the **code implementation** is in functionOptions in AdaptableOptions.
 *
 * All of these implementations are of type `UserFunction` which contains 3 properties:
 *
 * 1.  the **type** of the function: this allows AdapTable to know which function is being provided; this is strongly typed for user convenience
 *
 * 2.  the **name** of the function: must be the same as the function name provided in Predefined Config
 *
 * 3.  the function **handler**: the actual function implementation itself; this varies based on the type of the function.
 *
 * The types supported are:
 *
 * - `CustomSortComparerFunction`
 *
 * - `CellSummaryOperationFunction`
 *
 * - `ActionColumnRenderFunction`
 *
 * - `ActionColumnShouldRenderPredicate`
 *
 * - `EntitlementLookUpFunction`
 *
 * - `NamedFilterPredicate`
 *
 * - `ContextMenuItemClickedFunction`
 *
 * - `ColumnMenuItemClickedFunction`
 *
 * - `ContextMenuItemShowPredicate`
 *
 * - `ColumnMenuItemShowPredicate`
 *
 */
export type UserFunction =
  | CustomSortCompareFunction
  | CellSummaryOperationFunction
  | ActionColumnRenderFunction
  | ActionColumnShouldRenderPredicate
  | EntitlementLookUpFunction
  | NamedFilterPredicate
  | ContextMenuItemClickedFunction
  | ColumnMenuItemClickedFunction
  | ContextMenuItemShowPredicate
  | ColumnMenuItemShowPredicate;

/**
 * Type which wraps an array of `UserFunction`
 *
 */
export type UserFunctions = UserFunction[];

/**
 * The Base User Function that all User Functions extend
 */
export interface BaseUserFunction {
  type:
    | 'CustomSortComparerFunction'
    | 'CellSummaryOperationFunction'
    | 'ActionColumnRenderFunction'
    | 'ActionColumnShouldRenderPredicate'
    | 'EntitlementLookUpFunction'
    | 'NamedFilterPredicate'
    | 'ContextMenuItemClickedFunction'
    | 'ColumnMenuItemClickedFunction'
    | 'ContextMenuItemShowPredicate'
    | 'ColumnMenuItemShowPredicate';
  name: string;
  handler: any;
}
