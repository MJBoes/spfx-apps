//https://adaptivecards.io/designer/
export let designer={
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "text": "Single Malt"
        },
        {
            "type": "TextBlock",
            "size": "Large",
            "weight": "Bolder",
            "text": "Ardbeg 18-year-old"
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
                                    "type": "FactSet",
                                    "facts": [
                                        {
                                            "title": "Distillery",
                                            "value": "Ardbeg"
                                        },
                                        {
                                            "title": "Bottler",
                                            "value": "Douglas Laing (DL)"
                                        },
                                        {
                                            "title": "Bottling serie",
                                            "value": "Old Malt Cask"
                                        },
                                        {
                                            "title": "Vintage",
                                            "value": "03.1991"
                                        },
                                        {
                                            "title": "Bottled",
                                            "value": "04.2009"
                                        },
                                        {
                                            "title": "Stated Age",
                                            "value": "18 years old"
                                        },
                                        {
                                            "title": "Cask Type",
                                            "value": "Refill Hogshead"
                                        }
                                    ]
                                }
                            ],
                            "width": 60
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": "data:image/jpeg;base64,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"
                                }
                            ],
                            "width": 40
                        }
                    ]
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Distillery",
            "iconUrl": "https://www.thespiritsbusiness.com/content/http://www.thespiritsbusiness.com/media/2018/02/Ardbeg-1.jpg",
            "card": {
                "type": "AdaptiveCard",
                "style": "emphasis",
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "id": "dist1",
                        "title": "Ardbeg distillery",
                        "url": "#"
                    },
                    {
                        "type": "Action.OpenUrl",
                        "id": "dist2",
                        "title": "Macallan distillery",
                        "url": "#"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.ShowCard",
            "title": "Bottler",
            "iconUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTyrp5u0FApj2Mo1YHOOngpuYOw0-aQOyrikhrr5jMd6p2MXEfA",
            "card": {
                "type": "AdaptiveCard",
                "style": "emphasis",
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "id": "bottler1",
                        "title": "Douglas Laing",
                        "url": "#"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.ShowCard",
            "title": "Brand",
            "iconUrl": "https://i.pinimg.com/originals/01/77/9a/01779a791cc227e70c72c91ca9ee39cb.jpg",
            "card": {
                "type": "AdaptiveCard",
                "style": "emphasis",
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "id": "Brand1",
                        "title": "Old Malt Cask",
                        "url": "#"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
};