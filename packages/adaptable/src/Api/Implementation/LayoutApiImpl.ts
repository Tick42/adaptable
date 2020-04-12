import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { DEFAULT_LAYOUT } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { LayoutApi } from '../LayoutApi';
import { LayoutState, Layout } from '../../PredefinedConfig/LayoutState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import ObjectFactory from '../../Utilities/ObjectFactory';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import Helper from '../../Utilities/Helpers/Helper';
import { createUuid } from '../../PredefinedConfig/Uuid';

export class LayoutApiImpl extends ApiBase implements LayoutApi {
  public getLayoutState(): LayoutState {
    return this.getAdaptableState().Layout;
  }

  public setLayout(layoutName: string): void {
    if (this.isCorrectlyEntitled('Layout', 'ReadOnly', 'Select Layout')) {
      if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
        let layout: Layout = this.getAdaptableState().Layout.Layouts.find(
          l => l.Name == layoutName
        );
        if (
          this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)
        ) {
          this.dispatchAction(LayoutRedux.LayoutSelect(layoutName));
        }
      }
    }
  }

  public clearLayout(): void {
    this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT));
  }

  public getCurrentLayout(): Layout {
    let layoutName = this.getAdaptableState().Layout.CurrentLayout;
    return this.getLayoutByName(layoutName);
  }

  public getCurrentLayoutName(): string {
    return this.getAdaptableState().Layout.CurrentLayout;
  }

  public isDefaultLayout(): boolean {
    return this.getCurrentLayoutName() == DEFAULT_LAYOUT;
  }

  public getLayoutByName(layoutName: string): Layout {
    if (StringExtensions.IsNotNullOrEmpty(layoutName)) {
      let layout: Layout = this.getAdaptableState().Layout.Layouts.find(l => l.Name == layoutName);
      if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyFriendlyName)) {
        return layout;
      }
    }
  }

  public getAllLayout(): Layout[] {
    return this.getAdaptableState().Layout.Layouts;
  }

  public saveCurrentLayout(): void {
    let currentLayoutName: string = this.getAdaptableState().Layout.CurrentLayout;
    if (currentLayoutName != DEFAULT_LAYOUT) {
      let currentLayoutObject: Layout = this.getAdaptableState().Layout.Layouts.find(
        l => l.Name == currentLayoutName
      );
      if (currentLayoutObject) {
        let gridState: any = currentLayoutObject ? currentLayoutObject.VendorGridInfo : null;
        let visibleColumns: AdaptableColumn[] = this.getAdaptableState().Grid.Columns.filter(
          c => c.Visible
        );
        let columnSorts: ColumnSort[] = this.getAdaptableState().Grid.ColumnSorts;

        let layoutToSave: Layout = {
          Uuid: currentLayoutObject.Uuid,
          Name: currentLayoutName,
          Columns: currentLayoutObject.Columns,
          ColumnSorts: currentLayoutObject.ColumnSorts,
          GroupedColumns: currentLayoutObject.GroupedColumns,
          PivotDetails: currentLayoutObject.PivotDetails,
          VendorGridInfo: gridState,
          AdaptableGridInfo: {
            CurrentColumns: visibleColumns ? visibleColumns.map(x => x.ColumnId) : [],
            CurrentColumnSorts: columnSorts,
            ExpandedRowGroupKeys: this.adaptable.api.gridApi.getExpandRowGroupsKeys(),
          },
        };

        this.saveLayout(layoutToSave);
      }
    }
  }

  public doesLayoutExist(layout: Layout): boolean {
    if (layout == null) {
      return false;
    }
    let existingLayout = this.getAllLayout().find(l => l.Uuid == layout.Uuid);
    return existingLayout != null;
  }

  public createAndSetLayout(layoutToCreate: Layout): void {
    if (this.doesLayoutExist(layoutToCreate)) {
      LoggingHelper.LogAdaptableError(
        "Cannot create layout with the Name: '" + layoutToCreate.Name + "' as it already exists"
      );
      return;
    }
    this.createLayout(layoutToCreate);
    setTimeout(() => {
      this.setLayout(layoutToCreate.Name);
    }, 200);
  }

  public createLayout(layoutToCreate: Layout): void {
    if (this.doesLayoutExist(layoutToCreate)) {
      LoggingHelper.LogAdaptableError(
        "Cannot create layout with the Name: '" + layoutToCreate.Name + "' as it already exists"
      );
      return;
    }
    let newLayout: Layout = ObjectFactory.CreateEmptyLayout();
    newLayout.Name = layoutToCreate.Name;
    newLayout.Columns = layoutToCreate.Columns;
    newLayout.ColumnSorts = ArrayExtensions.IsNotNullOrEmpty(layoutToCreate.ColumnSorts)
      ? layoutToCreate.ColumnSorts
      : [];
    newLayout.GroupedColumns = ArrayExtensions.IsNotNullOrEmpty(layoutToCreate.GroupedColumns)
      ? layoutToCreate.GroupedColumns
      : [];
    newLayout.PivotDetails = layoutToCreate.PivotDetails;
    // make sure that the objects we need are null and have NOT been pre-loaded...
    newLayout.VendorGridInfo = null;
    newLayout.AdaptableGridInfo = null;
    this.dispatchAction(LayoutRedux.LayoutSave(newLayout));
  }

  public cloneAndSetLayout(layoutToClone: Layout, layoutName: string): void {
    if (!this.doesLayoutExist(layoutToClone)) {
      LoggingHelper.LogAdaptableError(
        "Cannot clone layout with Name: '" + layoutName + "' as other Layout does not exist"
      );
      return;
    }
    this.cloneLayout(layoutToClone, layoutName);
    setTimeout(() => {
      this.setLayout(layoutName);
    }, 200);
  }

  public cloneLayout(layoutToClone: Layout, layoutName: string): void {
    if (!this.doesLayoutExist(layoutToClone)) {
      LoggingHelper.LogAdaptableError(
        "Cannot clone layout with Name: '" + layoutName + "' as other Layout does not exist"
      );
      return;
    }
    let newLayout: Layout = Helper.cloneObject(layoutToClone);
    (newLayout.Uuid = createUuid()), (newLayout.Name = layoutName);
    this.dispatchAction(LayoutRedux.LayoutSave(newLayout));
  }

  public saveLayout(layoutToSave: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutSave(layoutToSave));
  }

  public restorelayout(layoutToSave: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutRestore(layoutToSave));
  }

  public showLayoutPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.LayoutStrategyId,
      ScreenPopups.LayoutPopup
    );
  }
}
