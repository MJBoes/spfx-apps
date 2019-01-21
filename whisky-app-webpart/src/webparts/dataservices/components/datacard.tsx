import * as React from 'react';
import * as AdaptiveCards from "adaptivecards";
import { samplecard } from './restautantcard';
import { AdaptiveCard } from 'adaptivecards';

interface ICard {
  $schema: string;
  type: string;
  version: string;
  body: {
    speak: string;
    type: string;
    columns: {
      type: string;
      width: number;
      items: {
        type: string;
        text?: string;
        weight?: string;
        size?: string;
        spacing?: string;
        isSubtle?: boolean;
        wrap?: boolean;
        url?: string;
      }[];
    }[];
  }[];
  actions: {
    type: string;
    title: string;
    url: string;
  }[];
}

export interface IDataCard {

}

export interface IDataCardsState {
  isLoading: boolean;
}

export interface IDataCardsProps {

}

export class ExportedComponent extends React.Component<IDataCardsProps, IDataCardsState> {
  private renderedCard: HTMLElement;

  constructor(props: IDataCardsProps) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  public componentDidMount(): void {
    let testCard: ICard = {
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      type: "AdaptiveCard",
      version: "1.0",
      body: [{
        speak: "Ardbeg is a nice whisky",
        type: "ColumnSet",
        columns: [{
          type: "Column",
          width: 2,
          items: [{
            type: "TextBlock",
            text: "Islay"
          },{
              "type": "TextBlock",
              "text": "Arbeg",
              "weight": "bolder",
              "size": "extraLarge",
              "spacing": "none"
          }]
        }, {
          type: "Column",
          width: 1,
          items: [{
            type:"Image",
              url:"https://picsum.photos/300?image=593",
              size:"auto"
          }]
        }]
      }],
      actions: [{
        type: "Action.OpenUrl",
        title: "More",
        url: "#"
      }]
    };
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
      fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
      // More host config options
    });

    // adaptiveCard.parse(samplecard);
    adaptiveCard.parse(testCard);
    this.renderedCard = adaptiveCard.render();
    this.setState({ isLoading: false });
  }

  public render(): JSX.Element {
    return (
      <div>
        Simple Element
        {/* <div ref={(n) => { n && n.appendChild(this.renderedCard);}} /> */}
        {!this.state.isLoading && <div ref={(n) => { n && n.appendChild(this.renderedCard); }} />}
      </div>
    );
  }
}

