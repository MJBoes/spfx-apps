import * as React from 'react';
//import * as ReactDom from 'react-dom';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Web, setup } from 'sp-pnp-js';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import DocumentCardExample from './DocumentCardExample';
import { IDocumentCardExampleProps } from './IDocumentCardExampleProps';

export interface IWhiskyAppProps {
    description: string;
}

// export default class DocumentCardExampleWebPart extends BaseClientSideWebPart<IDocumentCardExampleWebPartProps> {

//     public render(): void {
//       const element: React.ReactElement<IDocumentCardExampleProps > = React.createElement(
//         DocumentCardExample,
//         {
//           description: this.properties.description
//         }
//       );
//     }
// }

export class DistilleryList extends React.Component {

    public render(): React.ReactElement<IWhiskyAppProps> {

        return (<div>Plan componenten:<ul><li>JSON file met REST calls</li><li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li></ul></div>);
    }
}

export function DistilleryListAsFunction() {
    //let web:Web;
    //web = new Web(`http://localhost:8081/sites/ux/`);
    //console.log(web);
    return (<div>Plan:<ul><li>JSON file met REST calls</li><li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li></ul></div>);
}