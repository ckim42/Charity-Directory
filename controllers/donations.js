const Client = require('../models/client');
const Donation = require('../models/donation');
const express = require('express');
const app = express();

module.exports = (app, donation) => {

  //Route: CREATE
  app.post('/clients/donations', (req, res) => {
    Donation.create(req.body).then(donation => {
      console.log(donation)
      res.redirect(`/clients/${donation.clientId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  //Route: DELETE
  app.delete('/clients/donations/:id', (req, res) => {
    Donation.findByIdAndRemove(req.params.id).then(donation => {
      res.redirect(`/clients/${donation.clientId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

}
