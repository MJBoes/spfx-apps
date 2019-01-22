import * as React from 'react';
import styles from './Dataservices.module.scss';

import { IDataservicesProps } from './IDataservicesProps';
import { IDataservicesState } from './IDataservicesState';
// import {IDataCardsProps} from './datacard';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierService,IDossierService } from '../whiskyservice/dossierservice';

import {ExportedComponent} from './datacard';

export default class Dataservices extends React.Component<IDataservicesProps, IDataservicesState> {
  constructor(props: IDataservicesProps){
    super(props);
    this.state={ currentPage:0, dossierService:new DossierService };
  }

  public componentDidMount(): void {
    this.state.dossierService.loadData();
    this.setState({dossierService:this.state.dossierService});
  }

public render(): React.ReactElement<IDataservicesProps> {
    return (
      <div className={ styles.dataservices }>
        <div className={ styles.container }>
            {
              this.state.dossierService.distilleries.map((item,i)=>{
                return this.state.currentPage==0 && <ExportedComponent title={item.shortname} group="Distillery" description={item.description} imageurl={item.imageurl} />;
                // return <div key={i}>{item.shortname}</div>;
              })
            }
            {
              this.state.dossierService.bottlings.map((item,i)=>{
                return this.state.currentPage==0 && <ExportedComponent title={item.shortname} group="Bottling" description={item.description} imageurl={item.imageurl} />;
                // return <div key={i}>{item.shortname}</div>;
              })
            }
            <a href="https://desktopservices.sharepoint.com/sites/showcase/spfx/_layouts/15/workbench.aspx" className={ styles.button }>
              <span className={ styles.label }>Hosted workbench</span>
            </a>
        </div>
      </div>
    );
  }
}
