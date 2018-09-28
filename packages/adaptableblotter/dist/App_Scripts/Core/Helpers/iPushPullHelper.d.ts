import { IPPDomain, IPPStyle } from "../../Strategy/Interface/IExportStrategy";
export declare module iPushPullHelper {
    enum ServiceStatus {
        Unknown = "Unknown",
        Disconnected = "Disconnected",
        Connected = "Connected",
        Error = "Error"
    }
    var IPPStatus: ServiceStatus;
    function isIPushPullLoaded(iPPConfig?: any): boolean;
    function Login(login: string, password: string): Promise<any>;
    function GetDomainPages(clientId: string): Promise<IPPDomain[]>;
    function LoadPage(folderIPP: string, pageIPP: string): Promise<any>;
    function UnloadPage(page: string): void;
    function pushData(page: string, data: any[], style: IPPStyle): Promise<any>;
}