import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, Button, Form, Col, Panel, Row, Checkbox, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ICalendar } from '../../Core/Interface/ICalendarStrategy';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface CalendarsConfigItemProps extends React.ClassAttributes<CalendarsConfigItem> {
    Calendar: ICalendar;
    CurrentCalendar: string;
    onSelect: (calendar: ICalendar) => void;
    onShowInformation: (calendar: ICalendar) => void;
}

export class CalendarsConfigItem extends React.Component<CalendarsConfigItemProps, {}> {

    render(): any {
        let myCols: IColItem[] = []
        myCols.push({
            size: 3, content: <Checkbox onChange={() => this.props.onSelect(this.props.Calendar)} checked={this.props.Calendar.CalendarName == this.props.CurrentCalendar} />
        });
        myCols.push({ size: 5, content: this.props.Calendar.CalendarName });

        myCols.push({
            size: 3, content:
                <ButtonToolbar>
                    <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Show Calendar Dates</Tooltip>}>
                        <Button onClick={() => this.props.onShowInformation(this.props.Calendar)} > {"Calendar Details "}<Glyphicon glyph="info-sign" /></Button>
                    </OverlayTrigger>
                </ButtonToolbar>
        });
        return <ConfigEntityRowItem items={myCols} />
    }
}

