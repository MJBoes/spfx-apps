import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'ReactAdaptiveCardsImageGalleryWebPartStrings';
import AdaptiveCardsImageGallery from './components/ReactAdaptiveCardsImageGallery';
import { IAdaptiveCardsImageGalleryProps } from './components/IAdaptiveCardsImageGalleryProps';
import pnp from 'sp-pnp-js';

export interface IAdaptiveCardsImageGalleryWebPartProps {
  imageGalleryName: string;
  imagesToDisplay: number;
}

export default class AdaptiveCardsImageGalleryWebPart extends BaseClientSideWebPart<IAdaptiveCardsImageGalleryWebPartProps> {
  public async onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IAdaptiveCardsImageGalleryProps > = React.createElement(
      AdaptiveCardsImageGallery,
      {
        serviceScope: this.context.serviceScope,
        imageGalleryName: this.properties.imageGalleryName || "Adaptive Card Images",
        imagesToDisplay: this.properties.imagesToDisplay || 10
      }
    );
    // this.context.msGraphClientFactory
    //  .getClient()
    //  .then((client: MSGraphClient): void => {
    //    // get information about the current user from the Microsoft Graph
    //    client
    //      .api('/me')
    //      .get((error, response: any, rawResponse?: any) => {
    //        // handle the response
    //        console.log(error,response);
    //    });
    //  });
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
                PropertyPaneTextField('imageGalleryName', {
                  label: strings.ImageGalleryNameFieldLabel
                }),
                PropertyPaneTextField('imagesToDisplay', {
                  label: strings.ImagesToDisplayFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}