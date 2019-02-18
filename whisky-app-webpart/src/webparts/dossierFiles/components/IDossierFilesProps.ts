import { IDataProvider } from '../dataproviders/IData';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDossierFilesProps {
  title: string;
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
}
