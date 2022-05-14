# Shopify-Developer-Intern-Challenge-Backend-Fall-2022

## Introduction
This web app is created for Shopify's [Backend Developer Intern Technical Challenge](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit). I chose to implement the "Ability to create warehouses/locations and assign inventory to specific locations" as the additional feature to the basic CRUD operations of Inventory items.

The web app is deployed [**here**](https://inventory-tracker-chengjie.herokuapp.com/) at Heroku.

I used Heroku instead of Replit to deploy my Shopify Technical Challenge Submission. This is because I encountered a series of network problems on replit, such as
-	an "Invalid Host header" error when loading the React frontend
-	a "net::ERR_CONNECTION_REFUSED" when React attempts to send an API request to the MongoDB backend through a proxy.

I researched online but couldn't find a nice and clean way to solve these problems. Therefore, I decided to use Heroku, which is an equally stable and easy-to-use platform for deploying Node applications. I hope this serves the purpose of code demo as well, and thank you for reviewing my application! :)

## Install and Run
After the repository is cloned, `cd` into the repo, and run the following commands to run it locally.
```
npm i
npm run clientinstall
npm run dev
```
The `npm run dev` command will run both the frontend and the backend concurrently. The React web app will be launched at its default `3000` port at `localhost`, and the Express backend will be at port `5001`.

## Tool Stack
This is a typical MERN application (MongoDB, Express, React, Node). Express is used as a backend to accept API calls and query the remote MongoDB. The React frontend makes API calls to the Express backend for all the CRUD operations that it needs.

## Project Structure
Backend:
- `server.js` - the main driver of the backend. It initializes Express, connects to the MongoDB, and creates all the routes.
- `config/` - contains configuration constants including the mongoDB URI and the secret key for jwt.
- `models/` - contains the schemas for the MongoDB. There are two data schemas used, `models/Inventory.js` and `models/Warehouse.js`.
  - `models/Inventory.js` contains three custom fields (name, quantity, and warehouse as an `ObjectId`) + an auto-generated ObjectId hash.
  - `models/Warehouse.js` contains two custom fields (name and city) + ObjectId hash.
- `routes/` - contains the API routes for `Inventory` and `Warehouse`.
  - The APIs for `Inventory` include the basic `CRUD` operations.
  - The APIs for `Warehouse` only include `GET` and `POST`. More details of the backend APIs will be explained in detail soon.

Frontend:
- `client/` - contains everything of the React frontend.

## Backend APIs
There are two sets of APIs, one for each data schema in MongoDB.
### Inventory
- `GET /inventory` - fetches all the inventories in the MongoDB. As the dataset scales, a query could be added to only fetch inventories in a specific warehouse in the future.
- `POST /inventory` - creates an `Inventory` item in the database according to `req.body`. Fields in `res.body` are validated by an `express-validator` with corresponding patterns to ensure that input from the request is valid.
- `PUT /inventory/:id` - updates an `Inventory` item according to `req.body`. The item could be partially updated, meaning `req.body` does not have to be a full `Inventory` object.
- `DELETE /inventory/:id` - deletes an `Inventory` item with `:id`.
### Warehouse
- `GET /warehouse` - reads all the warehouses in the MongoDB.
- `POST /warehouse` - creates a `Warehouse` in the MongoDB.

