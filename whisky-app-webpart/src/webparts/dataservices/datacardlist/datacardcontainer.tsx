import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenuPivot } from './components/DossierMenuPivot';
import { ItemList } from './datacardlist';
import { ItemView } from './datacarditem';
import { SPHttpClient } from '@microsoft/sp-http';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';
import './datacardcontainer.module.scss';

export interface IDataCardContainerProps{
  spHttpClient: SPHttpClient;
  currentDosierType: string;
  currentPage: string;
  setDosierType(s: string): void;
  setPage(s: string):void;  
}

export interface IDataCardProps{
  dataService: DossierService;
  currentDosierType: string;
  currentPage: string;
  setDosierType(s: string): void;
  setPage(s: string):void;  
}

export interface IDataCardContainerState{
  dataService: DossierService;
  currentPage: string;
  currentDosierType: string;
}

export class DataCardContainer extends React.Component<IDataCardContainerProps, IDataCardContainerState> {
  constructor(props) {
    super(props);
    this.state=({
      dataService: new DossierService,
      currentDosierType: "Distilleries",
      currentPage: "list"
    });
  }

  public componentDidMount(): void {
    this.state.dataService.loadData(this.props.spHttpClient);
    this.setState({ dataService: this.state.dataService });
  }

  private setPage=(s=>{ this.setState({currentPage:s}); });
  private setDossierType=(s=>{ this.setState({currentDosierType:s}); });

  public render(): React.ReactElement<IDataCardContainerProps> {
    return (
      <div>
        <DossierMenuPivot {...this.state} spHttpClient={this.props.spHttpClient} setDosierType={this.setDossierType} setPage={this.setPage} />
        {this.state.currentPage==="list" && <ItemList {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} /> }
        {this.state.currentPage==="item" && <ItemView {...this.state} setDosierType={this.setDossierType} setPage={this.setPage}/> }
      </div>
    );
  }
}
