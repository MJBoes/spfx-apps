import * as React from 'react';
import * as AdaptiveCards from "adaptivecards";

import { IViewItem } from '../IComponentProps';
import { IDossierItemDetails } from '../../dataproviders/IData';
import { ViewItemReferences } from './ViewItemReferencesToPivot';
import { ViewItemReferencedBy } from './ViewItemReferencedBy';

export default class ViewItem extends React.Component<IViewItem, {}> {
  private adaptiveCard:AdaptiveCards.AdaptiveCard;

  constructor(props: IViewItem) {
    super(props);
    this._onSelectList = this._onSelectList.bind(this);
    this.adaptiveCard = new AdaptiveCards.AdaptiveCard();
    this.adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
      // More host config options
    });
  }
  public render(): React.ReactElement<IViewItem> {
    let renderedCard: HTMLElement;
    // let card = this.adaptiveio(this.props.selectedDossier.title, this.props.selectedDossier.description, this.props.selectedDossier.iconurl, this.props.selectedDossier.referencedBy, this.props.selectedDossier.properties, this.props.selectedDossier.files);
    let card = this.adaptiveio(this.props.selectedDossier);
    this.adaptiveCard.parse(card);
    renderedCard = this.adaptiveCard.render();
    // console.log('ViewItem.Render',card,this.adaptiveCard,renderedCard);
    return (
      <div>
        {/* <div onClick={this._onSelectList}>{this.props.selectedDossier.type}</div> */}
        <ViewItemReferences {...this.props}></ViewItemReferences>
        <div ref={(n) => { n && n.appendChild(renderedCard); }} />
        <ViewItemReferencedBy {...this.props}></ViewItemReferencedBy>
      </div>
    );
  }
  private _onSelectList() {
    this.props.handleSelectList(this.props.selectedDossier.type.replace('dossier',''));
  }
  private adaptiveio(item:IDossierItemDetails): {} {
    let images = item.files;
    let _properties=this.props.selectedDossier.properties.filter(p=>{return(p.title.indexOf('dossier')!==0);});
    return (
      {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
          {
            "speak": item.description,
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "width": 2,
                "items": [
                  {
                    "type": "TextBlock",
                    "text": item.type
                  },
                  {
                    "type": "TextBlock",
                    "text": item.title,
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
                    "text": item.description,
                    "size": "small",
                    "wrap": true
                  },
                  {
                    "type": "FactSet",
                    "facts": _properties,
                  },
                  {
                    "type": "FactSet",
                    // "facts": _referencedBy,
                  }
                ]
              },
              {
                "type": "Column",
                "width": 1,
                "items": [
                  {
                    "type": "Image",
                    "url": item.iconurl,
                  }
                ]
              }
            ]
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
      }
    );
  }
}
