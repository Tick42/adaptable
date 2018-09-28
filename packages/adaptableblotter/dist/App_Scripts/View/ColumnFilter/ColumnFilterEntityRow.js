"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
const ButtonSave_1 = require("../Components/Buttons/ButtonSave");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
class ColumnFilterEntityRow extends React.Component {
    render() {
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.ColumnFilter.ColumnId, this.props.Columns);
        colItems[1].Content = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns);
        colItems[2].Content = React.createElement("span", null,
            React.createElement(ButtonSave_1.ButtonSave, { cssClassName: this.props.cssClassName, onClick: () => this.props.onSaveColumnFilterasUserFilter(this.props.ColumnFilter), overrideTooltip: "Save as User Filter", bsStyle: "primary", DisplayMode: "Glyph", size: "small", overrideDisableButton: this.props.ColumnFilter == null || ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.Filter.FilterExpressions) }),
            ' ',
            React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName, onClick: () => this.props.onClear(this.props.ColumnFilter), overrideTooltip: "Clear Column Filter", bsStyle: "danger", DisplayMode: "Glyph", size: "small", overrideDisableButton: this.props.ColumnFilter == null }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems, key: this.props.Index });
    }
}
exports.ColumnFilterEntityRow = ColumnFilterEntityRow;