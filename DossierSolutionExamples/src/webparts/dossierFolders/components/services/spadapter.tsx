import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFolder, IFile, IDossierListItem, IDossierItemDetails } from '../IDossierFilesProps';

export class SPDataProvider implements IDataProvider {
    private _baseGetItemUrl: string;
    private _baseGetFileUrl: string;

    constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {
    }

    public dataProviderIsValid(): boolean {
        if ((this.dossierDocumentLibrary + '') != '' && (this.dossierGenericList + '') != '') {
            return true;
        }
        return false;
    }

    public readDossierList(filterValue:string): Promise<IDossierListItem[]> {
        this._baseGetItemUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        this._baseGetFileUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierDocumentLibrary + '%27)';
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter=substringof(%27' + filterValue + '%27,Title)';
        // this._restpromise(rest).then(mock=>{
        //     console.log('Export Mock Data: ',JSON.stringify(mock));
        // });
        return(this._restpromiseRefBy(rest));
    }

    public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
        this._baseGetItemUrl = this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        let _dossierItem: IDossierItemDetails;
        // console.log('SPDataprovider',this._baseGetItemUrl);
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists('3859e06a-eb78-427d-bf41-c61ec939d739')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Geo%27%20and%20Title%20eq%20%27World%27
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists(%2740e8d757-574b-402d-8196-ea5042ebc290%27)/items?$select=Title,refType1/Title,refType2/Title,refType3/Title,refType4/Title&$expand=refType1,refType2,refType3,refType4&$filter=Title%20eq%20%27Netherlands%27
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon,refType1/Title,refType2/Title,refType3/Title,refType4/Title&$expand=refType1,refType2,refType3,refType4&$filter=entType%20eq%20%27' + dossierType + '%27%20and%20Title%20eq%20%27' + dossierTitle + '%27';
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then((data) => {
            // Loop through the refType fields to find the details of entities refered by the active item
            let refFields=[];
            ['refType1','refType2','refType3','refType4'].map(field=>{
                data.value[0][field].map(ref=>{
                    refFields.push({ "key": field, "value": ref.Title });
                });
            });
            //console.log('spadapter readDossierItem', data);
            _dossierItem = {
                id: data.value[0].Id,
                title: data.value[0].Title,
                type: data.value[0].entType,
                description: data.value[0].entDescription,
                iconurl: data.value[0].icon,
                referencefields: refFields,
                properties: [],
                referencedBy: [],
                referencesTo: [],
                folders: [],
                files:[]
            };
            return _dossierItem;
        }).then((data) => {
            return this.referencedBy(data);
        }).then((data) => {
            // this.referencesTo(data).then(data=>{
            //     console.log('Export Mock Data: ', JSON.stringify(data));
            // });
            return this.referencesTo(data);
        }).then((data)=>{
            return this.dossierFolders(data);
        }).then(data=>{
            return this.dossierFiles(data);
        });
    }

    private referencedBy(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // Find ledger items which refer to the dossier list item. Basically items where refType<entType> contains a reference to the Title
        // https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists(%2740e8d757-574b-402d-8196-ea5042ebc290%27)/items?$select=id,Title,entType,icon,refType1/Title&$expand=refType1&$filter=refType1/Title%20eq%20%27Netherlands%27
        let _url=this._baseGetItemUrl + '/items?$select=id,Title,entType,icon,refType'+_dossierItem.type+'/Title&$expand=refType'+_dossierItem.type;
        _url=_url+'&$filter=refType' +_dossierItem.type + '/Title%20eq%20%27' +_dossierItem.title + '%27';
        // console.log('referencedBy',_url);
        return this.ctxHttpClient.get(_url, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(_data => {
            _data.value.map(_referencingItem=>{
                _dossierItem.referencedBy.push({title:_referencingItem.Title,iconurl:_referencingItem.icon,type:_referencingItem.entType, id: _referencingItem.Id, description:''});
            });
            return _dossierItem;
        });
    }

    private referencesTo(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        let promisesMethods = [];
        let rest = this._baseGetItemUrl + '/items?$select=id,Title,entType,entDescription,icon&$filter={Titles}';
        let _filter='';
        if(_dossierItem.referencefields.length>0){
            _dossierItem.referencefields.map(types=>{
                if(types.value!=null&&types.key.indexOf('_')==-1){
                    types.value.split(';').map(ref=>{
                        _filter+=' or Title eq %27' + ref + '%27';
                    });
                    promisesMethods.push(this._restpromiseRefBy(rest.replace('{Titles}',_filter.substr(3))));
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

    private dossierFiles(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails> {
        // Fetch all files specified in the folders property of the dossier item
        // GetFolderByServerRelativeUrl doesn't work: no recursion and slow:
        // var url = "https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/Web/GetFolderByServerRelativeUrl('/sites/DossierSolutionExamples/Factbook_Folders/Client%20Folders/Afghanistan')?$expand=Folders,Files";
        // instead use https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists(%271f7dec37-71b2-4128-bc1c-39e1adb91a43%27)/items?$select=id,FileRef,FileLeafRef&$filter=startswith(FileRef,%20%27/sites/DossierSolutionExamples/Factbook_Folders/Client%20Folders/Afghanistan%27)
        let promisesMethods = [];
        _dossierItem.folders.map(_folder=>{
            promisesMethods.push(this._restpromiseFile(this._baseGetFileUrl+"/items?$select=id,FileRef,FileLeafRef&$filter=startswith(FileRef,%27"+_folder.serverRelativeUrl+"/%27)",_folder.title));
        });
        return Promise.all(promisesMethods)
        .then(fileGroups => {
            fileGroups.map(_files=>{
                _files.map(_file=>{
                    _dossierItem.files.push(_file);
                });
            });
            //console.log('spadapter dossierFiles',_dossierItem);
            return _dossierItem;
        });
    }

    private dossierFolders(_dossierItem: IDossierItemDetails): Promise<IDossierItemDetails>{
        // var url = _spPageContextInfo.webServerRelativeUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$expand=Folders,Files";
        //https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists(%271f7dec37-71b2-4128-bc1c-39e1adb91a43%27)/items?$select=id,FileRef,FileLeafRef,refType1/Title&$expand=refType1&$filter=refType1/Title%20eq%20%27Afghanistan%27
        let _url='https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists(%271f7dec37-71b2-4128-bc1c-39e1adb91a43%27)/items?$select=id,FileRef,FileLeafRef,reviewDate,refType' +_dossierItem.type + '/Title&$expand=';
        _url=_url+'refType' +_dossierItem.type + '&$filter=refType' +_dossierItem.type + '/Title%20eq%20%27'+ _dossierItem.title +'%27';
        // console.log('dossierFolder', _url);
        return this.ctxHttpClient.get(_url, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(data=>{
            data.value.map(_folder=>{
                _dossierItem.folders.push({id:_folder.Id, title:_folder.FileLeafRef, serverRelativeUrl:_folder.FileRef, reviewdate:_folder.reviewDate});
            });
            return _dossierItem;
        });
    }

    private _restpromiseRefBy(rest:string): Promise<IDossierListItem[]>{
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
    private _restpromiseFile(rest:string, group: string): Promise<IFile[]>{
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            return response.json();
        }).then(data => {
            let _file: IFile[] = [];
            data.value.map(item => {
                _file.push({
                    id:item.Id,
                    title:item.FileLeafRef,
                    modified:item.Modified,
                    reviewdate:'',
                    serverRelativeUrl: item.FileLeafRef,
                    previewUrl:item.ServerRedirectedEmbedUri,
                    properties:[],
                    group: group
                });
            });
            return _file;
        });
    }
}