import * as React from 'react';
import{ IDataCardContainerProps } from './datacardcontainer';

export class ItemView extends React.Component<IDataCardContainerProps> {
  constructor(props: IDataCardContainerProps){
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
