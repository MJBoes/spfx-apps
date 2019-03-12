import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'DossierFilesWebPartStrings';
import Main from './components/main/Main';
import { IDossierFilesProps, IDataProvider } from './components/IDossierFilesProps';
import { DataProvider } from './components/services/dataprovider';
import * as markdownit from 'markdown-it';

// export interface IDossierFilesWebPartProps {
//   description: string;
//   dossierGenericList: string;
//   dossierDocumentLibrary: string;
//   dossierTypes: string;
// }

export default class DossierFilesWebPart extends BaseClientSideWebPart<IDossierFilesProps> {
  private _dataProvider:IDataProvider;
  protected onInit():Promise<void>{
    this._dataProvider = new DataProvider(this.context.httpClient);
    return super.onInit();
  }

  public render(): void {
    (<any>window).markdownit=()=>markdownit();
    const element: React.ReactElement<IDossierFilesProps > = React.createElement(
      Main,
      {
        dataProvider:this._dataProvider,
        dossierGenericList:this.properties.dossierGenericList,
        dossierDocumentLibrary:this.properties.dossierDocumentLibrary,
        dossierTypes:this.properties.dossierTypes,
        currentItemID:0,
        currentDossierType:"",
        currentView:"Initialize"
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
                PropertyFieldListPicker('dossierGenericList', {
                  label: 'Select a Dossier Generic List',
                  selectedList: this.properties.dossierGenericList,
                  baseTemplate: 100,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listGLPickerFieldId'
                }),
                PropertyFieldListPicker('dossierDocumentLibrary', {
                  label: 'Select a Dossier Document Library',
                  selectedList: this.properties.dossierDocumentLibrary,
                  baseTemplate: 101,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listDLPickerFieldId'
                }),
                PropertyPaneTextField('dossierTypes', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
