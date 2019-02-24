import { IDataProvider, IDossierEntry } from '../dataproviders/IData';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDossierFilesProps {
  title: string;
  dossierTypes: string[];
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
  handleSelectList?(dossierType:string):void;
  handleSelectItem?(dossierItem: IDossierEntry):void;
}
