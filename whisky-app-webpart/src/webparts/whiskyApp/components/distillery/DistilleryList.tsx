import * as React from 'react';
//import * as ReactDom from 'react-dom';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Web, setup } from 'sp-pnp-js';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import DocumentCardExample from './DocumentCardExample';
import { ExportedComponent } from './DocumentCardExample';
import { IDocumentCardExampleProps } from './IDocumentCardExampleProps';
import { CommandBarBasicExample } from './FabricCommandBar';
import { SearchBoxFullSizeExample } from './FabricSearchBox';

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

const LocalComponent = (props) => {
    return (
        <div>Local Component</div>
    );
};

export class DistilleryList extends React.Component {

    public render(): React.ReactElement<IWhiskyAppProps> {
        const element: React.ReactElement<IDocumentCardExampleProps > = React.createElement(
            DocumentCardExample,
            {
              description: ''
            }
          );
        //return (<div>{element}</div>);
        
        return (<div><CommandBarBasicExample/><SearchBoxFullSizeExample />Plan componenten:<ul><li>JSON file met REST calls</li><li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li></ul>{element}<p><LocalComponent/><ExportedComponent/></p></div>);
    }
}

export function DistilleryListAsFunction() {
    //let web:Web;
    //web = new Web(`http://localhost:8081/sites/ux/`);
    //console.log(web);
    return (<div>Plan:<ul><li>JSON file met REST calls</li><li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li></ul></div>);
}