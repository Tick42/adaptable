import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IGridSort } from '../Utilities/Interface/IGridSort';
import { ILayout } from '../Utilities/Interface/BlotterObjects/ILayout';
import { ApiBase } from './ApiBase';
import { DEFAULT_LAYOUT } from '../Utilities/Constants/GeneralConstants';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { ILayoutApi } from './Interface/ILayoutApi';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';

export class LayoutApi extends ApiBase implements ILayoutApi {
  public getLayoutState(): LayoutState {
    return this.getBlotterState().Layout;
  }

  public setLayout(layoutName: string): void {
    let layout: ILayout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
    if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
    }
  }

  public clearLayout(): void {
    this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT));
  }

  public getCurrentLayout(): ILayout {
    let layoutName = this.getBlotterState().Layout.CurrentLayout;
    return this.getLayoutByName(layoutName);
  }

  public getCurrentLayoutName(): string {
    return this.getBlotterState().Layout.CurrentLayout;
  }

  public getLayoutByName(layoutName: string): ILayout {
    let layout: ILayout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
    if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      return layout;
    }
  }

  public getAllLayout(): ILayout[] {
    return this.getBlotterState().Layout.Layouts;
  }

  public saveLayout(): void {
    let currentLayoutName: string = this.getBlotterState().Layout.CurrentLayout;
    if (currentLayoutName != DEFAULT_LAYOUT) {
      let currentLayoutObject: ILayout = this.getBlotterState().Layout.Layouts.find(
        l => l.Name == currentLayoutName
      );
      let currentLayoutIndex: number = this.getBlotterState().Layout.Layouts.findIndex(
        l => l.Name == currentLayoutName
      );
      if (currentLayoutIndex != -1) {
        let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
        let visibleColumns: IColumn[] = this.getBlotterState().Grid.Columns.filter(c => c.Visible);
        let gridSorts: IGridSort[] = this.getBlotterState().Grid.GridSorts;
        let layoutToSave = ObjectFactory.CreateLayout(
          visibleColumns,
          gridSorts,
          gridState,
          currentLayoutName
        );
        this.dispatchAction(LayoutRedux.LayoutSave(currentLayoutIndex, layoutToSave));
      }
    }
  }
}
