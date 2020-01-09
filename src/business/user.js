const jwt = require("jsonwebtoken");

module.exports = ()=>{
    return {
        login: (req, res)=>{
            if (req.body.user === "jackson" && req.body.pwd === "123") {
                //auth ok
                const id = 1; //esse id viria do banco de dados
                var token = jwt.sign(
                  {id},
                  process.env.SECRETJWT,
                  { expiresIn: 1800 } // expires in 30mins
                );
                return res.status(200).send({
                  auth: true,
                  token: token
                });
              }
            
              return res.status(500).send("Login inválido!");
        },

        // Verificar se realmente é necessário
        logout: (req, res)=>{
            res.status(200).send({ auth: false, token: null });
        },

        verify: (req, res, next)=>{
          var token = req.headers['authorization'];
          if (!token) return res.status(401).redirect("https://igti.instructure.com/login/canvas");
            jwt.verify(token, process.env.SECRETJWT, function(err, decoded) {
              if (err) return res.status(403).redirect("https://www.origamid.com/minha-conta/");
              
              // se tudo estiver ok, salva no request para uso posterior
              req.userId = decoded.id;
              return res.status(200).json({decoded: decoded});
            });
        }
    }
}