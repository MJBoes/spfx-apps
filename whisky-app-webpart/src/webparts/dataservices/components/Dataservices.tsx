import * as React from 'react';
import styles from './Dataservices.module.scss';

import { IDataservicesProps } from './IDataservicesProps';
import { IDataservicesState } from './IDataservicesState';
// import {IDataCardsProps} from './datacard';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierService,IDossierService } from '../whiskyservice/dossierservice';

import {ExportedComponent} from './datacards';

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
            {/* {
              this.state.dossierService.distilleries.map((item,i)=>{
                return this.state.currentPage==0 && <ExportedComponent title={item.shortname} group="Distillery" description={item.description} imageurl={item.imageurl} />;
                // return <div key={i}>{item.shortname}</div>;
              })
            } */}
            {
              this.state.dossierService.bottlings.map((item,i)=>{
                let facts=[
                  {title:"Distillery",value:item.distillerycodes},
                  {title:"Bottler",value:item.bottlercodes},
                  {title:"Category",value:item.category},
                  {title:"Closed",value:item.collectionclosed},
                  {title:"Open",value:item.collectionopen},
                  {title:"Region",value:item.region},
                  {title:"Size",value:item.size},
                  {title:"Stated Age",value:item.statedage},
                  {title:"Strength",value:item.strength},
                  {title:"Barcode",value:item.barcode},
                  {title:"Casktype",value:item.casktype}
                ];
                return this.state.currentPage==0 && <ExportedComponent title={item.shortname} group="Bottling" description="" imageurl={item.imageurl} facts={facts} />;
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
