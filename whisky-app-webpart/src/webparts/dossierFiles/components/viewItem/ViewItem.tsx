import * as React from 'react';
import * as AdaptiveCards from "adaptivecards";

import { IViewItem } from '../IComponentProps';
import { IDossierReference, IDossierProperty, IFile } from '../../dataproviders/IData';

export default class ViewItem extends React.Component<IViewItem, {}> {
  constructor(props: IViewItem) {
    super(props);
    this._onSelectList = this._onSelectList.bind(this);
    this._onSelectItem = this._onSelectItem.bind(this);
  }
  public render(): React.ReactElement<IViewItem> {
    //console.log('View item render: ', this.props.selectedDossier);
    let renderedCard: HTMLElement;
    let card = this.adaptiveio(this.props.selectedDossier.title, this.props.selectedDossier.description, this.props.selectedDossier.iconurl, this.props.selectedDossier.referencedBy, this.props.selectedDossier.properties, this.props.selectedDossier.files);
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
      // More host config options
    });
    adaptiveCard.parse(card);
    renderedCard = adaptiveCard.render();
    return (
      <div>
        <div onClick={this._onSelectList}>{this.props.selectedDossier.type}</div>
        <div ref={(n) => { n && n.appendChild(renderedCard); }} />
      </div>
    );
  }
  private _onSelectList() {
    this.props.handleSelectList(this.props.selectedDossier.type.replace('dossier',''));
  }
  private _onSelectItem() {

    // this.props.handleSelectItem();
  }
  private adaptiveio(title: string, description: string, iconurl: string, referencedBy: IDossierReference[], dossierproperties: IDossierProperty[], files: any): {} {
    // let images=files.value.map((item)=>{return({"type": "Image","url": item.FileRef});});
    let images = files;
    // let _referencedBy:{}[]=[];
    // referencedBy.map(ref=>{
    //   ref.dossieritems.map(i=>{
    //     _referencedBy.push({'title':i.type.replace('dossier',''),'value':'['+i.title+'](https://www.nu.nl)'});
    //   });
    // });
    //console.log('_referencesTo: ',_referencedBy);
    return (
      {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {
            "speak": description,
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "width": 2,
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "Sub title"
                  },
                  {
                    "type": "TextBlock",
                    "text": title,
                    "weight": "bolder",
                    "size": "extraLarge",
                    "spacing": "none"
                  },
                  {
                    "type": "TextBlock",
                    "text": "4.2 ★★★☆ (93) · $$",
                    "isSubtle": true,
                    "spacing": "none"
                  },
                  {
                    "type": "TextBlock",
                    "text": description,
                    "size": "small",
                    "wrap": true
                  },
                  {
                    "type": "FactSet",
                    "facts": dossierproperties,
                  },
                  {
                    "type": "FactSet",
                    // "facts": _referencedBy,
                  },
                  {
                    "type": "TextBlock",
                    "size": "Large",
                    "text": "Files"
                  },
                  {
                    "type": "ImageSet",
                    "imageSize": "medium",
                    "images": images
                  }
                ]
              },
              {
                "type": "Column",
                "width": 1,
                "items": [
                  {
                    "type": "Image",
                    "url": iconurl,
                    "size": "auto"
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  }
}
