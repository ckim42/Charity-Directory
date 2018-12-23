//INITIALIZATIONS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-directory');
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

//MODEL
const Client = require('./models/client')
const Donation = require('./models/donation')

//CONTROLLERS
const clientsController = require('./controllers/clients');
const donationsController = require('./controllers/donations');
clientsController(app);
donationsController(app);

const port = process.env.PORT || 3000
// Mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost.27017/charity-directory"; mongoose.connect(mongoUri, { useNewUrlParser: true } );

//WEB SERVER CHECK
app.listen(port, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;
