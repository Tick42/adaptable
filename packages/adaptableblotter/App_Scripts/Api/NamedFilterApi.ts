import { NamedFilter, NamedFilterState } from '../PredefinedConfig/NamedFilterState';

/**
 * Provides full and comprehensive run-time access to the Named Filter function and associated state.
 */
export interface NamedFilterApi {
  /**
   * Retrieves the Named Filter section from the Adaptable Blotter State
   */
  getNamedFilterState(): NamedFilterState;

  /**
   * Returns all the Named Filters in the Adaptable Blotter State
   */
  getAllNamedFilter(): NamedFilter[];

  /**
   * Returns the Named Filter with the given name
   */
  getNamedFilterByName(name: string): NamedFilter;
}
