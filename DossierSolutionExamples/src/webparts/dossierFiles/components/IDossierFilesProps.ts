import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDossierFilesProps {
  context: WebPartContext;
}
export interface IDossierFilesState {
  items: any[];
}

export interface IPropertyControlsDossierFilesProps {
  lists: string | string[]; // Stores the list ID(s)
}