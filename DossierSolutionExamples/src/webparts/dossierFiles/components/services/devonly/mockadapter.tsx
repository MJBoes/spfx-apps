// Get mock data
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Country%27%20and%20substringof(%27F%27,Title)
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType eq 'Geo'
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType eq 'Organisation'&$top=50

import { HttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference } from '../../IDossierFilesProps';

export class MockDataProvider implements IDataProvider {
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
