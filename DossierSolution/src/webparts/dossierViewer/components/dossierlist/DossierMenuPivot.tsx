import * as React from 'react';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IDossierMenuProps } from '../IDossierFilesProps';

export class DossierMenuPivot extends React.Component<IDossierMenuProps> {
  public render(): JSX.Element {
    const _pivotitems: JSX.Element[] = this.props.dossierTypes.split(';').map((item: string, i: number): JSX.Element => {
      return(<PivotItem key={item} linkText={item} itemKey={item}></PivotItem>);
    });
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs} onLinkClick={this.onLinkClick} selectedKey={this.props.currentDossierType}>
          {_pivotitems}
        </Pivot>
      </div>
    );
  }
  private onLinkClick=(item:PivotItem)=> {
    this.props.onSelectList(item.props.linkText);
  }
}