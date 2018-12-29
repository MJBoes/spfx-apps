import * as React from 'react';
import styles from './WhiskyApp.module.scss';
import { IWhiskyAppProps } from './IWhiskyAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import {DistilleryList} from '../distillery/DistilleryList';
import { Game } from '../game/stars';

export default class WhiskyApp extends React.Component<IWhiskyAppProps, {}> {
  state={route:1};
  public render(): React.ReactElement<IWhiskyAppProps> {
    //this.props.spHttpClient.get(this.props.webabsoluteurl + `/_api/search/query?querytext='refinablestring04:Distillery+ContentType%3dDossier'&trimduplicates=false&rowlimit=100&selectproperties='Title'&clienttype='ContentSearchRegular'`, SPHttpClient.configurations.v1)
    //.then((response: SPHttpClientResponse) => {
    //  console.log(response.json());
    //});
    return (
      <div className={styles.whiskyApp}>
        {this.state.route==0 && <Game/>}
        {this.state.route==1 && <DistilleryList/>}
        <a href="https://desktopservices.sharepoint.com/sites/communication-showcase-spfx/_layouts/15/workbench.aspx" className={styles.button}>
          <span className={styles.label}>Hosted workbench</span>
        </a>
      </div>
    );
  }
}

//<div className={styles.container}>
//<div className={styles.row}>
//  <div className={styles.column}>
//    <span className={styles.title}>Welcome to SharePoint!</span>
//    <p className={styles.subTitle}>Customize SharePoint Whisky App experiences using Web Parts.</p>
//    <p className={styles.description}>{escape(this.props.description)}</p>
//    <DistilleryList/>
//    <a href="https://desktopservices.sharepoint.com/sites/communication-showcase-spfx/_layouts/15/workbench.aspx" className={styles.button}>
//      <span className={styles.label}>Hosted workbench</span>
//    </a>
//  </div>
//</div>
//</div>
