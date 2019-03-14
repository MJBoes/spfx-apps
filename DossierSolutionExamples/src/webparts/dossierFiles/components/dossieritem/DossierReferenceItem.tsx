import * as React from 'react';
import { IViewItemProps, IDossierListItem } from '../IDossierFilesProps';
import styles from './DossierReference.module.scss';

export interface IViewListItemProps {
  item: IDossierListItem;
  setCurrentDossier(dossierType: string, dossierTitle: string): void;
}

export class DossierReference extends React.Component<IViewListItemProps>{
  constructor(props: IViewListItemProps) {
    super(props);
    this._onSelectItem = this._onSelectItem.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.chip}>
        <a onClick={this._onSelectItem}>
          <img src={this.props.item.iconurl} alt="" width="96" height="96" hidden={this.props.item.iconurl==''}/>
          {this.props.item.title}
        </a>
      </div>
    );
  }
  private _onSelectItem = () => {
    // console.log('DossierReferencedByItem', this.props.item);
    // console.log('DossierReferencedByItem', this.props.item.type + '/' + this.props.item.title);
    this.props.setCurrentDossier(this.props.item.type, this.props.item.title);
  }
}