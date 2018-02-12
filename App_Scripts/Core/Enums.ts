
// General Enums
export enum DataType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Date = "Date",
    Object = "Object",
    All = "All"
}

export enum ExpressionMode {
    SingleColumn = "SingleColumn",
    MultiColumn = "MultiColumn"
}

export enum LeafExpressionOperator {
    Unknown = "Unknown",
    //Numeric and Date
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    Equals = "Equals",
    NotEquals = "NotEquals",
    GreaterThanOrEqual = "GreaterThanOrEqual",
    LessThanOrEqual = "LessThanOrEqual",
    Between = "Between",
    //String
    Contains = "Contains",
    NotContains = "NotContains",
    StartsWith = "StartsWith",
    EndsWith = "EndsWith",
    Regex = "Regex",
    // Cell Validations
    None = "None",
    ValueChange = "ValueChange",
    PercentChange = "PercentChange",
    NotBetween = "NotBetween",
    IsPositive = "IsPositive",
    IsNegative = "IsNegative",
    IsTrue = "IsTrue",
    IsFalse = "IsFalse"
}

export enum PopoverType {
    Info = "Info",
    Warning = "Warning",
    Error = "Error"
}

// Enums used in Strategies
export enum SmartEditOperation {
    Add = "Add",
    Multiply = "Multiply",
    Replace = "Replace"
}

export enum ShortcutAction {
    Add = "Add",
    Subtract = "Subtract",
    Multiply = "Multiply",
    Divide = "Divide",
    Replace = "Replace"
}

export enum ConditionalStyleScope {
    Column = "Column",
    Row = "Row"
}

export enum RangeColumnScope {
    AllColumns,
    VisibleColumns,
    SelectedColumns,
    BespokeColumns
}


export enum RangeRowScope {
    AllRows,
    VisibleRows,
    SelectedRows,
    ExpressionRows
}

export enum ExportDestination {
    CSV = "CSV",
    Clipboard = "Clipboard",
    OpenfinExcel = "OpenfinExcel",
    iPushPull = "iPushPull"
}

export enum SortOrder {
    Unknown = "Unknown",
    Ascending = "Ascending",
    Descending = "Descending"
}

export enum QuickSearchDisplayType {
    HighlightCell = "HighlightCell",
    ShowRow = "ShowRow",
    ShowRowAndHighlightCell = "ShowRowAndHighlightCell"
}

export enum AuditLogTrigger {
    CellEdit = "CellEdit",
    StateChange = "StateChange",
    AdaptableBlotterFunction = "AdaptableBlotterFunction",
    Ping = "Ping"
}

export enum CellValidationMode {
   WarnUser="WarnUser",
   StopEdit="StopEdit"
}

export enum SelectionMode {
    Multi = "Multi",
    Single = "Single"
}

//make sure enum items match IRawValueDisplayValuePair
export enum DistinctCriteriaPairValue {
    RawValue = "RawValue",
    DisplayValue = "DisplayValue"
}

export enum FontWeight {
    Normal = "Normal",
    Bold = "Bold"
}

export enum FontStyle {
    Normal = "Normal",
    Italic = "Italic"
}

export enum FontSize {
    XSmall = "XSmall",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    XLarge = "XLarge"
}

export enum FilterFormMode {
    Basic = "Basic",
    Dynamic = "Dynamic"
}

export enum PanelWidth{
    Wide="800px",
    Medium="600px",
    Narrow ="400px"
}

