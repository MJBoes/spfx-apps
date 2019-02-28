import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDataProvider, IFile, IDossierListItem, IDossierItemDetails } from './IData';

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

    public readDossierItemsFromList(dossierType: string): Promise<IDossierListItem[]> {
        let results = {
            "@odata.context": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/$metadata#SP.ListData.DossierListItems",
            "value": [
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "dc654f62-46bc-4b27-a31f-80deecaf9adb",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)",
                    "Id": 84,
                    "Title": "Ardbeg",
                    "dossierdescription": "<div class=\"ExternalClassF87A0BDB5D644602A24F70A161EA0B19\">The distillery Ardbeg has arisen from an illegal distillery which has been in production since 1794. Ardbeg has been officially founded by John McDougall 1815. The distillery is located at the south side of Islay in the neighbourhood of Port Ellen, Lagavulin and Laphroaig. <br>Ardbeg has been closed from 1981 to 1989 and from 1996 to 1997. Especially the eight years in the 80s have a very negative influence to the Ardbeg products nowadays. Because of the interruption in the production, there are no casks from the eighties available. These vintage bottlings are missing in product palette. <br>As can be notified throughout a lot of distilleries, there is a wide range of bottlings without an age notice. This gives the distilleries a chance to mix older casks with pretty new ones. Ardbeg is one of the distilleries which drives this way of marketing to the top. All bottlings in last years have come out without an age declaration.<br>Ardbeg is furthermore one of the distilleries with a very aggressive marketing. Every year comes a new bottling to the market and there is a lot of commercials and advertising for that. The release of the new bottling is celebrated at the so called ,Ardbeg Day‘.</div>",
                    "ID": 84,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                        "Name": "dossierdistillery"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "4a2cdd9b-b9e7-4ff7-b9be-191b6c35eb97",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)",
                    "Id": 85,
                    "Title": "Arran",
                    "dossierdescription": "<div class=\"ExternalClass4D455D2D29A6482897D347B5E3F460AC\">The distillery Arran, located near the city of Lochranza on the Isle of Arran, is the first new distillery on that island since 150 years. it has been opened in 1991. The first bottles have been sold since 2001. In the past, there have been more than 50 distilleries on Arran, but most of then have been illegal and produced the whisky only for the private consume.<br>There is a wide range of bottlings of Arran whisky on the market. A lot of them got finishes in a wide variety of different cask types.<br>Arran is a small scale distillery and was designed from the outset to be aesthetically pleasing with mock pagodas and whitewashed buildings which blend in well with the island's older architecture.<br>Pronounced -arr-en; meaning Place of peaked hills.<br>Officially opened on August 17th.<br>They received the barley already malted and grinded.<br>First in 2007 a malt mill was installed.<br>No production 2002-04.<br>Has a stainless steel semi-lauter mash tun, with a copper dome.<br>Five washbacks made of Oregon pine.<br>Two indirect fired pot stills.<br>Shell and tube condensers. <br>Between October 2016 and January 2017 2 additional stills have been put in place to a new total of 4 stills.</div>",
                    "ID": 85,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                        "Name": "dossierdistillery"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "12dd9289-3643-4644-b02e-2b461cb9fc98",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)",
                    "Id": 86,
                    "Title": "Bowmore",
                    "dossierdescription": "<div class=\"ExternalClassC61E59F14A0542E0956BBE63D8BC654F\">Bowmore is one of only a handful of Scottish distilleries which still operates it's own floor maltings, with three currently in use. They provide up to 40 per cent of the distillery's malt requirements.<br>Bowmore is proud of it's environmental record, and in 1990 a warehouse was donated to the local community for conversion into a swimming pool. It is heated by hot water from the stillroom's condensers.<br>Pronounced bow-MORE Meaning The big bend/curve<br>Expands 1837-51. Closed 1929 and during WWII. Rebuilt, renovated and the two pair of pot stills gets Steam-heated in 1963. Their floor-malting (three floors) covers about a third of the needs. They switched back to wooden wash backs in 1990 because the felt that the stainless one affected the taste. When were they stainless installed? A stainless steel semi-lauter mash tun. The own malting covers about 30-40% of the needs. The rest from Simpsons are mixed together.</div>",
                    "ID": 86,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                        "Name": "dossierdistillery"
                    }
                }
            ]
        };
        let response: IDossierListItem[] = [];
        for (let i = 0; i < results.value.length; i++) {
            response.push({
                id: results.value[i].Id.toString(),
                title: results.value[i].Title,
                type: results.value[1].ContentType.Name,
                description: results.value[i].dossierdescription,
                iconurl:''
            });
        }
        return new Promise<IDossierListItem[]>((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 200);
        });
    }
    public readDossierItemByIDFromList(dossierID: string): Promise<IDossierItemDetails> {
        let results = {
            "@odata.context": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/$metadata#SP.ListData.DossierListItems",
            "value": [
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "dc654f62-46bc-4b27-a31f-80deecaf9adb",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)",
                    "Id": 84,
                    "Title": "Ardbeg",
                    "dossierdescription": "<div class=\"ExternalClassF87A0BDB5D644602A24F70A161EA0B19\">The distillery Ardbeg has arisen from an illegal distillery which has been in production since 1794. Ardbeg has been officially founded by John McDougall 1815. The distillery is located at the south side of Islay in the neighbourhood of Port Ellen, Lagavulin and Laphroaig. <br>Ardbeg has been closed from 1981 to 1989 and from 1996 to 1997. Especially the eight years in the 80s have a very negative influence to the Ardbeg products nowadays. Because of the interruption in the production, there are no casks from the eighties available. These vintage bottlings are missing in product palette. <br>As can be notified throughout a lot of distilleries, there is a wide range of bottlings without an age notice. This gives the distilleries a chance to mix older casks with pretty new ones. Ardbeg is one of the distilleries which drives this way of marketing to the top. All bottlings in last years have come out without an age declaration.<br>Ardbeg is furthermore one of the distilleries with a very aggressive marketing. Every year comes a new bottling to the market and there is a lot of commercials and advertising for that. The release of the new bottling is celebrated at the so called ,Ardbeg Day‘.</div>",
                    "ID": 84,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(84)/ContentType",
                        "Name": "dossierdistillery"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "4a2cdd9b-b9e7-4ff7-b9be-191b6c35eb97",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)",
                    "Id": 85,
                    "Title": "Arran",
                    "dossierdescription": "<div class=\"ExternalClass4D455D2D29A6482897D347B5E3F460AC\">The distillery Arran, located near the city of Lochranza on the Isle of Arran, is the first new distillery on that island since 150 years. it has been opened in 1991. The first bottles have been sold since 2001. In the past, there have been more than 50 distilleries on Arran, but most of then have been illegal and produced the whisky only for the private consume.<br>There is a wide range of bottlings of Arran whisky on the market. A lot of them got finishes in a wide variety of different cask types.<br>Arran is a small scale distillery and was designed from the outset to be aesthetically pleasing with mock pagodas and whitewashed buildings which blend in well with the island's older architecture.<br>Pronounced -arr-en; meaning Place of peaked hills.<br>Officially opened on August 17th.<br>They received the barley already malted and grinded.<br>First in 2007 a malt mill was installed.<br>No production 2002-04.<br>Has a stainless steel semi-lauter mash tun, with a copper dome.<br>Five washbacks made of Oregon pine.<br>Two indirect fired pot stills.<br>Shell and tube condensers. <br>Between October 2016 and January 2017 2 additional stills have been put in place to a new total of 4 stills.</div>",
                    "ID": 85,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(85)/ContentType",
                        "Name": "dossierdistillery"
                    }
                },
                {
                    "@odata.type": "#SP.Data.DossierListItem",
                    "@odata.id": "12dd9289-3643-4644-b02e-2b461cb9fc98",
                    "@odata.etag": "\"4\"",
                    "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)",
                    "Id": 86,
                    "Title": "Bowmore",
                    "dossierdescription": "<div class=\"ExternalClassC61E59F14A0542E0956BBE63D8BC654F\">Bowmore is one of only a handful of Scottish distilleries which still operates it's own floor maltings, with three currently in use. They provide up to 40 per cent of the distillery's malt requirements.<br>Bowmore is proud of it's environmental record, and in 1990 a warehouse was donated to the local community for conversion into a swimming pool. It is heated by hot water from the stillroom's condensers.<br>Pronounced bow-MORE Meaning The big bend/curve<br>Expands 1837-51. Closed 1929 and during WWII. Rebuilt, renovated and the two pair of pot stills gets Steam-heated in 1963. Their floor-malting (three floors) covers about a third of the needs. They switched back to wooden wash backs in 1990 because the felt that the stainless one affected the taste. When were they stainless installed? A stainless steel semi-lauter mash tun. The own malting covers about 30-40% of the needs. The rest from Simpsons are mixed together.</div>",
                    "ID": 86,
                    "ContentType@odata.navigationLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                    "ContentType": {
                        "@odata.type": "#SP.ContentType",
                        "@odata.id": "https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                        "@odata.editLink": "Web/Lists(guid'4216c9f4-6c08-43ff-b1ff-b3a2ab37ccbc')/Items(86)/ContentType",
                        "Name": "dossierdistillery"
                    }
                }
            ]
        };
        let response: IDossierItemDetails;
        response = ({
            id: results.value[1].Id.toString(),
            title: results.value[1].Title,
            type: results.value[1].ContentType.Name,
            description: results.value[1].dossierdescription,
            iconurl:'',
            properties:[],
            referencedBy:[],
            referencesTo:[],
            files:[]
        });
        return new Promise<IDossierItemDetails>((resolve) => {
            setTimeout(() => {
                resolve(response);
            }, 200);
        });
    }
}