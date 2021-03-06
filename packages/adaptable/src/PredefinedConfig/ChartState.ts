import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import {
  ChartType,
  OthersCategoryType,
  PieChartLabelPosition,
  SliceLabelOption,
  CategoryChartType,
  CrosshairDisplayMode,
  ToolTipType,
  AxisLabelsLocation,
  LabelVisibility,
  AxisScale,
  AxisAngle,
  HorizontalAlignment,
} from './Common/ChartEnums';
import { Expression } from './Common/Expression';

export interface ChartState extends RunTimeState {
  ChartDefinitions?: ChartDefinition[];
  CurrentChartName?: string;
  RefreshRate?: number;
}

/**
 * Our Chart Definitions which will get added to and updated as we add new charts
 * But the basic idea is that each chart will have a base chart defintion that just includes a name, description, type and chart properties
 * These chart properties are specialised for each chart type: they are all nullable types because we use defaults in the DefaultXXXProperties that we assign
 */

export interface ChartDefinition extends AdaptableObject {
  Name: string;
  Description: string;
  ChartProperties: ChartProperties;
  ChartType: ChartType;
  VisibleRowsOnly: boolean;
}

export interface ChartProperties extends AdaptableObject {
  // empty inteface that is overriden for each individual chart type
}

export interface PieChartDefinition extends ChartDefinition {
  PrimaryColumnId: string;
  SecondaryColumnId?: string;
  SecondaryColumnOperation: 'Sum' | 'Count';
  PrimaryKeyValues?: any[];
}

export interface SparklinesChartDefinition extends ChartDefinition {
  ColumnId: string;
  Expression?: Expression;
  PrimaryKeyValues?: any[];
}

export interface CategoryChartDefinition extends ChartDefinition {
  YAxisColumnIds: string[];
  YAxisTotal: 'Sum' | 'Average';
  XAxisColumnId: string;
  XAxisExpression?: Expression;
}

export interface PieChartProperties extends ChartProperties {
  OthersCategoryThreshold?: number;
  OthersCategoryType?: OthersCategoryType;
  PieChartLabelPosition?: PieChartLabelPosition;
  SliceLabelsMapping?: SliceLabelOption;
  SliceValuesMapping?: SliceLabelOption;
  SliceLegendMapping?: SliceLabelOption;
  ShowAsDoughnut?: boolean;
}

export interface SparklineChartProperties extends ChartProperties {
  Maximum?: number;
  Minimum?: number;
  DisplayType: 'Line' | 'Column' | 'Area';
  UseMinStaticValue: boolean;
  UseMaxStaticValue: boolean;

  // Brush
  Brush: string;
  NegativeBrush: string;

  // Marker Visibility
  HighMarkerVisibility: 'Visible' | 'Collapsed';
  LowMarkerVisibility: 'Visible' | 'Collapsed';
  FirstMarkerVisibility: 'Visible' | 'Collpsed';
  LastMarkerVisibility: 'Visible' | 'Collapsed';
  NegativeMarkerVisibility: 'Visible' | 'Collapsed';
  MarkerVisibility: 'Visible' | 'Collapsed';

  // Marker Brush
  FirstMarkerBrush: string;
  LastMarkerBrush: string;
  HighMarkerBrush: string;
  LowMarkerBrush: string;
  NegativeMarkerBrush: string;
}

export interface CategoryChartProperties extends ChartProperties {
  // General
  CategoryChartType?: CategoryChartType;
  SeriesThickness?: number; // and bind it to

  MarkerType?: string; // using a string because chart expects a string or an array of MarkerType enums

  CalloutsType?: string; // using string because we need add non-numeric properties from data source in getCalloutTypeOptions()
  CalloutsInterval?: number; // this controls how many callouts
  // Annotations:
  EnableFinalValueAnnotations?: boolean;
  CrosshairDisplayMode?: CrosshairDisplayMode;
  CrosshairSnapToData?: boolean;
  CrosshairAnnotationEnabled?: boolean;
  ToolTipType?: ToolTipType;
  // Y Axis
  YAxisLabelLocation?: AxisLabelsLocation;
  YAxisLabelVisibility?: LabelVisibility;
  YAxisLabelScale?: AxisScale;
  YAxisIntervalCustom?: boolean;
  YAxisIntervalValue?: number;
  YAxisTitle?: string;
  YAxisLabelColor?: string;
  YAxisTitleColor?: string;
  YAxisMinimumValue?: number;
  YAxisMaximumValue?: number;
  YAxisIsLogarithmic?: boolean;
  YAxisInverted?: boolean;
  // x Axis
  XAxisLabelLocation?: AxisLabelsLocation;
  XAxisLabelVisibility?: LabelVisibility;
  XAxisLabelColor?: string;
  XAxisIntervalCustom?: boolean;
  XAxisIntervalValue?: number;
  XAxisTitle?: string;
  XAxisTitleColor?: string;
  XAxisGap?: number;
  XAxisOverlap: number;
  XAxisAngle?: AxisAngle;
  XAxisInverted?: boolean;
  // Misc
  EnableTransitions?: boolean;
  TransitionInDuration?: number;
  TitleAlignment?: HorizontalAlignment;
  SubTitleAlignment?: HorizontalAlignment;
  EnableSeriesHighlighting?: boolean;
  EnableCategoryHighlighting?: boolean;
  EnableItemHighlighting?: boolean;
}

export interface PieChartDataItem {
  Name: string;
  Value: any; // ?? number?
  Ratio: number;
  ValueAndName?: string;
  RatioAndName?: string;
  ErrorMessage?: string;
}

export interface ChartData {
  Data: any;
  ErrorMessage: string;
}

/*
ChartDefinitions

IChartDefinition array

A collection of IChartDefinition objects (see below for more details).

Each Chart Definition contains details of which columns / axes are required.

CurrentChartName

string

The name of the Chart that is currently selected

RefreshRate

number

The number of seconds to throttle changes to the chart - useful for when the chart is displaying constantly changing data.

The default value is 3.
*/
