import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { IViewItem } from '../IComponentProps';
import { IDossierListItem } from '../../dataproviders/IData';

export class ViewItemReferences extends React.Component<IViewItem> {
  constructor(props: IViewItem) {
    super(props);
    this._onSelectItem = this._onSelectItem.bind(this);
  }
  public render(): JSX.Element {
    let _item:IDossierListItem[]=[];
    // console.log('render viewitemreference',this.props.selectedDossier);
    _item.push({'id': this.props.selectedDossier.type,'title':this.props.selectedDossier.type, 'description':'', 'iconurl':'', 'type':''});
    this.props.selectedDossier.referencesTo.map(item=>{
      item.dossieritems.map(i=>{
        _item.push({'id': i.id,'title':i.title, 'description':'', 'iconurl':'', 'type':''});
      });
    });
    const _pivotitems: JSX.Element[] = _item.map((item: IDossierListItem, i: number): JSX.Element => {
      return(<PivotItem key={item.id} linkText={item.title} itemKey={item.id}></PivotItem>);
    });
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs} onLinkClick={this._onSelectItem}>
          {_pivotitems}
        </Pivot>
      </div>
    );
  }
  private _onSelectItem=(item:PivotItem)=> {
    //console.log('ViewItemReference _onSelectItem:',item);
    this.props.handleSelectReference(''+item.props.itemKey);
  }
}