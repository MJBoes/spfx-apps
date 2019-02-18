import { IFile, IDossierEntry } from '../dataproviders/IData';
import { IColumn, IContextualMenuProps } from 'office-ui-fabric-react';

export interface IDossierFilesState {
    allDocuments?: IFile[];
    displayedDocuments?: IFile[];
    allDossiers?: IDossierEntry[];
    displayedDossiers?: IDossierEntry[];
    showResetFilters?: boolean;
    isLoading?: boolean;
    columns?: IColumn[];
    showPanel?: boolean;
    panelDocUrl?: string;
    panelTitle?: string;
    contextualMenuProps?: IContextualMenuProps;

    //???
    isErrorOccured?: boolean;
    errorMessage?: string;

    selectedViewMode:string;
    selectedDossierType: string;
    selectedDossierCode: string;  
}