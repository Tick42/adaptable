import {
  AdaptableWizardStep,
  ExpressionWizardProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { UIHelper } from '../../UIHelper';

export class ConditionalStyleExpressionWizard extends ExpressionBuilderPage
  implements AdaptableWizardStep {
  constructor(private props2: ExpressionWizardProps<ConditionalStyle>) {
    super(props2);
    this.Data = props2.Data;
    this.state = UIHelper.getExpressionBuilderState(props2.Data.Expression);
  }

  public Data: any;

  public Next(): void {
    this.Data.Expression = this.state.Expression;
  }
  public Back(): void {
    //todo
  }
}
