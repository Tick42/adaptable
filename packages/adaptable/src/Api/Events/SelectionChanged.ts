import { AdaptableEventArgs, AdaptableEventData } from './AdaptableEvents';

import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';

import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';

/**
 * Event Args used as part of the **on('SelectionChanged')** event.
 *
 * Includes full details of all Selected Cells and Rows (if the latter has been activated).
 */
export interface SelectionChangedEventArgs extends AdaptableEventArgs {
  data: SelectionChangedEventData[];
}

export interface SelectionChangedEventData extends AdaptableEventData {
  id: SelectionChangedInfo;
}

export interface SelectionChangedInfo {
  selectedCellInfo: SelectedCellInfo;
  selectedRowInfo: SelectedRowInfo;
}
