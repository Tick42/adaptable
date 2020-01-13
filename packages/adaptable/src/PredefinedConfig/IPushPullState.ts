import { DesignTimeState } from './DesignTimeState';
import { Report } from './ExportState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

/**
 * The objects required to run the [iPushPull](https://ipushpull.com) integration from within Adaptable.
 *
 * This state is created by the user / developer at design time and injected into Adaptable as Predefined Config
 *
 * If iPushPull state is provided, then an iPushPull Toolbar will be available.
 *
 * If you have `AutoLogin` set to true then AdapTable will try to log you in automatically; otherwise the toolbar will display a login button that when clicked will open the Login popup.
 *
 * Within the iPushPull Toolbar there are options to:
 *
 * - Send a Snapshot (one-off) report to iPushPull
 *
 * - Send 'Live Data' to iPushPull so that it updates in line with changes in AdapTable
 *
 * - Create a schedule so that data will get exported to iPushPull at a particular time / date
 *
 * - Add a new iPushPull page
 *
 * To use iPushPull you will need to have your own iPushPull username and login credentials.
 *
 * However you will automatically use AdapTable's credentials (i.e. the `api_secret` and `api_key` properties), so please **always use the config as set in the example below**.
 *
 * **iPushPull Predefined Config Example**
 *
 *  ```ts
 *
 *  // 1. import ipushpull into your harness / application using the iPushPull dependency (which you will need to add your package.json)
 *  import ipushpull from 'ipushpull-js';
 *
 *  ------
 *
 * // 2. immediately thereafter set the config for the ipushpull object as follows:
 * // (note: we will  add the real values for the `api_secret` & `api_key` properties)
 *  ipushpull.config.set({
 *    api_secret: '',  // will be added by Adaptable
 *    api_key: '',     // will be added by Adaptable
 *    api_url: 'https://www.ipushpull.com/api/1.0',
 *    ws_url: 'https://www.ipushpull.com',
 *    web_url: 'https://www.ipushpull.com',
 *    docs_url: 'https://docs.ipushpull.com',
 *    storage_prefix: 'ipp_local',
 *    transport: 'polling',
 *    hsts: false, // strict cors policy
 * });
 *
 *  ------
 *
 * // 3. pass in this config as 'iPushPullInstance' property in iPushPull / Partner state
 * // You can add your iPushPull username & password to help pre-fill the login page
 * const adaptableOptions: AdaptableOptions = {
 *   .........
 *   predefinedConfig: {
 *      IPushPull: {
 *        iPushPullInstance: ipushpull,  // object created above
 *        Username: [YOUR IPUSHPULL USERNAME], // optional, saves being keyed each time
 *        Password: [YOUR IPUSHPULL PASSWORD], // optional, save sbeing keyed each time
 *        ThrottleTime: 5000,
 *        AutoLogin: true,
 *      },
 *    },
 *  };
 * }
 *
 *  ```
 * You are also able to listen to iPushPull-related changes by subscribing to the `LiveDataChanged` event (learn more [here](/_api_events_livedatachanged_.livedatachangedeventargs.html) ).
 *
 * This event contains a `ReportDestination` property which you can check whether it equals 'iPushPull'.
 *
 * The event also includes a `LiveDataTrigger` property which will tell you what caused the event to fire (e.g. connected, dataupdated etc.), and a `LiveReport` property which provides the report affected.
 *
 *  **Example: Subscribing to the 'LiveDataChanged' event**
 *
 * ```ts
 * adaptableApi.eventApi.on(
 *    'LiveDataChanged',
 *      (eventArgs: LiveDataChangedEventArgs) => {
 *        let liveDataChangedInfo: LiveDataChangedInfo = eventArgs.data[0].id;
 *         if (liveDataChangedInfo.ReportDestination == 'iPushPull') {
 *            // do something...
 *        }
 *    }
 *  );
 * ```
 *
 */
export interface IPushPullState extends DesignTimeState {
  /**
   *  The iPushPull object - this is injected by the user from 'ipushpull-js' and set with standard configuration.
   */
  iPushPullInstance?: any;
  /**
   * The user's iPushPull user name (usually an email address)
   *
   * If supplied then the iPushPull login screen's username textbox will be pre-populated
   */
  Username?: string;
  /**
   * The user's iPushPull password
   *
   * If supplied then the iPushPull login screen's password textbox will be pre-populated
   */
  Password?: string;
  /**
   * How long (in miliseconds) Adaptable should throttle when sending a data update to iPushPull.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;

  /**
   * Whether AdapTable will try log you in to iPushPull automatically at start-up
   *
   * **Default Value: false**
   */
  AutoLogin?: boolean;

  /**
   * Any iPushPull Reports that should be sent according to Schedules sent by you.
   */
  IPushPullSchedules?: IPushPullSchedule[];

  // internal - would like not to save if possible...
  IsIPushPullAvailable?: boolean;
  IsIPushPullRunning?: boolean;
  IPushPullDomainsPages?: IPushPullDomain[];
  IPushPullLoginErrorMessage?: string;
  CurrentLiveIPushPullReport?: IPushPullReport;
}

export interface IPushPullSchedule extends BaseSchedule {
  IPushPullReport: IPushPullReport;
  Transmission: 'Snapshot' | 'Live Data';
}

export interface IPushPullReport extends AdaptableObject {
  ReportName: string;
  Folder: string;
  Page: string;
}

/**
 * Internal object that maps an IPushPull Domain object
 */
export interface IPushPullDomain {
  /**
   * the Name of the Domain / Folder
   */
  Name: string;

  /**
   * the Id of the Folder
   */
  FolderId: number;

  /**
   * The names of the pages within the (Folder)
   */
  Pages: string[];
}