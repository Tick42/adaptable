import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { IAdaptableBlotter } from '../../types';

export interface ActionColumnState extends DesignTimeState {
  ActionColumns?: ActionColumn[];
}

export interface ActionColumn extends AdaptableBlotterObject {
  ColumnId: string;
  ButtonText?: string;

  render?: (params: any, blotter: IAdaptableBlotter) => string;

  // todo some event hookup?
}
