import { IDataProvider, IDossierListItem, IDossierItemDetails } from '../dataproviders/IData';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IViewListItemProps {
  item: IDossierListItem;
  onSelectItem(dossierItem: IDossierListItem): void;
}

export interface IViewListProps {
  displayedDossiers: IDossierListItem[];
  dossierTypes: string[];
  selectedDossierType: string;
  handleSelectItem?(dossierItem: IDossierListItem): void;
  handleFilterItems?(dossierType: string): void;
  handleSelectList?(dossierType: string): void;
}

export interface IViewItem {
  selectedDossier: IDossierItemDetails;
  handleSelectItem(dossierItem: IDossierListItem): void;
  handleSelectList(dossierType: string): void;
  handleSelectReference(dossierTypeOrID: string): void;
}

export interface IDossierMenuProps {
  dossierTypes: string[];
  selectedDossierType: string;
  onSelectList?(dossierType: string): void;
}

export interface IDossierFilesProps {
  title: string;
  dossierTypes: string[];
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
  handleSelectList?(dossierType: string): void;
  handleSelectItem?(dossierItem: IDossierListItem): void;
}
