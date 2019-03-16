## dossier-solution-examples

### Install notes
Connect-SPOService https://desktopservices-admin.sharepoint.com
$site = Get-SPOSite https://desktopservices.sharepoint.com/sites/DossierSolutionExamples
Add-SPOSiteCollectionAppCatalog -Site $sit

md DossierSolutionExamples
cd DossierSolutionExamples
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
npm install markdown-it --save
npm install --save @types/markdown-it
npm install adaptivecards --save

Changed tslint.json to handle syntax for adaptivecards:
replaced "no-unused-expression": true, with "no-unused-expression": [true, "allow-fast-null-checks"],
Added "jsx-no-lambda": false to tslint.json

### Data Design notes
The information items are constructed such, that the have a code, a referencesTo and/or a referencedBy property, a title and description and an icon reference.
The icon reference is for example 'aa', and refers to a file like 'dossierassets/flags/aa-lgflag.gif'. This transformation is left to a calculated field 'entIconSiteAssetsRelativeUrl'.
THe assumption is that for a particular subject, 4 types of information items suffice, with a possible sub items.
As an example the CIA factbook is taken. The information types are:
- geo (continents, areas and so forth)
- countries (relating to one or more continents/areas, for example France and Holland have parts in different continents)
- international organisations (grouping effectively different countries)
- sub types are needed to group information in topics, for example Geography, Economy or Transport are sub items under a country.
- a sub-sub type, for example for different years, is considered. For now a two level hierarchy is taken, as this would involve a matrix which complicates a solution in the POC phase.

### React Development notes
This web part will render a relational list item structure where files can be linked. Basically, files *are* considered metadata of an information item. A file can have meta data as well off course, but that is secundary.

#### UX
The main container can display either a configuration intruction, a tab / list view to navigate to information items and a item detail view.
Each type will be interfaced with a searchable list. In a detail view, information item referencesTo and referencedBy are undoubled first and displayed as links, grouped by the information type. These links will act the same as if they where selected in the list view.
Files will be displayed as in a spfx listview control.

#### Data
Support both for local (mock) and SharePoint backend. Reference: https://www.eliostruyf.com/exclude-your-mock-data-and-other-modules-from-your-production-bundle-in-spfx/

State candidates op main component (keep all state stuff on top level for now)
- dataprovider (adapter pattern), containing currentList and getByCode, getById, getByFilter functionalities
- viewType
- itemId

**All props under review / refactor consideration**
Property candidates on main component
- title: string;
- dossierTypes: string[];
- webPartDisplayMode: DisplayMode;
- dataProvider: IDataProvider;
- handleSelectList?(dossierType:string):void;
- handleSelectItem?(dossierItem: IDossierListItem):void;

Property candidates on viewList component
- displayedDossiers: IDossierListItem[];
- dossierTypes: string[];
- selectedDossierType: string;
- handleSelectItem?(dossierItem: IDossierListItem): void;
- handleFilterItems?(dossierType: string): void;
- handleSelectList?(dossierType: string): void;

Property candidates on menuPivot component

Property candidates on viewListItem component
- item: IDossierListItem;
- onSelectItem(dossierItem: IDossierListItem): void;

Property candidates on viewItem component
- selectedDossier: IDossierItemDetails;
- handleSelectItem(dossierItem: IDossierListItem): void;
- handleSelectList(dossierType: string): void;
- handleSelectReference(dossierTypeOrID: string): void;

Property candidates on viewItemLinks component
- dossierTypes: string[];
- selectedDossierType: string;
- onSelectList?(dossierType: string): void;

Property candidates on viewItemListView component
- title: string;
- dossierTypes: string[];
- webPartDisplayMode: DisplayMode;
- dataProvider: IDataProvider;
- handleSelectList?(dossierType: string): void;
- handleSelectItem?(dossierItem: IDossierListItem): void;

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

=== Deploy ===
gulp bundle --ship
gulp package-solution --ship