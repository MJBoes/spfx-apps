import * as React from 'react';
import { IDossierFilesProps, IDataProvider } from '../IDossierFilesProps';
import DossierList from '../dossierlist/DossierList';

export default class Main extends React.Component<IDossierFilesProps> {
  constructor(props: IDossierFilesProps) {
    super(props);

  }
  public componentDidMount() {
  }
  public render(): React.ReactElement<IDossierFilesProps> {
    // console.log(this.props);
    return (
        <div>
          <DossierList {...this.props}></DossierList>
          <p>Main Container {this.props.dossierGenericList}</p>
        </div>
    );
  }
}
