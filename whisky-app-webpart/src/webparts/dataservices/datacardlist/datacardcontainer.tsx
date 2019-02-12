import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenuPivot } from './components/DossierMenuPivot';
import { ItemList } from './datacardlist';
import { ItemView } from './datacarditem';
import { SPHttpClient } from '@microsoft/sp-http';
import './datacardcontainer.module.scss';

export interface IDataCardContainerProps{
    spHttpClient: SPHttpClient;
    currentDosierType: string;
    currentPage: string;
    setDosierType(s: string): void;
    setPage(s: string):void;  
}

export interface IDataCardContainerState{
    currentPage: string;
    currentDosierType: string;
}

export class DataCardContainer extends React.Component<IDataCardContainerProps, IDataCardContainerState> {
  constructor(props) {
    super(props);
    this.state=({
      currentDosierType: "Distilleries",
      currentPage: "list"
    });
  }

  private setPage=(s=>{ this.setState({currentPage:s}); });
  private setDossierType=(s=>{ this.setState({currentDosierType:s}); });

  public render(): React.ReactElement<IDataCardContainerProps> {
    return (
      <div>
        <DossierMenuPivot {...this.state} spHttpClient={this.props.spHttpClient} setDosierType={this.setDossierType} setPage={this.setPage} />
        {this.state.currentPage==="list" && <ItemList {...this.state} spHttpClient={this.props.spHttpClient} setDosierType={this.setDossierType} setPage={this.setPage} /> }
        {this.state.currentPage==="item" && <ItemView {...this.state} spHttpClient={this.props.spHttpClient} setDosierType={this.setDossierType} setPage={this.setPage}/> }
      </div>
    );
  }
}
