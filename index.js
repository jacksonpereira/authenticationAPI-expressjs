const http = require('http');
const app = require('./config/server')();

// Import de controlers
// app.use(require('./src/controllers/user')(app));

http.createServer(app).listen(app.get('port'), ()=>{
  console.log(`API authentication listen on ${process.env.PORT} port`);
});