import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ILayout, IGridSort } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { DEFAULT_LAYOUT } from "../Utilities/Constants/GeneralConstants";
import { IColumn } from "./Interface/IColumn";
import { ObjectFactory } from "../Utilities/ObjectFactory";

export interface ILayoutApi {

    /**
     * Selects the layout
     * @param layoutName has to be an existing layout
     */
   Set(layoutName: string): void

    /**
       * Clears the currently selected layout
       */
    Clear(): void

    /**
     * Retrieves current Layout
     */
    GetCurrent(): ILayout

    /**
     * Retrieves current Layout name
     */
    GetCurrentName(): string

    /**
     * Retrieves all Layouts in State
     */
    GetAll(): ILayout[]

    /**
     * Saves the current layout - using the column order and grid sort info currently in the grid
     */
    Save(): void

}


export class LayoutApi extends ApiBase implements ILayoutApi {
  
    public  Set(layoutName: string): void {
        let layout: ILayout = this.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName))
        }
    }

    public  Clear(): void {
        this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }

    public  GetCurrent(): ILayout {
        let layoutName = this.getState().Layout.CurrentLayout;
        return this.getState().Layout.Layouts.find(l => l.Name == layoutName);
    }

    public  GetCurrentName(): string {
       return this.getState().Layout.CurrentLayout;
    }

    public  GetAll(): ILayout[] {
        return this.getState().Layout.Layouts;
    }

    public  Save(): void {
        let currentLayoutName: string = this.getState().Layout.CurrentLayout
        if (currentLayoutName != DEFAULT_LAYOUT) {
            let currentLayoutObject: ILayout = this.getState().Layout.Layouts.find(l => l.Name == currentLayoutName)
            let currentLayoutIndex: number = this.getState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName)
            if (currentLayoutIndex != -1) {
                let gridState: any = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null
                let visibleColumns: IColumn[] = this.getState().Grid.Columns.filter(c => c.Visible);
                let gridSorts: IGridSort[] = this.getState().Grid.GridSorts;
                let layoutToSave = ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName)
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave))
            }
        }
    }

}