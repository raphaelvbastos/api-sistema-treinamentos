var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var unidadeSchema = require("./unidademodel").schema;
var inscricaoSchema = require("./inscricaomodel").schema;
var avaliacaoSchema = require("./avaliacaomodel").schema;
var cursoCategoriaSchema = require("./cursocategoriamodel").schema;


var cursoSchema = new Schema(
    {
        titulo: String,
        nomeInstrutor: String,
        palavrasChave: String,
        categoria: cursoCategoriaSchema,
        unidades: [unidadeSchema],
        inscricoes: [inscricaoSchema],
        avaliacoes: [avaliacaoSchema], 
    }
);

module.exports = mongoose.model('Curso', cursoSchema);