const Client = require('../models/client');
const express = require('express');
const app = express();

module.exports = (app, review) => {

  //Route: INDEX
  app.get('/', (req, res) => {
    Client.find()
      .then(clients => {
        res.render('clients-index', {clients: clients});
      })
      .catch(err => {
        console.log(err);
      });
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
    Client.findById(req.params.id).then((review) => {
      res.render('clients-edit', {client: client})
    }).catch((err) => {
      console.log(err.message);
    })
  });

  //Route: UPDATE
  app.put('/clients/:id', (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
    .then(client => {
        console.log(client);
        res.redirect(`/clients/${client._id}`)
      })
      .catch(err => {
        console.log(err.messagae)
      });
  });

  //Route: DESTROY
  app.delete('/clients/:id', function (req, res) {
    console.log("DELETE client")
    Client.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

}
