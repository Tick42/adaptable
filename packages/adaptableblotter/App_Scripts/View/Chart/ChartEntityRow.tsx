import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IChartDefinition } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";
import { AccessLevel } from "../../Utilities/Enums";

export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
    AccessLevel: AccessLevel
}

export class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any {
        let Chart: IChartDefinition = this.props.AdaptableBlotterObject as IChartDefinition;
        let colItems: IColItem[] = [].concat(this.props.colItems);
       
        colItems[0].Content = Chart.Title
        colItems[1].Content = Chart.SubTitle
        colItems[2].Content = <ButtonShowChart
            key={"key:" + Chart.Title}
            style={{ marginLeft: "2px" }}
            cssClassName={this.props.cssClassName}
            onClick={() => this.props.onShowChart(Chart.Title)}
            size={"small"}
            overrideTooltip="Show Chart"
            DisplayMode="Glyph" 
            AccessLevel={this.props.AccessLevel}
            />
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, Chart)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={null}
            EntityName="Chart">
        </EntityListActionButtons>

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

}