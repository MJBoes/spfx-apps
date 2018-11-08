import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WhiskyAppWebPartStrings';
import WhiskyApp from './components/main/WhiskyApp';
import { IWhiskyAppProps } from './components/main/IWhiskyAppProps';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IWhiskyAppWebPartProps {
  description: string;
  spHttpClient:SPHttpClient;
}

export default class WhiskyAppWebPart extends BaseClientSideWebPart<IWhiskyAppWebPartProps> {

  public render(): void {
    let _url:string=Environment.type === EnvironmentType.Local ? "http://localhost:8081" : this.context.pageContext.web.absoluteUrl;
    const element: React.ReactElement<IWhiskyAppProps > = React.createElement(
      WhiskyApp,
      {
        description: this.properties.description,
        //webabsoluteurl:this.context.pageContext.web.absoluteUrl,
        //webabsoluteurl:"http://localhost:8081",
        webabsoluteurl: _url,
        spHttpClient: this.context.spHttpClient
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
