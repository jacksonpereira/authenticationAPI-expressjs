const express = require("express");
const load = require("express-load");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

require("dotenv-safe").config();

module.exports = () => {
    var app = express();

    app.set("port", process.env.PORT);

    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: false
        })
    );
    app.use(require("method-override")());

    // Logger
    // const accessLogStream = fs.createWriteStream(
    //     path.join(__dirname, "access.log")
    // );
    // app.use(morgan(":date[iso] :method :url :status :res[header]"), (req, res, next) => {
    //     res.pipe(accessLogStream);
    //     next()
    // });

    load("domains", {
            cwd: "src"
        })
        .then("services")
        .then("business")
        .then("controllers")
        .into(app);

    return app;
};