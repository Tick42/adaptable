import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumnCategory } from "../../../Api/Interface/Interfaces";
export interface ConditionalStyleWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
    ColorPalette: string[];
    StyleClassNames: string[];
    ColumnCategories: IColumnCategory[];
}
export declare class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
    render(): JSX.Element;
}