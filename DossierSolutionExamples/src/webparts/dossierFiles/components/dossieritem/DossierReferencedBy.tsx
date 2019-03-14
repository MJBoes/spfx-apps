import * as React from 'react';
import { DossierReference } from './DossierReferenceItem';
import styles from './DossierReference.module.scss';


import { IViewItemProps, IDossierListItem } from '../IDossierFilesProps';

export class DossierReferencedBy extends React.Component<IViewItemProps> {
  private _items: IDossierListItem[] = [];

  constructor(props: IViewItemProps) {
    super(props);
  }

  public render(): JSX.Element {
    if(this.props.currentDossierItem!=null){
      this._items=[];
      this._items=[];
      this.props.currentDossierItem.referencedBy.map(item => {
        this._items.push({ 'id': item.id, 'title': item.title, 'description': item.description, 'iconurl': item.iconurl, 'type': item.type });
      });
    }
    return (
      <div className={styles.referencedBy}>
        <h4>Refered by</h4>
        {this._items.map(item => <DossierReference item={item} setCurrentDossier={this.props.setCurrentDossier} />)}
      </div>
    );
  }
}
