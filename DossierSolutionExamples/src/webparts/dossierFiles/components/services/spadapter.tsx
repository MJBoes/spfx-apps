import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference, IDataAdapter } from '../IDossierFilesProps';

export class SPDataProvider implements IDataAdapter {
    private _currentItem: IDossierItemDetails;
    private _baseGetItemUrl: string;

    constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {
    }

    public dataProviderIsValid():boolean{
        if(this.dossierDocumentLibrary!='' && this.dossierGenericList !='' && this.dossierTypes !=''){
            return true;
        }
        return false;
    }

    public readDocumentList(): Promise<IFile[]> {
        return;
    }

    public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
        this._baseGetItemUrl=this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        // console.log('SPDataprovider',this._baseGetItemUrl);
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists('3859e06a-eb78-427d-bf41-c61ec939d739')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Geo%27%20and%20Title%20eq%20%27World%27
        let rest = this._baseGetItemUrl+'/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27'+dossierType+'%27%20and%20Title%20eq%20%27'+dossierTitle+'%27';
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then((data)=>{
            let _dossierItem:IDossierItemDetails={
                id: data.value[0].Id,
                title: data.value[0].Title,
                type: 'geo',
                description:data.value[0].Description,
                iconurl:'',
                properties:[],
                referencedBy:[],
                referencesTo:[],
                files:[]

            };
            return _dossierItem;
        });
    }

    public readDossierList(dossierType: string): Promise<IDossierListItem[]> {
        return;
    }
}