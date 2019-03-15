import * as React from 'react';
import { DossierReference } from './DossierReferenceItem';
import styles from '../DossierFilesStyles.module.scss';


import { IViewItemProps, IDossierListItem, IDossierReference } from '../IDossierFilesProps';

export class DossierReferencesTo extends React.Component<IViewItemProps> {
  private _items: IDossierListItem[] = [];

  constructor(props: IViewItemProps) {
    super(props);
  }

  public render(): JSX.Element {
    if(this.props.currentDossierItem!=null){
      this._items=[];
      this.props.currentDossierItem.referencesTo.map(ref => {
        ref.dossieritems.map(item=>{
          // console.log('DossierReferencesTo item',item);
          this._items.push({ 'id': item.id, 'title': item.title, 'description': item.description, 'iconurl': item.iconurl, 'type': item.type });
        });
      });
    }
    return (
      <div className={styles.webpart}>
        <h4>References</h4>
        {this._items.map(item => <DossierReference item={item} setCurrentDossier={this.props.setCurrentDossier} />)}
      </div>
    );
  }
}
