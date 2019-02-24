import { IDataProvider, IDossierEntry } from '../dataproviders/IData';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IViewListItemProps {
  item: IDossierEntry;
  onSelectItem(dossierItem: IDossierEntry): void;
}

export interface IViewListProps {
  items: IDossierEntry[];
  dossierTypes: string[];
  handleSelectItem?(dossierItem: IDossierEntry): void;
  handleSelectList?(dossierType: string): void;
}

export interface IViewItem {
  selectedDossierCode: string;
  handleSelectItem?(dossierItem: IDossierEntry): void;
  handleSelectList?(dossierType: string): void;
}

export interface IDossierMenuProps {
  dossierTypes: string[];
  onSelectList?(dossierType: string): void;
}

export interface IDossierFilesProps {
  title: string;
  dossierTypes: string[];
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
  handleSelectList?(dossierType: string): void;
  handleSelectItem?(dossierItem: IDossierEntry): void;
}
