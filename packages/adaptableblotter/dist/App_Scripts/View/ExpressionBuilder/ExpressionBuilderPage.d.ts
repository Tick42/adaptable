import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard';
import { ExpressionMode, QueryBuildStatus, QueryTab } from '../../Core/Enums';
import { IUserFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../Core/Api/Expression";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
    Columns: Array<IColumn>;
    UserFilters: Array<IUserFilter>;
    SystemFilters: Array<string>;
    ExpressionMode?: ExpressionMode;
    UpdateGoBackState?(finish?: boolean): void;
    StepName?: string;
    cssClassName: string;
    Blotter: IAdaptableBlotter;
}
export interface ExpressionBuilderPageState {
    Expression: Expression;
    SelectedColumnId: string;
    SelectedTab: QueryTab;
}
export declare class ExpressionBuilderPage extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState> implements AdaptableWizardStep {
    render(): JSX.Element;
    getQueryBuildStatus(): QueryBuildStatus;
    onSelectedColumnChanged(): void;
    DeleteColumnValue(columnId: string, value: any): void;
    DeleteUserFilterExpression(columnId: string, index: number): void;
    DeleteRange(columnId: string, index: number): void;
    DeleteAllColumnExpression(columnId: string): void;
    onChangeExpression(newExpression: Expression): void;
    onSelectedColumnChange(columnId: string, tab: QueryTab): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}