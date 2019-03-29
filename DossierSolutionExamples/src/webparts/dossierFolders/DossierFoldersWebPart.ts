import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'DossierFoldersWebPartStrings';
import Main from './components/main/Main';
import { IDossierFilesProps, IMain } from './components/IDossierFilesProps';
import * as markdownit from 'markdown-it';

export default class DossierFilesWebPart extends BaseClientSideWebPart<IDossierFilesProps> {

  protected onInit():Promise<void>{
    this.properties.onConfigure = this._onConfigure.bind(this);
    return super.onInit();
  }

  public render(): void {
    (<any>window).markdownit=()=>markdownit();
    const element: React.ReactElement<IMain > = React.createElement(
      Main,
      {
        ctxHttpClient: this.context.spHttpClient,
        pageContextWebAbsoluteUrl: this.context.pageContext.web.absoluteUrl,
        parentProperties: this.properties,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private _onConfigure() {
    this.context.propertyPane.open();
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
