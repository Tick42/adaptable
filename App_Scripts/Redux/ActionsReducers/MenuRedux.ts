import * as Redux from 'redux';
import { IMenuItem } from '../../Core/Interface/IMenu';
import { MenuState } from './Interface/IState'
export const SET_MENUITEMS = 'SET_MENUITEMS';
export const BUILD_COLUMN_CONTEXT_MENU = 'BUILD_COLUMN_CONTEXT_MENU';
const SHOW_COLUMN_CONTEXT_MENU = 'SHOW_COLUMN_CONTEXT_MENU';
const HIDE_COLUMN_CONTEXT_MENU = 'HIDE_COLUMN_CONTEXT_MENU';
const ADD_ITEM_COLUMN_CONTEXT_MENU = 'ADD_ITEM_COLUMN_CONTEXT_MENU';

export interface SetMenuItemsAction extends Redux.Action {
    MenuItems: IMenuItem[];
}

export interface BuildColumnContextMenuAction extends Redux.Action {
    ColumnId: string;
    PositionX: number
    PositionY: number
}

export interface ShowColumnContextMenuAction extends Redux.Action {
}

export interface AddItemColumnContextMenuAction extends Redux.Action {
    Item: IMenuItem
}

export interface HideColumnContextMenuAction extends Redux.Action {
}

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
export const SetMenuItems = (MenuItems: IMenuItem[]): SetMenuItemsAction => ({
    type: SET_MENUITEMS,
    MenuItems
})

export const BuildColumnContextMenu = (ColumnId: string, PositionX: number, PositionY: number): BuildColumnContextMenuAction => ({
    type: BUILD_COLUMN_CONTEXT_MENU,
    ColumnId,
    PositionX,
    PositionY
})

export const ShowColumnContextMenu = (): ShowColumnContextMenuAction => ({
    type: SHOW_COLUMN_CONTEXT_MENU
})

export const AddItemColumnContextMenu = (Item: IMenuItem): AddItemColumnContextMenuAction => ({
    type: ADD_ITEM_COLUMN_CONTEXT_MENU,
    Item
})

export const HideColumnContextMenu = (): HideColumnContextMenuAction => ({
    type: HIDE_COLUMN_CONTEXT_MENU
})

const initialMenuState: MenuState = {
    MenuItems: [],
    ContextMenu: {
        ColumnId: null,
        BuildContextMenu: false,
        IsVisible: false,
        PositionX: 0,
        PositionY: 0,
        Items: []
    }
}

export const MenuReducer: Redux.Reducer<MenuState> = (state: MenuState = initialMenuState, action: Redux.Action): MenuState => {
    switch (action.type) {
        case SET_MENUITEMS:
            {
                //TODO: we need to merge with the existing set of menuitems instead of replacing it. 
                //it will be important we we ever allow show/hide on menus
                let actionTyped = <SetMenuItemsAction>action;
                let menuItems = actionTyped.MenuItems.sort((a: IMenuItem, b: IMenuItem) =>
                    (a.Label < b.Label) ? -1
                        : (a.Label > b.Label) ? 1 : 0)

                return Object.assign({}, state, { MenuItems: menuItems });
            }
        case BUILD_COLUMN_CONTEXT_MENU:
            {
                let actionTyped = <BuildColumnContextMenuAction>action
                return Object.assign({}, state,
                    {
                        ContextMenu: {
                            ColumnId: actionTyped.ColumnId,
                            BuildContextMenu: true,
                            IsVisible: false,
                            PositionX: actionTyped.PositionX,
                            PositionY: actionTyped.PositionY,
                            Items: []
                        }
                    })
            }
        case HIDE_COLUMN_CONTEXT_MENU:
            {
                let actionTyped = <HideColumnContextMenuAction>action
                return Object.assign({}, state,
                    {
                        ContextMenu: {
                            ColumnId: state.ContextMenu.ColumnId,
                            BuildContextMenu: false,
                            IsVisible: false,
                            PositionX: state.ContextMenu.PositionX,
                            PositionY: state.ContextMenu.PositionY,
                            Items: []
                        }
                    })
            }
        case ADD_ITEM_COLUMN_CONTEXT_MENU: {
            let actionTyped = <AddItemColumnContextMenuAction>action
            return Object.assign({}, state,
                {
                    ContextMenu: {
                        ColumnId: state.ContextMenu.ColumnId,
                        BuildContextMenu: state.ContextMenu.BuildContextMenu,
                        IsVisible: state.ContextMenu.IsVisible,
                        PositionX: state.ContextMenu.PositionX,
                        PositionY: state.ContextMenu.PositionY,
                        Items: [].concat(state.ContextMenu.Items, actionTyped.Item).sort((a: IMenuItem, b: IMenuItem) =>
                            (a.Label < b.Label) ? -1
                                : (a.Label > b.Label) ? 1 : 0)
                    }
                })
        }
        case SHOW_COLUMN_CONTEXT_MENU: {
            return Object.assign({}, state,
                {
                    ContextMenu: {
                        ColumnId: state.ContextMenu.ColumnId,
                        BuildContextMenu: state.ContextMenu.BuildContextMenu,
                        IsVisible: true,
                        PositionX: state.ContextMenu.PositionX,
                        PositionY: state.ContextMenu.PositionY,
                        Items: [].concat(state.ContextMenu.Items)
                    }
                })
        }
        default:
            return state
    }
}