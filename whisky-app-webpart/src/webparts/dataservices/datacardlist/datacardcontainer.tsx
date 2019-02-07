import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenu } from './components/DossierMenu';
import { ItemList } from './datacardlist';
import { ItemView } from './datacarditem';
import './datacardcontainer.module.scss';

export interface IDataCardContainerProps{
    currentDosierType: string;
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
        <DossierMenu {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} />
        {this.state.currentPage==="list" && <ItemList {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} /> }
        {this.state.currentPage==="view" && <ItemView {...this.state} setDosierType={this.setDossierType} setPage={this.setPage}/> }
      </div>
    );
  }
}
