import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ApiBase } from './ApiBase';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { DashboardApi } from '../DashboardApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { DashboardState, CustomToolbar } from '../../PredefinedConfig/DashboardState';
import {
  AdaptableDashboardToolbars,
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import Helper from '../../Utilities/Helpers/Helper';

export class DashboardApiImpl extends ApiBase implements DashboardApi {
  public getDashboardState(): DashboardState {
    return this.getAdaptableState().Dashboard;
  }

  public getCustomToolbars(): CustomToolbar[] | undefined {
    return this.getDashboardState().CustomToolbars;
  }

  public setVisibleToolbars(visibleToolbars: AdaptableDashboardToolbars): void {
    visibleToolbars.forEach((vt: AdaptableDashboardToolbar) => {
      this.showToolbar(vt);
    });
  }

  public showToolbar(visibleToolbar: AdaptableDashboardToolbar): void {
    this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
  }

  public hideToolbar(visibleToolbar: AdaptableDashboardToolbar): void {
    this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
  }

  public setVisibleButtons(functionButtons: AdaptableFunctionButtons): void {
    this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
  }

  public setHomeToolbarTitle(title: string): void {
    this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
  }

  public getCustomToolbarContentsDiv(customToolbarName: string): HTMLElement | null {
    let customToolbar: CustomToolbar = this.getCustomToolbarByName(customToolbarName);
    if (customToolbar) {
      let divId: string = 'ab-CustomToolbar__' + customToolbar.Name + '__contents';
      return document.getElementById(divId);
    }
    return null;
  }

  public getCustomToolbarByName(customToolbarName: string): CustomToolbar {
    return this.getDashboardState().CustomToolbars.find(ct => ct.Name == customToolbarName);
  }

  public setCustomToolbarButtons(customToolbarName: string, buttons: ToolbarButton[]): void {
    this.updateCustomToolbarButtons(customToolbarName, buttons, 'override');
  }

  public addCustomToolbarButtons(customToolbarName: string, buttons: ToolbarButton[]): void {
    this.updateCustomToolbarButtons(customToolbarName, buttons, 'add');
  }

  public clearCustomToolbarButtons(customToolbarName: string): void {
    this.updateCustomToolbarButtons(customToolbarName, [], 'clear');
  }

  private updateCustomToolbarButtons(
    customToolbarName: string,
    buttons: ToolbarButton[],
    action: 'add' | 'override' | 'clear'
  ): void {
    let customToolbars: CustomToolbar[] | undefined = this.getDashboardState().CustomToolbars;
    if (ArrayExtensions.IsNotNullOrEmpty(customToolbars)) {
      let customToolbar: CustomToolbar | undefined = customToolbars.find(
        c => c.Name == customToolbarName
      );
      if (customToolbarName) {
        let clonedCustomToolbar: CustomToolbar = Helper.cloneObject(customToolbar);
        if (action == 'add') {
          clonedCustomToolbar.ToolbarButtons.push(...buttons);
        } else if (action == 'override') {
          clonedCustomToolbar.ToolbarButtons = buttons;
        } else if (action == 'clear') {
          clonedCustomToolbar.ToolbarButtons = [];
        }
        this.dispatchAction(DashboardRedux.DashboardCustomToolbarEdit(clonedCustomToolbar));
      }
    }
  }

  public showDashboardPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.DashboardStrategyId,
      ScreenPopups.DashboardPopup
    );
  }
}
