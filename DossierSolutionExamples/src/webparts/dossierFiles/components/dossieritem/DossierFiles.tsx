import * as React from 'react';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import styles from '../DossierFilesStyles.module.scss';


import { IViewItemProps, IFile } from '../IDossierFilesProps';

export class DossierFiles extends React.Component<IViewItemProps> {
  private _files: IFile[] = [];

  constructor(props: IViewItemProps) {
    super(props);
  }

  public render(): JSX.Element {
    if(this.props.currentDossierItem!=null){
      this._files=[];
      // console.log('DossierReferencesTo',this.props.currentDossierItem);
      this.props.currentDossierItem.files.map(item => {
        this._files.push({ 'id': item.id, 'title': item.title, 'encodedAbsoluteUrl':'','modified':'','reviewdate':'','properties':[],'referencedBy':[],'referencesTo':[] });
      });
    }
    return (
      <div className={styles.webpart}>
        <h4>Files</h4>
      </div>
    );
  }
}

