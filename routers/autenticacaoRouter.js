var express = require('express');
var autenticacaoRouter = express('Router');

var UsuarioModel = require("../models/usuariomodel");
var CriptografiaModel = require("../models/criptografiamodel");

autenticacaoRouter.post('/', function (req, res) {
    var criptografia = new CriptografiaModel();
    UsuarioModel.findOne({
        email: req.body.email,
        senha: criptografia.criptografar(req.body.senha)
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
