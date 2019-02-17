import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IFile, IDossierEntry } from './IData';

export interface IDataProvider {
    validateSettings(): boolean;
    readDocumentsFromSearch(): Promise<IFile[]>;
    readDossierFromLibrary(): Promise<IDossierEntry[]>;
}

export class SharePointDataProvider implements IDataProvider {
    private _webPartContext: IWebPartContext;
    private _dossierlistUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext, dossierlistUrl: string) {
        this._webPartContext = value;
        this._dossierlistUrl=dossierlistUrl.lastIndexOf("/") == dossierlistUrl.length - 1 ? dossierlistUrl.substr(0, dossierlistUrl.length - 1) : dossierlistUrl;
        this._webAbsoluteUrl=value.pageContext.web.absoluteUrl;
    }

    public validateSettings(): boolean {
        if (!this._libraryAbsoluteUrl) {
            return false;
        }
        return true;
    }

    public readDocumentsFromSearch(): Promise<IFile[]> {
        return this._webPartContext.spHttpClient.get();
    }

    public readDossierFromLibrary(): Promise<IDossierEntry[]> {
        return this._webPartContext.spHttpClient.get();
    }
}