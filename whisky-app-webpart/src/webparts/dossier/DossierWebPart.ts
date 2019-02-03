import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DossierWebPartStrings';
import Dossier from './components/Dossier';
import { IDossierProps } from './components/IDossierProps';

export interface IDossierWebPartProps {
  description: string;
}

export default class DossierWebPart extends BaseClientSideWebPart<IDossierWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDossierProps > = React.createElement(
      Dossier,
      {
        description: this.properties.description,
        currentPage: 'distillerylist'
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
