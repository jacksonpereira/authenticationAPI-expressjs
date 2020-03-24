const jwt = require("jsonwebtoken");
const serviceDatabase = require("../services/database")();
const Sequelize = require("sequelize");
const logger = require("../../logging/index")();

module.exports = () => {
  return {
    login: (req, res) => {
      serviceDatabase
        .find({
          where: {
            [Sequelize.Op.and]: [
              {
                email: req.body.email
              },
              {
                password: req.body.password
              }
            ]
          }
        })
        .then(result => {
          // Se as credenciais não forem válidas
          if (!result) {
            logger.info(req.method, req.hostname, req.url, "Login inválido!");
            return res.status(403).json(result);
          }

          var id = result.id;
          var token = jwt.sign(
            {
              id
            },
            process.env.SECRETJWT,
            {
              // process.env.EXPIRESIN
              expiresIn: 1800
            } // expires in 30mins
          );
          return res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch(err => {
          logger.error(req.method, req.hostname, req.url, "Erro ao logar!");
          return res.status(500).send({
            message: err
          });
        });
    },

    // Verificar se realmente é necessário
    logout: (req, res) => {
      res.status(200).send({
        auth: false,
        token: null
      });
    },

    verify: (req, res, next) => {
      var token = req.headers["authorization"];
      if (!token) {
        console.log("No token: 401");
        return res.status(401);
      }

      try {
        var decoded = jwt.verify(token, process.env.SECRETJWT);
        console.log("OK: 200");
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        return res.status(200).json(decoded);
        // return next();
      } catch (err) {
        console.log("Token error: 403");
        req.userId = 666;
        return res.status(300).json(err);
        // return next();
      }
    }
  };
};
