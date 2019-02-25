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
import { IDossierFilesProps } from './components/IComponentProps';

import { SharePointDataProvider } from './dataproviders/SPDataProvider';
import { MockDataProvider } from './dataproviders/MockDataProvider';
import { IDataProvider } from './dataproviders/IData';
import * as markdownit from 'markdown-it';

export interface IDossierFilesWebPartProps {
  dossierlistUrl: string;
}

export default class DossierFilesWebPart extends BaseClientSideWebPart<IDossierFilesWebPartProps> {
  private _dataProvider: IDataProvider;

  protected onInit():Promise<void>{
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      //this._dataProvider = new MockDataProvider(this.context, this.properties.dossierlistUrl);
      this._dataProvider = new SharePointDataProvider(this.context, this.properties.dossierlistUrl);
    } else {
      this._dataProvider = new SharePointDataProvider(this.context, this.properties.dossierlistUrl);
    }
    return super.onInit();
  }

  public render(): void {
    (<any>window).markdownit=()=>markdownit();
    const element: React.ReactElement<IDossierFilesProps> = React.createElement(
      DossierFiles,
      {
        title: "Browse Dossier Files",
        dossierTypes: ['Distillery','Bottler','Brand','Bottling'],
        webPartDisplayMode: this.displayMode,
        dataProvider: this._dataProvider,
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
                PropertyPaneTextField('dossierlistUrl', {
                  label: strings.DossierListUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
