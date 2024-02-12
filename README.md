# Web Socket IO Project

- Simple project using webSocket in order to understand how it works. Features developed:

* Real time communication between active sessions
* Integration between back end and front end
* Data persistency through mongoDB
* Able to register user in its' database

## How to run

Install Dependencies:

```
yarn install
```

Compile code:

```
yarn compile
```

Create a .env file and define the following variables to connect to the mongoDB server:

- CONNECTION_STRING
- DATABASE_NAME
- DOCUMENT_COLLECTION
- USER_COLLECTION

Where:

- CONNECTION_STRING -> Mongo DB Authentication string.
- DATABASE_NAME -> Name of the database being used.
- DOCUMENT_COLLECTION -> Name of the collection where the document data is stored.
- USER_COLLECTION -> Name of the collection where the user data is stored.

Run Project:

```
yarn dev
```
