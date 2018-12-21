const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Client = require('../models/client');

const sampleClient = {
  "name": "Burton Tothis Taylor",
  "description": "musical aficionado"
}

chai.use(chaiHttp);

describe('Clients', ()  => {

  after(() => {
    Client.deleteMany({Name: 'Burton Tothis Taylor'}).exec((err, clients) => {
      console.log(clients)
      clients.remove();
    })
  });

  // TEST INDEX
  it('should index ALL clients on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /clients/new GET', (done) => {
    chai.request(server)
      .get(`/clients/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST CREATE
  it('should create a SINGLE client on /clients POST', (done) => {
      chai.request(server)
          .post('/clients')
          .send(sampleClient)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
    });

  // TEST SHOW
  it('should show a SINGLE client on /clients/<id> GET', (done) => {
    var client = new Client(sampleClient);
    client.save((err, data) => {
      chai.request(server)
        .get(`/clients/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE client on /clients/<id>/edit GET', (done) => {
  var client = new Client(sampleClient);
   client.save((err, data) => {
     chai.request(server)
       .get(`/clients/${data._id}/edit`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
   });
  });

  // TEST UPDATE
  it('should update a SINGLE client on /clients/<id> PUT', (done) => {
      var client = new Client(sampleClient);
      client.save((err, data)  => {
       chai.request(server)
        .put(`/clients/${data._id}?_method=PUT`)
        .send({'name': 'Updating the name'})
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
      });
    });

  // TEST DELETE
  it('should delete a SINGLE client on /clients/<id> DELETE', (done) => {
    var client = new Client(sampleClient);
    client.save((err, data)  => {
     chai.request(server)
      .delete(`/clients/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});
