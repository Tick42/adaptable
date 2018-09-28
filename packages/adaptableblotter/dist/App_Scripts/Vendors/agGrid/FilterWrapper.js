"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOM = require("react-dom");
const FilterForm_1 = require("../../View/Components/FilterForm/FilterForm");
exports.FilterWrapperFactory = (blotter) => {
    return class FilterWrapper {
        init(params) {
            this.params = params;
            this.column = params.column;
            this.filterContainer = document.createElement("div");
            this.filterContainer.id = "filter_" + this.params.column.getColId();
        }
        isFilterActive() {
            //make the small filter icon to appear when there is a filter
            return blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.findIndex(x => x.ColumnId == this.params.column.getColId()) > -1;
        }
        doesFilterPass(params) {
            //we do not filter here.... we filter using the doesExternalFilterPass. Not sure there is a difference....
            return true;
        }
        getModel() {
            //
        }
        setModel(model) {
            //
        }
        getGui() {
            return this.filterContainer;
        }
        afterGuiAttached(params) {
            //we always unmount first so the autofocus from the form works... in other grids we unmount when hidden
            ReactDOM.unmountComponentAtNode(this.filterContainer);
            let filterContext = {
                Column: blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == this.column.getColId()),
                Blotter: blotter,
                ShowCloseButton: (params != null && params.hidePopup != null)
            };
            blotter.hideFilterFormPopup = (params) ? params.hidePopup : null;
            ReactDOM.render(FilterForm_1.FilterFormReact(filterContext), this.filterContainer);
        }
    };
};