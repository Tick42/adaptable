import { IShortcut } from '../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutEntityRow } from './ShortcutEntityRow'
import { ShortcutWizard } from './Wizard/ShortcutWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { EntityItemList } from '../Components/EntityItemList';

interface ShortcutPopupProps extends IStrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction

    Shortcuts: Array<IShortcut>,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityInternalState> {
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: 0 }
    }

    render() {
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a 'calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value."]

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Type", Width: 2 },
            { Caption: "Key", Width: 1 },
            { Caption: "Action", Width: 3 },
            { Caption: "Value", Width: 3 },
            { Caption: "", Width: 3 },
        ]

        const shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide];

        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutEntityRow
                ConfigEntity={shortcut} key={"ns" + index}
                Index={index}
                onEdit={null}
                EntityRowInfo={entityRowInfo}
                AvailableActions={shortcutActionList}
                AvailableKeys={this.getAvailableKeys(shortcut)}
                onShare={() => this.props.onShare(shortcut)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutEntityRow>
        });

        let newButton = <ButtonNew onClick={() => this.CreateShortcut()}
            overrideTooltip="Create New Shortcut"
            DisplayMode="Glyph+Text"
            size={"small"} />

        let shortcut: IShortcut = this.state.EditedConfigEntity as IShortcut

        return <PanelWithButton headerText={StrategyNames.ShortcutStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.ShortcutGlyph}
            infoBody={infoBody}>

            {shortcuts.length > 0 &&
                <EntityItemList entityRowInfo={entityRowInfo} items={shortcuts} />
            }

            {shortcuts.length == 0 &&
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
            }

            {this.state.EditedConfigEntity != null &&
                <ShortcutWizard
                    EditedShortcut={shortcut}
                    DateKeysAvailable={shortcut.ShortcutKey ?
                        keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                        : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1)}
                    NumericKeysAvailable={shortcut.ShortcutKey ?
                        keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                        : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1)}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

    onCloseWizard() {
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
        this.props.onAddShortcut(this.state.EditedConfigEntity as IShortcut)
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    CreateShortcut() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
    }

    getAvailableKeys(shortcut: IShortcut): string[] {
        return (shortcut.DataType == DataType.Number) ?
            keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Shortcuts: state.Shortcut.Shortcuts
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
        onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => dispatch(ShortcutRedux.ShortcutChangeKey(shortcut, NewShortcutKey)),
        onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => dispatch(ShortcutRedux.ShortcutChangeOperation(shortcut, NewShortcutAction)),
        onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => dispatch(ShortcutRedux.ShortcutChangeResult(shortcut, NewShortcutResult)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ShortcutStrategyId))
    };
}

export let ShortcutPopup = connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);

let panelStyle: React.CSSProperties = {
    'overflowY': 'auto',
    width: '800px'
}

const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


