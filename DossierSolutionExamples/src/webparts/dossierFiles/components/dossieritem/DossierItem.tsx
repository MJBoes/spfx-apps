import * as React from 'react';
import * as AdaptiveCards from "adaptivecards";
import { DossierReferencesTo } from './DossierReferencesTo';
import { DossierReferencedBy } from './DossierReferencedBy';
import { DossierFiles } from './DossierFiles';
import { IViewItemProps, IDossierItemDetails } from '../IDossierFilesProps';

export default class DossierItem extends React.Component<IViewItemProps> {
  private adaptiveCard: AdaptiveCards.AdaptiveCard;
  private _item: IDossierItemDetails;

  constructor(props: IViewItemProps) {
    super(props);
    this.adaptiveCard = new AdaptiveCards.AdaptiveCard();
    this.adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
      // More host config options
    });
    this._GoToHome = this._GoToHome.bind(this);
  }

  public render(): React.ReactElement<IViewItemProps> {
    let renderedCard: HTMLElement;
    let card = this.adaptiveio(this.props.currentDossierItem);
    this.adaptiveCard.parse(card);
    renderedCard = this.adaptiveCard.render();
    // console.log('DossierItem',this.props);
    return (
      <div>
        <button onClick={this._GoToHome}>Home</button>
        <div ref={(n) => {
          n && n.childNodes.length==0 ? n &&  n.appendChild(renderedCard) : n &&  n.replaceChild(renderedCard,n.childNodes[0]);
        }} />
        <DossierFiles {...this.props}></DossierFiles>
        <DossierReferencesTo {...this.props}></DossierReferencesTo>
        <DossierReferencedBy {...this.props}></DossierReferencedBy>
      </div>
    );
  }

  private _GoToHome(){
    this.props.setCurrentDossier("", "");
  }

  private adaptiveio(item: IDossierItemDetails): {} {
    // console.log('DossierItems adaptiveio', item);
    if (this.props.currentDossierItem == null) {
      return (
        {
          "type": "AdaptiveCard",
          "body": [
            {
              "type": "TextBlock",
              "text": "Please wait..."
            }
          ],
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          "version": "1.0"
        }
      );
    }else{
      let _properties = this.props.currentDossierItem.properties.filter(p => { return (p.title.indexOf('dossier') !== 0); });
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
                      "text": item.description,
                      "size": "small",
                      "maxLines": 0,
                      "wrap": true,
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
                      "url": item.iconurl
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
}
