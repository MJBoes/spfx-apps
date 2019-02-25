import { values } from "@uifabric/utilities";

export interface IDataProvider {
    validateSettings(): boolean;
    readDocumentsFromSearch(): Promise<IFile[]>;
    readDossierItemsFromList(dossierType: string): Promise<IDossierListItem[]>;
    readDossierItemByIDFromList(dossierID: string): Promise<IDossierItemDetails>;
}

// a file can have properties and references to dossier entries.
export interface IFile {
    name: string;
    unc: string;
    properties?:{
        title:string;
        value:string;
    }[];
    references?:{
        dossiertype:string,
        dossieritemcodes:string[]
    }[];
}

// IDossierListItem contains the light weigth storage for selection and as attribute in the lists in IDossierItemDetails.
export interface IDossierListItem {
    id: string;
    title: string;
    type: string;
    description: string;
    iconurl: string;
}

export interface IDossierItemDetails {
    id: string;
    title: string;
    type: string;
    description: string;
    iconurl: string;
    properties:{
        title:string;
        value:string;
    }[];
    references:{
        dossiertype:string;
        dossieritems:IDossierListItem[];
    }[];
    files:IFile[];
}

// a dossier entry has an item code ('Gall & Gall Markthal'), a dossier type ('Shop') and references to other dossier types ('Franchise':'Gall & Gall','Holding':'Ahold')
// the properties can be read from the source. For example the address, opening hours
export interface IDossierEntry {
    dossieritemid: string;
    dossieritemcode: string;
    dossiertype: string;
    shortname: string;
    description: string;
    properties?:{
        title:string;
        value:string;
    }[];
    references?:{
        dossiertype:string,
        dossieritemcodes:string[]
    }[];
}

export class DossierItem implements IDossierEntry{
    public files: IFile[]=[];
    public properties: {title:string,value:string}[];
    public references: {dossiertype:string,dossieritemcodes:string[]}[];
    public imageurl: string;
    constructor(public dossieritemid: string, public dossieritemcode: string, public dossiertype: string, public shortname: string, public description: string) {

    }
    public addFile(file:IFile){
        if(this.files.length==0){
            let _root:string="https://desktopservices.sharepoint.com/sites/showcase/factbook/_layouts/15/getpreview.ashx?resolution=0&path=https://desktopservices.sharepoint.com/sites/showcase/factbook/DossierFiles";
            this.imageurl=_root+file.unc;
        }
        this.files.push(file);
    }
    public addProperty(title: string, value:string){
        this.properties.push({title,value});
    }
    public addReference(dossiertype: string, semicolumndelimiteddossieritemcodes:string){
        let dossieritemcodes:string[]=semicolumndelimiteddossieritemcodes.split(';');
        this.references.push({dossiertype,dossieritemcodes});
    }
}

export class File implements IFile {
    constructor(public unc:string, public name:string){

    }
}

// export interface IDistillery {
//     code: string;
//     shortname: string;
//     description: string;
//     location: string;
//     latlong: string;
// }

// export interface IBottling {
//     code: string;
//     shortname: string;
//     description: string;
//     region: string;
//     category: string;
//     distillerycodes: string;
//     bottlercodes: string;
//     brandcodes: string;
//     statedage: string;
//     casktype: string;
//     strength: string;
//     size: string;
//     collectionclosed: string;
//     collectionopen: string;
//     barcode: string;
// }

// export class Distillery extends Dossier implements IDistillery {
//     public location: string = null;
//     public latlong: string = null;
//     constructor(code: string, shortname: string, description: string) {
//         super(code, shortname, description);
//     }
// }

// export class Bottling extends Dossier implements IBottling {
//     public region: string = null;
//     public category: string = null;
//     public distillerycodes: string = null;
//     public bottlercodes: string = null;
//     public brandcodes: string = null;
//     public statedage: string = null;
//     public casktype: string = null;
//     public strength: string = null;
//     public size: string = null;
//     public collectionclosed: string = null;
//     public collectionopen: string = null;
//     public barcode: string = null;
//     constructor(code: string, shortname: string, description: string) {
//         super(code, shortname, description);
//     }
// }
