import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';

/**
 * The Predefined Configuration for the Application function
 *
 * The Application function provides an **deliberately empty toolbar** (called *Application*) which users can leverage and populate with their own content.
 *
 * It contains 2 divs (to cater for 2 different scenarios):
 *
 * - a div for you to **render any content that you want**; its your responsibilty to make sure that the div is populated and uses the correct styles.
 *
 * - a div which will **display any buttons that you provide** via the *ApplicationToolbarButtons* property of the Application state (see below).
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardapplicationtoolbardemo/) | [API](_api_applicationapi_.applicationapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos] To come | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 * **Rendering Content**
 *
 * The Adaptable Blotter provides the [applicationAPI](_api_applicationapi_.applicationapi.html) **getApplicationToolbarContentsDiv** method that returns the name of the Div in which you should render the contents.
 *
 * You can listen to the **ToolbarVisibilityChanged** event published by the Adaptable Blotter which provides the name of relevant toolbar and its new visibility; if its the Application Toolbar then render as required.
 *
 * The list of potential values for the Toolbar name are: "AdvancedSearch", "Alert", "Application", "BulkUpdate", "CellSummary", "Chart", "ColumnFilter", "DataSource", "Export", "Layout", "SmartEdit", "QuickSearch" and "Theme"
 *
 * **Application Rendering Example** (Using React)
 *
 *  ```ts
 * adaptableblotter.on('ToolbarVisibilityChanged',  (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
 * if (
 *   toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'Application' &&
 *   toolbarVisibilityChangedEventArgs.data[0].id.visibility == 'Visible'
 * ) {
 *  let toolbarContents: any = (
 *      <div style={{ display: 'flex' }}>
 *       <button
 *          className="ab-SimpleButton ab-SimpleButton--variant-outlined"
 *          onClick={onNewTradeClicked}
 *          style={{ marginRight: '3px' }}
 *        >
 *        Create New Trade
 *        </button>
 *        <select className="ab-Dropdown" style={{ marginRight: '3px' }}>
 *          <option>Book 1</option>
 *          <option>Book 2</option>
 *          <option>Book 3</option>
 *        </select>
 *      </div>
 *    );
 *
 *
 *  ReactDOM.render(
 *    toolbarContents,
 *    adaptableblotter.api.applicationApi.getApplicationToolbarContentsDiv()
 *    );
 *  }
 * });
 *
 *  ......
 *
 * function onNewTradeClicked() {
 *    // react as required...
 *  }
 * ```
 *
 * **Providing Buttons Through Predefined Config**
 *
 * In the Application State you provide details of the buttons to appear in the Application toolbar.
 *
 * When one of these buttons is clicked the **ApplicationToolbarButtonClicked** event will fire providing details of the button clicked so you can react as necessary.
 *
 * Note: in the intial implementation you can only provide a button name and caption (text that is displayed), but in future releases you will be able to provide images and also to control the rendering and other aspects of these buttons.
 *
 * **Application Button Predefined Config Example**
 *
 *  ```ts
 * export default {
 * Application: {
 *  ApplicationToolbarButtons:[
 *    {
 *      Name: 'btnNewTrade',
 *      Caption: 'New Trade',
 *    },
 *    {
 *      Name: 'btnRefreshGrid',
 *      Caption: 'Refresh Grid',
 *    },
 *    ],
 *  }
 * } as PredefinedConfig;
 *
 *  ......
 *
 *  adaptableblotter.on('ApplicationToolbarButtonClicked', applicationToolbarButtonClickedEventArgs)  => {
 *      // respond as appropriate - the button argument is the ApplicationToolbarButton we provided in the state
 *  });
 * ```
 **/
export interface ApplicationState extends DesignTimeState {
  /**
   * An array of Application Toolbar Buttons - each of which is rendered as a button in the Application Toolbar.
   *
   * When one of these buttons is clicked the on('ApplicationToolbarButtonClicked') event is fired.
   */
  ApplicationToolbarButtons?: ApplicationToolbarButton[];
}

export interface ApplicationToolbarButton extends AdaptableBlotterObject {
  /**
   * The name of the button
   *
   * **This should be a name that is valid as an HTML element**
   */
  Name: string;

  /**
   * What text will appear on the button
   *
   * *Currently you cannot provide an image for this button but that will be made available in a forthcoming release*
   */
  Caption: string;
}