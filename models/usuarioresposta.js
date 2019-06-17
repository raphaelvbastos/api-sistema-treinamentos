var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = require("./usuariomodel").schema;
var alternativaSchema = require("./alternativamodel").schema;

var usuarioRespostaSchema = new Schema(
    {
        usuario: [usuarioSchema],
        resposta: alternativaSchema
    }
);

module.exports = mongoose.model('UsuarioResposta', usuarioRespostaSchema);