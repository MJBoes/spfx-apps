import { MSGraphClientFactory, AadHttpClientFactory } from '@microsoft/sp-http';

export interface IDataservicesProps {
  description: string;
  msGraphClientFactory: MSGraphClientFactory;
  aadHttpClientFactory: AadHttpClientFactory;
}
