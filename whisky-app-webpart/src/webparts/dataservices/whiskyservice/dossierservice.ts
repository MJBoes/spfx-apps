import { Distillery, Bottling } from './dossierclasses';
import { mockresponse } from './WHISKYLIJST';

export interface IDossierService{
    distilleries:any;
    bottlings:any;
    loadData:()=>void;
}

export class DossierService implements IDossierService{
    public distilleries=[];
    public bottlings=[];

    constructor(){

    }

    loadData(){
        for (let data of mockresponse.whiskyregistry.distilleries.distillery){
            this.distilleries.push(data);
        }
        for (let data of mockresponse.whiskyregistry.bottlings.bottling){
            this.bottlings.push(data);
        }
    }
}