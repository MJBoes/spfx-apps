import { IDataProvider } from '../dataproviders/SPDataProviders';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IDossierFilesProps {
  title: string;
  webPartDisplayMode: DisplayMode;
  dataProvider: IDataProvider;
}
