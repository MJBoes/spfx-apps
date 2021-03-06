import * as React from 'react';
import styles from './DocumentCardExample.module.scss';
import { IDocumentCardExampleProps } from './IDocumentCardExampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  IDocumentCardPreviewProps
 } from 'office-ui-fabric-react/lib/DocumentCard';

export default class DocumentCardExample extends React.Component<IDocumentCardExampleProps, {}> {
  public render(): JSX.Element {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          //previewImageSrc: String(require('./document-preview.png')),
          previewImageSrc:'https://desktopservices.sharepoint.com/sites/showcase/dossier/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com/sites/showcase/dossier/DossierFiles/Distillery%20Photos/bowmore-distillery.jpg',
          iconSrc: String(require('./icon-ppt.png')),
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ],
    };
 
    return (
      <DocumentCard onClickHref='http://bing.com'>
        <DocumentCardPreview { ...previewProps } />
        <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx' />
        <DocumentCardActivity
          activity='Created Feb 23, 2016'
          people={
            [
              { name: 'Kat Larrson', profileImageSrc: String(require('./avatar-kat.png')) },{ name: 'Kat Larrson', profileImageSrc: String(require('./avatar-kat.png')) }
            ]
          }
        />
      </DocumentCard>
    );
  }
}

export const ExportedComponent = (props) => {
  return (
      <div>ExportedComponent Component</div>
  );
};