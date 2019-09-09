import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IDossierListItem, IDossierItemDetails } from '../IDossierFilesProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockDataProvider } from './devonly/mockadapter';
import { SPDataProvider } from './spadapter';

export class DataProvider implements IDataProvider {
  private _adapter: IDataProvider;

  constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierTypes: string) {
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._adapter = new MockDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl, dossierGenericList, dossierTypes);
    } else {
      this._adapter = new SPDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl, dossierGenericList, dossierTypes);
    }
  }

  public dataProviderIsValid(): boolean {
    this._adapter.dossierGenericList = this.dossierGenericList;
    return this._adapter.dataProviderIsValid();
  }

  public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
    return this._adapter.readDossierItem(dossierType, dossierTitle);
  }

  public readDossierList(filterValue: string): Promise<IDossierListItem[]> {
    return this._adapter.readDossierList(filterValue);
  }
}