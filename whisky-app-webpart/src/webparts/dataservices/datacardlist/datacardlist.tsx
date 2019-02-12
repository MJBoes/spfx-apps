import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import * as AdaptiveCards from "adaptivecards";
import { IDataCardContainerProps } from './datacardcontainer';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';

export interface IDataservicesState {
  filterText: string;
  dossierService: DossierService;
}

export class ItemList extends React.Component<IDataCardContainerProps, IDataservicesState> {
  constructor(props: IDataCardContainerProps) {
    super(props);
    this.state = {
      filterText: '',
      dossierService: new DossierService
    };
  }

  public componentDidMount(): void {
    this.state.dossierService.loadData(this.props.spHttpClient);
    this.setState({ dossierService: this.state.dossierService });
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        LIST {this.props.currentDosierType}
        <button onClick={() => this.props.setPage('item')}>Switch</button>
        {this.props.currentDosierType==="Distilleries" && <List items={this.state.dossierService.distilleries} onRenderCell={this._onRenderCell} /> }
        {this.props.currentDosierType==="Bottlings" && <List items={this.state.dossierService.bottlings} onRenderCell={this._onRenderCell} /> }
        {/* <List items={this.state.dossierService.distilleries} onRenderCell={this._onRenderCell} /> */}
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
}