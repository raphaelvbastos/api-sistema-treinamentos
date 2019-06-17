var express = require('express');
var mongoose = require('mongoose');

var app = express();

var usuarioModel = require("./models/usuariomodel");
var alternativaModel = require("./models/alternativamodel");
var arquivoModel = require("./models/arquivomodel");
var avaliacaoModel = require("./models/avaliacaomodel");
var cursoModel = require("./models/cursomodel");
var questaoModel = require("./models/questaomodel");
var questionarioModel = require("./models/questionariomodel");
var unidadeModel = require("./models/unidademodel");
var usuarioRespostaModel = require("./models/avaliacaomodel");
var videoModel = require("./models/videomodel");

app.get('/', function (req, res) {
    res.send('teste');

    
});

// var usuario = new usuarioModel({
//     nome: "Nome",
//     email: "Email",
//     senha: "Senha",
//     tipo: "Tipo"
// });

// var a = new avaliacaoModel({
//     usuario: [usuario],
//     nota: 5,
//     comentario: "COMENT"
// });

// console.log(a);

var porta = process.env.PORT || 8080;
app.listen(porta);