const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.username) return next();
  res.redirect('/');
}

app.get('/', (req, res) => {
  if (req.session.username) {
    res.render('dashboard', { username: req.session.username });
  } else {
    res.render('login');
  }
});

// Register
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.send('User already exists or error occurred');
    res.redirect('/');
  });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
      req.session.username = username;
      res.redirect('/');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Forgot Password
app.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { message: null });
});

app.post('/forgot-password', async (req, res) => {
  const { username, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.render('forgot-password', { message: 'Username not found or error occurred.' });
    }
    res.render('forgot-password', { message: 'Password updated successfully.' });
  });
});

// Dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { username: req.session.username });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
