const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-directory')

//Makin a model! The M in MVC. The Data Layer. This model lets us write and read data from MongoDB database with Mongoose
const Client = mongoose.model('Client', {
  name: String,
  description: String
});

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
    res.redirect('/clients/${client._id}'); //Redir to clients/:id
  }).catch((err) => {
    console.log(err.message);
  })
});

//Route: SHOW
app.get('/clients/:id', (req, res) => {
  Client.findById(req.params.id).then((client) => {
    res.render('clients-show', { client: client })
  }).catch((err) => {
    console.log(err.message);
  })
});

//Route: EDIT
app.get('/clients/:id/edit', (req, res) => {
  Client.findById(req.params.id, function(err, client) {
    res.render('clients-edit', {client: client});
  })
});

//Route: UPDATE
app.put('/clients/:id', (req, res) => {
  Client.findByIdAndUpdate(req.params.id, req.body)
    .then(client => {
      res.redirect(`/clients/${client._id}`)
    })
    .catch(err => {
      console.log(err.messagae)
    })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
