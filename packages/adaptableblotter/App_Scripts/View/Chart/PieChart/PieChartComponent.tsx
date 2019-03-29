import * as React from "react";
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { ICategoryChartDefinition, IChartProperties, IPieChartDefinition, IPieChartProperties, IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartUIHelper } from "./PieChartUIHelper";
import { PieChartComponentState } from "./PieChartComponentState";
import { ButtonMaximise } from "../../Components/Buttons/ButtonMaximise";
import { DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../../Utilities/Constants/StyleConstants";
import { ButtonMinimise } from "../../Components/Buttons/ButtonMinimise";
import { ButtonClose } from "../../Components/Buttons/ButtonClose";
import { ButtonGeneral } from "../../Components/Buttons/ButtonGeneral";
import { Helper } from "../../../Utilities/Helpers/Helper";
import { DefaultPieChartProperties } from "../../../Utilities/Defaults/DefaultPieChartProperties";
import { Row, Col, Table, HelpBlock, FormControl, Checkbox, Panel, Radio } from "react-bootstrap";
import { PanelWithTwoButtons } from "../../Components/Panels/PanelWithTwoButtons";
import { PanelWithButton } from "../../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { CategoryChartUIHelper } from "../CategoryChart/CategoryChartUIHelper";
import { CategoryChartType, LabelVisibility, CrosshairDisplayMode, PieChartLabelPosition, SliceLabelOption, SliceSortOption, PieChartOthersCategoryType } from "../../../Utilities/ChartEnums";
import { ColorPicker } from "../../ColorPicker";
import { AdaptablePopover } from "../../AdaptablePopover";
import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";


/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface PieChartComponentProps {
    cssClassName: string,
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: IPieChartDataItem[];
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => void;
}



export class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {

    public doughnutChart: IgrDoughnutChart;
    public doughnutLegend: IgrItemLegend;
    public pieChart: IgrPieChart;
    public pieChartLegend: IgrItemLegend;

    constructor(props: PieChartComponentProps) {
        super(props);


        this.state = PieChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.ChartData);

        IgrPieChartModule.register();
        IgrDoughnutChartModule.register();
        IgrRingSeriesModule.register();
        IgrItemLegendModule.register();

        this.onPieChartRef = this.onPieChartRef.bind(this);
        this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
        this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
        this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
    }

    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any) {

        //  if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
        this.state = PieChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition, nextProps.ChartData);
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__PieCharts";

        let showGeneralPropertiesButton =
            this.state.IsGeneralMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowGeneralProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show GeneralProperties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    style={{ marginBottom: '10px' }}
                    onClick={() => this.onHidePropertiesGroup()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide General Properties"}
                />


        let closeChartSettingsButton =
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.onHideChartSettings()}
                bsStyle={DEFAULT_BSSTYLE}
                size={"xs"}
                DisplayMode="Glyph"
                hideToolTip={false}
                overrideTooltip={"Close Chart Settings"}
            />

        let openChartSettingsButton =
            <ButtonGeneral
                cssClassName={cssClassName}
                style={{ marginRight: '20px' }}
                onClick={() => this.onShowChartSettings()}
                bsStyle={INFO_BSSTYLE}
                size={"small"}
                DisplayMode="Text"
                hideToolTip={true}
                overrideText={'Show Chart Settings'}
            />

        let setDefaultsButton =
            <ButtonGeneral
                cssClassName={cssClassName}
                onClick={() => this.onSetPropertyDefaults()}
                bsStyle={DEFAULT_BSSTYLE}
                DisplayMode="Text"
                size={"small"}
                hideToolTip={true}
                overrideText={'Reset Defaults'}
            />



        let chartElement = (this.state.ChartProperties.ShowAsDoughnut) ?
            <IgrDoughnutChart
                width={'700px'}
                height={'700px'}
                allowSliceSelection="true"
                allowSliceExplosion="true"
                 sliceClick={(s, e) => this.onSliceClick(e)}
                ref={this.onDoughnutChartRef}>
                <IgrRingSeries
                    name="ring1"
                    dataSource={this.state.DataSource}
                    labelMemberPath={this.state.ChartProperties.SliceLabelsMapping}
                    valueMemberPath={this.state.ChartProperties.SliceValuesMapping}
                    legendLabelMemberPath={this.state.ChartProperties.SliceLegendMapping}
                    othersCategoryThreshold={this.state.ChartProperties.OthersCategoryThreshold}
                    othersCategoryType={this.state.ChartProperties.OthersCategoryType}
                    othersCategoryText="Others"
                    brushes={this.state.SliceBrushes}
                    outlines={this.state.SliceBrushes}
                    radiusFactor={0.6} />
            </IgrDoughnutChart>
            :
            <IgrPieChart
                ref={this.onPieChartRef}
                dataSource={this.state.DataSource}
                labelsPosition={this.state.ChartProperties.PieChartLabelPosition}
                width={'700px'}
                height={'700px'}
                radiusFactor={0.6}
                labelMemberPath={this.state.ChartProperties.SliceLabelsMapping}
                valueMemberPath={this.state.ChartProperties.SliceValuesMapping}
                legendLabelMemberPath={this.state.ChartProperties.SliceLegendMapping}
                othersCategoryThreshold={this.state.ChartProperties.OthersCategoryThreshold}
                othersCategoryType={this.state.ChartProperties.OthersCategoryType}
                othersCategoryText="Others"
                othersCategoryFill="#9A9A9A"
                othersCategoryStroke="#9A9A9A"
                brushes={this.state.SliceBrushes}
                outlines={this.state.SliceBrushes}
                selectionMode="single"
              sliceClick={(s, e) => this.onSliceClick(e)}
            />


        let legendPanel = <Panel
            bsSize={"xs"}
            header={"Legend"}
            style={{ marginTop: '2px' }}>
            <div className="pieChartLegend">
                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                    <Row>
                        <Col xs={5}>
                            <HelpBlock>Sort by</HelpBlock>
                        </Col>
                        <Col xs={7}>
                            <FormControl
                                bsSize={"small"} componentClass="select" placeholder="select"
                                value={this.state.SliceSortOption}
                                onChange={(x) => this.onSliceSortByColumnChanged(x)} >
                                {this.getOptionsForSliceSortOrders()}
                            </FormControl>
                        </Col>
                    </Row>
                </AdaptableBlotterForm>

                {this.state.ChartProperties.ShowAsDoughnut ?
                    <div className="doughnutLegend">
                        <IgrItemLegend ref={this.onDoughnutLegendRef} />
                    </div>
                    :
                    <div className="pieChartLegend">
                        <IgrItemLegend ref={this.onPieChartLegendRef} />
                    </div>
                }
            </div>
        </Panel>

        return <span className={cssClassName}>
            {this.state.IsChartSettingsVisible == false &&
                <Row >
                    <Col xs={12} >
                        <div className="pull-right" >
                            {openChartSettingsButton}
                        </div>
                    </Col>
                </Row>

            }
            {this.state.IsChartSettingsVisible ?
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.ChartData != null &&
                                    chartElement
                                }
                            </td>
                            <td style={{ width: '370px', marginRight: '10px' }}>
                                <PanelWithTwoButtons bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Chart Settings"} cssClassName={cssClassName}
                                    firstButton={closeChartSettingsButton} secondButton={setDefaultsButton}
                                    style={{
                                        'overflowY': 'auto',
                                        'overflowX': 'hidden',
                                        padding: '0px',
                                        margin: '0px',
                                        marginTop: '0px',
                                        marginRight: '0px',
                                        fontSize: 'small'
                                    }}>

                                    <PanelWithButton glyphicon={"wrench"} bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '2px' }}>
                                        {this.state.IsGeneralMinimised == false &&
                                            <div>

                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={12}>
                                                            <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                                                                <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                                                                    onChange={(e) => this.onPieOrDoughnutViewChanged(e)}
                                                                    checked={this.state.ChartProperties.ShowAsDoughnut} >Show as 'Doughnut'</Checkbox>
                                                            </HelpBlock>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>


                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={5}>
                                                            <HelpBlock>Others Threshold</HelpBlock>
                                                        </Col>
                                                        <Col xs={5}>
                                                            <FormControl
                                                                bsSize={"small"} type="number" min="0" step="1"
                                                                placeholder={"Input"}
                                                                onChange={this.onOthersCategoryThresholdChanged}
                                                                value={this.state.ChartProperties.OthersCategoryThreshold} />
                                                        </Col>
                                                        <Col xs={2}>
                                                            <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Threshold"} bodyText={["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."]} />
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>


                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={12}>
                                                            <HelpBlock>
                                                                <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                                                                    onChange={(e) => this.onThresholdAsPercentChanged(e)}
                                                                    checked={this.state.ChartProperties.OthersCategoryType == PieChartOthersCategoryType.Percent} >Others Threshold As %
                                                                </Checkbox>
                                                            </HelpBlock>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>


                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={5}>
                                                            <HelpBlock>Labels Position</HelpBlock>
                                                        </Col>
                                                        <Col xs={7}>
                                                            <FormControl
                                                                bsSize={"small"} componentClass="select" placeholder="select"
                                                                value={this.state.ChartProperties.PieChartLabelPosition}
                                                                onChange={(x) => this.onSliceLabelsPositionChanged(x)} >
                                                                {this.getOptionsForLabelsPosition()}
                                                            </FormControl>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>
                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={5}>
                                                            <HelpBlock>Labels Content</HelpBlock>
                                                        </Col>
                                                        <Col xs={7}>
                                                            <FormControl
                                                                bsSize={"small"} componentClass="select" placeholder="select"
                                                                value={this.state.ChartProperties.SliceLabelsMapping}
                                                                onChange={(x) => this.onSliceLabelsMappingChanged(x)} >
                                                                {this.getOptionsForSliceLabelsMapping()}
                                                            </FormControl>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>





                                            </div>
                                        }
                                    </PanelWithButton>

                                    {legendPanel}
                                </PanelWithTwoButtons>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                :
                <span style={{margin:'0px'}}>
                    {this.props.ChartData != null &&
                        chartElement
                    }
                    <span>Hello world</span>
                </span>

            }
        </span>

    }

    public onDoughnutChartRef(doughnutChart: IgrDoughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutLegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }

    public onPieChartRef(pieChart: IgrPieChart) {
        this.pieChart = pieChart;
        if (this.pieChartLegend && this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }

    public onDoughnutLegendRef(legend: IgrItemLegend) {
        this.doughnutLegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }

    public onPieChartLegendRef(legend: IgrItemLegend) {
        this.pieChartLegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }




    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, } as PieChartComponentState)
    }

    onHidePropertiesGroup() {
        this.setState({ IsGeneralMinimised: true } as PieChartComponentState)
    }
    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, } as PieChartComponentState)
    }

    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, } as PieChartComponentState)
    }

    onSetPropertyDefaults() {
        // first update our state
        this.setState(PieChartUIHelper.setDefaultChartDisplayPopupState() as PieChartComponentState);
        // then update the properties
        let chartProperties: IPieChartProperties = Helper.cloneObject(DefaultPieChartProperties);
        this.updateChartProperties(chartProperties);
    }


    private updateChartProperties(chartProperties: IChartProperties): void {
        this.setState({ ChartProperties: chartProperties, } as PieChartComponentState)
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }

    private onPieOrDoughnutViewChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.ShowAsDoughnut = e.checked;
        this.updateChartProperties(chartProperties);
    }



    private onOthersCategoryThresholdChanged = (e: any) => {
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryThreshold = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryType = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        this.updateChartProperties(chartProperties);
    }

    private onSliceLabelsPositionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.PieChartLabelPosition = e.value as PieChartLabelPosition
        this.updateChartProperties(chartProperties);
    }

    onSliceLabelsMappingChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let labelMapping = e.value;
        let legendMapping: SliceLabelOption = labelMapping.includes("Ratio") ? SliceLabelOption.RatioAndName : SliceLabelOption.ValueAndName;

        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.SliceLabelsMapping = labelMapping as SliceLabelOption;
        chartProperties.SliceLegendMapping = legendMapping;
        this.updateChartProperties(chartProperties);
    }

    onSliceSortByColumnChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let sliceSortOption = e.value as SliceSortOption;
        let oldData: IPieChartDataItem[] = this.state.DataSource;
        let newData: IPieChartDataItem[] = PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({ SliceSortOption: sliceSortOption, DataSource: newData } as PieChartComponentState)
    }

     onSliceClick(e: SliceClickEventArgs): void {
        console.log("onSliceClick " + e);
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected
        const ds = e.dataContext;
        if (e.isExploded) {
        //    this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartComponentState);
        } else {
        //    this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartComponentState);
        }
    }

    // want to move to helper - not sure why i cannot
    getOptionsForLabelsPosition(): JSX.Element[] {
        return EnumExtensions.getNames(PieChartLabelPosition).map((v) => {
            return <option key={v} value={v}>{v as PieChartLabelPosition}</option>
        })
    }

    getOptionsForSliceLabelsMapping(): JSX.Element[] {
        return EnumExtensions.getNames(SliceLabelOption).map((v) => {
            return <option key={v} value={v}>{v as SliceLabelOption}</option>
        })
    }

    getOptionsForSliceSortOrders(): JSX.Element[] {
        return EnumExtensions.getNames(SliceSortOption).map((v) => {
            return <option key={v} value={v}>{v as SliceSortOption}</option>
        })
    }

}