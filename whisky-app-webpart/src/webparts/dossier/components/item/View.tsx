import * as React from 'react';
import{ IDossierProps } from '../IDossierProps';

export class ItemView extends React.Component<IDossierProps> {
  constructor(props: IDossierProps){
    super(props);
  }

  public componentDidMount(): void {
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
          VIEW {this.props.currentDosierType}
      </div>
    );
  }
}
