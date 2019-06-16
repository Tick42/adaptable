import { SystemFilterState } from '../../PredefinedConfig/DesignTimeState/SystemFilterState';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';

export interface ISystemFilterApi {
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: UserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
