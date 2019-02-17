import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenuPivot } from './components/DossierMenuPivot';
import { ItemList } from './datacardlist';
import { ItemView } from './datacarditem';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';
import './datacardcontainer.module.scss';

export interface IDataCardContainerProps{
  dossierService: DossierService;
  currentDosierType: string;
  currentPageType: string;
  setDosierType(s: string): void;
  setPageType(s: string):void;  
}

export interface IDataCardProps{
  dossierService: DossierService;
  currentDosierType: string;
  currentPageType: string;
  setDosierType(s: string): void;
  setPageType(s: string):void;  
}

export interface IDataCardContainerState{
  currentPageType: string;
  currentDosierType: string;
  currentItem: string;
}

export class DataCardContainer extends React.Component<IDataCardContainerProps, IDataCardContainerState> {
  private ds: DossierService;

  constructor(props) {
    super(props);
    this.state=({
      currentDosierType: "Distilleries",
      currentPageType: "list",
      currentItem:""
    });
  }

  protected setPageType(s: string):void{
    // this.setState({
    //   currentPageType:s
    // });
  }

  protected setDossierType(s:string):void{
    // switch (s) {
    //   case "Distilleries": {
    //     this.setState({ currentDosierType:s });
    //     break;
    //   }
    //   case "Bottlings": {
    //     this.setState({ currentDosierType:s });
    //     break;
    //   }
    //   default: { }
    // }
  }

  public render(): React.ReactElement<IDataCardContainerProps> {
    console.log("=====>",this.props);
    return (
      <div>
        <DossierMenuPivot {...this.state} dossierService={this.ds} setDosierType={this.setDossierType} setPageType={this.setPageType} />
        {this.state.currentPageType==="list" && <ItemList {...this.state} dossierService={this.ds} setDosierType={this.setDossierType} setPageType={this.setPageType} /> }
        {this.state.currentPageType==="item" && <ItemView {...this.state} dossierService={this.ds} setDosierType={this.setDossierType} setPageType={this.setPageType}/> }
      </div>
    );
  }
}
