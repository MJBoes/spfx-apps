import * as React from 'react';
import styles from './Dossier.module.scss';
import { IDossierProps } from './IDossierProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenu } from './elements/dossiermenu';
import { ItemList } from './itemlist/itemlist';

export default class Dossier extends React.Component<IDossierProps, {}> {
  public render(): React.ReactElement<IDossierProps> {
    return (
      <div className={ styles.dossier }>
        <DossierMenu/>
        {this.props.currentPage==="distillerylist" && <ItemList {...this.props} /> }
      </div>
    );
  }
}
