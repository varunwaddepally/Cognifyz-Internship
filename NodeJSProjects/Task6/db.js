const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Your MySQL username
  password: '',       // Your MySQL password
  database: 'user_auth_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

module.exports = connection;
