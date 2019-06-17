var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.write("TESTE");
});

var porta = process.env.PORT || 8080;
app.listen(porta);