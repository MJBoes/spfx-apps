import { IFile, File, IDistillery, Distillery, IBottling, Bottling } from './dossierclasses';
import { mockresponse } from './WHISKYLIJST';

export interface IDossierService {
    distilleries: IDistillery[];
    bottlings: IBottling[];
    loadData: () => void;
}

export class DossierService implements IDossierService {
    public distilleries = [];
    public bottlings = [];
    constructor() {

    }

    public loadData() {
        // get dossiers
        for (let data of mockresponse.whiskyregistry.distilleries.distillery) {
            let _distillery = this.loadDistillery(data);
            this.distilleries.push(_distillery);
        }
        for (let data of mockresponse.whiskyregistry.bottlings.bottling) {
            let _bottling = this.loadBottlings(data);
            this.bottlings.push(_bottling);
        }
        // add files to the dossiers
        for (let data of mockresponse.whiskyregistry.files.file) {
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
    }

    private loadDistillery(data: IDistillery) {
        let d = new Distillery(data.code, data.shortname, data.description);
        d.location = data.location;
        d.latlong = data.latlong;
        return d;
    }
    
    private loadBottlings(data: IBottling) {
        let d = new Bottling(data.code, data.shortname, data.description);
        return d;
    }
    private loadFiles(data: IFile) {
        let d= new File(data.unc,data.name,data.bottlingcodes,data.distillerycodes);
        return d;
    }
}