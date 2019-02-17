import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IDataservicesWebPartProps} from './IDataservicesWebPartProps';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as markdownit from 'markdown-it';

import * as strings from 'DataservicesWebPartStrings';
import {DossierService, IDossierService} from './whiskyservice/dossierservice';
import { DataCardContainer, IDataCardContainerProps } from './datacardlist/datacardcontainer';

export default class DataservicesWebPart extends BaseClientSideWebPart<IDataservicesWebPartProps> {
  private dossierService: IDossierService;

  protected onInit(): Promise<void> {
    this.dossierService=new DossierService;
    return super.onInit();
  }

  protected componentDidMount(): void {
    this.dossierService.loadData(this.context.spHttpClient);
    console.log("Dataserviceswebpart ==>", this.dossierService);
  }

  public render(): void {
    (<any>window).markdownit=()=>markdownit();
    const element: React.ReactElement<IDataCardContainerProps > = React.createElement(
      DataCardContainer,
      {
        dossierService: this.dossierService,
        currentDosierType: 'distillery',
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
