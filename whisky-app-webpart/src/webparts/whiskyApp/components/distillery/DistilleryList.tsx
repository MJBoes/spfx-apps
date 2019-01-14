import * as React from 'react';
//import * as ReactDom from 'react-dom';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Web, setup } from 'sp-pnp-js';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import DocumentCardExample from './DocumentCardExample';
import { ExportedComponent } from './DocumentCardExample';
import { IDocumentCardExampleProps } from './IDocumentCardExampleProps';
import { mockresponse } from '../../data/WHISKYLIJST';

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
    //this.props.spHttpClient.get(this.props.webabsoluteurl + `/_api/search/query?querytext='refinablestring04:Distillery+ContentType%3dDossier'&trimduplicates=false&rowlimit=100&selectproperties='Title'&clienttype='ContentSearchRegular'`, SPHttpClient.configurations.v1)
    //.then((response: SPHttpClientResponse) => {
    //  console.log(response.json());
    //});
    
    public render(): React.ReactElement<IWhiskyAppProps> {
        // mockresponse().whiskyregistry.files.file.forEach(element => {

        // });
        const element: React.ReactElement<IDocumentCardExampleProps > = React.createElement(
            DocumentCardExample,
            {
                title:'test',
                description: 'test',
                imageurl:'https://desktopservices.sharepoint.com/sites/showcase/dossier/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com/sites/showcase/dossier/DossierFiles/Distillery%20Photos/lagavulin-distillery.jpg',
                iconurl:'' //https://desktopservices.sharepoint.com/sites/showcase/dossier/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com/sites/showcase/dossier/DossierFiles/Brand%20Logos/ardbeg.jpg'
            }
          );
        return (
            <div>Plan componenten:
                <ul>
                    <li>JSON file met REST calls</li>
                    <li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li>
                </ul>
                {element}
                {element}
                <LocalComponent/><ExportedComponent/>
            </div>
        );
    }
}

export function DistilleryListAsFunction() {
    //let web:Web;
    //web = new Web(`http://localhost:8081/sites/ux/`);
    //console.log(web);
    return (<div>Plan:<ul><li>JSON file met REST calls</li><li>Geselecteerde call als bron gebruiken voor het renderen van Office UI componenten</li></ul></div>);
}