import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { SystemStatusApi } from '../SystemStatusApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SystemStatusUpdate } from '../../Utilities/Interface/SystemStatusUpdate';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import Helper from '../../Utilities/Helpers/Helper';

export class SystemStatusApiImpl extends ApiBase implements SystemStatusApi {
  public getSystemStatusState(): SystemStatusState {
    return this.getAdaptableState().SystemStatus;
  }

  public setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info',
    statusFurtherInformation?: string
  ): void {
    if (StringExtensions.IsNullOrEmpty(statusMessage)) {
      if (this.adaptable.isInitialised) {
        LoggingHelper.LogAdaptableWarning('System Status Message cannot be empty.');
      }
      return;
    }

    let systemStatus: SystemStatusUpdate = {
      StatusMessage: statusMessage,
      StatusType: messageType as MessageType,
      StatusFurtherInformation: statusFurtherInformation,
    };
    this.dispatchAction(SystemStatusRedux.SystemStatusSetUpdate(systemStatus));
    if (this.getSystemStatusState().ShowAlert) {
      if (
        statusMessage !== this.getSystemStatusState().DefaultStatusMessage ||
        messageType !== this.getSystemStatusState().DefaultStatusType
      ) {
        let fullMessage = statusMessage;
        if (StringExtensions.IsNotNullOrEmpty(statusFurtherInformation)) {
          fullMessage += '\n' + statusFurtherInformation;
        }
        switch (messageType) {
          case MessageType.Success:
            this.adaptable.api.alertApi.showAlertSuccess('System Status Success', fullMessage);
            return;
          case MessageType.Info:
            this.adaptable.api.alertApi.showAlertInfo('System Status Info', fullMessage);
            return;
          case MessageType.Warning:
            this.adaptable.api.alertApi.showAlertWarning('System Status Warning', fullMessage);
            return;
          case MessageType.Error:
            this.adaptable.api.alertApi.showAlertError('System Status Error', fullMessage);
            return;
        }
      }
    }
  }

  public setErrorSystemStatus(statusMessage: string, statusFurtherInformation?: string): void {
    this.setSystemStatus(statusMessage, MessageType.Error, statusFurtherInformation);
  }

  public setWarningSystemStatus(statusMessage: string, statusFurtherInformation?: string): void {
    this.setSystemStatus(statusMessage, MessageType.Warning, statusFurtherInformation);
  }

  public setSuccessSystemStatus(statusMessage: string, statusFurtherInformation?: string): void {
    this.setSystemStatus(statusMessage, MessageType.Success, statusFurtherInformation);
  }

  public setInfoSystemStatus(statusMessage: string, statusFurtherInformation?: string): void {
    this.setSystemStatus(statusMessage, MessageType.Info, statusFurtherInformation);
  }

  public clearSystemStatus(): void {
    this.dispatchAction(SystemStatusRedux.SystemStatusClear());
  }

  public setDefaultMessage(): void {
    if (
      StringExtensions.IsNullOrEmpty(this.getSystemStatusState().StatusMessage) &&
      StringExtensions.IsNotNullOrEmpty(this.getSystemStatusState().DefaultStatusMessage) &&
      Helper.objectExists(this.getSystemStatusState().DefaultStatusType)
    ) {
      this.setSystemStatus(
        this.getSystemStatusState().DefaultStatusMessage,
        this.getSystemStatusState().DefaultStatusType
      );
    }
  }

  public showSystemStatusPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.SystemStatusStrategyId,
      ScreenPopups.SystemStatusPopup
    );
  }
}
