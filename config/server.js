const express = require("express");
const load = require('express-load');

require("dotenv-safe").config();

module.exports = () => {
    var app = express();

    app.set('port', process.env.PORT);

    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: false
        })
    );
    app.use(require('method-override')());

    load('domains', {
            cwd: 'src'
        })
        .then('services')
        .then('business')
        .then('controllers')
        .into(app);

    return app;
}