import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails } from '../IDossierFilesProps';

export class SPDataProvider implements IDataProvider {
    private _baseGetItemUrl: string;

    constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {
    }

    public dataProviderIsValid(): boolean {
        if ((this.dossierDocumentLibrary + '') != '' && (this.dossierGenericList + '') != '' && (this.dossierTypes + '') != '') {
            return true;
        }
        return false;
    }

    public readDossierList(filterValue:string): Promise<IDossierListItem[]> {
        this._baseGetItemUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter=substringof(%27' + filterValue + '%27,Title)';
        // console.log('spadapter',rest);
        return(this._restpromise(rest));
    }

    public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
        this._baseGetItemUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        let _dossierItem: IDossierItemDetails;
        // console.log('SPDataprovider',this._baseGetItemUrl);
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists('3859e06a-eb78-427d-bf41-c61ec939d739')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Geo%27%20and%20Title%20eq%20%27World%27
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon,refType1,refType2,refType2_1,refType2_2,refType3,refType4&$filter=entType%20eq%20%27' + dossierType + '%27%20and%20Title%20eq%20%27' + dossierTitle + '%27';
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
                referencefields: [
                    { "key": "refType1", "value": data.value[0].refType1 },
                    { "key": "refType2", "value": data.value[0].refType2 },
                    { "key": "refType2_1", "value": data.value[0].refType2_1 },
                    { "key": "refType2_2", "value": data.value[0].refType2_2 },
                    { "key": "refType3", "value": data.value[0].refType3 },
                    { "key": "refType4", "value": data.value[0].refType4 },
                ],
                properties: [],
                referencedBy: [],
                referencesTo: [],
                files: []
            };
            return _dossierItem;
        }).then((data) => {
            // console.log('spadapter 1', data);
            return this.referencedBy(data);
        }).then((data) => {
            return this.referencesTo(data);
        });
    }

    private referencedBy(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // note: this works only with single line (255 char) fields
        let promisesMethods = [];
        if(_dossierItem.referencefields.length>0){
            _dossierItem.referencefields.map(types=>{
                if(types.key.indexOf('_')==-1){
                    //console.log('spadapter',this._baseGetItemUrl + '/items?$select=id,Title,entType,icon&$filter=substringof(%27' + _dossierItem.title + '%27,'+types.key+')');
                    promisesMethods.push(this._restpromise(this._baseGetItemUrl + '/items?$select=id,Title,entType,icon&$filter=substringof(%27' + _dossierItem.title + '%27,'+types.key+')'));
                }
            });
        }
        return Promise.all(promisesMethods)
        .then(_dossierListItemGroups => {
            let _refBy: IDossierListItem[] = [];
            _dossierListItemGroups.map(_dossierListItems=>{
                _dossierListItems.map(_dossierListItem=>{
                    _refBy.push(_dossierListItem);
                });
            });
            // console.log('spadapter',_refBy);
            _dossierItem.referencedBy=_refBy;
            return _dossierItem;
        });
    }

    private referencesTo(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // note: this works only with single line (255 char) fields
        let promisesMethods = [];
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter={Titles}';
        let _field=''; let _filter='';
        if(_dossierItem.referencefields.length>0){
            _dossierItem.referencefields.map(types=>{
                if(types.value!=null&&types.key.indexOf('_')==-1){
                    types.value.split(';').map(ref=>{
                        _filter+=' or Title eq %27' + ref + '%27';
                    });
                    promisesMethods.push(this._restpromise(rest.replace('{Titles}',_filter.substr(3))));
                    _filter='';
                }
            });
        }
        return Promise.all(promisesMethods)
        .then(_dossierListItemGroups => {
            _dossierListItemGroups.map(_dossierListItems=>{
                _dossierItem.referencesTo.push({ 'dossiertype': '', 'dossieritems': _dossierListItems});
            });
            return _dossierItem;
        });
    }
    private _restpromise(rest:string): Promise<IDossierListItem[]>{
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(data => {
            let _refBy: IDossierListItem[] = [];
            data.value.map(item => {
                _refBy.push({
                    'id': item.Id,
                    'title': '' + item.Title,
                    'type': item.entType,
                    'description': 'not fetched',
                    'iconurl': item.icon
                });
            });
            return _refBy;
        });
    }
}