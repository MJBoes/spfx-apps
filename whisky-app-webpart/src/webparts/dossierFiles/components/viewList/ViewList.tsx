import * as React from 'react';
import { IViewListProps } from '../IComponentProps';
import { DossierMenuPivot } from './DossierMenuPivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import { IDossierListItem } from '../../dataproviders/IData';
import ViewListItem from './ViewListItem';
import './ViewList.module.scss';

export default class ViewList extends React.Component<IViewListProps> {

  constructor(props: IViewListProps) {
    //, setPage(pageType: string, dossierType: string)
    super(props);
    this._onRenderCell=this._onRenderCell.bind(this);
  }

  public componentDidMount(){
    //console.log("VIEWLIST MOUNT");    
  }

  public render(): React.ReactElement<IViewListProps> {
    return (
      <div>
        <DossierMenuPivot dossierTypes={this.props.dossierTypes} onSelectList={this.props.handleSelectList}  />
        <TextField label={'Filter by name of '} />
        <List items={this.props.items} onRenderCell={this._onRenderCell} />
      </div>
    );  
  }

  private _onRenderCell(item: IDossierListItem, index: number | undefined): JSX.Element {
    return (
      <ViewListItem item={item} onSelectItem={this.props.handleSelectItem}></ViewListItem>
    );
  }
}
