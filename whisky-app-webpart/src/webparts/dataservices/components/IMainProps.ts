import {IDataservicesWebPartProps} from '../IDataservicesWebPartProps';
import { DossierService } from '../whiskyservice/dossierservice';

export interface IMainProps extends IDataservicesWebPartProps {
    currentPage:string;
    dataService: DossierService;
}
