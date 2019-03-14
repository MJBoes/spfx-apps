import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference, IDataAdapter } from '../IDossierFilesProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockDataProvider } from './devonly/mockadapter';
import { SPDataProvider } from './spadapter';

export class DataProvider implements IDataProvider {
  private _adapter: IDataAdapter;
  public currentDossierItem: IDossierItemDetails;

  constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      //this._dataProvider = new MockDataProvider(this.context, this.properties.dossierlistUrl);
      this._adapter = new MockDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl, dossierGenericList, dossierDocumentLibrary, dossierTypes);
    } else {
      this._adapter = new SPDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl, dossierGenericList, dossierDocumentLibrary, dossierTypes);
    }
  }

  public dataProviderIsValid(): boolean {
    this._adapter.dossierDocumentLibrary = this.dossierDocumentLibrary;
    this._adapter.dossierGenericList = this.dossierGenericList;
    this._adapter.dossierTypes = this.dossierTypes;
    return this._adapter.dataProviderIsValid();
  }

  public setCurrentDossier(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
    return this._adapter.readDossierItem(dossierType, dossierTitle);
  }

  public filterCurrentDossier(filterType: string, filter: string) { }
}