import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IFile, File, IDistillery, Distillery, IBottling, Bottling } from './dossierclasses';
import { SPHttpClient } from '@microsoft/sp-http';
import { Dossiers } from './mockadapter';

export interface IDossierService {
    distilleries: IDistillery[];
    bottlings: IBottling[];
    loadData: (SPHttpClient) => void;
}

export class DossierService implements IDossierService {
    public distilleries = [];
    public bottlings = [];
    private dossierSource:Dossiers;
    constructor() {
        this.dossierSource=new Dossiers;
    }

    public loadData(spHttpClient:SPHttpClient) {
        // get dossiers

        this.dossierSource.mockService("distillery").then(result=>{
            for (let data of result) {
                let _distillery = this.loadDistillery(<IDistillery>data);
                this.distilleries.push(_distillery);
            }
        });
        this.dossierSource.mockService("bottling").then(result=>{
            for (let data of result) {
                let _bottling = this.loadBottlings(<IBottling>data);
                this.bottlings.push(_bottling);
            }
        });
        this.dossierSource.mockService("files").then(result=>{
            for (let data of result) {
                let _file: IFile = this.loadFiles({ name: data.filename, unc: data.unc, distillerycodes: data.distillerycodes, bottlingcodes: data.bottlingcodes });
                for (let _dossierReference of data.distillerycodes.split(",")){
                    for (let _dossierItem of this.distilleries.filter(d=>{return d.code==_dossierReference;})){
                        _dossierItem.addFile(_file);
                    }
                }
                for (let _dossierReference of data.bottlingcodes.split(",")){
                    for (let _dossierItem of this.bottlings.filter(d=>{return d.code==_dossierReference;})){
                        _dossierItem.addFile(_file);
                    }
                }                
            }
        });
    }

    private loadDistillery(data: IDistillery) {
        let d = new Distillery(data.code, data.shortname, data.description);
        d.location = data.location;
        d.latlong = data.latlong;
        return d;
    }
    
    private loadBottlings(data: IBottling) {
        let d = new Bottling(data.code, data.shortname, data.description);
        d.barcode=data.barcode;
        d.bottlercodes=data.bottlercodes;
        d.brandcodes=data.brandcodes;
        d.casktype=data.casktype;
        d.category=data.category;
        d.collectionclosed=data.collectionclosed;
        d.collectionopen=data.collectionopen;
        d.distillerycodes=data.distillerycodes;
        d.region=data.region;
        d.size=data.size;
        d.statedage=data.statedage;
        d.strength=data.strength;
        return d;
    }
    private loadFiles(data: IFile) {
        let d= new File(data.unc,data.name,data.bottlingcodes,data.distillerycodes);
        return d;
    }
}