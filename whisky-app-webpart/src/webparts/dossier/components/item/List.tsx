import * as React from 'react';
import{ IDossierProps } from '../IDossierProps';
import { PropertyPaneSlider } from '@microsoft/sp-webpart-base';

export class ItemList extends React.Component<IDossierProps> {
  constructor(props: IDossierProps){
    super(props);
  }

  public componentDidMount(): void {
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
          LIST {this.props.currentDosierType}
          <button onClick={()=>this.props.setDosierType('test')}>Switch</button>
      </div>
    );
  }
}
