import { IPPDomain, IPPStyle } from "../../Strategy/Interface/IExportStrategy";
import { LoggingHelper } from "./LoggingHelper";
import * as ipushpull from 'ipushpull-js'

export module iPushPullHelper {
  
    export enum ServiceStatus {
        Unknown = "Unknown",
        Disconnected = "Disconnected",
        Connected = "Connected",
        Error = "Error"
    }

    export var IPPStatus: ServiceStatus = ServiceStatus.Unknown
    let iPushPullApp: any;//angular.IModule
     // presumably this will be given a definition file in due course which would be great;
    var pages: Map<string, any> = new Map();

    // creates the iPushPullApp object using blotterOptions ippconfig
    export function init(iPPConfig?: any): void {
        if (iPushPullApp == null) {
             iPushPullApp = ipushpull.create(iPPConfig);
        }
    }

    // checks if we have loaded iPushPullproperly
    export function isIPushPullLoaded() {
        return iPushPullApp != null;  // remove this if we want to go back to old version
    }

    // Logs in to iPushpull
    export function Login(login: string, password: string): Promise<any> {
        return new Promise<string>((resolve: any, reject: any) => {
            iPushPullApp.auth.on(iPushPullApp.auth.EVENT_LOGGED_IN, function () {
                IPPStatus = ServiceStatus.Connected;
                resolve();
            });

            iPushPullApp.auth.login(login, password).catch((err: any) => {
                IPPStatus = ServiceStatus.Error;
                reject(err.message)
            });
        })
    }

    // Retrieves domain pages from iPushPull
    export function GetDomainPages(clientId: string): Promise<IPPDomain[]> {
        return new Promise<IPPDomain[]>((resolve: any, reject: any) => {
              iPushPullApp.api.getDomainsAndPages(clientId)
                .then((x: any) => {
                    let result: IPPDomain[] = x.data.domains.map((domain: any) => {
                        return {
                            Name: domain.name,
                            Pages: domain.current_user_domain_page_access.pages
                                .filter((page: any) => page.special_page_type == 0 && page.write_access)
                                .map((page: any) => page.name)
                        }
                    })
                    resolve(result);
                })
                .catch((x: any) => {
                    LoggingHelper.LogError("couldn't get Domain/Pages from IPP : ", x)
                    reject(x.message)
                })
        })
    }

   
    export function LoadPage(folderIPP: string, pageIPP: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
              let page = new iPushPullApp.page(pageIPP, folderIPP)

            page.on(page.EVENT_NEW_CONTENT, function (data: any) {
                LoggingHelper.LogMessage("Page Ready : " + pageIPP)
                pages.set(pageIPP, page)
                resolve(page);
                //we return true so it removes the listener for new content.
                //IPP should add that line to their wiki
                return true;
            });
        });
    }

    export function UnloadPage(page: string) {
        let pageIPP = pages.get(page)
        if (pageIPP) {
            pageIPP.destroy()
            pages.delete(page)
            LoggingHelper.LogMessage("Page Unloaded : " + page)
        }
    }

    export function pushData(page: string, data: any[], style: IPPStyle): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var newData = data.map(function (row: any, i: number) {
                return row.map((cell: any, y: number) => {
                    let col = (i == 0 ? style.Header.Columns.find(x => x.columnFriendlyName == data[0][y]) :
                        style.Row.Columns.find(x => x.columnFriendlyName == data[0][y]))
                    let styleIPP: any
                    if (i == 0) {
                        styleIPP = {
                            "background-color": style.Header.headerBackColor,
                            "bbc": "000000",
                            "bbs": "none",
                            "bbw": "none",
                            "lbc": "000000",
                            "lbs": "none",
                            "lbw": "none",
                            "rbc": "000000",
                            "rbs": "none",
                            "rbw": "none",
                            "tbc": "000000",
                            "tbs": "none",
                            "tbw": "none",
                            "color": style.Header.headerColor,
                            "font-family": style.Header.headerFontFamily,
                            "font-size": style.Header.headerFontSize,
                            "font-style": style.Header.headerFontStyle,
                            "font-weight": style.Header.headerFontWeight,
                            "height": String(style.Header.height/3) + "px",
                            "text-align": col.textAlign,
                            "vertical-align": "middle",
                            "white-space": "nowrap",
                            "width": String(col.width) + "px",
                            "text-wrap": "normal",
                            "word-wrap": "normal"
                        }
                    }
                    else if (i == 1) {
                        styleIPP = {
                            "background-color": i % 2 ? style.Row.backColor : style.Row.altBackColor,
                            "color": style.Row.color,
                            "font-family": style.Row.fontFamily,
                            "font-size": style.Row.fontSize,
                            "font-style": style.Row.fontStyle,
                            "font-weight": style.Row.fontWeight,
                            "text-align": col.textAlign
                        }
                    }
                    else {
                        styleIPP = {
                            "background-color": i % 2 ? style.Row.backColor : style.Row.altBackColor,
                        }
                    }
                    return {
                        "value": cell,
                        "formatted_value": cell,
                        "style": styleIPP
                    }
                })
            });

            let pageIPP = pages.get(page)
            pageIPP.Content.canDoDelta = false;
            pageIPP.Content.update(newData, true);
            pageIPP.push().then(function () {
                LoggingHelper.LogMessage('Data pushed for iPushPull page : ' + page);
                resolve()
            }, (err: any) => {
                LoggingHelper.LogMessage('Error pushing data for iPushPull page : ' + page);
                reject();
            });
        })
    }
}