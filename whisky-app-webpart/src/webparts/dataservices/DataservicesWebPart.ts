import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IDataservicesWebPartProps} from './IDataservicesWebPartProps';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DataservicesWebPartStrings';
// import Dataservices from './components/Dataservices';
// import { IDataservicesProps } from './components/IDataservicesProps';
import { DataCardContainer, IDataCardContainerProps } from './datacardlist/datacardcontainer';

import * as markdownit from 'markdown-it';

export default class DataservicesWebPart extends BaseClientSideWebPart<IDataservicesWebPartProps> {
  // public render(): void {
  //   (<any>window).markdownit=()=>markdownit();
  //   const element: React.ReactElement<IDataservicesProps > = React.createElement(
  //     Dataservices,
  //     {
  //       description: this.properties.description,
  //       msGraphClientFactory:this.context.msGraphClientFactory,
  //       aadHttpClientFactory:this.context.aadHttpClientFactory
  //     }
  //   );
  //   ReactDom.render(element, this.domElement);
  // }

  public render(): void {
    const element: React.ReactElement<IDataCardContainerProps > = React.createElement(
      DataCardContainer,
      {
        currentDosierType: 'distillery',
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
