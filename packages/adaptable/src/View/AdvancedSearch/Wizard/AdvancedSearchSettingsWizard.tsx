import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import Panel from '../../../components/Panel';
import Input from '../../../components/Input';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

import { Flex, Box } from 'rebass';
import ErrorBox from '../../../components/ErrorBox';
import WizardPanel from '../../../components/WizardPanel';

export interface AdvancedSearchSettingsWizardProps
  extends AdaptableWizardStepProps<AdvancedSearch> {
  AdvancedSearches: AdvancedSearch[];
}

export interface AdvancedSearchSettingsWizardState {
  AdvancedSearchName: string;
  ErrorMessage: string;
}

export class AdvancedSearchSettingsWizard
  extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: AdvancedSearchSettingsWizardProps) {
    super(props);
    this.state = {
      AdvancedSearchName: props.Data.Name,
      ErrorMessage: null,
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <Flex alignItems="center" flexDirection="row">
          <Box>Name:</Box>
          <Input
            marginLeft={2}
            value={this.state.AdvancedSearchName}
            type="string"
            placeholder="Enter search name"
            style={{ flex: 1 }}
            onChange={(e: any) => this.onAdvancedSearchNameChange(e)}
          />
        </Flex>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={2}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  onAdvancedSearchNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        AdvancedSearchName: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.AdvancedSearches.map(s => s.Name),
          e.value
        )
          ? 'A Search already exists with that name'
          : null,
      } as AdvancedSearchSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.AdvancedSearchName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.AdvancedSearchName;
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
