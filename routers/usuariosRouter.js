var express = require('express');
var usuariosRouter = express('Router');

var UsuarioModel = require("../models/usuariomodel");
var AtualizarModeloModel = require("../models/atualizarmodelos");

var CriptografiaModel = require("../models/criptografiamodel");


usuariosRouter.get('/', function (req, res) {
    UsuarioModel.find(null, null, { sort: { nome: 1 } }, (erro, usuarios) => {
        if (erro) return console.error(erro);
        res.json(usuarios);
    });
});

usuariosRouter.get('/:id', function (req, res) {
    UsuarioModel.findOne({ '_id': req.params.id }, (erro, usuario) => {
        if (erro) return console.error(erro);
        res.json(usuario);
    });
});

usuariosRouter.get('/email/:valor', function (req, res) {
    UsuarioModel.findOne({ 'email' : req.params.valor }, (erro, usuario) => {
        if (erro) return console.error(erro);
        res.json(usuario);
    });
});

usuariosRouter.get('/tipo/:valor', function (req, res) {
    UsuarioModel.find({ 'tipo.tipo' : req.params.valor }, (erro, usuario) => {
        if (erro) return console.error(erro);
        res.json(usuario);
    });
});

usuariosRouter.put('/:id', function (req, res) {

    if(req.body.senha.length < 60) {
        let criptografia = new CriptografiaModel();
        req.body.senha = criptografia.criptografar(req.body.senha);
    }

    UsuarioModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        req.body._id = req.params.id;
        let atualizarModelo = new AtualizarModeloModel();

        atualizarModelo.atualizarUsuario(req.body, false, res);
    });
});

usuariosRouter.post('/', function (req, res) {
    let usuario = new UsuarioModel(req.body);
    var criptografia = new CriptografiaModel();

    usuario.senha = criptografia.criptografar(usuario.senha);
    usuario.save((erro, usu) => {
        if (erro) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.send(usu);
    });
});

usuariosRouter.delete('/:id', function (req, res) {
    UsuarioModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        req.body._id = req.params.id;
        let atualizarModelo = new AtualizarModeloModel();

        atualizarModelo.atualizarUsuario(req.body, true, res);
    });
});


module.exports = usuariosRouter;
