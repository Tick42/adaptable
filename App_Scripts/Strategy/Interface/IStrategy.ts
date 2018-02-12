import { IEntitlement } from '../../Core/Interface/IAdaptableBlotter'
import { IMenuItem } from '../../Core/Interface/IMenu'

export interface IStrategy {
    Id: string
    getMenuItems(): IMenuItem[]
    getStrategyEntitlement(): IEntitlement
    InitializeWithRedux(): void
    
}