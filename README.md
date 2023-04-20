# Cryptographic-protocols

# How to use

- install mysql

- configure the parameter in back-end/db/DbConnection.js file to connect to your database

- add a table named 'schnorr_user' with 'username' and 'password' column, both are varchar type, the password char limit is up to your key length, username is primary key.
```
CREATE TABLE schnorr_user (
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255)
);
```
- Go to front-end directory and run `npm start`

- Go to back-end directory and run  `node index.js`
