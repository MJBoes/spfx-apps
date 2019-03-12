import { HttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference } from '../IDossierFilesProps';

export class DataProvider implements IDataProvider {
    constructor(public ctxHttpClient:HttpClient) {

    }
    public validateSettings(): boolean {
        // if (true) {
        //     return false;
        // }
        return true;
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