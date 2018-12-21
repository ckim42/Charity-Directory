const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-directory')

//Makin a model! The M in MVC. The Data Layer. This model lets us write and read data from MongoDB database with Mongoose
const Client = mongoose.model('Client', {
  name: String,
  description: String
});

// //mock array
// let clients = [
//   { name: "John Smith", description: "likes animals" },
//   { name: "Ella Hill", description: "environmentalist" }
// ]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  Client.find()
    .then(clients => {
      res.render('clients-index', { clients: clients });
    })
    .catch(err => {
      console.log(err);
    })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
