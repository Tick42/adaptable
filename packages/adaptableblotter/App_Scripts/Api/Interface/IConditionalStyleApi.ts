import {
  ConditionalStyleState,
  ConditionalStyle,
} from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';

/**
 * Provides full and comprehensive run-time access to the Conditional Style function and associated state.
 */
export interface IConditionalStyleApi {
  /**
   * Retrieves the Conditional Style section from the Adaptable Blotter State
   */
  getConditionalStyleState(): ConditionalStyleState;

  /**
   * Gets all Conditional Styles in the Adaptable Blotter State
   */
  getAllConditionalStyle(): ConditionalStyle[];

  /**
   * Opens the Conditional Style popup screen
   */
  showConditionalStylePopup(): void;
}
