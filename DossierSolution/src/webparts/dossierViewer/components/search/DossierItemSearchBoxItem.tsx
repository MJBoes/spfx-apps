import * as React from 'react';
import { IDossierListItem } from '../IDossierFilesProps';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from '../DossierFilesStyles.module.scss';

export interface IDossierItemSearchBoxItem{
    item:IDossierListItem;
    setCurrentDossier(dossierType: string, dossierTitle: string): void;
}

export class DossierItemSearchBoxItem extends React.Component<IDossierItemSearchBoxItem> {
    constructor(props: IDossierItemSearchBoxItem) {
        super(props);
        this._setCurrentDossier=this._setCurrentDossier.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className={styles.fabricList} onClick={this._setCurrentDossier}>
            <div className={styles.fabricItemCell} data-is-focusable={true}>
            <Image className={styles.fabricItemImage} src={this.props.item.iconurl} width={50} height={50} imageFit={ImageFit.contain} />
            <div className={styles.fabricItemContent}>
                <div className={styles.fabricItemName}>{this.props.item.title}</div>
            </div>
            <Icon className={styles.fabricItemChevron} iconName={'ChevronRight'} />
            </div>
        </div>
        );
    }
    private _setCurrentDossier(){
        this.props.setCurrentDossier(this.props.item.type, this.props.item.title);
    }
}