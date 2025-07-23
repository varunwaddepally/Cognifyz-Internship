const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));  

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { username, email } = req.body;
  res.render('response', { username, email });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
