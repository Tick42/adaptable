import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { PlusMinusSummaryWizard } from './PlusMinusSummaryWizard'
import { IUserFilter } from '../../../Utilities/Interface/IAdaptableBlotterObjects';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DataType } from "../../../Utilities/Enums";


export interface PlusMinusWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
    SelectedColumnId: string
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Settings", "Build Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.PlusMinusStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={
                    [<PlusMinusColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns.filter(x => x.DataType == DataType.Number)} />,
                    <PlusMinusSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} />,
                    <PlusMinusExpressionWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        />,
                    < PlusMinusSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />

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

