import { HttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference } from '../IDossierFilesProps';

export class SPDataProvider implements IDataProvider {
    private _currentList: IDossierListItem[];
    private _currentItem: IDossierItemDetails;

    constructor(public ctxHttpClient:HttpClient, public pageContextWebAbsoluteUrl: string) {

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