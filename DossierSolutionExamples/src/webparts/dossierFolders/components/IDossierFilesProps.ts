import { Context } from 'react';
import { SPHttpClient } from '@microsoft/sp-http';

export type viewTypes = 'Initialize' | 'Configure' | 'Search' | 'Item';

export interface IDossierFilesProps {
  dataProvider: IDataProvider;
  dossierGenericList: string;
  dossierDocumentLibrary: string;
  onConfigure():void;
}

export interface IMain{
  ctxHttpClient:SPHttpClient;
  pageContextWebAbsoluteUrl: string;
  parentProperties: IDossierFilesProps;
}

export interface IDataProvider {
  ctxHttpClient: SPHttpClient;
  pageContextWebAbsoluteUrl: string;
  dossierGenericList: string;
  dossierDocumentLibrary: string;
  dataProviderIsValid():boolean;
  readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails>;
  readDossierList(filterValue: string):Promise<IDossierListItem[]>;
}

// export interface IDataAdapter {
//   ctxHttpClient: SPHttpClient;
//   pageContextWebAbsoluteUrl: string;
//   dossierGenericList: string;
//   dossierDocumentLibrary: string;
//   dossierTypes: string;
//   dataProviderIsValid():boolean;
//   readDossierItem(dossierType: string, dossierTitle: string): Promise<IDossierItemDetails>;
// }

export interface IDossierMenuProps {
  dossierTypes: string;
  currentDossierType: string;
  onSelectList?(dossierType: string): void;
}

export interface IViewListProps {
  dossierTypes: string;
  currentDossierType: string;
  dataProvider: IDataProvider;
}

export interface IViewItemProps {
  dataProvider: IDataProvider;
  currentDossierItem: IDossierItemDetails;
  setCurrentDossier(dossierType: string, dossierTitle: string): void;
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
  referencefields: {key:string; value:string;}[];
  properties: IDossierProperty[];
  referencedBy: IDossierListItem[];
  referencesTo: IDossierReference[];
  folders: IFolder[];
  files: IFile[];
}
// a folder can have properties and references to dossier entries.
export interface IFolder {
  id: string;
  title: string;
  reviewdate: string;
  serverRelativeUrl: string;
  // files: IFile[];
}
export interface IFile {
  id: string;
  title: string;
  modified: string;
  reviewdate: string;
  serverRelativeUrl: string;
  previewUrl: string;
  properties: IDossierProperty[];
  group: string;
}

export interface IDossierReference {
  dossiertype: string;
  dossieritems: IDossierListItem[];
}

export interface IDossierProperty {
  title: string;
  value: string;
}