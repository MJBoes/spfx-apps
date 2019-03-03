import * as React from 'react';
import { IViewListItemProps } from '../IComponentProps';
import './ViewItemReferencedBy.module.scss';

export class ViewItemReferencedByItem extends React.Component<IViewListItemProps>{
  constructor(props: IViewListItemProps) {
    super(props);
    this._onSelectItem=this._onSelectItem.bind(this);
}

    public render(): JSX.Element {
      return(<div className="referencedbyTile"><a onClick={this._onSelectItem}>{this.props.item.title}</a></div>);
    }
    private _onSelectItem=()=> {
      this.props.onSelectItem(this.props.item);
    }
  }