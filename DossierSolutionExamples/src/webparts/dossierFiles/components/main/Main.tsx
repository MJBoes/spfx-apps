import * as React from 'react';
import { viewTypes, IMain, IDataProvider, IDossierItemDetails,IDossierListItem } from '../IDossierFilesProps';
import { DataProvider } from '../services/dataprovider';
import DossierItem from '../dossieritem/DossierItem';
import { DossierItemSearchBox } from '../search/DossierItemSearchBox';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export interface IMainState {
  currentDossier: IDossierItemDetails;
  searchItems: IDossierListItem[];
}

export default class Main extends React.Component<IMain,IMainState> {
  private _dataProvider: IDataProvider;
  private _currentDossierType: string;
  private _currentItemTitle: string;
  private _view: viewTypes;

  constructor(props: IMain) {
    super(props);
    this._dataProvider = new DataProvider(this.props.ctxHttpClient, this.props.pageContextWebAbsoluteUrl, "", "", "");
    this.state = {
      currentDossier: null,
      searchItems: []
    };
    this.setCurrentDossier = this.setCurrentDossier.bind(this);
    this.readDossierList=this.readDossierList.bind(this);
    this._view='Search';
    this._currentDossierType = this.props.parentProperties.dossierTypes.split(';')[0];
    this._currentItemTitle = this.props.parentProperties.dossierRootTitle;
  }

  public render(): React.ReactElement<IMain> {
    this._dataProvider.dossierDocumentLibrary = this.props.parentProperties.dossierDocumentLibrary;
    this._dataProvider.dossierGenericList = this.props.parentProperties.dossierGenericList;
    this._dataProvider.dossierTypes = this.props.parentProperties.dossierTypes;
    if (!this._dataProvider.dataProviderIsValid()) {
      this._view = 'Configure';
    }
    return (
      <div>
        {this._view === 'Configure' && <Placeholder iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part. It needs to know what dossier item list, dossier document library and dossier types to use.'
          buttonLabel='Configure'
          onConfigure={this.props.parentProperties.onConfigure}
        />}
        {/* {this.props.currentView === 'List' && <DossierList {...this.props}></DossierList>} */}
        {this._view === 'Search' && <DossierItemSearchBox foundItems={this.state.searchItems} readDossierList={this.readDossierList} setCurrentDossier={this.setCurrentDossier}></DossierItemSearchBox>}
        {this._view === 'Item' && <DossierItem dataProvider={this._dataProvider} currentDossierItem={this.state.currentDossier} setCurrentDossier={this.setCurrentDossier}></DossierItem>}
      </div>
    );
  }

  private setCurrentDossier(currentDossierType: string, currentItemTitle: string): void {
    // console.log('Main setCurrentDossier 1',currentDossierType+'/'+currentItemTitle);
    if(currentDossierType==''){
      this._view='Search';
      currentDossierType=this._currentDossierType;
      currentItemTitle=this._currentItemTitle;
    }else{
      this._view='Item';
      this._currentDossierType=currentDossierType;
      this._currentItemTitle=currentItemTitle;
    }
    // console.log('Main setCurrentDossier 2',this._currentDossierType+'/'+this._currentItemTitle);
    this._dataProvider.readDossierItem(this._currentDossierType, this._currentItemTitle).then(item => {
      this.setState({ currentDossier: item });
    });
  }

  private readDossierList(filter: string): void{
    this._dataProvider.readDossierList(filter)
    .then(data=>{
      this.setState({ searchItems: data});
    });
  }
}
