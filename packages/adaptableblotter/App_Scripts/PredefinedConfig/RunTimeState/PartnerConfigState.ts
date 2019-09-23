import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from '../DesignTimeState/DesignTimeState';
import { Scope } from '../Common/Scope';
import { PushPullConfig } from '../DesignTimeState/PushPullConfig';

export interface PartnerConfigState extends DesignTimeState {
  pushPullConfig: PushPullConfig;
}
