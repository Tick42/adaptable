import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';

export interface FDC3Schema {
  object: string;
  definition: string;
  version: string;
}

export interface ColumnStateChangedEventArgs {
  currentLayout: string;
}

export interface AlertFiredEventArgs {
  alert: IAdaptableAlert;
}

export interface ThemeChangedEventArgs {
  themeName: string;
}

export interface AdaptableBlotterEventData {
  name: string;
  type: string;
}