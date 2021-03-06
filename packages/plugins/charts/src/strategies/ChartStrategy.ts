import * as _ from 'lodash';
import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { IChartStrategy } from './IChartStrategy';
import {
  ChartState,
  ChartDefinition,
  CategoryChartDefinition,
  PieChartDefinition,
  ChartData,
  SparklinesChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';

import { SystemState } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { DataChangedInfo } from '@adaptabletools/adaptable/src/AdaptableOptions/CommonObjects/DataChangedInfo';

import {
  ChartVisibility,
  ChartType,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { ExpressionHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import StringExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { AdaptableMenuItem } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';

export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
  private ChartState: ChartState;
  private SystemState: SystemState;
  private throttleSetChartData: (() => void) & _.Cancelable;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ChartStrategyId, adaptable);

    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      setTimeout(() => {
        this.handleDataSourceChanged(dataChangedInfo);
      }, 500);
    });

    this.adaptable._on('SearchApplied', () => {
      this.handleSearchChanged();
    });

    let refreshRate: number = this.GetChartState().RefreshRate * 1000;
    this.throttleSetChartData = _.throttle(this.setChartData, refreshRate);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ChartStrategyFriendlyName,
      ComponentName: ScreenPopups.ChartPopup,
      Icon: StrategyConstants.ChartGlyph,
    });
  }

  protected InitState() {
    let isChartRelatedStateChanged: boolean = false;
    let displayChartAtStartUp: boolean = false;

    if (this.ChartState != this.GetChartState()) {
      if (this.ChartState == null) {
        isChartRelatedStateChanged = true;
        // if user has set display at startup to be true and there is a current chart then show it
        if (
          this.adaptable.adaptableOptions.chartOptions.displayOnStartUp &&
          StringExtensions.IsNotNullOrEmpty(this.GetChartState().CurrentChartName)
        ) {
          displayChartAtStartUp = true;
        }
      } else {
        let chartStateDefinition: ChartDefinition = this.GetCurrentChartDefinition();
        let storeStateDefinition: ChartDefinition = this.GetChartState().ChartDefinitions.find(
          c => c.Name == this.GetChartState().CurrentChartName
        );

        if (
          this.doChartDefinitionChangesRequireDataUpdate(chartStateDefinition, storeStateDefinition)
        ) {
          isChartRelatedStateChanged = true;
        }
      }
      this.ChartState = this.GetChartState();
    }

    if (this.SystemState != this.GetSystemState()) {
      if (this.SystemState == null) {
        isChartRelatedStateChanged = true; // correct? seems not but not urgent to fix
      } else {
        if (this.SystemState.ChartVisibility != this.GetSystemState().ChartVisibility) {
          isChartRelatedStateChanged = true;
        }
      }
      this.SystemState = this.GetSystemState();
    }

    if (isChartRelatedStateChanged) {
      if (
        StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName) &&
        this.SystemState.ChartVisibility == ChartVisibility.Maximised
      ) {
        this.setChartData();
      } else {
        this.clearChartData();
      }

      if (
        this.ChartState.CurrentChartName == null &&
        this.SystemState.ChartVisibility == ChartVisibility.Maximised
      ) {
        this.adaptable.api.internalApi.setChartVisibility(ChartVisibility.Hidden);
      }

      if (displayChartAtStartUp) {
        this.adaptable.api.internalApi.setChartVisibility(ChartVisibility.Maximised);
        this.setChartData();
      }
    }
  }

  private doChartDefinitionChangesRequireDataUpdate(
    cd1: ChartDefinition,
    cd2: ChartDefinition
  ): boolean {
    if (cd1 == null && cd2 !== null) {
      return true;
    }
    if (cd2 == null && cd1 !== null) {
      return true;
    }
    if (cd1 == null && cd2 == null) {
      return false;
    }

    if (cd1.VisibleRowsOnly != cd2.VisibleRowsOnly) {
      return true;
    }

    if (cd1.ChartType == ChartType.CategoryChart) {
      return this.doCategoryChartDefinitionChangesRequireDataUpdate(
        cd1 as CategoryChartDefinition,
        cd2 as CategoryChartDefinition
      );
    }
    if (cd1.ChartType == ChartType.PieChart) {
      return this.doPieChartDefinitionChangesRequireDataUpdate(
        cd1 as PieChartDefinition,
        cd2 as PieChartDefinition
      );
    }

    if (cd1.ChartType == ChartType.SparklinesChart) {
      return this.doSparklinesChartDefinitionChangesRequireDataUpdate(
        cd1 as SparklinesChartDefinition,
        cd2 as SparklinesChartDefinition
      );
    }
  }

  private doCategoryChartDefinitionChangesRequireDataUpdate(
    cd1: CategoryChartDefinition,
    cd2: CategoryChartDefinition
  ): boolean {
    if (cd1.XAxisColumnId != cd2.XAxisColumnId) {
      return true;
    }
    if (ArrayExtensions.areArraysNotEqual(cd1.YAxisColumnIds, cd2.YAxisColumnIds)) {
      return true;
    }
    if (cd1.YAxisTotal != cd2.YAxisTotal) {
      return true;
    }

    if (
      ExpressionHelper.ConvertExpressionToString(cd1.XAxisExpression, this.GetColumnState()) !=
      ExpressionHelper.ConvertExpressionToString(cd2.XAxisExpression, this.GetColumnState())
    ) {
      return true;
    }
    return false;
  }

  private doPieChartDefinitionChangesRequireDataUpdate(
    cd1: PieChartDefinition,
    cd2: PieChartDefinition
  ): boolean {
    if (cd1.PrimaryColumnId != cd2.PrimaryColumnId) {
      return true;
    }
    if (cd1.SecondaryColumnId != cd2.SecondaryColumnId) {
      return true;
    }
    if (cd1.SecondaryColumnOperation != cd2.SecondaryColumnOperation) {
      return true;
    }
    return false;
  }

  private doSparklinesChartDefinitionChangesRequireDataUpdate(
    cd1: SparklinesChartDefinition,
    cd2: SparklinesChartDefinition
  ): boolean {
    if (cd1.ColumnId != cd2.ColumnId) {
      return true;
    }
    return false;
  }

  protected handleSearchChanged(): void {
    // weÎ always redraw a chart if its visible when a search has been applied as its relatively rare...
    // might need to rethink if that is too OTT
    if (this.isCurrentChartVisibiilityMaximised()) {
      let currentChartDefinition: ChartDefinition = this.GetCurrentChartDefinition();
      if (currentChartDefinition != null && currentChartDefinition.VisibleRowsOnly) {
        this.throttleSetChartData();
      }
    }
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    if (this.isCurrentChartVisibiilityMaximised()) {
      let columnChangedId: string = dataChangedInfo.ColumnId;
      if (StringExtensions.IsNotNullOrEmpty(columnChangedId)) {
        let currentChartDefinition: ChartDefinition = this.GetCurrentChartDefinition();
        if (this.isChartDataChanged(currentChartDefinition, columnChangedId)) {
          this.throttleSetChartData();
        }
      }
    }
  }

  private isCurrentChartVisibiilityMaximised(): boolean {
    return (
      this.adaptable.isInitialised &&
      this.SystemState != null &&
      this.ChartState != null &&
      this.SystemState.ChartVisibility == ChartVisibility.Maximised &&
      StringExtensions.IsNotNullOrEmpty(this.ChartState.CurrentChartName)
    );
  }

  private isChartDataChanged(
    currentChartDefinition: ChartDefinition,
    columnChangedId: string
  ): boolean {
    if (currentChartDefinition == null) {
      return false;
    }
    switch (currentChartDefinition.ChartType) {
      case ChartType.CategoryChart:
        let categoryChartDefinition: CategoryChartDefinition = currentChartDefinition as CategoryChartDefinition;
        return (
          ArrayExtensions.ContainsItem(categoryChartDefinition.YAxisColumnIds, columnChangedId) ||
          categoryChartDefinition.XAxisColumnId == columnChangedId
        );

      case ChartType.PieChart:
        let pieChartDefinition: PieChartDefinition = currentChartDefinition as PieChartDefinition;
        return (
          pieChartDefinition.PrimaryColumnId == columnChangedId ||
          pieChartDefinition.SecondaryColumnId == columnChangedId
        );
      case ChartType.SparklinesChart:
        let sparklinesChartDefinition: SparklinesChartDefinition = currentChartDefinition as SparklinesChartDefinition;
        return sparklinesChartDefinition.ColumnId == columnChangedId;
    }
  }

  private setChartData() {
    let chartDefinition: ChartDefinition = this.GetCurrentChartDefinition();
    if (chartDefinition) {
      let chartData: ChartData;
      if (chartDefinition.ChartType == ChartType.CategoryChart) {
        chartData = this.adaptable.ChartService.BuildCategoryChartData(
          chartDefinition as CategoryChartDefinition,
          this.GetColumnState()
        );
      } else if (chartDefinition.ChartType == ChartType.PieChart) {
        chartData = this.adaptable.ChartService.BuildPieChartData(
          chartDefinition as PieChartDefinition
        );
      } else if (chartDefinition.ChartType == ChartType.SparklinesChart) {
        chartData = this.adaptable.ChartService.BuildSparklinesChartData(
          chartDefinition as SparklinesChartDefinition,
          this.GetColumnState()
        );
      }
      this.adaptable.api.internalApi.setChartData(chartData);
    }
  }

  private clearChartData() {
    if (this.GetSystemState().ChartData != null) {
      this.adaptable.api.internalApi.setChartData(null);
    }
  }

  private GetSystemState(): SystemState {
    return this.adaptable.api.internalApi.getSystemState();
  }

  private GetChartState(): ChartState {
    return this.adaptable.api.chartApi.getChartState();
  }

  private GetColumnState(): AdaptableColumn[] {
    return this.adaptable.api.gridApi.getColumns();
  }

  private GetCurrentChartDefinition(): ChartDefinition {
    return this.ChartState.ChartDefinitions.find(c => c.Name == this.ChartState.CurrentChartName);
  }
}
