Example
https://github.com/SharePoint/sp-dev-fx-webparts/blob/master/samples/react-adaptive-cards-image-gallery/src/webparts/adaptiveCardsImageGallery/AdaptiveCardsImageGalleryWebPart.manifest.json

npm install adaptivecards --save

#Instellen toegang Graph voor SharePoint Online Client Extensibility Web Application Principal
https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
App registrations, All apps, SharePoint Online Client Extensibility Web Application Principal
Choose "Settings" > "Required Permissions"
  - Click "Add"
    - "Select an API" and choose "MS Graph", press "Select"
    - "Select Permissions" and choose "Read all users' basic profiles", press "Select"
  - Click "Done"
  - Click "Grant permissions" and "Yes"
  => werkt: {@odata.context: "https://graph.microsoft.com/v1.0/$metadata#users/$entity", businessPhones: Array(1), displayName: "Marc Boes", givenName: "Marc", jobTitle: null, …}