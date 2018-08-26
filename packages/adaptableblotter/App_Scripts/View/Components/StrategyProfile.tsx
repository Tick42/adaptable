import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Glyphicon } from 'react-bootstrap';
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StyleConstants from '../../Core/Constants/StyleConstants';

// Simple compnent which just shows the Icon and Name for any strategy

export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
    StrategyId: string
    cssClassName: string
}

export class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
    render(): any {
        let cssClassName: string = this.props.cssClassName + StyleConstants.STRATEGY_PROFILE
        return <div className={cssClassName}>
            <Glyphicon glyph={StrategyGlyphs.getGhyphiconForStrategy(this.props.StrategyId)} />{' '}
            {StrategyNames.getNameForStrategy(this.props.StrategyId)}
        </div>

    }
}
