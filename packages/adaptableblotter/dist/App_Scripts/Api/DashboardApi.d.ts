import { ApiBase } from "./ApiBase";
export interface IDashboardApi {
    SetAvailableToolbars(availableToolbars: string[]): void;
    SetVisibleToolbars(visibleToolbars: string[]): void;
    ShowToolbar(visibleToolbar: string): void;
    HideToolbar(visibleToolbar: string): void;
    SetVisibleButtons(functionButtons: string[]): void;
    SetZoom(zoom: Number): void;
    SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;
    Show(): void;
    Hide(): void;
    ShowSystemStatusButton(): void;
    HideSystemStatusButton(): void;
    ShowAboutButton(): void;
    HideAboutButton(): void;
    ShowFunctionsDropdown(): void;
    HideFunctionsDropdown(): void;
    ShowColumnsDropdown(): void;
    HideColumnsDropdown(): void;
    SetHomeToolbarTitle(title: string): void;
    SetApplicationToolbarTitle(title: string): void;
    Minimise(): void;
}
export declare class DashboardApi extends ApiBase implements IDashboardApi {
    SetAvailableToolbars(availableToolbars: string[]): void;
    SetVisibleToolbars(visibleToolbars: string[]): void;
    ShowToolbar(visibleToolbar: string): void;
    HideToolbar(visibleToolbar: string): void;
    SetVisibleButtons(functionButtons: string[]): void;
    SetZoom(zoom: Number): void;
    SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;
    Show(): void;
    Hide(): void;
    Minimise(): void;
    ShowSystemStatusButton(): void;
    HideSystemStatusButton(): void;
    ShowAboutButton(): void;
    HideAboutButton(): void;
    ShowFunctionsDropdown(): void;
    HideFunctionsDropdown(): void;
    ShowColumnsDropdown(): void;
    HideColumnsDropdown(): void;
    SetHomeToolbarTitle(title: string): void;
    SetApplicationToolbarTitle(title: string): void;
}
