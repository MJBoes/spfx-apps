import * as React from 'react';
import styles from './DossierViewer.module.scss';
import { IDossierViewerProps } from './IDossierViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class DossierViewer extends React.Component<IDossierViewerProps, {}> {
  public render(): React.ReactElement<IDossierViewerProps> {
    return (
      <div className={ styles.dossierViewer }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
