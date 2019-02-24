import * as React from 'react';
import { IDossierFilesProps } from './IDossierFilesProps';
import { IDossierFilesState } from './IDossierFilesState';
import { IDossierEntry } from '../dataproviders/IData';
import ViewList from './viewList/ViewList';
import ViewItem from './viewItem/ViewItem';

export default class DossierFiles extends React.Component<IDossierFilesProps, IDossierFilesState> {
  constructor(props:IDossierFilesProps){
    super(props);
    this.state={
       selectedViewMode: "list",
       selectedDossierType: this.props.dossierTypes[0],
       selectedDossierCode: "",
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
        Main component selectedDossiertype: {this.state.selectedDossierType}
        {this.state.selectedViewMode==="list" && <ViewList items={this.state.displayedDossiers} dossierTypes={this.props.dossierTypes} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
        {this.state.selectedViewMode==="item" && <ViewItem selectedDossierCode={this.state.selectedDossierCode} handleSelectList={this.handleSelectList} handleSelectItem={this.handleSelectItem} /> }
      </div>
    );
  }

  private handleSelectList(dossierType:string): void {
    this.props.dataProvider.readDossierFromList(dossierType).then((dossiers:IDossierEntry[])=>{
      this.setState({selectedViewMode:"list", selectedDossierType:dossierType, displayedDossiers:dossiers});
    });
  }
  private handleSelectItem(dossierItem: IDossierEntry): void  {
    this.setState({selectedViewMode:"item", selectedDossierCode:dossierItem.dossieritemcode});
  }
}
