const http = require('http');
const {
  Sequelize
} = require("sequelize");

const app = require('./config/server')();
const connection = new Sequelize(require('./config/database'));
const logger = require('./logging/index')();

// Import de controlers
// app.use(require('./src/controllers/user')(app));

// Testando a conexão do banco
connection
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    http.createServer(app).listen(app.get('port'), () => {
      console.log(`API authentication listen on ${process.env.PORT} port`);
    });
  })
  .catch(err => {
    console.log('Database connection error.');
  });