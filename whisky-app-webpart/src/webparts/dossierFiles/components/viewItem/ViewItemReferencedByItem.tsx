import * as React from 'react';
import { IViewListItemProps } from '../IComponentProps';

export class ViewItemReferencedByItem extends React.Component<IViewListItemProps>{
  constructor(props: IViewListItemProps) {
    super(props);
    this._onSelectItem=this._onSelectItem.bind(this);
}

    public render(): JSX.Element {
      return(<a onClick={this._onSelectItem}>{this.props.item.title}</a>);
    }
    private _onSelectItem=()=> {
      this.props.onSelectItem(this.props.item);
    }
  }