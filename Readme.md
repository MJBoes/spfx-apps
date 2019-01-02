=== https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment ===
npm install -g yo gulp // eerste poging niet global, maar dat duurt te lang om uit te zoeken of dat werkbaar te krijgen is.
npm install @microsoft/generator-sharepoint --save-dev (of -g hier, of --save-dev in projectfolder)

=== https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part ===
md helloworld-webpart
cd helloworld-webpart
yo @microsoft/sharepoint
gulp trust-dev-cert
Check https://desktopservices.sharepoint.com/sites/ux/_layouts/15/workbench.aspx
// die zuigt. http://blog.arvosys.com/2017/11/27/spfx-workbench-against-real-sharepoint-api/index.html
npm install sp-rest-proxy --save-dev
node ./proxy
nieuw terminal,
npm i sp-pnp-js
gulp serve
> Het werkt. Wel raar: proxy is http, maar de boel rendert lijstwerk uit tenant terwijl de locale workbench gebruikt wordt.
npm install concurrently --save-dev
Aanpassen "scripts" sectie in package.json om met "npm run serve" commando alles te starten:
    "proxy": "node ./proxy",
    "serve": "concurrently --kill-others \"npm run proxy\" \"gulp serve\""
> Werkt (check http://localhost:8081/_api/web/lists?$filter=Hidden%20eq%20false)

=== App extension ===
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/build-a-hello-world-extension
npm install @microsoft/sp-office-ui-fabric-core
> Werkt

=== Real project ===
https://blog.mastykarz.nl/build-multi-page-sharepoint-framework-client-side-web-parts-react/
https://github.com/SharePoint/sp-dev-fx-webparts/tree/e04847620126ff7c17e2106e61596a9641eba7b5/samples/react-multipage
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/use-web-parts-full-width-column
https://support.office.com/en-us/article/manage-the-site-collection-app-catalog-928b9b61-a9de-4563-a7d1-6231aa9d4d19
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