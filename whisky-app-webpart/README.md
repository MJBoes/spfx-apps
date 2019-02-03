## whisky-app-webpart

https://blog.mastykarz.nl/build-multi-page-sharepoint-framework-client-side-web-parts-react/
https://github.com/SharePoint/sp-dev-fx-webparts/tree/e04847620126ff7c17e2106e61596a9641eba7b5/samples/react-multipage
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/use-web-parts-full-width-column
https://support.office.com/en-us/article/manage-the-site-collection-app-catalog-928b9b61-a9de-4563-a7d1-6231aa9d4d19
https://github.com/SharePoint/sp-dev-training-spfx-graph-3rdpartyapis
https://pnp.github.io/generator-spfx/
https://adaptivecards.io/samples/
https://mertarauh.com/tutorials/typescript-design-patterns/builder-pattern/
https://developer.microsoft.com/en-us/sharepoint/blogs/updated-sharepoint-framework-developer-training-package-now-available-2019/

Nog uitzoeken Markdown-It installatie en toepassing op adaptivecards

md whisky-app-webpart
cd whisky-app-webpart
yo @microsoft/sharepoint
npm install sp-rest-proxy --save-dev
npm install concurrently --save-dev
Aanpassen "scripts" sectie in package.json om met "npm run serve" commando alles te starten:
    "proxy": "node ./proxy",
    "serve": "concurrently --kill-others \"npm run proxy\" \"gulp serve\""
Update web part manifest to enable full width view (add "supportsFullBleed": true, after requiresCustomScript)
gulp package-solution

"npm run serve" start proxy en local dev. Rest werkt, full width waarschijnlijk ook. Volgende: hoe een async view te maken en hoe multipage

==== GIT created new repo spfx-apps ==========
git init (in d:\data\spfx-apps)
git remote add origin https://github.com/MJBoes/spfx-apps.git
Added .gitignore (content: node_modules/**)
git add .
git push -u origin master

=== Deploy ===
gulp bundle --ship
gulp package-solution --ship

=== upgrade 1.7 ===
See http://www.andrewconnell.com/blog/sharepoint-framework-v1-7-0-what-s-in-the-latest-update-of-spfx
npm outdated --global // no outdated stuff
npm outdated // both @microsoft/generator-sharepoint and @microsoft/sp-office-ui-fabric-core are (outdated) version 1.6.0
npm install @microsoft/generator-sharepoint --save-dev
npm install @microsoft/sp-office-ui-fabric-core
npm install --save office-ui-fabric-react
npm uninstall @microsoft/sp-office-ui-fabric-core --save
npm uninstall --save office-ui-fabric-react
npm install --save office-ui-fabric-react@5.124.0

=== Test deploy ===
Upload in /sites/appcat
Gebruiken in /sites/communication-showcase-spfx/SitePages/Waiting-for-SPFX-full-page.aspx

=== whisky-app-webpart, reactAdaptiveCardsImageGallery
npm install adaptivecards --save
npm install markdown-it --save
npm install --save @types/markdown-it
Opgenomen in de global namespace in DataservicesWebPart.ts door:
* import * as markdownit from 'markdown-it';
* (<any>window).markdownit=()=>markdownit();


Changed tslint.json to handle syntax for adaptivecards:
replaced "no-unused-expression": true, with "no-unused-expression": [true, "allow-fast-null-checks"],

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
  
  npm install @microsoft/microsoft-graph-types --save-dev
  
### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
