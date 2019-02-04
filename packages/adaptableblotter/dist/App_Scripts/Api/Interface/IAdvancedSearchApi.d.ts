import { IAdvancedSearch } from "../../Utilities/Interface/BlotterObjects/IAdvancedSearch";
export interface IAdvancedSearchApi {
    /**
     * Sets Advanced Search
     * @param advancedSearchName
     */
    Set(advancedSearchName: string): void;
    Clear(): void;
    Add(advancedSearch: IAdvancedSearch): void;
    /**
     * Updates an existing Advanced Search.
     * The first parameter is the name of the Search that is being edited.
     * Its required in order to identify the object because the name property itself can be edited and there is no UID.
     * @param advancedSearchName
     * @param advancedSearch
     */
    Edit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
    Delete(advancedSearchName: string): void;
    GetCurrent(): IAdvancedSearch;
    GetByName(advancedSearchName: string): IAdvancedSearch;
    GetAll(): IAdvancedSearch[];
}
