import * as React from 'react';
import { IDossierFilesProps } from './IDossierFilesProps';
import { IDossierFilesState } from './IDossierFilesState';
import { IDossierListItem } from '../dataproviders/IData';
import ViewList from './viewList/ViewList';
import ViewItem from './viewItem/ViewItem';

export default class DossierFiles extends React.Component<IDossierFilesProps, IDossierFilesState> {
  constructor(props:IDossierFilesProps){
    super(props);
    this.state={
       selectedViewMode: "list",
       selectedDossierType: this.props.dossierTypes[0],
    };
    this.handleFilterItems=this.handleFilterItems.bind(this);
    this.handleSelectItem=this.handleSelectItem.bind(this);
    this.handleSelectList=this.handleSelectList.bind(this);
  }

  public componentDidMount(){
    this.handleSelectList(this.props.dossierTypes[0]);
  }

  public render(): React.ReactElement<IDossierFilesProps> {
    return (
      <div>
        Main component selectedDossiertype: {this.state.selectedDossierType}, item {this.state.selectedDossier!==undefined && this.state.selectedDossier.id}
        {this.state.selectedViewMode==="list" && <ViewList displayedDossiers={this.state.displayedDossiers} selectedDossierType={this.state.selectedDossierType} dossierTypes={this.props.dossierTypes} handleFilterItems={this.handleFilterItems} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
        {this.state.selectedViewMode==="item" && <ViewItem selectedDossier={this.state.selectedDossier} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
      </div>
    );
  }

  private handleSelectList(dossierType:string): void {
    // bit messy, but sync dossierbrand vs Brand is refactor work
    dossierType=dossierType.charAt(0).toUpperCase()+dossierType.substr(1);
    //console.log(dossierType);
    this.props.dataProvider.readDossierItemsFromList(dossierType).then((dossiers:IDossierListItem[])=>{
      this.setState({selectedViewMode:"list", selectedDossierType:dossierType, allDossiers:dossiers, displayedDossiers: dossiers});
    });
  }
  private handleSelectItem(dossierItem: IDossierListItem): void  {
    this.props.dataProvider.readDossierItemByIDFromList(dossierItem.id).then(
      item=>{
        this.setState({selectedViewMode:"item", selectedDossier:item});
      }
    );
  }
  private handleFilterItems(text:string){
    this.setState({
      displayedDossiers:text? this.state.allDossiers.filter(i => i.title.toLowerCase().indexOf(text.toLocaleLowerCase()) > -1) : this.state.allDossiers
    });
  }
}
