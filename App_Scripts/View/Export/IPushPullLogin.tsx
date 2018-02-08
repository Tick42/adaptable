import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../Components/SharedProps/IStrategyView'
import { HelpBlock } from 'react-bootstrap';
import { ControlLabel, Button, FormControl, FormGroup, Glyphicon } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import { StringExtensions } from "../../Core/Extensions/StringExtensions";

interface IPushPullLoginProps extends IStrategyViewPopupProps<IPushPullLoginComponent> {
    onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
    onCancel: () => PopupRedux.PopupHideAction
    ErrorMsg: string
}

interface IPushPullLoginInternalState {
    Login: string
    Password: string
}

class IPushPullLoginComponent extends React.Component<IPushPullLoginProps, IPushPullLoginInternalState> {
    constructor() {
        super();
        this.state = { Login: null, Password: null }
    }
    render() {
        return <PanelWithButton headerText="iPushPull Login" bsStyle="primary" glyphicon="export">
            <FormGroup controlId={"formEmail"} validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null}>
                <ControlLabel>Email address</ControlLabel>
                <FormControl onChange={(e) => this.onLoginChange(e)} type="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup controlId={"formPassword"} validationState={StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null}>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" onChange={(e) => this.onPasswordChange(e)} />
                <HelpBlock>{this.props.ErrorMsg}</HelpBlock>
            </FormGroup>
             <Button style={buttonRightStyle} onClick={() => { this.props.onCancel() }}>Cancel <Glyphicon glyph="remove" /></Button>
              <Button disabled={StringExtensions.IsNullOrEmpty(this.state.Password)}
                style={buttonRightStyle} bsStyle="primary"
                onClick={() => { this.props.onLogin(this.state.Login, this.state.Password) }}><Glyphicon glyph="user" /> Login</Button>
    
        </PanelWithButton>
    }

    private onLoginChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.setState({ Login: e.value })
    }

    private onPasswordChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        this.setState({ Password: e.value })
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ErrorMsg: state.Range.ErrorMsg
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onLogin: (login: string, password: string) => dispatch(ExportRedux.IPPLogin(login, password)),
        onCancel: () => {dispatch(PopupRedux.PopupHide()); dispatch(RangeRedux.RangeSetErrorMsg(""))}
    };
}

export let IPushPullLogin = connect(mapStateToProps, mapDispatchToProps)(IPushPullLoginComponent);

var buttonRightStyle = {
    float: 'right',
    marginLeft: '5px'
};