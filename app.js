var express = require('express');
var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://teste:123mudar@mongodb-dym7v.mongodb.net/test?retryWrites=true&w=majority");
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

    var usuario2 = new usuarioModel({
        nome: "Usuário2",
        email: "teste2@gmail.com",
        senha: "123456",
        tipo: "Empregado"
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

    const curso1 = new cursoModel(
        {
            titulo: "Páginas WEB",
            instrutor: "Roberva da Silva",
            palavrasChave: [
                "HTML",
                "CSS",
                "JAVASCRIPT"
            ],
            unidades: [unidade1],
            usuarios: [usuario1, usuario2],
            avaliacoes: [avaliacao1],
        }
    );

    // curso1.save((err) => {
    //     if (err) return handleError(err);
    //     return res.json(curso1);
    // });


    var id = "5d082f980e43fb23feff9381";
    cursoModel.find({'usuarios._id': '5d082f980e43fb23feff9381'}, (err, curso) => {
        if (err) {
            console.log(err);
        }

        // console.dir(curso.usuarios.id(xid));

        // var usu = curso.usuarios.filter( (usuX) => {
        //     if(usuX._id == id) {
        //         console.dir(usuX);
        //     }
        // }); 

        console.dir(curso);
    });


    // curso1.findById({'_id': usuario2._id}, (err, usu) => {
    //     console.log(usu);
    // });

    res.json(curso1);

    console.log(cursoModel);


});



var porta = process.env.PORT || 8080;
app.listen(porta);