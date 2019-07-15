process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const Server = require('../core/Server');
const app = require('../core/App');
const config = require('../config');

chai.should();

chai.use(chaiHttp);

let Cookies, IdeaId;

describe('Application', () => {
  let api;

  before(async () => {
    await app.init();
    let server = new Server(app);
    api = await server.start(config.appPort);
  });

  after(() => {
    api.close();
  });


  describe('/POST user/login', () => {
    it('should user login', done => {
      chai
        .request(api)
        .post('/login')
        .send({
          name: 'Maks',
          password: '123'
        })
        .end((err, res) => {
          res.body.should.have.property('success', 1);
          res.body.should.be.a('object');
          Cookies = res.headers['set-cookie'];
        })
      done();
    })
  })

  describe('/POST Idea', () => {
    it('should POST idea if user logged in', done => {
      let req = chai.request(api).post('/Idea').send({
        title: 'TEST MAKS',
        description: 'Test my description please!!!'
      })
      req.cookies = Cookies;
      req
        .end((err, res) => {
          IdeaId = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title', 'TEST MAKS');
          res.body.should.have.property('description', 'Test my description please!!!');
          done();
        });
    });
  })

  describe('/GET Ideas', () => {
    it('should send error message if user did not log in', done => {
      chai
        .request(api)
        .get('/Ideas')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('success', 0);
          done();
        });
    });

    it('should GET all ideas if user logged in', done => {
      let req = chai.request(api).get('/Ideas');
      req.cookies = Cookies;
      req
        .end((err, res) => {
          res.body.should.be.a('array');
          res.should.have.status(200);
          done();
        });
    });

    it('should GET one idea if user logged in', done => {
      let req = chai.request(api).get(`/Idea/${IdeaId}`);
      req.cookies = Cookies;
      req
        .end((err, res) => {
          res.body.should.be.a('array');
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/PUT Idea', () => {
    it('should PUT one idea if user logged in', done => {
      chai
        .request(api)
        .put(`/Idea/${IdeaId}`)
        .send({
          title: 'TEST PUT',
          description: 'Test my description please!!!(PUT)'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title', 'TEST PUT');
          res.body.should.have.property('description', 'Test my description please!!!(PUT)');
          done();
        });
    })
  })

  describe('/DELETE Idea', () => {
    it('should DELETE one idea if user logged in', done => {
      chai
        .request(api)
        .delete(`/Idea/${IdeaId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          done();
        });
    })
  })
});