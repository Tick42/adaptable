import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IConditionalStyle, IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface ConditionalStyleSummaryWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class ConditionalStyleSummaryWizard extends React.Component<ConditionalStyleSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleSummaryWizardProps);
    render(): any;
    private getScope;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}