import * as React from 'react';
import { IDossierFilesProps, IDossierFilesState } from '../IDossierFilesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient } from '@microsoft/sp-http';

export default class Main extends React.Component<IDossierFilesProps, IDossierFilesState> {
  constructor(props: IDossierFilesProps) {
    super(props);

    this.state = {
      items: []
    };
  }
  public componentDidMount() {
  }
  public render(): React.ReactElement<IDossierFilesProps> {

    return (
        <div>Main Container</div>
    );
  }
}
