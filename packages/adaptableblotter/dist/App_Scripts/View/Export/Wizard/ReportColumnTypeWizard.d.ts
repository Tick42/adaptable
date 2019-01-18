import { IReport } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ReportColumnScope } from '../../../Utilities/Enums';
export interface ReportColumnTypeWizardProps extends AdaptableWizardStepProps<IReport> {
}
export interface ReportColumnsWizardState {
    ReportColumnScope: ReportColumnScope;
}
export declare class ReportColumnTypeWizard extends React.Component<ReportColumnTypeWizardProps, ReportColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportColumnTypeWizardProps);
    render(): JSX.Element;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
    StepName: string;
}
