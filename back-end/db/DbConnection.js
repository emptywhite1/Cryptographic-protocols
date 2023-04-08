const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'cryptographic_protocols',
  connectionLimit: 10
});


db.getConnection()
  .then((connection) => {
    console.log('Connected to database!');
    connection.release();
  })
  .catch((error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Database access denied.');
    }
    console.error(error);
  });
module.exports = db;
