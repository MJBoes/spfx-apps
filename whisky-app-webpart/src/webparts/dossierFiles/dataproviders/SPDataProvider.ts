import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails } from './IData';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

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

    public readDossierItemsFromList(dossierType: string): Promise<IDossierListItem[]> {
        // probably not necessary, but a performance enhancement could be to fetch per dossier type: &$filter=ContentType%20eq%20%27dossierdistillery%27'
        let _root:string;
        if(DEBUG){
            _root="http://localhost:8081";
        }else{
            _root="https://desktopservices.sharepoint.com";
        }
        let rest=_root + "/sites/showcase/factbook/_api/web/lists/getbytitle('dossier')/items?$select=id,Title,dossierdescription,ContentType/Name&$expand=ContentType&$filter=ContentType eq 'dossier" + dossierType.toLowerCase() +"'";
        return this._webPartContext.spHttpClient.get(rest,SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{
            let dossiers:IDossierListItem[]=[];
            for (let i = 0; i < data.value.length; i++) {
                dossiers.push({
                    id: data.value[i].Id,
                    title: data.value[i].Title,
                    type: data.value[i].ContentType.Name,
                    description: data.value[i].dossierdescription,
                    iconurl:''
                });
            }
            return dossiers;
        });
    }
    public readDossierItemByIDFromList(dossierID: string): Promise<IDossierItemDetails>{
        let _root:string;
        if(DEBUG){
            _root="http://localhost:8081";
        }else{
            _root="https://desktopservices.sharepoint.com";
        }
        let rest=_root + "/sites/showcase/factbook/_api/web/lists/getbytitle('dossier')/items/getbyid(" + dossierID + ")?$expand=ContentType";
        return this._webPartContext.spHttpClient.get(rest,SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then((data:any)=>{
            rest=_root+"/sites/showcase/factbook/_api/web/lists/getbytitle('dossierfiles')/items?$select=id,Title,FileRef,dossierbottlingcodes,dossierbottlercodes,dossierbrandcodes,dossierdistillerycodes&$filter=substringof('"+data.Title+"',"+data.ContentType.Name+"codes)";
            return this._webPartContext.spHttpClient.get(rest,SPHttpClient.configurations.v1).then((response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            }).then((files:any)=>{
                let iconUrl:string='';
                let _iconroot:string=Environment.type === EnvironmentType.Local ? "https://localhost:4321/src/images" : "https://desktopservices.sharepoint.com/sites/showcase/factbook/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com";
                for(const file of files.value) {
                    // console.log(file, data.ContentType.Name, data.Title);
                    // console.log(file[data.ContentType.Name+'codes']);
                    if(file[data.ContentType.Name+'codes']==data.Title){
                        iconUrl=_iconroot+file.FileRef;
                        console.log(_iconroot,file.FileRef);
                    }
                }
                let dossier:IDossierItemDetails={
                    id:data.Id,
                    title: data.Title,
                    type: data.ContentType.Name,
                    description:data.dossierdescription,
                    iconurl:iconUrl,
                    properties:[],
                    references:[{ dossiertype:"Distillery", dossieritems: [{id: '53', title: "Ardbeg", type:'Distillery', description:'', iconurl:''}]}],
                    files:files
                };
                return dossier;
            });
        });
    }
}