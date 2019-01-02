import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import DocumentCardExample from './documentcard/DocumentCardExample';
import { IDocumentCardExampleProps } from './documentcard/IDocumentCardExampleProps';
import { CommandBarBasicExample } from './commandbar/CommandBar';
import { SearchBoxFullSizeExample } from './search/SearchBox';
import { ListGridExample } from './list/gridlist';


export class PivotFabricExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const DocCard: React.ReactElement<IDocumentCardExampleProps > = React.createElement(DocumentCardExample, { description: '' });
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
          <PivotItem linkText="DocumentCard">
            <Label>Document Card Example (npm install --save office-ui-fabric-react@5.124.0)</Label>
            {DocCard}
          </PivotItem>
          <PivotItem linkText="CommandBar">
            <Label>CommandBar Example</Label>
            <CommandBarBasicExample />
          </PivotItem>
          <PivotItem linkText="SearchBox">
            <Label>SearchBox Example</Label>
            <SearchBoxFullSizeExample />
          </PivotItem>
          <PivotItem linkText="GridList">
            <Label>GridList Example</Label>
            <ListGridExample items={[{key: 1, name: 'example 1', thumbnail: 'https://desktopservices.sharepoint.com/sites/showcase/dossier/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com/sites/showcase/dossier/DossierFiles/Bottle%20Photos/Bowmore/Bowmore-Whitesands.jpg' }, { key: 2, name: 'example 2', thumbnail: 'https://placehold.it/214x214'}]} />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}