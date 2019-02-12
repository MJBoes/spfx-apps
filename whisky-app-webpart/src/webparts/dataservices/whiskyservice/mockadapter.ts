import { mockresponse } from './WHISKYLIJST';

export class Dossiers {
    public getDossiers(type: string) {
        switch(type){
            case "distillery":
                return(mockresponse.whiskyregistry.distilleries.distillery);
            case "bottling":
                return(mockresponse.whiskyregistry.bottlings.bottling);
            default:
                return;
        }
    }
    public getFiles(){
        return(mockresponse.whiskyregistry.files.file);
    }    
}
