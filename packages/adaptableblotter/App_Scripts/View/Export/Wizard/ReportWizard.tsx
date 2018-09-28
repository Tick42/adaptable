import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard'
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard'
import { ReportExpressionWizard } from './ReportExpressionWizard'
import { ReportSettingsWizard } from './ReportSettingsWizard'
import { ReportSummaryWizard } from './ReportSummaryWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import * as StrategyIds from '../../../Core/Constants/StrategyIds'
import { IReport } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export class ReportWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReportWizard>, {}> {

    render() {
        let stepNames: string[] = ["Select Columns", "Build Query", "Choose Name", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyIds.ExportStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ReportColumnTypeWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} />,
                    <ReportColumnChooserWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <ReportExpressionWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        />,
                    <ReportSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Reports={this.props.ConfigEntities as IReport[]} />,
                    < ReportSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />
                ]}
                Data={this.props.EditedAdaptableBlotterObject as IReport}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }

}
