import { IPlusMinusRule } from '../../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { DistinctCriteriaPairValue, DataType } from '../../../Core/Enums'
import { IUserFilter, ISystemFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';


export interface PlusMinusWizardProps extends React.ClassAttributes<PlusMinusWizard> {
    EditedPlusMinusRule: IPlusMinusRule
    Columns: Array<IColumn>
    UserFilters: IUserFilter[],
    SystemFilters: ISystemFilter[],
    WizardStartIndex: number,
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Settings", "Build Query"]
        return <div className="adaptable_blotter_style_wizard_plusminus">
            <AdaptableWizard
                FriendlyName={StrategyNames.PlusMinusStrategyName}
                StepNames={stepNames}
                Steps={
                    [<PlusMinusColumnWizard StepName={stepNames[0]} Columns={this.props.Columns.filter(x => x.DataType == DataType.Number)} />,
                    <PlusMinusSettingsWizard StepName={stepNames[1]} />,
                    <PlusMinusExpressionWizard StepName={stepNames[2]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={this.props.SelectedColumnId}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
                Data={this.props.EditedPlusMinusRule}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.closeWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

