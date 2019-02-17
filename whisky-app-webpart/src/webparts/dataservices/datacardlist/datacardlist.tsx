import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import * as AdaptiveCards from "adaptivecards";
import { IDataCardProps } from './datacardcontainer';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';

export interface IDataCardListState {
  filterText: string;
  items: any;
}

export class ItemList extends React.Component<IDataCardProps, IDataCardListState> {
  constructor(props: IDataCardProps) {
    super(props);
    this.state = {
      filterText: '',
      items: []
    };
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <button onClick={() => this.props.setPageType('item')}>Switch</button>
        <TextField label={'Filter by name'} onBeforeChange={this._onFilterChanged} />
        <List items={this.state.items} onRenderCell={this._onRenderCell} />
      </div>
    );
  }
  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
    return (
      <div className="ms-ListBasicExample-itemCell" data-is-focusable={true}>
        <Image className="ms-ListBasicExample-itemImage" src={item.imageurl} width={50} height={50} imageFit={ImageFit.cover} />
        <div className="ms-ListBasicExample-itemContent">
          <div className="ms-ListBasicExample-itemName">{item.shortname}</div>
          {/* <div className="ms-ListBasicExample-itemIndex">{`Item ${index}`}</div> */}
          <div className="ms-ListBasicExample-itemDesc truncate">{item.description}</div>
        </div>
        <Icon className="ms-ListBasicExample-chevron" iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'} />
      </div>
    );
  }
  private _onFilterChanged(text: string): void {
    this.setState({
      items: text ? this.state.items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : this.state.items
    });

    // this.setState({
    //   filterText: text,
    //   items: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items
    // });
  }
}