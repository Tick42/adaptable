import * as React from "react";
import { ExpressionMode } from '../../../Utilities/Enums'
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard'
import { UserFilterSummaryWizard } from './UserFilterSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';


export interface UserFilterWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<UserFilterWizard> {
    SelectedColumnId: string
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Build Query", "Settings", "Summary"]

        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.UserFilterStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={
                    [
                        <UserFilterSelectColumnWizard
                            Columns={this.props.Columns}
                            cssClassName={this.props.cssClassName}
                            StepName={stepNames[0]} />,
                        <UserFilterExpressionWizard
                            cssClassName={this.props.cssClassName}
                            StepName={stepNames[1]}
                            Columns={this.props.Columns}
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                            ExpressionMode={ExpressionMode.SingleColumn}
                            Blotter={this.props.Blotter}
                            />,
                        <UserFilterSettingsWizard
                            cssClassName={this.props.cssClassName} StepName={stepNames[2]}
                            UserFilters={this.props.UserFilters}
                            Columns={this.props.Columns} />,
                        < UserFilterSummaryWizard
                            cssClassName={this.props.cssClassName}
                            StepName={stepNames[3]}
                            Columns={this.props.Columns}
                            UserFilters={this.props.UserFilters} />
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
