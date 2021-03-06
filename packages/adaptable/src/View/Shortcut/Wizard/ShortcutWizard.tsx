import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard';
import { ShortcutSummaryWizard } from './ShortcutSummaryWizard';
import { ShortcutTypeWizard } from './ShortcutTypeWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface ShortcutWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ShortcutWizard> {
  NumericKeysAvailable: Array<string>;
  DateKeysAvailable: Array<string>;
}

export class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ShortcutStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column Data Type',
              Index: 0,
              Element: <ShortcutTypeWizard />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: (
                <ShortcutSettingsWizard
                  NumericKeysAvailable={this.props.NumericKeysAvailable}
                  DateKeysAvailable={this.props.DateKeysAvailable}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ShortcutSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
