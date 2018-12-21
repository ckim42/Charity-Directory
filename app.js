const express = require('express');
const app = express();
var exphbs = require('express-handlebars');

//mock array
let clients = [
  { name: "John Smith", description: "likes animals" },
  { name: "Ella Hill", description: "environmentalist" }
]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('clients-index', { clients: clients });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
