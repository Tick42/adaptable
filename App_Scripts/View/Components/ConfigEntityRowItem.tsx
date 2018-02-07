import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Col, Row } from 'react-bootstrap';

import { IColItem } from '../../Core/Interface/IAdaptableBlotter';


export interface ConfigEntityRowItemProps extends React.ClassAttributes<ConfigEntityRowItem> {
    ColItems: IColItem[]
}

export class ConfigEntityRowItem extends React.Component<ConfigEntityRowItemProps, {}> {
    render(): any {
        let colItems = this.props.ColItems.map((colItem: IColItem, index: number) => {
            return <Col key={index} xs={colItem.Size}>
            <span style={expressionFontSizeStyle}>
                {colItem.Content}
                </span>
            </Col>
        });

        return <li
            className="list-group-item"
           onClick={() => {
                // no implementation: not sure if this is actually needed...
            }}
        >
            <Row style={{ display: "flex", alignItems: "center" }}>
                {colItems}
            </Row>
        </li>

    }

}
var expressionFontSizeStyle = {
    fontSize: 'small'
};