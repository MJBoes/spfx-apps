import { IDataProvider } from '../dataproviders/IData';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDossierFilesProps {
  title: string;
  dossierTypes: string[];
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
}
