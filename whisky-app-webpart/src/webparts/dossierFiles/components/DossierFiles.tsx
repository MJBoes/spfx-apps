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
        {this.state.selectedViewMode==="list" && <ViewList items={this.state.displayedDossiers} dossierTypes={this.props.dossierTypes} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
        {this.state.selectedViewMode==="item" && <ViewItem selectedDossier={this.state.selectedDossier} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
      </div>
    );
  }

  private handleSelectList(dossierType:string): void {
    this.props.dataProvider.readDossierItemsFromList(dossierType).then((dossiers:IDossierListItem[])=>{
      this.setState({selectedViewMode:"list", selectedDossierType:dossierType, displayedDossiers:dossiers});
    });
  }
  private handleSelectItem(dossierItem: IDossierListItem): void  {
    this.props.dataProvider.readDossierItemByIDFromList(dossierItem.id).then(
      item=>{
        this.setState({selectedViewMode:"item", selectedDossier:item});
      }
    );
  }
}
