const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use((err, req, res, next) => {

    console.error(err);
    if (err instanceof SyntaxError) {
        res.send({statusCode: 400, message: 'The body of your request is not valid json!'});
    }
    else {
        res.send({statusCode: 500, message: err});
    }

});

app.use(require('./routes/routes'));

let port = process.env.PORT || 5000;

let server = app.listen(port, function () {
    console.log("app running on port.", server.address().port);
});