import { IReminder } from "../../Utilities/Interface/BlotterObjects/IReminder";
import { ReminderState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IReminderApi {
    getReminderState(): ReminderState;
    getAllReminder(): IReminder[];
}