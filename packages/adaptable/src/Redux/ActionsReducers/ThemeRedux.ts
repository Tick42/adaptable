import * as Redux from 'redux';
import { ThemeState, AdaptableTheme } from '../../PredefinedConfig/ThemeState';
import {
  EMPTY_ARRAY,
  THEME_DEFAULT_CURRENT_THEME,
  SYSTEM_THEMES,
} from '../../Utilities/Constants/GeneralConstants';

const THEME_SET_SYSTEM_THEMES = 'THEME_SET_SYSTEM_THEMES';
const THEME_SET_USER_THEMES = 'THEME_SET_USER_THEMES';
export const THEME_SELECT = 'THEME_SELECT';

export interface ThemeSetSystemThemesAction extends Redux.Action {
  SystemThemes: AdaptableTheme[];
}

export interface ThemeSetUserThemesAction extends Redux.Action {
  UserThemes: AdaptableTheme[];
}

export interface ThemeSelectAction extends Redux.Action {
  Theme: string;
}

export const ThemeSetSystemThemes = (
  SystemThemes: AdaptableTheme[]
): ThemeSetSystemThemesAction => ({
  type: THEME_SET_SYSTEM_THEMES,
  SystemThemes,
});

export const ThemeSetUserThemes = (UserThemes: AdaptableTheme[]): ThemeSetUserThemesAction => ({
  type: THEME_SET_USER_THEMES,
  UserThemes,
});

export const ThemeSelect = (Theme: string): ThemeSelectAction => ({
  type: THEME_SELECT,
  Theme,
});

const initialThemeState: ThemeState = {
  CurrentTheme: THEME_DEFAULT_CURRENT_THEME,
  SystemThemes: SYSTEM_THEMES,
  UserThemes: EMPTY_ARRAY,
};

export const ThemeReducer: Redux.Reducer<ThemeState> = (
  state: ThemeState = initialThemeState,
  action: Redux.Action
): ThemeState => {
  switch (action.type) {
    case THEME_SET_SYSTEM_THEMES:
      return Object.assign({}, state, {
        SystemThemes: (action as ThemeSetSystemThemesAction).SystemThemes,
      });
    case THEME_SET_USER_THEMES:
      return Object.assign({}, state, {
        UserThemes: (action as ThemeSetUserThemesAction).UserThemes,
      });
    case THEME_SELECT:
      return Object.assign({}, state, { CurrentTheme: (action as ThemeSelectAction).Theme });
    default:
      return state;
  }
};
