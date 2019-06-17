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
    // res.send('teste');

    var usuario1 = new usuarioModel({
        nome: "Nome",
        email: "Email",
        senha: "Senha",
        tipo: "Tipo"
    });
    
    var avaliacao1 = new avaliacaoModel({
        usuario: [usuario1],
        nota: 5,
        comentario: "COMENT"
    });
    
    var arquivo1 = new arquivoModel(
        {
            titulo: "Notas de aula",
            link: "https://www.com.br/notas.pdf",
        }
    );
    
    var arquivo2 = new arquivoModel(
        {
            titulo: "Resumo das aulas",
            link: "https://www.com.br/resumos.pdf",
        }
    );
    
    var video1 = new videoModel(
        {
            titulo: "Video da aula 1",
            link: "https://www.com.br/video1.mp4",
            vistoPor: [usuario1]
        }
    );
    
    var alternativa1 = new alternativaModel(
        {
            alternativa: "HTML5",
            correta: false
        }
    );
    
    var alternativa2 = new alternativaModel(
        {
            alternativa: "CSS3",
            correta: true
        }
    );
    
    var questao1 = new questaoModel(
        {
            pergunta: "É uma linguagem de folha de estilos:",
            alternativas: [
                alternativa1,
                alternativa2
            ],
            respostas: []
        }
    );
    
    var questionario1 = new questionarioModel(
        {
            titulo: "Questionário unidade 1",
            questoes: [questao1],
        }
    );
    
    var unidade1 = new unidadeModel(
        {
            titulo: "UNIDADE 1",
            videos: [video1],
            arquivos: [
                arquivo1,
                arquivo2
            ],
            questionarios: [questionario1],
    
        }
    );
    
    var curso1 = new cursoModel(
        {
            titulo: "Páginas WEB",
            instrutor: "Roberva da Silva",
            palavrasChave: [
                "HTML",
                "CSS",
                "JAVASCRIPT"
            ],
            unidades: [unidade1],
            usuarios: [usuario1],
            avaliacoes: [avaliacao1], 
        }
    );

    res.json(curso1);
    
    console.log(curso1);

    
});



var porta = process.env.PORT || 8080;
app.listen(porta);