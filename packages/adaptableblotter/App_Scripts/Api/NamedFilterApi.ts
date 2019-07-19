import { ApiBase } from './ApiBase';
import { INamedFilterApi } from './Interface/INamedFilterApi';
import { PredefinedConfig } from '../PredefinedConfig/PredefinedConfig';
import { NamedFilter } from '../PredefinedConfig/RunTimeState/NamedFilterState';

export class NamedFilterApi extends ApiBase implements INamedFilterApi {
  public getAllNamedFilter(): NamedFilter[] {
    const config = this.blotter.blotterOptions.predefinedConfig as PredefinedConfig;
    return config.NamedFilter != null ? config.NamedFilter.NamedFilters : [];
    // currently they are not in state and there is no redux because of function issue...
  }
}
