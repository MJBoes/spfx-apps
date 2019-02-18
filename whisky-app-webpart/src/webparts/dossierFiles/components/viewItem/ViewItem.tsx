import * as React from 'react';
import { IDossierFilesProps } from '../IDossierFilesProps';

export default class ViewItem extends React.Component<IDossierFilesProps, {}> {
  public render(): React.ReactElement<IDossierFilesProps> {
    return (
      <div>
        Item component
      </div>
    );
  }
}
