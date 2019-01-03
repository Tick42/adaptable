import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { ApiBase } from "./ApiBase";
import { ISystemStatus } from "./Interface/Interfaces";
import { StatusColour } from "../Utilities/Enums";
import { ISystemStatusApi } from './Interface/ISystemStatusApi';

export class SystemStatusApi extends ApiBase implements ISystemStatusApi {

      // System Status api Methods
  public  Set(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: statusColour }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetRed(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Red }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetAmber(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Amber }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetGreen(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Green }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }

  public  Clear(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus())
  }

}