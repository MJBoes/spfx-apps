import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IDossierListItem } from '../IDossierFilesProps';
import { List } from 'office-ui-fabric-react/lib/List';
import { DossierItemSearchBoxItem } from './DossierItemSearchBoxItem';

// tslint:disable:jsx-no-lambda

export interface IDossierItemSearchBoxProps {
  foundItems: IDossierListItem[];
  readDossierList(filter:string);
  setCurrentDossier(dossierType: string, dossierTitle: string): void;
}

export class DossierItemSearchBox extends React.Component<IDossierItemSearchBoxProps> {
  constructor(props: IDossierItemSearchBoxProps) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="ms-SearchBoxExample">
        <SearchBox
          placeholder="Search"
          onSearch={newValue => console.log('value is ' + newValue)}
          // onFocus={() => console.log('onFocus called')}
          // onBlur={() => console.log('onBlur called')}
          onChange={(newValue) => this.props.readDossierList(newValue)}
        />
        {/* {this.props.foundItems.map(item => <div>{item.title}</div>)} */}
        <List items={this.props.foundItems} onRenderCell={this._onRenderCell} />
      </div>
    );
  }
  private _onRenderCell(item: IDossierListItem, index: number | undefined): JSX.Element {
    return (
      <DossierItemSearchBoxItem item={item} setCurrentDossier={this.props.setCurrentDossier}></DossierItemSearchBoxItem>
    );
  }
}