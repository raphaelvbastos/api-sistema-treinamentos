var express = require('express');
var usuarioTipoRouter = express('Router');

var UsuarioTipoModel = require("../models/usuariotipomodel");

usuarioTipoRouter.get('/', function (req, res) {
    UsuarioTipoModel.find(null, null, { sort: { nome: 1 } }, (erro, usuarioTipo) => {
        if (erro) return console.error(erro);
        res.json(usuarioTipo);
    });
});

usuarioTipoRouter.get('/:id', function (req, res) {
    UsuarioTipoModel.findOne({ '_id': req.params.id }, (erro, usuarioTipo) => {
        if (erro) return console.error(erro);
        res.json(usuarioTipo);
    });
});

usuarioTipoRouter.put('/:id', function (req, res) {

    UsuarioTipoModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});

usuarioTipoRouter.post('/', function (req, res) {
    let usuarioModel = new UsuarioTipoModel(req.body);
    usuarioModel.save((erro, usuTipo) => {
        if (erro) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.send(usuTipo);
    });
});

usuarioTipoRouter.delete('/:id', function (req, res) {
    UsuarioTipoModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});


module.exports = usuarioTipoRouter;
