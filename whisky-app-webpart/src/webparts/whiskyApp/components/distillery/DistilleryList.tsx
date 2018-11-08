import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Web, setup } from 'sp-pnp-js'; 
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IWhiskyAppProps {
    description: string;
}

//export default class DistilleryList extends React.Component<IWhiskyAppProps, {}> {
//    public render(): React.ReactElement<IWhiskyAppProps> {
//      return (<div>Distillery list</div>);
//    }
//}

export function DistilleryList(){
    //let web:Web;
    //web = new Web(`http://localhost:8081/sites/ux/`);
    //console.log(web);
    return(<div>Distillery List</div>);
}