import * as React from "react";
import { Radio, Col, Panel, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { ExpressionHelper } from "../../../Core/Helpers/ExpressionHelper";
import { ICellValidationRule, IUserFilter } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


export interface CellValidationSummaryWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}


export class CellValidationSummaryWizard extends React.Component<CellValidationSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CellValidationSummaryWizardProps) {
        super(props)
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Mode", Value: this.props.Data.ActionMode },
            { Key: "Rule", Value: this.props.Data.Description },
            {
                Key: "Query", Value: ExpressionHelper.IsNotEmptyExpression( this.props.Data.Expression) ?
                    ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) :
                    "None"
            }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.CellValidationStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>

    }

    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void { /* no implementation */ }

    public Back(): void { /* no implementation */ }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return ExpressionHelper.IsEmptyExpression( this.props.Data.Expression )? 2 : 1;
    }
    public StepName = this.props.StepName
}

