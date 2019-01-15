import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'TrendingInThisSiteWebPartStrings';
import TrendingInThisSite,{ ITrendingInThisSiteProps } from './components/TrendingInThisSite';
import { ITrendingInThisSiteWebPartProps } from './ITrendingInThisSiteWebPartProps';

export interface ITrendingInThisSiteWebPartProps {
  description: string;
}

export default class TrendingInThisSiteWebPart extends BaseClientSideWebPart<ITrendingInThisSiteWebPartProps> {
  public constructor(context: IWebPartContext) {
    super();
  }
  public render(): void {
    const element: React.ReactElement<ITrendingInThisSiteProps> = React.createElement(TrendingInThisSite, {
      numberOfDocuments: this.properties.numberOfDocuments,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });

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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneSlider('numberOfDocuments', {
                  label: strings.NumberOfDocumentsFieldLabel,
                  min: 1,
                  max: 10,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
