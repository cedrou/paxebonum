# paxebonum
Pax et Bonum - Chants liturgiques


----
Prerequisites:
- yarn
- MongoDB
 
> yarn global add express-generator create-react-app
> express --no-view --git backend
> create-react-app frontend

-----

To consider:
- Use containers: https://www.freecodecamp.org/news/put-your-dev-env-in-github/

-----

Azure CLI

az login
az group create --name paxebonum_rg --location "West Europe"
az cosmosdb create --name paxebonumdb --resource-group paxebonum_rg --kind MongoDB
az cosmosdb keys list --name paxebonumdb --resource-group paxebonum_rg  
