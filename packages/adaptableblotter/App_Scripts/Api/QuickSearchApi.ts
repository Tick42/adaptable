import { IStyle } from '../Utilities/Interface/IStyle';
import { DisplayAction } from '../Utilities/Enums';
import * as QuickSearchRedux from '../Redux/ActionsReducers/QuickSearchRedux';
import { ApiBase } from './ApiBase';
import { IQuickSearchApi } from './Interface/IQuickSearchApi';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState';

export class QuickSearchApi extends ApiBase implements IQuickSearchApi {
  public getQuickSearchState(): QuickSearchState {
    return this.getBlotterState().QuickSearch;
  }

  public setQuickSearchState(quickSearchState: QuickSearchState): void {
    let currentQuickSearchState = this.getQuickSearchState();
    // apply QuickSearch if different
    if (currentQuickSearchState.QuickSearchText != quickSearchState.QuickSearchText) {
      this.applyQuickSearch(quickSearchState.QuickSearchText);
    }
    if (currentQuickSearchState.DisplayAction != quickSearchState.DisplayAction) {
      this.setQuickSearchDisplayAction(quickSearchState.DisplayAction);
    }
    if (currentQuickSearchState.Style != quickSearchState.Style) {
      this.setQuickSearchStyle(quickSearchState.Style);
    }
  }

  public applyQuickSearch(quickSearchText: string): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
  }

  public clearQuickSearch(): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchApply(''));
  }

  public getQuickSearchValue(): string {
    return this.getBlotterState().QuickSearch.QuickSearchText;
  }

  public getQuickSearchStyle(): IStyle {
    return this.getBlotterState().QuickSearch.Style;
  }

  public setQuickSearchDisplayAction(
    displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'
  ): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction as DisplayAction));
  }

  public setQuickSearchStyle(style: IStyle): void {
    this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
  }
}
