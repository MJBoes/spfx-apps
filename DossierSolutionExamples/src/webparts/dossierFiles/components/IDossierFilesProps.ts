import { Context } from 'react';
import { HttpClient } from '@microsoft/sp-http';

export type viewTypes = 'Configure' | 'List' | 'Item';

export interface IDossierFilesProps {
  ctxHttpClient: HttpClient;
  dossierGenericList: string;
  dossierDocumentLibrary: string;
}

export interface IDossierFilesState {
  currentItemID: number;
  currentDossierListType: string;
  currentView: viewTypes;
}

export interface IDataProvider {
  ctxHttpClient: HttpClient;
  validateSettings(): boolean;
  readDocumentList(): Promise<IFile[]>;
  readDossierList(dossierType: string): Promise<IDossierListItem[]>;
  readDossierItem(dossierID: string): Promise<IDossierItemDetails>;
}

// IDossierListItem contains the light weigth storage for selection and as attribute in the lists in IDossierItemDetails.
export interface IDossierListItem {
  id: string;
  title: string;
  type: string;
  description: string;
  iconurl: string;
}
//IDossierItemDetails contains the heavy load: all details and references.
export interface IDossierItemDetails {
  id: string;
  title: string;
  type: string;
  description: string;
  iconurl: string;
  properties:IDossierProperty[];
  referencedBy: IDossierReference[];
  referencesTo: IDossierReference[];
  files:IFile[];
}
// a file can have properties and references to dossier entries.
export interface IFile {
  id: string;
  title: string;
  encodedAbsoluteUrl: string;
  properties:IDossierProperty[];
  referencedBy: IDossierReference[];
  referencesTo: IDossierReference[];
}

export interface IDossierReference {
  dossiertype:string;
  dossieritems:IDossierListItem[];
}

export interface IDossierProperty {
  title: string;
  value: string;
}