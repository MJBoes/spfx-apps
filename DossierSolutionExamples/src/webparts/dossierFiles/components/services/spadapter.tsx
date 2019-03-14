import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDataAdapter, IDossierReference } from '../IDossierFilesProps';

export class SPDataProvider implements IDataAdapter {
    private _currentItem: IDossierItemDetails;
    private _baseGetItemUrl: string;

    constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {
    }

    public dataProviderIsValid(): boolean {
        if ((this.dossierDocumentLibrary + '') != '' && (this.dossierGenericList + '') != '' && (this.dossierTypes + '') != '') {
            return true;
        }
        return false;
    }

    public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
        this._baseGetItemUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        let _dossierItem: IDossierItemDetails;
        // console.log('SPDataprovider',this._baseGetItemUrl);
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists('3859e06a-eb78-427d-bf41-c61ec939d739')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Geo%27%20and%20Title%20eq%20%27World%27
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter=entType%20eq%20%27' + dossierType + '%27%20and%20Title%20eq%20%27' + dossierTitle + '%27';
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then((data) => {
            // console.log('spadapter readDossierItem', data);
            _dossierItem = {
                id: data.value[0].Id,
                title: data.value[0].Title,
                type: data.value[0].entType,
                description: data.value[0].entDescription,
                iconurl: data.value[0].icon,
                properties: [],
                referencedBy: [],
                referencesTo: [],
                files: []
            };
            return _dossierItem;
        }).then((data) => {
            // console.log('spadapter 1', data);
            return this.referencedBy(data);
        }).then((data)=>{
            return this.referencesTo(data);
        });
    }

    private referencedBy(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // note: this works only with single line (255 char) fields
        // to do: map dossierType to refTypeX column
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter=substringof(%27' + _dossierItem.title + '%27,refType1)';    //entType%20eq%20%27'+dossierType+'%27%20and%20Title%20eq%20%27'+dossierTitle+'%27';
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(data => {
            let _refBy: IDossierListItem[] = [];
            data.value.map(item => {
                _refBy.push({
                    'id': item.Id,
                    'title': '' + item.Title,
                    'type': item.entType,
                    'description': item.entDescription,
                    'iconurl': item.icon
                });
            });
            //_dossierItem.referencedBy.push({ 'dossiertype': '', 'dossieritems': _refBy });
            _dossierItem.referencedBy=_refBy;
            // console.log('spadapter 3', _dossierItem);
            return _dossierItem;
        });
    }

    private referencesTo(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // note: this works only with single line (255 char) fields
        // to do: map dossierType to refTypeX column
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter=Title eq %27' + _dossierItem.referencesTo + '%27';    //entType%20eq%20%27'+dossierType+'%27%20and%20Title%20eq%20%27'+dossierTitle+'%27';
        console.log('spadapter referencesTo',rest);
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(data => {
            let _refTo: IDossierListItem[] = [];
            data.value.map(item => {
                _refTo.push({
                    'id': item.Id,
                    'title': '' + item.Title,
                    'type': item.entType,
                    'description': item.entDescription,
                    'iconurl': item.icon
                });
            });
            _dossierItem.referencesTo.push({ 'dossiertype': '', 'dossieritems': _refTo });
            // console.log('spadapter 3', _dossierItem);
            return _dossierItem;
        });
    }
}