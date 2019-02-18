import * as React from 'react';
import { DossierMenuPivot } from './DossierMenuPivot';
import { IDossierFilesProps } from '../IDossierFilesProps';

export default class ViewList extends React.Component<IDossierFilesProps, {}> {
  public componentDidMount(){
    this.props.dataProvider.readDossierFromList().then(x=>{
       console.log(x);
    });
  }

  public render(): React.ReactElement<IDossierFilesProps> {
    return (
      <div>
        <DossierMenuPivot {...this.props}  />
        List component
      </div>
    );
  }
}
