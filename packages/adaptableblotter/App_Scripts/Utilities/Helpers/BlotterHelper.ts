import { cloneDeepWith, isPlainObject } from 'lodash';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';
import { DefaultAdaptableBlotterOptions } from '../Defaults/DefaultAdaptableBlotterOptions';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
import { LicenceScopeType } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';

export function assignBlotterOptions(
  blotterOptions: AdaptableBlotterOptions
): AdaptableBlotterOptions {
  const returnBlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions);
  returnBlotterOptions.auditOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.auditOptions,
    blotterOptions.auditOptions
  );
  returnBlotterOptions.configServerOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.configServerOptions,
    blotterOptions.configServerOptions
  );
  returnBlotterOptions.layoutOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.layoutOptions,
    blotterOptions.layoutOptions
  );
  returnBlotterOptions.filterOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.filterOptions,
    blotterOptions.filterOptions
  );
  returnBlotterOptions.queryOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.queryOptions,
    blotterOptions.queryOptions
  );
  returnBlotterOptions.containerOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.containerOptions,
    blotterOptions.containerOptions
  );
  returnBlotterOptions.generalOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.generalOptions,
    blotterOptions.generalOptions
  );
  returnBlotterOptions.chartOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.chartOptions,
    blotterOptions.chartOptions
  );

  const { predefinedConfig } = returnBlotterOptions;
  if (predefinedConfig) {
    // this customizer function is called by lodash.cloneDeepWith
    // to determine how to clone each property
    const customizer = (value: any) => {
      // so whenever we clone a plain object,
      // we add a Uuid property
      if (isPlainObject(value) && value != predefinedConfig) {
        value.Uuid = createUuid();
      }
    };

    returnBlotterOptions.predefinedConfig = cloneDeepWith(predefinedConfig, customizer);
  }
  return returnBlotterOptions;
}

export function isValidPrimaryKey(blotter: IAdaptableBlotter, columns: IColumn[]): boolean {
  const pkColumn: IColumn = ColumnHelper.getColumnFromId(
    blotter.blotterOptions.primaryKey,
    columns
  );

  if (pkColumn == null) {
    const errorMessage: string = `The PK Column '${
      blotter.blotterOptions.primaryKey
    }' does not exist.  This will affect many functions in the Adaptable Blotter.`;
    if (blotter.blotterOptions.generalOptions.showMissingPrimaryKeyWarning == true) {
      // show an alert if that is the option
      blotter.api.alertApi.showAlertError('No Primary Key', errorMessage, true);
    } else {
      // otherwise just log it
      LoggingHelper.LogAdaptableBlotterError(errorMessage);
    }
    return false;
  }
  return true;
}

export function isConfigServerEnabled(blotterOptions: AdaptableBlotterOptions): boolean {
  return (
    blotterOptions.configServerOptions != null &&
    blotterOptions.configServerOptions.enableConfigServer != null &&
    blotterOptions.configServerOptions.enableConfigServer == true &&
    StringExtensions.IsNotNullOrEmpty(blotterOptions.configServerOptions.configServerUrl)
  );
}

export function checkLicenceKey(licenceInfo: ILicenceInfo): void {
  const universalOrEndUser: string = ` (${licenceInfo.LicenceUserType}). `;
  const expiryDate: string = `Expires: ${licenceInfo.ExpiryDate.toLocaleDateString()}`;
  switch (licenceInfo.LicenceScopeType) {
    case LicenceScopeType.Community:
      let licenceMessage: string = '\n';
      licenceMessage +=
        '***********************************************************************************\n';
      licenceMessage +=
        '************************** Adaptable Blotter License ******************************\n';
      licenceMessage +=
        '********************* This is an evaluation / community licence *******************\n';
      licenceMessage +=
        '******** It contains full functionality - but you cannot load or save state *******\n';
      licenceMessage +=
        '********* Please contact sales@adaptabletools.com for upgrade information *********\n';
      licenceMessage +=
        '***********************************************************************************\n';
      LoggingHelper.LogError(licenceMessage);
      break;

    case LicenceScopeType.Standard:
      LoggingHelper.LogAdaptableBlotterInfo(
        ` Licence Type: Standard${universalOrEndUser}${expiryDate}`
      );
      break;
    case LicenceScopeType.Enterprise:
      LoggingHelper.LogAdaptableBlotterInfo(
        ` Licence Type: Enterprise${universalOrEndUser}${expiryDate}`
      );
      break;
  }
  if (!licenceInfo.IsLicenceInDate) {
    let licenceMessage: string = '\n';
    licenceMessage +=
      '***********************************************************************************\n';
    licenceMessage +=
      '************************** Adaptable Blotter License ******************************\n';
    licenceMessage +=
      '************************* This licence is out of date *****************************\n';
    licenceMessage +=
      '******** Please contact sales@adaptabletools.com for to renew your licence ********\n';
    licenceMessage +=
      '***********************************************************************************\n';
    LoggingHelper.LogError(licenceMessage);
  }
}

export function BlotterObjectExistsInState(
  array: AdaptableBlotterObject[],
  itemToCheck: AdaptableBlotterObject
): boolean {
  if (array == null) {
    return false;
  }
  return array.findIndex(abObject => abObject.Uuid == itemToCheck.Uuid) > -1;
}

export function isDemoSite(): boolean {
  return window.location.hostname == 'demo.adaptableblotter.com';
}

export const BlotterHelper = {
  isDemoSite,
  assignBlotterOptions,
  isValidPrimaryKey,
  isConfigServerEnabled,
  checkLicenceKey,
  BlotterObjectExistsInState,
};
export default BlotterHelper;
