
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ILayout } from '../../../Strategy/Interface/ILayoutStrategy';
import { DistinctCriteriaPairValue, SortOrder } from '../../../Core/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { DualListBoxEditor } from "../../Components/ListBox/DualListBoxEditor";
import { Helper } from "../../../Core/Helpers/Helper";
import { SHORTCUT_ADD } from "../../../Redux/ActionsReducers/ShortcutRedux";

export interface LayoutColumnWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>
}
export interface LayoutColumnWizardState {
    SelectedColumns: Array<string>
}

export class LayoutColumnWizard extends React.Component<LayoutColumnWizardProps, LayoutColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutColumnWizardProps) {
        super(props)
        this.state = {
            SelectedColumns: this.props.Data.Columns.map(col => this.props.Columns.find(x => x.ColumnId == col).FriendlyName)
        }
        //  this.StepName = this.StepName + this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName
    }

    render(): any {
        let infoBody: any[] = ["Create a layout.", <br />, <br />, "Use the buttons on the right of the box to order items in the list as required.", <br />, <br />, "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."]
        let cssClassName: string = this.props.cssClassName + "__column"
       
        return <div className={cssClassName}>
        <PanelWithInfo cssClassName={cssClassName} header={"Choose columns for the Layout"} bsStyle="primary" infoBody={infoBody}>
            <DualListBoxEditor AvailableValues={this.props.Columns.map(x=>x.FriendlyName)}
                   SelectedValues={this.state.SelectedColumns}
                    HeaderAvailable="Available Columns"
                    HeaderSelected="Columns in Layout"
                    onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}
                    ReducedDisplay={true} />
            </PanelWithInfo>
        </div>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedColumns: newValues } as LayoutColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedColumns.length > 0; }
    public canBack(): boolean { return true;; }
    public Next(): void { 
        this.props.Data.Columns = this.state.SelectedColumns.map(friendlyName => this.props.Columns.find(x => x.FriendlyName == friendlyName).ColumnId)
    }
    public Back(): void {
        // todo
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}   