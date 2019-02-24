import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IDossierFilesProps } from '../IDossierFilesProps';

export class DossierMenuPivot extends React.Component<IDossierFilesProps> {
  public render(): JSX.Element {
    const _pivotitems: JSX.Element[] = this.props.dossierTypes.map((item: string, i: number): JSX.Element => {
      return(<PivotItem key={item} linkText={item}></PivotItem>);
    });
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs} onLinkClick={this.onLinkClick}>
          {/* <PivotItem linkText="Distilleries">
          </PivotItem>
          <PivotItem linkText="Bottlers">
            <Label>Bottlers</Label>
          </PivotItem>
          <PivotItem linkText="Brands">
            <Label>Brands</Label>
          </PivotItem>
          <PivotItem linkText="Bottlings">
            <Label>Bottlings</Label>
          </PivotItem> */}
          {_pivotitems}
        </Pivot>
      </div>
    );
  }
  private onLinkClick=(item:PivotItem)=> {
    // alert(item.props.linkText);
    // this.props.setPageType('list');
    // this.props.setDosierType(item.props.linkText);
    this.props.setPageState('list',item.props.linkText);
  }
}