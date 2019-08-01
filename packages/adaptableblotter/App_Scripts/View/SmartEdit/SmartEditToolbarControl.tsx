﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AdaptablePopover } from '../AdaptablePopover';
import { StatusColour, MathOperation, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { PreviewResultsPanel } from '../Components/PreviewResultsPanel';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { UIHelper } from '../UIHelper';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { CELLS_SELECTED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';
import Input from '../../components/Input';

interface SmartEditToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<SmartEditToolbarControlComponent> {
  SmartEditValue: string;
  MathOperation: MathOperation;
  IsValidSelection: boolean;
  PreviewInfo: IPreviewInfo;

  onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
  onSmartEditOperationChange: (
    MathOperation: MathOperation
  ) => SmartEditRedux.SmartEditChangeOperationAction;
  onSmartEditCheckSelectedCells: () => SystemRedux.SmartEditCheckCellSelectionAction;
  onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
}

interface SmartEditToolbarControlComponentState {
  SelectedColumnId: string;
}

class SmartEditToolbarControlComponent extends React.Component<
  SmartEditToolbarControlComponentProps,
  SmartEditToolbarControlComponentState
> {
  constructor(props: SmartEditToolbarControlComponentProps) {
    super(props);
    this.state = {
      SelectedColumnId: '',
    };
  }
  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.on(CELLS_SELECTED_EVENT, () => {
        this.props.onSmartEditCheckSelectedCells();
      });
    }
  }

  render() {
    let statusColour: StatusColour = this.getStatusColour();

    let selectedColumn = StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)
      ? ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns)
      : null;

    let previewPanel = (
      <PreviewResultsPanel
        UpdateValue={this.props.SmartEditValue}
        PreviewInfo={this.props.PreviewInfo}
        Columns={this.props.Columns}
        UserFilters={this.props.UserFilters}
        SelectedColumn={selectedColumn}
        ShowPanel={true}
        ShowHeader={false}
      />
    );

    let operationMenuItems = EnumExtensions.getNames(MathOperation)
      .filter(e => e != MathOperation.Replace)
      .map((mathOperation: MathOperation, index) => {
        return {
          onClick: () => this.props.onSmartEditOperationChange(mathOperation),
          label: mathOperation as MathOperation,
        };
      });

    const applyButtonStyle = {
      color: statusColour,
      fill: 'currentColor',
    };

    let content = (
      <Flex
        alignItems="stretch"
        className={
          this.props.AccessLevel == AccessLevel.ReadOnly || !this.props.IsValidSelection
            ? GeneralConstants.READ_ONLY_STYLE
            : ''
        }
      >
        <DropdownButton marginRight={2} items={operationMenuItems} columns={['label']}>
          {this.props.MathOperation}
        </DropdownButton>

        <Input
          style={{
            width: '5rem',
          }}
          value={this.props.SmartEditValue.toString()}
          type="number"
          placeholder="Enter a Number"
          step="any"
          onChange={(e: React.SyntheticEvent) => this.onSmartEditValueChange(e)}
        />

        {this.props.IsValidSelection && (
          <ButtonApply
            marginLeft={2}
            onClick={() => this.onApplyClick()}
            style={applyButtonStyle}
            tooltip="Apply Smart Edit"
            disabled={
              StringExtensions.IsNullOrEmpty(this.props.SmartEditValue) ||
              (this.props.PreviewInfo != null &&
                this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)
            }
            AccessLevel={this.props.AccessLevel}
          />
        )}

        {this.props.IsValidSelection && (
          <AdaptablePopover
            headerText="Preview Results"
            tooltipText="Preview Results"
            bodyText={[previewPanel]}
            MessageType={UIHelper.getMessageTypeByStatusColour(statusColour)}
            useButton={true}
            showEvent={'focus'}
            hideEvent="blur"
          />
        )}
      </Flex>
    );

    return (
      <PanelDashboard
        headerText={StrategyConstants.SmartEditStrategyName}
        glyphicon={StrategyConstants.SmartEditGlyph}
        onClose={() => this.props.onClose(StrategyConstants.SmartEditStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onSmartEditValueChange(event: React.FormEvent<any>) {
    const e = event.target as HTMLInputElement;
    this.props.onSmartEditValueChange(Number(e.value));
  }

  private getStatusColour(): StatusColour {
    if (StringExtensions.IsNotNullOrEmpty(this.props.SmartEditValue) && this.props.PreviewInfo) {
      if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
        return StatusColour.Red;
      }
      if (
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ||
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent
      ) {
        return StatusColour.Amber;
      }
    }
    return StatusColour.Green;
  }

  private getMathOperationSymbol(mathOperation: MathOperation): string {
    switch (mathOperation) {
      case MathOperation.Add:
        return '+';
      case MathOperation.Subtract:
        return '-';
      case MathOperation.Multiply:
        return 'x';
      case MathOperation.Divide:
        return '/';
    }
    return '';
  }

  private onApplyClick(): void {
    this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning
      ? this.onConfirmWarningCellValidation()
      : this.onApplySmartEdit();
  }

  private onConfirmWarningCellValidation() {
    let confirmAction: Redux.Action = SmartEditRedux.SmartEditApply(true);
    let cancelAction: Redux.Action = SmartEditRedux.SmartEditApply(false);
    let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction
    );
    this.props.onConfirmWarningCellValidation(confirmation);
  }

  onApplySmartEdit(): any {
    this.props.onApplySmartEdit();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    SmartEditValue: state.SmartEdit.SmartEditValue,
    MathOperation: state.SmartEdit.MathOperation,
    IsValidSelection: state.System.IsValidSmartEditSelection,
    PreviewInfo: state.System.SmartEditPreviewInfo,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSmartEditValueChange: (value: number) => dispatch(SmartEditRedux.SmartEditChangeValue(value)),
    onSmartEditOperationChange: (SmartEditOperation: MathOperation) =>
      dispatch(SmartEditRedux.SmartEditChangeOperation(SmartEditOperation)),
    onSmartEditCheckSelectedCells: () => dispatch(SystemRedux.SmartEditCheckCellSelection()),
    onApplySmartEdit: () => dispatch(SmartEditRedux.SmartEditApply(false)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SmartEditStrategyId,
          ScreenPopups.SmartEditPopup
        )
      ),
  };
}

export let SmartEditToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartEditToolbarControlComponent);

let smallFormControlStyle: React.CSSProperties = {
  fontSize: 'xsmall',
  height: '22px',
  width: '70px',
};

let standardFormControlStyle: React.CSSProperties = {
  width: '70px',
};
