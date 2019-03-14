// Get mock data
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27Country%27%20and%20substringof(%27F%27,Title)
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType eq 'Geo'
// https://desktopservices.sharepoint.com/sites/DossierSolutionExamples/_api/web/lists/getbytitle('Factbook_GL')/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType eq 'Organisation'&$top=50

import { SPHttpClient } from '@microsoft/sp-http';
import { IFile, IDossierListItem, IDossierItemDetails, IDossierProperty, IDossierReference, IDataAdapter } from '../../IDossierFilesProps';

export class MockDataProvider implements IDataAdapter {
    private _currentItem: IDossierItemDetails;
    private _baseGetItemUrl: string;

    constructor(public ctxHttpClient: SPHttpClient, public pageContextWebAbsoluteUrl: string, public dossierGenericList: string, public dossierDocumentLibrary: string, public dossierTypes: string) {

    }

    public dataProviderIsValid(): boolean {
        return true;
    }

    public readDocumentList(): Promise<IFile[]> {
        return;
    }

    public readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails> {
        this._baseGetItemUrl=this.pageContextWebAbsoluteUrl + '/_api/web/lists(%27' + this.dossierGenericList + '%27)';
        // let rest = this._baseGetItemUrl+'/items?$select=id,Title,entDescription,entIconSiteAssetsRelativeUrlPara&$filter=entType%20eq%20%27'+dossierType+'%27%20and%20Title%20eq%20%27'+dossierTitle+'%27';
        let rest='https://localhost:4321/src/webparts/dossierFiles/components/services/devonly/mockitemdata.json';
        return this.ctxHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        });
    }

    public readDossierList(dossierType: string): Promise<IDossierListItem[]> {
        return;
    }
}
