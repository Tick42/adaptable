import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { ICellValidationRule } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';


export class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<ICellValidationRule>) {
        super(props2)
        this.state = {
            Expression: props2.Data.OtherExpression,
            SelectedColumnId: ""
        }
    }

    public Next(): void {
        this.props2.Data.OtherExpression = this.state.Expression
    }

    public StepName = this.props.StepName
}