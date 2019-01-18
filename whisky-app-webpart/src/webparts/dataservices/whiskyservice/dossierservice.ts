import { IDistillery, Distillery, IBottling,Bottling } from './dossierclasses';
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

    public loadData(){
        for (let data of mockresponse.whiskyregistry.distilleries.distillery){
            let _distillery=this.loadDistillery(data);
            this.distilleries.push(_distillery);
        }
        for (let data of mockresponse.whiskyregistry.bottlings.bottling){
            let _bottling=this.loadBottlings(data);
            this.bottlings.push(_bottling);
        }
    }

    private loadDistillery(data:IDistillery){
        let d=new Distillery(data.code,data.shortname,data.description);
        d.location=data.location;
        d.latlong=data.latlong;
        return d;
    }
    private loadBottlings(data:IBottling){
        let d=new Bottling(data.code,data.shortname,data.description);
        return d;
    }
}