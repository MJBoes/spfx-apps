import * as React from 'react';
import { IDossierFilesProps } from '../IDossierFilesProps';
import { IDossierFilesState } from '../IDossierFilesState';
import { DossierMenuPivot } from './DossierMenuPivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { IDossierEntry } from '../../dataproviders/IData';
import './ViewList.module.scss';

export interface IViewListState {
  allDossiers: IDossierEntry[];
  displayedDossiers: IDossierEntry[];
}


export default class ViewList extends React.Component<IDossierFilesProps, IViewListState> {

  constructor(props: IDossierFilesProps) {
    //, setPage(pageType: string, dossierType: string)
    super(props);

    this.state = {
      allDossiers: [],
      displayedDossiers: [],
    };
  }

  public componentDidMount(){
    this.props.dataProvider.readDossierFromList('').then((dossiers:IDossierEntry[])=>{
       this.setState({
         allDossiers: dossiers,
         displayedDossiers: dossiers
       });
    });
  }

  public render(): React.ReactElement<IDossierFilesProps> {
    console.log(this.state.displayedDossiers);
    return (
      <div>
        <DossierMenuPivot {...this.props}  />
        <TextField label={'Filter by name of '} />
        <List items={this.state.displayedDossiers} onRenderCell={this._onRenderCell} onClick={this._onItemClick} />
      </div>
    );  
  }

  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
    return (
      <div className="ms-ListBasicExample-itemCell" data-is-focusable={true} onClick={()=>{alert('click'+item.dossieritemid);}}>
        {/* <Image className="ms-ListBasicExample-itemImage" src={item.imageurl} width={50} height={50} imageFit={ImageFit.cover} /> */}
        <div className="ms-ListBasicExample-itemContent">
          <div className="ms-ListBasicExample-itemName">{item.shortname}</div>
          {/* <div className="ms-ListBasicExample-itemIndex">{`Item ${index}`}</div> */}
          <div className="ms-ListBasicExample-itemDesc truncate">{item.description}</div>
        </div>
        <Icon className="ms-ListBasicExample-chevron" iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}/>
      </div>
    );
  }

  private _onItemClick(item:any){
    alert('click');
    console.log(item);
  }
}
