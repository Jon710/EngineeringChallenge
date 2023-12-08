# How to run it

## Backend
The bellsant.sql file is the schema that needs to be created for the app to work properly.

```
git clone <repo>
cd backend
docker-compose up -d
yarn
yarn start
```
## Mobile
```
cd native-app
yarn
yarn start
```
## API DOCS
This is only a helper with the most important API endpoints.

```
POST /machine-health - saves health scores (in memory)
POST /machines - saves a json with all health scores from different machines to database
GET /user/:userId/machine-state - returns machine scores of a given user basend on the current date to display on a graph
```