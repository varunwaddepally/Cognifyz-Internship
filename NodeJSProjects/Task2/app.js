const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/submit', (req, res) => {
  const { username, email, age, gender } = req.body;

  if (parseInt(age) < 18) {
    res.render('index', {
      error: 'Age must be 18 or above to submit the form.',
    });
  } else {
    res.render('response', { username, email, age, gender });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
