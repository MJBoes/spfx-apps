import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { viewTypes, IMain, IDataProvider } from '../IDossierFilesProps';
import { DataProvider } from '../services/dataprovider';
import DossierItem from '../dossieritem/DossierItem';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class Main extends React.Component<IMain> {
  private _dataProvider: IDataProvider;
  private _currentDossierType: string;
  private _currentItemTitle: string;
  private _view: viewTypes;

  constructor(props: IMain) {
    super(props);
    this._dataProvider = new DataProvider(this.props.ctxHttpClient, this.props.pageContextWebAbsoluteUrl, "", "", "");
    this.setCurrentDossier = this.setCurrentDossier.bind(this);
  }

  public componentDidMount() {
    console.log('Main componentDidMount', this._dataProvider);
    // this._dataProvider.setCurrentDossier(this._currentDossierType, this._currentItemTitle);
  }
  public render(): React.ReactElement<IMain> {
    // console.log('Main', this.props.parentProperties.dossierDocumentLibrary);
    this._currentDossierType = this.props.parentProperties.dossierTypes.split(';')[0];
    this._currentItemTitle = this.props.parentProperties.dossierRootTitle;
    this._dataProvider.dossierDocumentLibrary = this.props.parentProperties.dossierDocumentLibrary;
    this._dataProvider.dossierGenericList = this.props.parentProperties.dossierGenericList;
    this._dataProvider.dossierTypes = this.props.parentProperties.dossierTypes;
    if (this._dataProvider.dataProviderIsValid()) {
      this._view = 'Item';
    } else {
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
        {this._view === 'Item' && <DossierItem dataProvider={this._dataProvider} setCurrentDossier={this.setCurrentDossier}></DossierItem>}
      </div>
    );
  }
  private setCurrentDossier(currentDossierType: string, currentItemTitle: string): void {
    if(currentDossierType==''){
      currentDossierType=this._currentDossierType;
      currentItemTitle=this._currentItemTitle;
    }
    this._dataProvider.setCurrentDossier(currentDossierType, currentItemTitle).then(item => {
      this._dataProvider.currentDossierItem = item;
    });
  }
}
