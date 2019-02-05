import * as React from 'react';
import styles from './Dossier.module.scss';
import { IDossierProps } from './IDossierProps';
import { IDossierState } from './IDossierState';
import { escape } from '@microsoft/sp-lodash-subset';
import { DossierMenu } from './elements/DossierMenu';
import { ItemList } from './item/List';
import { ItemView } from './item/View';

export default class Dossier extends React.Component<IDossierProps, IDossierState> {
  constructor(props) {
    super(props);
    this.state=({
      currentDosierType: "distillery",
      currentPage: "list"
    });
  }

  private setPage=(s=>{ this.setState({currentPage:s}); });
  private setDossierType=(s=>{ this.setState({currentDosierType:s}); });

  public render(): React.ReactElement<IDossierProps> {
    return (
      <div className={styles.dossier}>
        <DossierMenu {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} />
        {this.state.currentPage==="list" && <ItemList {...this.state} setDosierType={this.setDossierType} setPage={this.setPage} /> }
        {this.state.currentPage==="view" && <ItemView {...this.state} setDosierType={this.setDossierType} setPage={this.setPage}/> }
      </div>
    );
  }
}
