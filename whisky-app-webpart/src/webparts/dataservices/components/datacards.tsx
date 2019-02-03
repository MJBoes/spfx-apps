import * as React from 'react';
import * as AdaptiveCards from "adaptivecards";

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

export interface IDataCardsState {
    isLoading: boolean;
}

export interface IDataCardsProps {
    title: string;
    group: string;
    description?: string;
    facts?: {
        title: string;
        value: string;
    }[];
    imageurl: string;
    actions?: {
        title: string;
        icon: string;
        card: {
            action: {
                title: string;
                url: string;
            }[];
        }
    }[];
}

export class ExportedComponent extends React.Component<IDataCardsProps, IDataCardsState> {
    private renderedCard: HTMLElement;

    constructor(props: IDataCardsProps) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    private mincard() {
        return (
            {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `[${this.props.title}](http://google.com)`,
                                "size": "Medium",
                            },
                            {
                                "type": "FactSet",
                                "spacing":"None",
                                "facts": [
                                    {
                                        "title": "Distillery",
                                        "value": "Value 1"
                                    },
                                    {
                                        "title": "Bottler",
                                        "value": "Value 2"
                                    },
                                    {
                                        "title": "Brand",
                                        "value": "Value 2"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.0"
            }
        );
    }

    private maxcard() {
        return (
            {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": this.props.group
                    },
                    {
                        "type": "TextBlock",
                        "size": "Large",
                        "weight": "Bolder",
                        "text": this.props.title
                    },
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": this.props.description
                                                //"text": "# markdown-it rulezz!"
                                            },
                                            {
                                                "type": "FactSet",
                                                "facts": this.props.facts
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
                                                "wrap": true
                                            }
                                        ],
                                        "width": 60
                                    },
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "Image",
                                                "url": this.props.imageurl,
                                            }
                                        ],
                                        "width": 40
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.0"
            }
        );
    }

    public componentDidMount(): void {
        let card = this.maxcard();
        // let card ={
        //     "type": "AdaptiveCard",
        //     "body": [
        //         {
        //             "type": "TextBlock",
        //             "text": this.props.group
        //         },
        //         {
        //             "type": "TextBlock",
        //             "size": "Large",
        //             "weight": "Bolder",
        //             "text": this.props.title
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "ColumnSet",
        //                     "columns": [
        //                         {
        //                             "type": "Column",
        //                             "items": [
        //                                 {
        //                                     "type": "TextBlock",
        //                                     "text": this.props.description
        //                                     //"text": "# markdown-it rulezz!"
        //                                 },
        //                                 {
        //                                     "type": "FactSet",
        //                                     "facts": this.props.facts
        //                                 },
        //                                 {
        //                                     "type": "TextBlock",
        //                                     "text": "It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)",
        //                                     "wrap": true
        //                                 }
        //                             ],
        //                             "width": 60
        //                         },
        //                         {
        //                             "type": "Column",
        //                             "items": [
        //                                 {
        //                                     "type": "Image",
        //                                     "url": this.props.imageurl,
        //                                 }
        //                             ],
        //                             "width": 40
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ],
        //     "actions": [
        //         {
        //             "type": "Action.ShowCard",
        //             "title": "Distillery",
        //             // "iconUrl": "https://www.thespiritsbusiness.com/content/http://www.thespiritsbusiness.com/media/2018/02/Ardbeg-1.jpg",
        //             "card": {
        //                 "type": "AdaptiveCard",
        //                 "style": "emphasis",
        //                 "actions": [
        //                     {
        //                         "type": "Action.OpenUrl",
        //                         "id": "dist1",
        //                         "title": "Ardbeg distillery",
        //                         "url": "#"
        //                     },
        //                     {
        //                         "type": "Action.OpenUrl",
        //                         "id": "dist2",
        //                         "title": "Macallan distillery",
        //                         "url": "#"
        //                     }
        //                 ],
        //                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        //             }
        //         },
        //         {
        //             "type": "Action.ShowCard",
        //             "title": "Bottler",
        //             // "iconUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTyrp5u0FApj2Mo1YHOOngpuYOw0-aQOyrikhrr5jMd6p2MXEfA",
        //             "card": {
        //                 "type": "AdaptiveCard",
        //                 "style": "emphasis",
        //                 "actions": [
        //                     {
        //                         "type": "Action.OpenUrl",
        //                         "id": "bottler1",
        //                         "title": "Douglas Laing",
        //                         "url": "#"
        //                     }
        //                 ],
        //                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        //             }
        //         },
        //         {
        //             "type": "Action.ShowCard",
        //             "title": "Brand",
        //             // "iconUrl": "https://i.pinimg.com/originals/01/77/9a/01779a791cc227e70c72c91ca9ee39cb.jpg",
        //             "card": {
        //                 "type": "AdaptiveCard",
        //                 "style": "emphasis",
        //                 "actions": [
        //                     {
        //                         "type": "Action.OpenUrl",
        //                         "id": "Brand1",
        //                         "title": "Old Malt Cask",
        //                         "url": "#"
        //                     }
        //                 ],
        //                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        //             }
        //         }
        //     ],
        //     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        //     "version": "1.0"
        // };

        var adaptiveCard = new AdaptiveCards.AdaptiveCard();
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
            // More host config options
        });
        //adaptiveCard.parse(samplecard);
        adaptiveCard.parse(card);
        //adaptiveCard.parse(designer);
        this.renderedCard = adaptiveCard.render();
        this.setState({ isLoading: false });
    }

    public render(): JSX.Element {
        return (
            <div>
                {/* <div ref={(n) => { n && n.appendChild(this.renderedCard);}} /> */}
                {!this.state.isLoading && <div ref={(n) => { n && n.appendChild(this.renderedCard); }} />}
            </div>
        );
    }
}

