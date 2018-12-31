import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import DocumentCardExample from './documentcard/DocumentCardExample';
import { IDocumentCardExampleProps } from './documentcard/IDocumentCardExampleProps';
import { CommandBarBasicExample } from '../distillery/FabricCommandBar';
import { SearchBoxFullSizeExample } from '../distillery/FabricSearchBox';


export class PivotFabricExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const DocCard: React.ReactElement<IDocumentCardExampleProps > = React.createElement(DocumentCardExample, { description: '' });
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
          <PivotItem linkText="DocumentCard">
            <Label>Document Card Example</Label>
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
        </Pivot>
      </div>
    );
  }
}