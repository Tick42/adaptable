"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Utilities/Enums");
exports.POPUP_SHOW_SCREEN = 'POPUP_SHOW_SCREEN';
exports.POPUP_HIDE_SCREEN = 'POPUP_HIDE_SCREEN';
exports.POPUP_SHOW_LOADING = 'POPUP_SHOW_LOADING';
exports.POPUP_HIDE_LOADING = 'POPUP_HIDE_LOADING';
exports.POPUP_SHOW_ABOUT = 'POPUP_SHOW_ABOUT';
exports.POPUP_HIDE_ABOUT = 'POPUP_HIDE_ABOUT';
exports.POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
exports.POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
exports.POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
exports.POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
exports.POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
exports.POPUP_SHOW_CONFIRMATION = 'POPUP_SHOW_CONFIRMATION';
exports.POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
exports.POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
exports.POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';
exports.PopupShowScreen = (ComponentStrategy, ComponentName, Params) => ({
    type: exports.POPUP_SHOW_SCREEN,
    ComponentStrategy,
    ComponentName,
    Params
});
exports.PopupHideScreen = () => ({
    type: exports.POPUP_HIDE_SCREEN
});
exports.PopupShowAlert = (Alert) => ({
    type: exports.POPUP_SHOW_ALERT,
    Alert
});
exports.PopupHideAlert = () => ({
    type: exports.POPUP_HIDE_ALERT
});
exports.PopupShowLoading = () => ({
    type: exports.POPUP_SHOW_LOADING,
});
exports.PopupHideLoading = () => ({
    type: exports.POPUP_HIDE_LOADING
});
exports.PopupShowAbout = () => ({
    type: exports.POPUP_SHOW_ABOUT,
});
exports.PopupHideAbout = () => ({
    type: exports.POPUP_HIDE_ABOUT
});
exports.PopupShowPrompt = (Prompt) => ({
    type: exports.POPUP_SHOW_PROMPT,
    Prompt
});
exports.PopupHidePrompt = () => ({
    type: exports.POPUP_HIDE_PROMPT
});
exports.PopupConfirmPrompt = (InputText) => ({
    type: exports.POPUP_CONFIRM_PROMPT,
    InputText
});
exports.PopupShowConfirmation = (Confirmation) => ({
    type: exports.POPUP_SHOW_CONFIRMATION,
    Confirmation
});
exports.PopupConfirmConfirmation = (comment) => ({
    type: exports.POPUP_CONFIRM_CONFIRMATION,
    comment
});
exports.PopupCancelConfirmation = () => ({
    type: exports.POPUP_CANCEL_CONFIRMATION
});
exports.PopupClearParam = () => ({
    type: exports.POPUP_CLEAR_PARAM
});
const initialPopupState = {
    ScreenPopup: {
        ShowScreenPopup: false,
        ComponentStrategy: "",
        ComponentName: "",
        Params: null
    },
    LoadingPopup: {
        ShowLoadingPopup: true,
    },
    AboutPopup: {
        ShowAboutPopup: false,
    },
    AlertPopup: {
        ShowAlertPopup: false,
        Header: "",
        Msg: "",
        MessageType: Enums_1.MessageType.Info
    },
    ConfirmationPopup: {
        ShowConfirmationPopup: false,
        Msg: "",
        Header: "",
        ConfirmButtonText: "",
        CancelButtonText: "",
        CancelAction: null,
        ConfirmAction: null,
        ShowInputBox: false,
        ConfirmationComment: null,
        MessageType: Enums_1.MessageType.Info
    },
    PromptPopup: {
        ShowPromptPopup: false,
        Header: "",
        Msg: "",
        ConfirmAction: null
    },
};
exports.ShowPopupReducer = (state = initialPopupState, action) => {
    switch (action.type) {
        case exports.POPUP_SHOW_SCREEN: {
            let actionTypedShowPopup = action;
            let newScreenPopup = { ShowScreenPopup: true, ComponentStrategy: actionTypedShowPopup.ComponentStrategy, ComponentName: actionTypedShowPopup.ComponentName, Params: actionTypedShowPopup.Params };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_HIDE_SCREEN: {
            let newScreenPopup = { ShowScreenPopup: false, ComponentStrategy: "", ComponentName: "", Params: null };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_SHOW_PROMPT: {
            let actionTyped = action;
            let newPromptPopup = {
                ShowPromptPopup: true,
                Header: actionTyped.Prompt.Header,
                Msg: actionTyped.Prompt.Msg,
                ConfirmAction: actionTyped.Prompt.ConfirmAction
            };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_HIDE_PROMPT: {
            let newPromptPopup = { ShowPromptPopup: false, Header: "", Msg: "", ConfirmAction: null };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_CONFIRM_PROMPT: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newPromptPopup = { ShowPromptPopup: false, Header: "", Msg: "", ConfirmAction: null };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_SHOW_CONFIRMATION: {
            let actionTyped = action;
            let newConfirmationPopup = {
                ShowConfirmationPopup: true,
                Msg: actionTyped.Confirmation.Msg,
                Header: actionTyped.Confirmation.Header,
                ConfirmButtonText: actionTyped.Confirmation.ConfirmButtonText,
                CancelButtonText: actionTyped.Confirmation.CancelButtonText,
                ConfirmAction: actionTyped.Confirmation.ConfirmAction,
                CancelAction: actionTyped.Confirmation.CancelAction,
                ShowInputBox: actionTyped.Confirmation.ShowInputBox,
                ConfirmationComment: null,
                MessageType: actionTyped.Confirmation.MessageType
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CONFIRM_CONFIRMATION: {
            let actionTyped = action;
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup = {
                ShowConfirmationPopup: false,
                Msg: "",
                Header: "",
                ConfirmButtonText: "",
                CancelButtonText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowInputBox: false,
                ConfirmationComment: actionTyped.comment,
                MessageType: null // ???
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CANCEL_CONFIRMATION: {
            //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup = {
                ShowConfirmationPopup: false,
                Msg: "",
                Header: "",
                ConfirmButtonText: "",
                CancelButtonText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowInputBox: false,
                ConfirmationComment: null,
                MessageType: null
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_SHOW_ALERT: {
            let showAlertAction = action;
            let newAlertPopup = { ShowAlertPopup: true, Header: showAlertAction.Alert.Header, Msg: showAlertAction.Alert.Msg, MessageType: showAlertAction.Alert.MessageType };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_HIDE_ALERT: {
            let newAlertPopup = { ShowAlertPopup: false, Header: "", Msg: "", MessageType: Enums_1.MessageType.Info };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_SHOW_LOADING: {
            let newLoadingPopup = { ShowLoadingPopup: true };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_HIDE_LOADING: {
            let newLoadingPopup = { ShowLoadingPopup: false };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_SHOW_ABOUT: {
            let newAboutPopup = { ShowAboutPopup: true };
            return Object.assign({}, state, { AboutPopup: newAboutPopup });
        }
        case exports.POPUP_HIDE_ABOUT: {
            let newAboutPopup = { ShowAboutPopup: false };
            return Object.assign({}, state, { AboutPopup: newAboutPopup });
        }
        case exports.POPUP_CLEAR_PARAM: {
            let newScreenPopup = { ShowScreenPopup: state.ScreenPopup.ShowScreenPopup, ComponentStrategy: state.ScreenPopup.ComponentStrategy, ComponentName: state.ScreenPopup.ComponentName, Params: null };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        default:
            return state;
    }
};
