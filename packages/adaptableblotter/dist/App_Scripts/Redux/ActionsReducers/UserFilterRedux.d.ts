import { UserFilterState } from './Interface/IState';
import * as Redux from 'redux';
import { IUserFilter, IColumnFilter } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { InputAction } from '../../Utilities/Interface/IMessage';
export declare const USER_FILTER_ADD_UPDATE = "USER_FILTER_ADD_UPDATE";
export declare const USER_FILTER_DELETE = "USER_FILTER_DELETE";
export declare const USER_FILTER_CREATE_FROM_COLUMN_FILTER = "USER_FILTER_CREATE_FROM_COLUMN_FILTER";
export interface UserFilterAddUpdateAction extends Redux.Action {
    Index: number;
    UserFilter: IUserFilter;
}
export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter;
}
export interface CreateUserFilterFromColumnFilterAction extends InputAction {
    ColumnFilter: IColumnFilter;
}
export declare const UserFilterAddUpdate: (Index: number, UserFilter: IUserFilter) => UserFilterAddUpdateAction;
export declare const UserFilterDelete: (UserFilter: IUserFilter) => UserFilterDeleteAction;
export declare const CreateUserFilterFromColumnFilter: (ColumnFilter: IColumnFilter, InputText: string) => CreateUserFilterFromColumnFilterAction;
export declare const UserFilterReducer: Redux.Reducer<UserFilterState>;
