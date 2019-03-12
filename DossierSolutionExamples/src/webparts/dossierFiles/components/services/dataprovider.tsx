import { HttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference } from '../IDossierFilesProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockDataProvider } from './devonly/mockadapter';
import { SPDataProvider } from './spadapter';

export class DataProvider implements IDataProvider {
    private _adapter:IDataProvider;

    constructor(public ctxHttpClient:HttpClient, public pageContextWebAbsoluteUrl: string) {
        if (DEBUG && Environment.type === EnvironmentType.Local) {
            //this._dataProvider = new MockDataProvider(this.context, this.properties.dossierlistUrl);
            this._adapter = new MockDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl);
          } else {
            this._adapter = new SPDataProvider(this.ctxHttpClient, this.pageContextWebAbsoluteUrl);
          }
    }
    
    public readDocumentList(): Promise<IFile[]> {
        return;
    }

    public readDossierItem(dossierID: string): Promise<IDossierItemDetails> {
        return;
    }

    public readDossierList(dossierType: string): Promise<IDossierListItem[]>{
        return;
    }
}