import { LicenceScopeType, LicenceUserType } from '../../PredefinedConfig/Common/Enums';

// used in layouts to save which is the current sorted column
export interface ILicenceInfo {
  LicenceScopeType: LicenceScopeType;
  IsLicenceInDate: boolean;
  ExpiryDate: Date;
  LicenceUserType: LicenceUserType;
}
