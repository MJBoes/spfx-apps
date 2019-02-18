import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierEntry } from './IData';

export class MockDataProvider implements IDataProvider {
    private _webPartContext: IWebPartContext;
    private _dossierlistUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext, dossierlistUrl: string) {
        this._webPartContext = value;
        this._dossierlistUrl = "mock";
        this._webAbsoluteUrl = value.pageContext.web.absoluteUrl;
    }

    public validateSettings(): boolean {
        if (!this._dossierlistUrl) {
            return false;
        }
        return true;
    }

    public readDocumentsFromSearch(): Promise<IFile[]> {
        return this._webPartContext.spHttpClient.get('', SPHttpClient.configurations.v1).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        });
    }

    public readDossierFromList(): Promise<IDossierEntry[]> {
        let results = {
            "@odata.context": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/$metadata#SP.ListData.DossierListItems",
            "value": [
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "7688891a-47fc-4333-aa7b-ad57834b4889",
                    "@odata.etag": "\"5\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(3)",
                    "Id": 3,
                    "Title": "Ardbeg Ten",
                    "dossierdescription": null,
                    "ID": 3,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(3)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(3)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(3)/ContentType",
                        "Name": "dossierbottling"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "ade33236-a3eb-49f9-b68c-e8c576b3af18",
                    "@odata.etag": "\"5\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(4)",
                    "Id": 4,
                    "Title": "Ardbeg 10 and 17 Year Old Presentation Tin",
                    "dossierdescription": null,
                    "ID": 4,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(4)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(4)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(4)/ContentType",
                        "Name": "dossierbottling"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "dded4888-c56c-4342-a9e9-82fbccc00d61",
                    "@odata.etag": "\"5\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(5)",
                    "Id": 5,
                    "Title": "Ardbeg 17-year-old",
                    "dossierdescription": null,
                    "ID": 5,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(5)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(5)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(5)/ContentType",
                        "Name": "dossierbottling"
                    }
                }]
        };
        let response: IDossierEntry[] = [];
        for (let i = 0; i < results.value.length; i++) {
            response.push({
                code: results.value[i].Title,
                shortname: results.value[i].Title,
                description: results.value[i].dossierdescription
            });
        }
        return new Promise<IDossierEntry[]>((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 2000);
        });
    }
}