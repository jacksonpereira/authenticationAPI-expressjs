const express = require("express");
const app = express();

require("dotenv-safe").config();
var jwt = require("jsonwebtoken");

// var bodyParser = require("body-parser");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.post("/login", (req, res, next) => {
  if (req.body.user === "jackson" && req.body.pwd === "123") {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign(
      { id },
      process.env.SECRET,
      { expiresIn: 300 } // expires in 5min
    );
    return res.status(200).send({
      auth: true,
      token: token
    });
  }

  return res.status(500).send("Login inválido!");
});

app.listen(process.env.PORT, () => {
  console.log(`API authentication listen on ${process.env.PORT} port`);
});
