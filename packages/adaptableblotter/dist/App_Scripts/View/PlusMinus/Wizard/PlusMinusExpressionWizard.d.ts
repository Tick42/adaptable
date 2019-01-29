import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IPlusMinusRule } from "../../../Utilities/Interface/BlotterObjects/IPlusMinusRule";
export declare class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IPlusMinusRule>);
    Next(): void;
    Back(): void;
    StepName: string;
}
