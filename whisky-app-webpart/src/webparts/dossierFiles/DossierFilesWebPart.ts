import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DossierFilesWebPartStrings';
import DossierFiles from './components/DossierFiles';
import { IDossierFilesProps } from './components/IDossierFilesProps';

import { IDataProvider } from './spdataprovider/SPDataProvider.ts';

export interface IDossierFilesWebPartProps {
  dossierlistUrl: string;

}

export default class DossierFilesWebPart extends BaseClientSideWebPart<IDossierFilesWebPartProps> {
  private _dataProvider: IDataProvider;

  public render(): void {
    const element: React.ReactElement<IDossierFilesProps> = React.createElement(
      DossierFiles,
      {
        title: "Browse Dossier Files",
        webPartDisplayMode: this.displayMode,
        dataProvider: this._dataProvider
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
                PropertyPaneTextField('description', {
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
