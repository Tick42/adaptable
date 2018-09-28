"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleComponent_1 = require("../../Components/StyleComponent");
const UIHelper_1 = require("../../UIHelper");
class ConditionalStyleStyleWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { Style: this.props.Data.Style };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-style";
        let canUseClassName = true; // get from somewhere...
        return React.createElement("div", { className: cssClassName },
            React.createElement(StyleComponent_1.StyleComponent, { cssClassName: cssClassName, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Style: this.props.Data.Style, UpdateStyle: (style) => this.onUpdateStyle(style), CanUseClassName: canUseClassName }));
    }
    onUpdateStyle(style) {
        this.setState({ Style: style }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return UIHelper_1.UIHelper.IsNotEmptyStyle(this.state.Style);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Style = this.state.Style;
    }
    Back() {
        // todod
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ConditionalStyleStyleWizard = ConditionalStyleStyleWizard;