const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const config = require('config');
const mainRoutes = require("routes/main");

const database = require('lib/database');
const session = require('koa-session');

const app = new Koa();
app.keys = ['some secret hurr'];

app.init = async () => {
  app.use(cors({
    credentials: true
  }));

  app.use(session(app));
  app.use(bodyParser());
  await database.sync()
  app.context.sequelize = database;

  app.use(mainRoutes);
};

module.exports = app;