import * as React from 'react';
import { IViewItem } from '../IComponentProps';

export default class ViewItem extends React.Component<IViewItem, {}> {
  constructor(props: IViewItem) {
    super(props);
    this._onSelect=this._onSelect.bind(this);
  }
  public render(): React.ReactElement<IViewItem> {
    return (
      <div onClick={this._onSelect}>
        Item component {this.props.selectedDossierCode}
      </div>
    );
  }
  private _onSelect(){
    this.props.handleSelectList('Distillery');
  }
}
