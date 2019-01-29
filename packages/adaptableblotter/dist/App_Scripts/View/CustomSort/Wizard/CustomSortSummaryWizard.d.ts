import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { ICustomSort } from "../../../Utilities/Interface/BlotterObjects/ICustomSort";
export interface CustomSortSummaryWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: IColumn[];
}
export declare class CustomSortSummaryWizard extends React.Component<CustomSortSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CustomSortSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
