var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioRespostaSchema = require("./usuarioresposta").schema;
var alternativaSchema = require("./alternativamodel").schema;

var questaoSchema = new Schema(
    {
        pergunta: String,
        alternativas: [alternativaSchema],
        respostas: [usuarioRespostaSchema]
    }
);

module.exports = mongoose.model('Questao', questaoSchema);