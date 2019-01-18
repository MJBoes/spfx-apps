export interface IDistillery {
    code: string;
    shortname: string;
    description: string;
    location: string;
    latlong: string;
}

export interface IBottling {
    code: string;
    shortname: string;
    description: string;
    region:string;
    category:string;
    distillerycodes:string;
    bottlercodes:string;
    brandcodes:string;
    statedage:string;
    casktype:string;
    strength:string;
    size:string;
    collectionclosed:string;
    collectionopen:string;
    barcode:string;
}

export class Dossier {
    constructor(public code: string, public shortname: string, public description: string) {

    }
}

export class Distillery extends Dossier implements IDistillery {
    public location: string = null;
    public latlong: string = null;
    constructor(code: string, shortname: string, description: string) {
        super(code, shortname, description);
    }
}

export class Bottling extends Dossier implements IBottling {
    public region:string=null;
    public category:string=null;
    public distillerycodes:string=null;
    public bottlercodes:string=null;
    public brandcodes:string=null;
    public statedage:string=null;
    public casktype:string=null;
    public strength:string=null;
    public size:string=null;
    public collectionclosed:string=null;
    public collectionopen:string=null;
    public barcode:string=null;
    constructor(code: string, shortname: string, description: string) {
        super(code, shortname, description);
    }
}