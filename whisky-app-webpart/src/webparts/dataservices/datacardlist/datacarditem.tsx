import * as React from 'react';
import{ IDataCardProps } from './datacardcontainer';
import { Bottling } from '../whiskyservice/dossierclasses';
import {DossierCard} from './components/DossierCard';
import { DossierService, IDossierService } from '../whiskyservice/dossierservice';

export interface IDataservicesState {
  filterText: string;
  dossierService: DossierService;
}

export class ItemView extends React.Component<IDataCardProps, IDataservicesState> {
  constructor(props: IDataCardProps){
    super(props);
    this.state = {
      filterText: '',
      dossierService: new DossierService
    };
  }

  public render(): React.ReactElement<{}> {   
    return (
      <div>
          VIEW {this.props.currentDosierType} {this.props.currentPage}
          {
              this.props.items.map((item:Bottling,i)=>{
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
