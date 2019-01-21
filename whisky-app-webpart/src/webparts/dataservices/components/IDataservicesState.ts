import { DossierService } from '../whiskyservice/dossierservice';

export interface IDataservicesState {
  currentPage:number;
  dossierService:DossierService;
}
