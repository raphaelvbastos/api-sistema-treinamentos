var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('teste');
});

var porta = process.env.PORT || 8080;
app.listen(porta);