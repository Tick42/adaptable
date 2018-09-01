"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonClear_1 = require("../Buttons/ButtonClear");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class AdaptableBlotterFormControlTextClear extends React.Component {
    render() {
        let size = (this.props.bsSize) ? this.props.bsSize : 'small';
        let cssClassName = this.props.cssClassName + StyleConstants.TEXT_ENTRY_FORM;
        return React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.FormControl, { className: cssClassName, autoFocus: this.props.autoFocus, bsSize: size, style: this.props.style, type: "text", placeholder: this.props.placeholder, value: this.props.value, onChange: (x) => this.props.OnTextChange(x.target.value) }),
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.value.toString()) &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.props.OnTextChange(""), size: "small", overrideTooltip: "Clear", ConfigEntity: null, DisplayMode: "Glyph" }))));
    }
}
exports.AdaptableBlotterFormControlTextClear = AdaptableBlotterFormControlTextClear;