Start URL: https://apps.dev.microsoft.com
Create new registration

Name: MJBPostManGraphRegistration
Application ID: 878499e1-484e-459c-b95d-78dfe6c36e7b
Password: pgfSIC20^;[?utaoLYEF874
Platsforms: Web
Redirect URL: https://desktopservices.mjbpostmangraph.com/oauth2/callback
Graph permissions: add sites.read.all to delegated permissions (user.read lalen staan)
Save

Open postman click Authorization and select OAuth 2.0. Click “Get New Access Token”.
Input values as below.
Name: MJBPostManAADGraphTokenName
Grant Type: Authorization Code
Callback Url – this should be the redirect Url we copied from app registration
Auth Url – should be https://login.windows.net/common/oauth2/authorize?resource=https%3A%2F%2Fgraph.microsoft.com
Access Token Url: https://login.microsoftonline.com/common/oauth2/token
Note the resource value is encoded and is https://graph.microsoft.com
Cliend Id – is the application Id we copied during app registration
Client Secret – is the password we copied during app registration
Use Token

