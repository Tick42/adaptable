import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../Api/Interface/IColumn";
import { AxisTotal } from "../../../Utilities/ChartEnums";
export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[];
    Columns: IColumn[];
}
export interface ChartYAxisWizardState {
    YAxisColumnIds: string[];
    YAxisTotal: AxisTotal;
}
export declare class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps);
    render(): any;
    createRow(columnNumber: number, labelText: string, cssClassName: string, colId: string, index: number, availableCols: IColumn[]): any;
    onYAxisColumnChanged(columns: IColumn[], index: number): void;
    private onYAisTotalChanged;
    getAvailableNumericColumns(selectedColumnId: string): IColumn[];
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
