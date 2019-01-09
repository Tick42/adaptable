import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonMaximise extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTipAndText="Maximise"
            bsStyle={this.props.bsStyle}
            bsSize={this.props.size}
            glyph="chevron-down"
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.MINIMISE_BUTTON}
            hideToolTip={this.props.hideToolTip}
        />;
    }
}
