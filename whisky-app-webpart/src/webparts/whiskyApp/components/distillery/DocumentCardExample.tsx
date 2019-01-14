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
  constructor(props: IDocumentCardExampleProps) {
    super(props);
  }
  public render(): JSX.Element {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: this.props.imageurl,
          iconSrc: this.props.iconurl,
          width: 318,
          height: 196,
          accentColor: '#ce4b1f'
        }
      ],
    };
 
    return (
      <DocumentCard onClickHref='http://bing.com'>
        <DocumentCardPreview { ...previewProps } />
        <DocumentCardTitle title={this.props.title} />
        <DocumentCardActivity
          activity='Created Feb 23, 2016'
          people={
            [
              { name: 'Kat Larrson', profileImageSrc: String(require('./avatar-kat.png')) }
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