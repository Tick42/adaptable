import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux'
import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSourceApi';
import { IDataSource } from '../Utilities/Interface/BlotterObjects/IDataSource';
import { DataSourceState } from '../Redux/ActionsReducers/Interface/IState';

export class DataSourceApi extends ApiBase implements IDataSourceApi {

  public getDataSourceState(): DataSourceState {
    return this.getBlotterState().DataSource;
  }

  public setDataSource(dataSourceName: string): void {
    let dataSource: IDataSource = this.getBlotterState().DataSource.DataSources.find(a => a.Name == dataSourceName);
    if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name))
    }
  }

  public createDataSource(dataSourceName: string, dataSourceDescription: string): void {
    let dataSource: IDataSource = {
      Name: dataSourceName,
      Description: dataSourceDescription
    }
    this.addDataSource(dataSource);
  }

  public addDataSource(dataSource: IDataSource): void {
    this.dispatchAction(DataSourceRedux.DataSourceAddUpdate(-1, dataSource))
  }

  public clearDataSource(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(""))
  }
}