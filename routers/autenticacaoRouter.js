var express = require('express');
var autenticacaoRouter = express('Router');

var UsuarioModel = require("../models/usuariomodel");
var CriptografiaModel = require("../models/criptografiamodel");

autenticacaoRouter.post('/', function (req, res) {
    var criptografia = new CriptografiaModel();
    UsuarioModel.findOne({
        email: req.body.email
    }, (err, usuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        if (criptografia.comparar(req.body.senha, usuario.senha)) {
            return res.json(usuario);
        } else {
            return res.json(null);
        }
    });
});

module.exports = autenticacaoRouter;
