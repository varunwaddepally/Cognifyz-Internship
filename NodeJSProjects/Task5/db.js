const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // or your MySQL username
  password: '', // use your real password
  database: 'taskdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
