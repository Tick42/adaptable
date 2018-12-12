"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../../Utilities/Enums");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const CellValidationHelper_1 = require("../../Utilities/Helpers/CellValidationHelper");
class CellValidationEntityRow extends React.Component {
    render() {
        let cellValidation = this.props.AdaptableBlotterObject;
        let ActionModeTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ActionMode).map((validationMode) => {
            return React.createElement("option", { key: validationMode, value: validationMode }, validationMode);
        });
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = this.getColumnandRule(cellValidation);
        colItems[1].Content = this.setExpressionDescription(cellValidation);
        colItems[2].Content =
            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: cellValidation.ActionMode, onChange: (x) => this.onActionModeChanged(this.props.Index, x) }, ActionModeTypes);
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, cellValidation), shareClick: () => this.props.onShare(), overrideDisableEdit: !this.props.Column, EntityName: StrategyConstants.CellValidationStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    setExpressionDescription(CellValidation) {
        return (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns) :
            "No Expression";
    }
    getColumnandRule(cellValidation) {
        let columnInfo = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(cellValidation.ColumnId, this.props.Column);
        columnInfo += ": " + CellValidationHelper_1.CellValidationHelper.createCellValidationDescription(cellValidation, this.props.Columns);
        return columnInfo;
    }
    onActionModeChanged(index, event) {
        let e = event.target;
        let returnValue = (e.value == 'Stop Edit') ? 'Stop Edit' : 'Warn User';
        this.props.onChangeActionMode(index, returnValue);
    }
}
exports.CellValidationEntityRow = CellValidationEntityRow;