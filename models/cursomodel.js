var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unidadeSchema = require("./unidademodel").schema;
var usuarioSchema = require("./usuariomodel").schema;
var avaliacaoSchema = require("./avaliacaomodel").schema;

var cursoSchema = new Schema(
    {
        titulo: String,
        instrutor: String,
        palavrasChave: [String],
        unidades: [unidadeSchema],
        usuarios: [usuarioSchema],
        avaliacoes: [avaliacaoSchema], 
    }
);

module.exports = mongoose.model('Curso', cursoSchema);