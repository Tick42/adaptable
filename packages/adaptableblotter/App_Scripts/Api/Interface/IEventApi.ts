import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import {
  IColumnStateChangedEventArgs,
  IAlertFiredEventArgs,
  IThemeChangedEventArgs,
} from '../../Utilities/Interface/IBlotterEvents';
import { ISearchChangedEventArgs } from '../../Utilities/Interface/SearchChanged/ISearchChangedEventArgs';
import { IEvent } from '../../Utilities/Interface/IEvent';
import { EventDispatcher } from '../../Utilities/EventDispatcher';

export interface IEventApi {
  _onSearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
  _onThemeChanged: EventDispatcher<IAdaptableBlotter, IThemeChangedEventArgs>;
  _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
  _onAlertFired: EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>;

  /**
   * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
   * Used in association with server searching.
   * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
   */
  onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

  /**
   * Event fired whenever the theme of the Blotter has been changed
   * @returns IEvent<IAdaptableBlotter, IThemeChangedEventArgs>
   */
  onThemeChanged(): IEvent<IAdaptableBlotter, IThemeChangedEventArgs>;

  /**
   * Event fired whenever column order (and visiblity) and grid sorts in the Blotter change.
   * Only fires when in a user layout and currently just passes the name of the layout.
   * @returns IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>
   */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;

  /**
   * Event fired whenever an Alert is raised.
   * Contains the full Alert itself.
   * @returns IEvent<IAdaptableBlotter, IAlertFiredEventArgs>
   */
  onAlertFired(): IEvent<IAdaptableBlotter, IAlertFiredEventArgs>;
}
