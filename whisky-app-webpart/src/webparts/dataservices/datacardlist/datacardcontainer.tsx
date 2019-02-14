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
  // dataService: DossierService;
  items: {}[];
  currentDosierType: string;
  currentPage: string;
  setDosierType(s: string): void;
  setPage(s: string):void;  
}

export interface IDataCardContainerState{
  // dataService: DossierService;
  items: {}[];
  currentPage: string;
  currentDosierType: string;
}

export class DataCardContainer extends React.Component<IDataCardContainerProps, IDataCardContainerState> {
  private ds: DossierService;

  constructor(props) {
    super(props);
    this.state=({
      items: [],
      currentDosierType: "Distilleries",
      currentPage: "list"
    });
  }

  public componentDidMount(): void {
    this.ds=new DossierService;
    this.ds.loadData(this.props.spHttpClient);
    this.setState({ items: this.ds.distilleries });
  }

  private setPage=(s=>{ this.setState({currentPage:s}); });
  private setDossierType=(s=>{
    switch (s) {
      case "Distilleries": {
        this.setState({ items: this.ds.distilleries,currentDosierType:s });
        break;
      }
      case "Bottlings": {
        this.setState({ items: this.ds.bottlings,currentDosierType:s });
        break;
      }
      default: { }
    }
  });

  public render(): React.ReactElement<IDataCardContainerProps> {
    return (
      <div>
        <DossierMenuPivot {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} />
        {this.state.currentPage==="list" && <ItemList {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} /> }
        {this.state.currentPage==="item" && <ItemView {...this.state} setDosierType={this.setDossierType} setPage={this.setPage}/> }
      </div>
    );
  }
}
