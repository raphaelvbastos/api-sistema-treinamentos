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
var usuarioRespostaModel = require("./models/usuarioresposta");
var usuarioTipoModel = require("./models/usuariotipomodel");
var videoModel = require("./models/videomodel");

app.get('/', function (req, res) {
    // res.send('teste');

    var usuarioTipo1 = new usuarioTipoModel({
        tipo: "Administrador"
    });

    usuarioTipo1.save(function(erro){
        if(erro) return console.error(erro);
        // console.log("SALVOU TIPO1");
    });

    var usuarioTipo2 = new usuarioTipoModel({
        tipo: "Empregado"
    });

    usuarioTipo2.save(function(erro){
        if(erro) return console.error(erro);
        // console.log("SALVOU TIPO2");
    });

    var usuario1 = new usuarioModel({
        nome: "Usuário Administrador",
        email: "administrador@gmail.com",
        senha: "123mudar",
        tipo: [usuarioTipo1]
    });

    usuario1.save(function(erro){
        if(erro) return console.error(erro);
        // console.log("SALVOU USUARIO1");
    });

    var usuario2 = new usuarioModel({
        nome: "Usuário Empregado1",
        email: "empregado@gmail.com",
        senha: "123456",
        tipo: [usuarioTipo2]
    });

    usuario2.save(function(erro){
        if(erro) return console.error(erro);
        // console.log("SALVOU USUARIO2");
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

    var resposta1 = new usuarioRespostaModel(
        {
            usuario: usuario1,
            resposta: alternativa1,
        }
    );

    var questao1 = new questaoModel(
        {
            pergunta: "É uma linguagem de folha de estilos:",
            alternativas: [
                alternativa1,
                alternativa2
            ],
            respostas: [resposta1]
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
            instrutor: usuario1,
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

    curso1.save((err) => {
        if (err) return handleError(err);
        // console.log("SALVOU CURSO");
    });

    res.json(curso1);


    // var id = "5d082f980e43fb23feff9381";
    // // cursoModel.find({'usuarios._id': '5d082f980e43fb23feff9381'}, (err, curso) => {
    // //     if (err) {
    // //         console.log(err);
    // //     }
    // //     res.json(curso);
    // // });

    // cursoModel.find({ 'unidades.videos.vistoPor._id': '5d082f980e43fb23feff9381' }, (err, av) => {
    //     if (err) {
    //         console.log(err);
    //     }

    //     if (av.length > 0) {


    //         // av.forEach(element => {
    //         //     // usuario X que assistiu a um video da unidade
    //         //     res.json(element.unidades[0].videos.filter(video => video.vistoPor.id("5d082f980e43fb23feff9381")));
    //         // });


    //         // atualizar curso inserindo uma resposta no questionario
    //         // av[0].unidades[0].questionarios[0].questoes[0].respostas.push(resposta1);

    //         // cursoModel.update({'_id': av[0]._id}, av[0], (err) => {
    //         //     if(err) {
    //         //         console.log(err);
    //         //     } else {
    //         //         res.json(av[0]);
    //         //         // res.send("ATUALIZADO");
    //         //     }
    //         // });

    //         // remover um elemento de um array de subdocumento
    //         // let posicaoElemento =  av[0].unidades[0].questionarios[0].questoes[0].respostas.findIndex(r => r.usuario._id == "5d090c71304c846f48443f46");
    //         // av[0].unidades[0].questionarios[0].questoes[0].respostas.splice(posicaoElemento, 1);

    //         // inserir um video em um curso X, na unidade Y
    //         //curso/5d082f980e43fb23feff939b/unidades/5d082f980e43fb23feff9392/videos
    //         // let x = av.find(c => c._id == "5d082f980e43fb23feff939b").unidades.find(u => u._id == "5d082f980e43fb23feff9392").videos;
    //         // res.json(x);


    //         res.json(av[0]);

    //     }


    //     // res.json(av[0].unidades[0].videos[0].vistoPor);
    // });


    // curso1.findById({'_id': usuario2._id}, (err, usu) => {
    //     console.log(usu);
    // });

    // res.json(curso1);

    // console.log(cursoModel);


});

app.get('/curso/:idCurso/unidades/:idUnidade/videos', function (req, res) {
    cursoModel.findOne({ '_id': req.params.idCurso }, (err, av) => {
        let x = av.unidades.find(u => u._id == req.params.idUnidade).videos;
        res.send(x);
    });
});


var porta = process.env.PORT || 8080;
app.listen(porta);