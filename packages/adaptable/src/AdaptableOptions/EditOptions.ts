import { DataChangedInfo } from './CommonObjects/DataChangedInfo';

/**
 * Options related to Editing in Adaptable.
 *
 * Allows you to provide Adaptable with Server Validation that works in conjunction with Client (aka Cell) Validation
 *
 * **EditOptions Example**
 *
 * In this example we run Server Editing.
 *
 * For the Amount column the (slightly contrived) logic is that any edit > 100 will return 100, any edit < 20 will return 20 and if edit is 50 its rejected.
 *
 *
 * Any edits that dont break those rules - or which are not for the 'amount' column - we ignore (so they will be processed normally)
 *
 * ```ts
 * adaptableOptions.editOptions = {
 *     validateOnServer: (dataChangedInfo: DataChangedInfo) => {
 *       return new Promise((resolve, reject) => {
 *         setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 2000);
 *       });
 *     },
 *   };
 *
 * --------------------
 *
 * function getServerEditResponse(dataChangedInfo: DataChangedInfo): ValidationResult {
 *  if (dataChangedInfo.ColumnId == 'amount') {
 *    if (dataChangedInfo.NewValue == 50) {
 *     return {
 *       NewValue: dataChangedInfo.OldValue,
 *        ValidationMessage: 'Cannot set amount to 50',
 *      };
 *    } else if (dataChangedInfo.NewValue > 100) {
 *      return {
 *        NewValue: 100,
 *        ValidationMessage: 'Amount cannot be greater than 100',
 *      };
 *    } else if (dataChangedInfo.NewValue < 20) {
 *      return {
 *        NewValue: 20,
 *        ValidationMessage: 'Amount cannot  be less than  20',
 *      };
 *    }
 *  }
 * return {};
 *}
 *
 *  --------------------
 *
 * ```
 */
export interface EditOptions {
  /**
   * Used when you want to check an Edit made in Adaptable on your Server
   *
   * The argument provided is the [DataChangedInfo](_adaptableOptions_commonobjects_datachangedinfo_.datachangedinfo.html) object which provides the old and new values, the column, and also the node in which the cell lives.
   *
   * The property returns a promise that includes a Validation Result
   *
   * A ValidadtionResult has 2 properties:  A new value to use instead of the proposed one from the edit and a message.
   *
   * You can return an empty object if you are happy with the edit (and it will then go through as normal).
   *
   * This function will only be called AFTER cell validation has successfully completed.
   *
   *  **Default Value: null**
   */
  validateOnServer?: (dataChangedInfo: DataChangedInfo) => Promise<ValidationResult>;

  /**
   * Whether or not to display a message after Server Validation.
   *
   * If set to true then an Info Message will appear with any ValidationMessage sent by ServerValidation; if there is no Validation Message then no popup is displayed.
   *
   * **Default Value: true**
   */
  displayServerValidationMessages?: boolean;
}

/**
 * Used for Server Validation ie. after an edit has been made in Adaptable which you want to check on your server.
 *
 * It contains 2 properties:
 *
 * -the new value which should be used for the edit if the proposed one is no good; leave this blank if you are happy with the edit
 *
 * -a message which will be displayed
 *
 * The values returned (through a Promise) will populate the Column Filter, Column Values section in Query Builder and Bulk Update.
 */
export interface ValidationResult {
  /**
   * A message to send with validation.  It will be logged and, if Audit Log is switched on, sent to audit.
   */
  ValidationMessage?: string;

  /**
   * The value which should be used for the edit instead of the one keyed in by the user.
   *
   * If you want to reject the edit then set this to the DataChangedInfo.oldValue property (which will effectively leave the cell unchanged) or send back a different value.
   *
   * If you are happy with the edit then leave it free.
   */
  NewValue?: any;
}
