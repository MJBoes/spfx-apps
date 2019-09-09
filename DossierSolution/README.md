### Install notes
Connect-SPOService https://desktopservices-admin.sharepoint.com
$site = Get-SPOSite https://desktopservices.sharepoint.com/sites/DossierSolutionExamples
Add-SPOSiteCollectionAppCatalog -Site $sit

md DossierSolution
cd DossierSolution
yo @microsoft/sharepoint
gulp trust-dev-cert
npm install sp-rest-proxy --save-dev
npm install concurrently --save-dev
npm i sp-pnp-js
Aanpassen "scripts" sectie in package.json om met "npm run serve" commando alles te starten:
    "proxy": "node ./proxy",
    "serve": "concurrently --kill-others \"npm run proxy\" \"gulp serve\""
create proxy.js in root and _private.conf.json in config (see http://blog.arvosys.com/2017/11/27/spfx-workbench-against-real-sharepoint-api/index.html)
npm i
gulp bundle --ship
gulp package-solution --ship
Add an App (dossier-solution-examples)
Add web part on https://desktopservices.sharepoint.com/sites/DossierSolutionExamples startpage
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/spfx-property-controls --save --save-exact
npm install typescript@latest

## dossier-solution

This is where you include your WebPart documentation.

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
