import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IConditionalStyle } from "../../../Utilities/Interface/BlotterObjects/IConditionalStyle";
export declare class ConditionalStyleExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IConditionalStyle>);
    Next(): void;
    Back(): void;
    StepName: string;
}
