// Chart Enums

export enum ChartVisibility {
    Maximised = 'Maximised',
    Minimised = 'Minimised',
    Hidden = 'Hidden',
}

export enum ChartType {
    Column = 'Column',
    Area = 'Area',
    Line = 'Line',
    Point = 'Point',
    Spline = 'Spline',
    SplineArea = 'SplineArea',
    StepArea = 'StepArea',
    StepLine = 'StepLine',
    Waterfall = 'Waterfall'
}

export enum CrosshairDisplayMode {
    None = 'None',
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
    Both = 'Both'
}

export enum ChartSize {
    XSmall = 'XSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    XLarge = 'XLarge'
}

export enum AxisLabelsLocation {
    OutsideTop = 'OutsideTop',
    OutsideBottom = 'OutsideBottom',
    OutsideLeft = 'OutsideLeft',
    OutsideRight = 'OutsideRight',
    // these are used only when using crossingAxis and crossingValue properties:
    InsideTop = 'InsideTop',
    InsideBottom = 'InsideBottom',
    InsideLeft = 'InsideLeft',
    InsideRight = 'InsideRight',
}

export enum AxisScale {
  Linear = 'Linear',
  Log = 'Log',
}

// TODO remove
export enum YAxisLabelsLocation {
  OutsideLeft = 'Left',
  OutsideRight = 'Right',
}

// TODO remove
export enum XAxisLabelsLocation {
  OutsideTop = 'Top',
  OutsideBottom = 'Bottom',
}

export enum HorizontalAlignment {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export enum AxisTotal {
    Sum = 'Sum',
    Average = 'Average',
}

export enum LabelVisibility {
    Visible = 'visible',
    Collapsed = 'collapsed',
}

export  enum ToolTipType {
    Default = 'Default',
    Item = 'Item',
    Category = 'Category',
    None = 'None'
}

export enum AxisAngle {
    Horizontal = 'Horizontal',
    Diagonal = 'Diagonal',
    Vertical ='Vertical'
}

export enum MarkerType {
  // Unset = 'Unset',  // commented out because Default is more descriptive enum
  Default = 'Default', // added special enum to resolve marker type based on chart type
  Automatic = 'Automatic', // assigns different markers for each series in the chart, e.g.  Circle, Triangle, etc
  Circle = 'Circle',
  Triangle = 'Triangle',
  Pyramid = 'Pyramid',
  Square = 'Square',
  Diamond = 'Diamond',
  Pentagon = 'Pentagon',
  Hexagon = 'Hexagon',
  Tetragram = 'Tetragram',
  Pentagram = 'Pentagram',
  Hexagram = 'Hexagram',
  None = 'None',
}
