import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import { FontWeight, FontStyle, FontSize } from '../../../Core/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { IStyle } from '../../../Core/Interface/IStyle';
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";

export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    ColorPalette: string[]
    StyleClassNames: string[]
}

export interface FormatColumnStyleWizardState {
    Style: IStyle,
}

export class FormatColumnStyleWizard extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState> implements AdaptableWizardStep {

    constructor(props: FormatColumnStyleWizardProps) {
        super(props)
        this.state = { Style: this.props.Data.Style }
    }

    render() {

        let canUseClassName = true; // get from somewhere...
        let cssClassName: string = this.props.cssClassName + "-style"
       
        return <div className={cssClassName}>
        <StyleComponent
              cssClassName={cssClassName}
                ColorPalette={this.props.ColorPalette}
                StyleClassNames={this.props.StyleClassNames}
                Style={this.props.Data.Style}
                UpdateStyle={(style: IStyle) => this.onUpdateStyle(style)}
                CanUseClassName={canUseClassName}
            />
        </div>
    }


    public canNext(): boolean {
        return this.state.Style.BackColor != null || this.state.Style.ForeColor != null || this.state.Style.FontWeight != FontWeight.Normal || this.state.Style.FontStyle != FontStyle.Normal || this.state.Style.FontSize != null || StringExtensions.IsNotNullOrEmpty(this.state.Style.ClassName)
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.Style = this.state.Style;
    }
    public Back(): void { 
        // todo
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }

    private onUpdateStyle(style: IStyle) {
        this.setState({ Style: style } as FormatColumnStyleWizardState, () => this.props.UpdateGoBackState())
    }



    public StepName = this.props.StepName

}


