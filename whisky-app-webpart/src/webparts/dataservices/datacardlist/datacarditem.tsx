import * as React from 'react';
import{ IDataCardContainerProps } from './datacardcontainer';
import {DossierCard} from './components/DossierCard';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';

export interface IDataservicesState {
  filterText: string;
  dossierService: DossierService;
}

export class ItemView extends React.Component<IDataCardContainerProps, IDataservicesState> {
  constructor(props: IDataCardContainerProps){
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
    console.log(this.state);
    console.log(this.state.dossierService.bottlings.length);
    return (
      <div>
          VIEW {this.props.currentDosierType} {this.props.currentPage}
          {
              this.state.dossierService.bottlings.map((item,i)=>{
                let facts=[
                  {title:"Distillery",value:item.distillerycodes},
                  {title:"Bottler",value:item.bottlercodes},
                  {title:"Category",value:item.category},
                  {title:"Closed",value:item.collectionclosed},
                  {title:"Open",value:item.collectionopen},
                  {title:"Region",value:item.region},
                  {title:"Size",value:item.size},
                  {title:"Stated Age",value:item.statedage},
                  {title:"Strength",value:item.strength},
                  {title:"Barcode",value:item.barcode},
                  {title:"Casktype",value:item.casktype}
                ];
                return <DossierCard key={item.shortname} title={item.shortname} group="Bottling" description="" imageurl={item.imageurl} facts={facts} />;
                // return <div key={i}>{item.shortname}</div>;
              })
            }
      </div>
    );
  }
}
