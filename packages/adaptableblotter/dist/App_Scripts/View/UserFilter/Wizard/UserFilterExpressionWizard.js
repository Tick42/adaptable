"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionBuilderPage_1 = require("../../ExpressionBuilder/ExpressionBuilderPage");
const UIHelper_1 = require("../../UIHelper");
class UserFilterExpressionWizard extends ExpressionBuilderPage_1.ExpressionBuilderPage {
    constructor(props2) {
        super(props2);
        this.props2 = props2;
        this.StepName = this.props.StepName;
        this.state = UIHelper_1.UIHelper.getExpressionBuilderStateWithColumn(this.props2.Data.Expression, this.props2.Data.ColumnId);
    }
    Next() {
        this.props2.Data.Expression = this.state.Expression;
    }
}
exports.UserFilterExpressionWizard = UserFilterExpressionWizard;