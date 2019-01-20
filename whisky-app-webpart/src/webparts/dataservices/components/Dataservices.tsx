import * as React from 'react';
import styles from './Dataservices.module.scss';
import { IDataservicesProps } from './IDataservicesProps';
import { IDataservicesState } from './IDataservicesState';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierService,IDossierService } from '../whiskyservice/dossierservice';

export default class Dataservices extends React.Component<IDataservicesProps, IDataservicesState> {
  constructor(props: IDataservicesProps){
    super(props);
    this.state={ dossierService:new DossierService };
  }

  public componentDidMount(): void {
    this.state.dossierService.loadData();
    this.setState({dossierService:this.state.dossierService});
  }

public render(): React.ReactElement<IDataservicesProps> {
    return (
      <div className={ styles.dataservices }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              {console.log(this.state.dossierService)}
              {
                this.state.dossierService.distilleries.map((item,i)=>{
                   return <div key={i}>{item.shortname}</div>
                })
              }
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
