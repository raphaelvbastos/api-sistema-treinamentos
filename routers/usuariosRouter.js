var express = require('express');
var usuariosRouter = express('Router');

var UsuarioModel = require("../models/usuariomodel");

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

usuariosRouter.put('/:id', function (req, res) {

    UsuarioModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
        res.end();
    });
});

usuariosRouter.post('/', function (req, res) {
    let usuario = new UsuarioModel(req.body);
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
        res.json(doc);
        res.end();
    });
});


module.exports = usuariosRouter;
