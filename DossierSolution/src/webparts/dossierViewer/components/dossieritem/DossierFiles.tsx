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
    // if(this.props.currentDossierItem!=null){
    //   this._files=[];
    //   console.log('DossierReferencesTo',this.props.currentDossierItem);
    //   this.props.currentDossierItem.files.map(item => {
    //     this._files.push({ 'id': item.id, 'title': item.title, 'encodedAbsoluteUrl':item.encodedAbsoluteUrl,'modified':item.modified,'reviewdate':item.reviewdate,'properties':item.properties,'referencedBy':item.referencedBy,'referencesTo':item.referencesTo });
    //   });
    // }
    let _viewFields:IViewField[]=[{'name':'title',displayName:'Name',linkPropertyName:'serverRelativeUrl',maxWidth:450},{'name':'reviewdate',displayName:'Review Date'}];
    let _groupByFields:IGrouping[]=[{'name':'group','order':1}];
    //console.log(this.props.currentDossierItem.files);
    //console.log(this.props.currentDossierItem.folders);
    return (
      <div className={styles.webpart}>
        <h4>Files</h4>
        <ListView
          items={this.props.currentDossierItem.files}
          viewFields={_viewFields}
          iconFieldName="serverRelativeUrl"
          compact={true}
          selectionMode={SelectionMode.none}
          // selection={this._getSelection}
          showFilter={true}
          defaultFilter=""
          filterPlaceHolder="Search..."
          groupByFields={_groupByFields}
          />
      </div>
    );
  }
}

