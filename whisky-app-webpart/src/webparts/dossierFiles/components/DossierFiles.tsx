import * as React from 'react';
import { IDossierFilesProps } from './IDossierFilesProps';
import { IDossierFilesState } from './IDossierFilesState';
import ViewList from './viewList/ViewList';
import ViewItem from './viewItem/ViewItem';

export default class DossierFiles extends React.Component<IDossierFilesProps, IDossierFilesState> {
  constructor(props:IDossierFilesProps){
    super(props);
    this.state={
      selectedViewMode: "list",
      selectedDossierType: "Distilleries",
      selectedDossierCode: ""
    };
  }
  public render(): React.ReactElement<IDossierFilesProps> {
    return (
      <div>
        {this.state.selectedViewMode==="list" && <ViewList {...this.props} /> }
        {this.state.selectedViewMode==="item" && <ViewItem {...this.props} /> }
      </div>
    );
  }
}
