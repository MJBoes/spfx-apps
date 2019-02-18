import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierEntry } from './IData';

export class SharePointDataProvider implements IDataProvider {
    private _webPartContext: IWebPartContext;
    private _dossierlistUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext, dossierlistUrl: string) {
        this._webPartContext = value;
        this._dossierlistUrl='';//dossierlistUrl.lastIndexOf("/") == dossierlistUrl.length - 1 ? dossierlistUrl.substr(0, dossierlistUrl.length - 1) : dossierlistUrl;
        this._webAbsoluteUrl=value.pageContext.web.absoluteUrl;
    }

    public validateSettings(): boolean {
        if (!this._dossierlistUrl) {
            return false;
        }
        return true;
    }

    public readDocumentsFromSearch(): Promise<IFile[]> {
        return this._webPartContext.spHttpClient.get('',SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        });
    }

    public readDossierFromList(): Promise<IDossierEntry[]> {
        // probably not necessary, but a performance enhancement could be to fetch per dossier type: &$filter=ContentType%20eq%20%27dossierdistillery%27'
        let _root:string;
        if(DEBUG){
            _root="http://localhost:8081/";
        }else{
            _root="https://desktopservices.sharepoint.com/";
        }
        let rest=_root + "sites/showcase/factbook/_api/web/lists/getbytitle('dossier')/items?$select=id,Title,dossierdescription,ContentType/Name&$expand=ContentType&$top=1000";
        return this._webPartContext.spHttpClient.get(rest,SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{
            let dossiers:IDossierEntry[]=[];
            for (let i = 0; i < data.value.length; i++) {
                dossiers.push({
                    code: data.value[i].title,
                    shortname: data.value[i].title,
                    description: data.value[i].dossierdescription
                });
            }
            return dossiers;
        });
    }
}