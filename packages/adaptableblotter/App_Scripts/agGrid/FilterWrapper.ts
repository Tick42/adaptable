import { IFilterComp, IDoesFilterPassParams, IFilterParams, Column } from "ag-grid-community"
import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from "../Utilities/Interface/IColumnFilterContext";
import { AdaptableBlotter, } from './AdaptableBlotter'
import { FilterFormReact } from "../View/Components/FilterForm/FilterForm";
import { IColumn } from "../Utilities/Interface/IColumn";
import { ColumnHelper } from "../Utilities/Helpers/ColumnHelper";

export let FilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFilterComp {
        private params: IFilterParams
        private filterContainer: HTMLDivElement
        private column: Column
        init(params: IFilterParams): void {
            this.params = params
            this.column = params.column
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "filter_" + this.params.column.getColId()+ '_' + blotter.blotterOptions.blotterId;
        }
        isFilterActive() {
            //make the small filter icon to appear when there is a filter
            return blotter.api.columnFilterApi.GetAll().findIndex(x => x.ColumnId == this.params.column.getColId()) > -1
        }

        doesFilterPass(params: IDoesFilterPassParams): boolean {
            //we do not filter here.... we filter using the doesExternalFilterPass. Not sure there is a difference....
            return true
        }

        getModel(): any {
            //
        }
        setModel(model: any): void {
            //
        }
        getGui(): HTMLElement {
            return this.filterContainer
        }

        afterGuiAttached?(params?: { hidePopup?: Function }): void {
            //we always unmount first so the autofocus from the form works... in other grids we unmount when hidden
            ReactDOM.unmountComponentAtNode(this.filterContainer)
            let column: IColumn  = ColumnHelper.getColumnFromId(this.column.getColId(), blotter.api.gridApi.getColumns());
            let filterContext: IColumnFilterContext = {
                Column: column,
                Blotter: blotter,
                ShowCloseButton : (params != null && params.hidePopup !=null),
             };
            blotter.hideFilterFormPopup = (params)? params.hidePopup: null
            ReactDOM.render(FilterFormReact(filterContext), this.filterContainer);
        }
    }
};



