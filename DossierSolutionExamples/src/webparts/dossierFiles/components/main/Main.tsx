import * as React from 'react';
import { IDossierFilesProps, IDataProvider } from '../IDossierFilesProps';
import DossierList from '../dossierlist/DossierList';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

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
          {this.props.currentView === 'Configure' && <Placeholder iconName='Edit'
             iconText='Configure your web part'
             description='Please configure the web part. It needs to know what dossier item list, dossier document library and dossier types to use.'
             buttonLabel='Configure'
             onConfigure={this.props.onConfigure}
             />}
          {this.props.currentView === 'List' && <DossierList {...this.props}></DossierList>}
          {/* <p>Main Container {this.props.dossierGenericList}</p> */}
        </div>
    );
  }
}
