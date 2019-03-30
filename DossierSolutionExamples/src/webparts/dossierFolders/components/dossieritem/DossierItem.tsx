import * as React from 'react';
import { DossierReferencesTo } from './DossierReferencesTo';
import { DossierReferencedBy } from './DossierReferencedBy';
import { DossierFiles } from './DossierFiles';
import { IViewItemProps } from '../IDossierFilesProps';
import styles from '../DossierFilesStyles.module.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class DossierItem extends React.Component<IViewItemProps> {
  constructor(props: IViewItemProps) {
    super(props);
    this._GoToHome = this._GoToHome.bind(this);
  }

  public render(): React.ReactElement<IViewItemProps> {
    return (
      <div>
        <div className={styles.fabricList} onClick={this._GoToHome}>
            <div className={styles.fabricItemCell} data-is-focusable={true}>
            <Image className={styles.fabricItemImage} src={this.props.currentDossierItem.iconurl} width={50} height={50} imageFit={ImageFit.contain} />
            <div className={styles.fabricItemTitle}>
                <div className={styles.fabricItemName}>{this.props.currentDossierItem.title}</div>
            </div>
            <Icon className={styles.fabricItemChevron} iconName={'ChevronRight'} />
            </div>
        </div>
        {/* <button onClick={this._GoToHome}>Home</button> */}
        {this.props.currentDossierItem.description}
        <DossierFiles {...this.props}></DossierFiles>
        <DossierReferencesTo {...this.props}></DossierReferencesTo>
        <DossierReferencedBy {...this.props}></DossierReferencedBy>
      </div>
    );
  }

  private _GoToHome() {
    this.props.setCurrentDossier("", "");
  }
}
