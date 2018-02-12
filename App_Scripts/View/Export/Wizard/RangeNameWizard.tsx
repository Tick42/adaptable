import { IRange } from '../../../Strategy/Interface/IExportStrategy';
import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../AdaptableBlotterForm";


export interface RangeNameWizardProps extends AdaptableWizardStepProps<IRange> {
    Ranges: IRange[]
}
export interface RangeNameWizardState {
    RangeName: string,
    ErrorMessage: string
}

export class RangeNameWizard extends React.Component<RangeNameWizardProps, RangeNameWizardState> implements AdaptableWizardStep {
    constructor(props: RangeNameWizardProps) {
        super(props);
        this.state = {
            RangeName: this.props.Data.Name,
            ErrorMessage: null
        }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <Panel header="Enter a Name for the Range" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <Col xs={10}>
                    <FormGroup controlId="formInlineName" validationState={validationState}>
                        <FormControl type="text" placeholder="Enter Range Name" value={this.state.RangeName} onChange={(e) => this.onSaveLayoutNameChanged(e)} />
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                    </FormGroup>
                </Col>

                <Col xs={2}>{' '} </Col>
            </AdaptableBlotterForm>
        </Panel>
    }

    private onSaveLayoutNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            RangeName: e.value,
            ErrorMessage: this.props.Ranges.findIndex(x => x.Name == e.value) > -1 ? "A Range already exists with that name" : null
        } as RangeNameWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.RangeName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.Name = this.state.RangeName; }
    public Back(): void {
        //todo
    }
    public StepName = this.props.StepName
}

