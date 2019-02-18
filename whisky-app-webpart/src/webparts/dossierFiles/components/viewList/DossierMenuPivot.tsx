import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IDossierFilesProps } from '../IDossierFilesProps';
import { IDossierFilesState } from '../IDossierFilesState';

export class DossierMenuPivot extends React.Component<IDossierFilesProps,IDossierFilesState> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs} onLinkClick={this.onLinkClick}>
          <PivotItem linkText="Distilleries">
            {/* <Label>Distilleries</Label> */}
          </PivotItem>
          <PivotItem linkText="Bottlers">
            <Label>Bottlers</Label>
          </PivotItem>
          <PivotItem linkText="Brands">
            <Label>Brands</Label>
          </PivotItem>
          <PivotItem linkText="Bottlings">
            <Label>Bottlings</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
  private onLinkClick=(item:PivotItem)=> {
    // alert(item.props.linkText);
    // this.props.setPageType('list');
    // this.props.setDosierType(item.props.linkText);
  }
}