import * as React from 'react';
import { IViewListProps } from '../IDossierFilesProps';
import { DossierMenuPivot } from './DossierMenuPivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';

export default class DossierList extends React.Component<IViewListProps> {
  constructor(props: IViewListProps) {
    //, setPage(pageType: string, dossierType: string)
    super(props);
    // this._onRenderCell = this._onRenderCell.bind(this);
  }

  public componentDidMount() {
  }

  public render(): React.ReactElement<IViewListProps> {
    return (
      <div>
        <DossierMenuPivot dossierTypes={this.props.dossierTypes} currentDossierType={this.props.currentDossierType} />
        {/* <TextField label={'Filter by name '} onChanged={(value) => this.props.handleFilterItems(value)} />
        <List items={this.props.displayedDossiers} onRenderCell={this._onRenderCell} /> */}
      </div>
    );
  }

  // private _onRenderCell(item: IDossierListItem, index: number | undefined): JSX.Element {
  //   return (
  //     <ViewListItem item={item} onSelectItem={this.props.handleSelectItem}></ViewListItem>
  //   );
  //}
}
