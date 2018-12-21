const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-directory')

//Makin a model! The M in MVC. The Data Layer. This model lets us write and read data from MongoDB database with Mongoose
const Client = mongoose.model('Client', {
  name: String,
  description: String
});

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Route: INDEX
app.get('/', (req, res) => {
  Client.find()
    .then(clients => {
      res.render('clients-index', { clients: clients });
    })
    .catch(err => {
      console.log(err);
    })
});

//Route: NEW
app.get('/clients/new', (req, res) => {
  res.render('clients-new', {});
});

//Route: CREATE
app.post('/clients', (req, res) => {
  Client.create(req.body).then((client) => {
    console.log(client);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
