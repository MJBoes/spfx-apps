import * as React from 'react';
import { ViewItemReferencedByItem } from './ViewItemReferencedByItem';
import { List } from 'office-ui-fabric-react/lib/List';
import './ViewItemReferencedBy.module.scss';

import { IViewItem } from '../IComponentProps';
import { IDossierListItem } from '../../dataproviders/IData';

export class ViewItemReferencedBy extends React.Component<IViewItem> {
  constructor(props: IViewItem) {
    super(props);
    this._onRenderCell=this._onRenderCell.bind(this);
  }
  public render(): JSX.Element {
    let _items: IDossierListItem[] = [];
    this.props.selectedDossier.referencedBy.map(item => {
      item.dossieritems.map(i => {
        // console.log('render viewitemreference', i);
        _items.push({ 'id': i.id, 'title': i.title, 'description': '', 'iconurl': '', 'type': '' });
      });
    });
    
    return (
      <div className="referencedBy">
        <h4>References to this item</h4>
        <List className="referencedby" items={_items} onRenderCell={this._onRenderCell} />
      </div>
    );
  }
  private _onRenderCell(item: IDossierListItem, index: number | undefined): JSX.Element {
    return (
      // <ViewItemReferencedByItem item={item} onSelectItem={this.props.handleSelectItem}></ViewItemReferencedByItem>
      <ViewItemReferencedByItem item={item} onSelectItem={this.props.handleSelectItem}></ViewItemReferencedByItem>
    );
  }
}
