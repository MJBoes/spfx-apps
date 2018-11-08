import { SPHttpClient } from "@microsoft/sp-http";

export interface IWhiskyAppProps {
  description: string;
  webabsoluteurl:string;
  spHttpClient: SPHttpClient;
}
