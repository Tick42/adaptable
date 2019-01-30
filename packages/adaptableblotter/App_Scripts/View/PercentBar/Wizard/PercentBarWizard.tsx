import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { PercentBarSelectColumnWizard } from '././PercentBarSelectColumnWizard'
import { PercentBarSummaryWizard } from '././PercentBarSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBarSettingsWizard } from "./PercentBarSettingsWizard";
import { PercentBarValuesWizard } from "./PercentBarValuesWizard";

export interface PercentBarWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PercentBarWizard> {
    ColorPalette: Array<string>;
}

export class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column", "Values", "Settings", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.PercentBarStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <PercentBarSelectColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <PercentBarValuesWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <PercentBarSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} ColorPalette={this.props.ColorPalette} />,
                    <PercentBarSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} />
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

