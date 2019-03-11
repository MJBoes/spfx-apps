import * as React from 'react';
import { IDossierFilesProps, IDossierFilesState } from '../IDossierFilesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';
import { PropertyPaneSlider } from '@microsoft/sp-webpart-base';

export default class Main extends React.Component<IDossierFilesProps, IDossierFilesState> {
  constructor(props: IDossierFilesProps) {
    super(props);

  }
  public componentDidMount() {
  }
  public render(): React.ReactElement<IDossierFilesProps> {
    console.log(this.props);
    return (
        <div>Main Container {this.props.dossierGenericList}</div>
    );
  }
}
