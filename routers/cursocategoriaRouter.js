var express = require('express');
var cursoCategoriaRouter = express('Router');

var CursoCategoriaModel = require("../models/cursocategoriamodel");

cursoCategoriaRouter.get('/', function (req, res) {
    CursoCategoriaModel.find(null, null, { sort: { nome: 1 } }, (erro, cursoCategoria) => {
        if (erro) return console.error(erro);
        res.json(cursoCategoria);
    });
});

cursoCategoriaRouter.get('/:id', function (req, res) {
    CursoCategoriaModel.findOne({ '_id': req.params.id }, (erro, cursoCategoria) => {
        if (erro) return console.error(erro);
        res.json(cursoCategoria);
    });
});

cursoCategoriaRouter.put('/:id', function (req, res) {

    CursoCategoriaModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});

cursoCategoriaRouter.post('/', function (req, res) {
    let cursoCategoria = new CursoCategoriaModel(req.body);
    cursoCategoria.save((erro, cursoCat) => {
        if (erro) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.send(cursoCat);
    });
});

cursoCategoriaRouter.delete('/:id', function (req, res) {
    CursoCategoriaModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});


module.exports = cursoCategoriaRouter;
