# CZ3003 Backend

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) [![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg)](https://microsoft.github.io/codeofconduct/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Project setup

Make sure to install Mongodb Community Server first [Link](https://www.mongodb.com/try/download/community)

Next, install MongoDB compass (GUI for the database) [Link] (https://www.mongodb.com/products/compass)

Once done, make sure that the mongod service is running.

Go inside compass and create database.
-Database Name set it as "backend"
-Collection Name set it as "users"

After it is completed, run the following commands

To install the node_modules

```
npm install
```

To run the backend application

```
npm run dev
```

To open the swagger UI for endpoint testing

```
http://{hostname}:{port}/api-docs
```

### Environment variables

.env shall contain every credential used using testing/production

Note: When testing, please include in your own credentials.

```
DB_USERNAME={database_username}
DB_PASSWORD={database_password}
BASE_URL=DEPLOYED FRONTEND URL
SENDGRID_API_KEY=SENDGRID_KEY
```

#### File Structure

```
src
+-- Controllers (To perform requests and return http response)
+-- Models (To store the database schema)
+-- Routes (To forward the requests)
app.js
```

Thank you!
