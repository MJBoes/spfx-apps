import * as React from 'react';
import styles from './Dataservices.module.scss';
import { IDataservicesProps } from './IDataservicesProps';
import { escape } from '@microsoft/sp-lodash-subset';
//import { AadHttpClient, MSGraphClient } from "@microsoft/sp-http";
import { DossierService,IDossierService } from '../whiskyservice/dossierservice';
import { Dossier } from '../whiskyservice/dossierclasses';

export default class Dataservices extends React.Component<IDataservicesProps, {}> {
  public render(): React.ReactElement<IDataservicesProps> {
    // this.props.msGraphClientFactory
    // .getClient()
    //   .then((client: MSGraphClient): void => {
    //     // From https://github.com/microsoftgraph/msgraph-sdk-javascript sample
    //     client
    //       .api("users")
    //       .version("v1.0")
    //       .select("displayName,mail,userPrincipalName")
    //       //.filter(`(givenName eq '${escape(this.state.searchFor)}') or (surname eq '${escape(this.state.searchFor)}') or (displayName eq '${escape(this.state.searchFor)}')`)
    //       .get((err, res) => {  

    //         if (err) {
    //           console.error(err);
    //           return;
    //         }
    //         console.log("Using _searchWithGraph() method");
    //         console.log(res);
    //       });
    //     });
    //   this.props.aadHttpClientFactory
    //     .getClient('https://graph.microsoft.com')
    //     .then((client: AadHttpClient) => {
    //       // Search for the users with givenName, surname, or displayName equal to the searchFor value
    //       return client
    //         .get(
    //           `https://graph.microsoft.com/v1.0/users?$select=displayName,mail,userPrincipalName`,
    //           AadHttpClient.configurations.v1
    //         );
    //     })
    //     .then(response => {
    //       console.log("Using _searchWithAad() method");
    //       console.log(response.json());
    //     })
    let ds:IDossierService=new DossierService;
    ds.loadData();
    console.log(ds.bottlings);
    
    return (
      <div className={ styles.dataservices }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              &nbsp;
              <a href="https://desktopservices.sharepoint.com/sites/showcase/spfx/_layouts/15/workbench.aspx" className={ styles.button }>
                <span className={ styles.label }>Hosted workbench</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
