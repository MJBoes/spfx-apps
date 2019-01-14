import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'CameraWebPartStrings';
import Camera from './components/Camera';
import { ICameraProps } from './components/ICameraProps';

export interface ICameraWebPartProps {
  targetList: string;
  targetIsFile: boolean;
}

export default class CameraWebPart extends BaseClientSideWebPart<ICameraWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICameraProps > = React.createElement(
      Camera,
      {
        targetList:this.properties.targetList,
        targetIsFile:this.properties.targetIsFile
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
                PropertyPaneTextField('targetList', {
                  label: "Target List"
                }),
                PropertyPaneToggle('targetIsFile', {
                  label: "File format",
                  onText: "file",
                  offText:"base 64 url"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
