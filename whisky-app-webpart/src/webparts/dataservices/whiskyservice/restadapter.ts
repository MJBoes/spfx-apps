import { IFile, File, IDistillery, Distillery, IBottling, Bottling } from './dossierclasses';
import { SPHttpClientConfiguration, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export class Dossiers {
  public getDossiers(spHttpClient: SPHttpClient, type: string) {
    let rest="https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/web/lists/getbytitle('dossier')/items?$select=id,Title,dossierdescription&$filter=ContentType%20eq%20%27" + type + "%27";
    spHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      console.log(response.json());
    });
  }

  public getFiles(spHttpClient:SPHttpClient){
    let rest="https://desktopservices.sharepoint.com/sites/showcase/factbook/_api/web/lists/getbytitle('dossierfiles')/items?$select=id,Title,FileRef,dossierbottlingcodes,dossierbottlercodes,dossierbrandcodes,dossierdistillerycodes";
    spHttpClient.get(rest, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
      console.log(response.json());
    });
  }
}
