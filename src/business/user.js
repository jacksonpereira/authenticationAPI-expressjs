const jwt = require("jsonwebtoken");
const serviceDatabase = require("../services/database")();
const Sequelize = require("sequelize");
const logger = require('../../logs/index')();

module.exports = () => {
  return {
    login: (req, res) => {
      console.log(req.body);
      serviceDatabase.find({
          where: {
            [Sequelize.Op.and]: [{
                email: req.body.email
              },
              {
                password: req.body.password
              }
            ]
          }
        })
        .then((result) => {
          if (!result) {
            logger.info(new Date(), req.method, req.url, req.hostname, 'Login inválido!');
            return res.status(403).json({
              message: "Login inválido!"
            });
          }
          var id = result.id;
          var token = jwt.sign({
              id
            },
            process.env.SECRETJWT, {
              // process.env.EXPIRESIN
              expiresIn: 1800
            } // expires in 30mins
          );
          return res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch((err) => {
          logger.error(new Date(), req.method, req.url, req.hostname, 'Erro ao logar!');
          return res.status(500).send({
            message: err
          });
        })
    },

    // Verificar se realmente é necessário
    logout: (req, res) => {
      res.status(200).send({
        auth: false,
        token: null
      });
    },

    verify: (req, res, next) => {
      var token = req.headers['authorization'];
      if (!token) return res.status(401).redirect("https://igti.instructure.com/login/canvas");
      jwt.verify(token, process.env.SECRETJWT, function (err, decoded) {
        if (err) {
          return res.status(403).redirect("https://www.origamid.com/minha-conta/");
        }
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        return res.status(200).json({
          decoded: decoded
        });
      });
    }
  }
}