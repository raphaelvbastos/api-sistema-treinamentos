var express = require('express');
var autenticacaoRouter = express('Router');

var UsuarioModel = require("../models/usuariomodel");

autenticacaoRouter.post('/', function (req, res) {
    UsuarioModel.findOne({
        email: req.body.email,
        senha: req.body.senha
    }, (err, usuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        return  res.json(usuario);
    });
});

module.exports = autenticacaoRouter;
