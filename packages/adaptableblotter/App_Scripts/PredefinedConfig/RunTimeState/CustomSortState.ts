import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for the Custom Sort function
 *
 * Custom Sort enables you to build saveable searches using *Queries* that can be run across multiple columns using a wide variety of *Search Criteria*.
 *
 * **Further Resources**
 *
 * [Custom Sort Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360005167931-Advanced-Search)
 *
 * [Custom Sort Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos)
 *
 * [Custom Sort Demo](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/)
 *
 * [Custom Sort Blotter API](_api_interface_iadvancedsearchapi_.iadvancedsearchapi.html)
 *
 * [Custom Sort FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ)
 *
 * **Custom Sort Predefined Config Example**
 *
 * ```ts
 * export default {
 * CustomSort: {
 *   CustomSorts: [
 *     {
 *       ColumnId: 'Rating',
 *       SortedValues: ['AAA', 'AA+', 'AA', 'AA-'],
 *     },
 *   ],
 * },
 * } as PredefinedConfig;
 * ```
 * In this example we have created a Custom Sort on the Rating Column (which follows typical Rating order than alphabetical):
 */

export interface CustomSortState extends RunTimeState {
  /**
   * A collection of Custom Sort objects.
   *
   * **Default Value**:  Empty array
   */
  CustomSorts?: CustomSort[];
}

/**
 * The CustomSort object used in the Custom Sort function.
 */
export interface CustomSort extends AdaptableBlotterObject {
  /**
   * The Id of the Column on which the Custom Sort will be applied (e.g. when the column header is clicked in order to sort the Column values)
   */
  ColumnId: string;

  /**
   * The values by the which the Column will be sorted.
   *
   * Note: If there are values in the Column that do not appear in this list then they will be sorted alphabetically AFTER all the values in the list have first been sorted.
   *
   */
  SortedValues: string[];
}
