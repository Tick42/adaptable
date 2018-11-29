import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ActionMode } from '../../../Utilities/Enums';
import { ICellValidationRule } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface CellValidationActionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>;
}
export interface CellValidationSettingsWizardState {
    ActionMode: ActionMode;
}
export declare class CellValidationActionWizard extends React.Component<CellValidationActionWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationActionWizardProps);
    render(): any;
    private onActionModeChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
