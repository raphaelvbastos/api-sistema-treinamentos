var express = require('express');
var cursoRouter = express('Router');

var CursoModel = require("../models/cursomodel");

cursoRouter.get('/', function (req, res) {
    CursoModel.find(null, null, { sort: { nome: 1 } }, (erro, curso) => {
        if (erro) return console.error(erro);
        res.json(curso);
    });
});

cursoRouter.get('/:id', function (req, res) {
    CursoModel.findOne({ '_id': req.params.id }, (erro, curso) => {
        if (erro) return console.error(erro);
        res.json(curso);
    });
});

cursoRouter.put('/:id', function (req, res) {

    CursoModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});

cursoRouter.post('/', function (req, res) {
    let cursoCategoria = new CursoModel(req.body);
    cursoCategoria.save((erro, curso) => {
        if (erro) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.send(curso);
    });
});

cursoRouter.delete('/:id', function (req, res) {
    CursoModel.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json(req.body);
    });
});


module.exports = cursoRouter;
