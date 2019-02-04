import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'
import { FormatColumnSummaryWizard } from './FormatColumnSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FormatColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
    ColorPalette: string[],
    StyleClassNames: string[]
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column", "Style", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.FormatColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={
                    [
                        <FormatColumnScopeWizard StepName={stepNames[0]} />,
                        <FormatColumnStyleWizard StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                        < FormatColumnSummaryWizard StepName={stepNames[2]} />
                    ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} 
                canFinishWizard={() => this.props.canFinishWizard()}
                />
         
        </div>
    }
}

