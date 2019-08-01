var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var questaoSchema = require("./questaomodel").schema;

var questionarioSchema = new Schema(
    {
        titulo: String,
        posicao: Number,
        questoes: [questaoSchema],
    }
);

module.exports = mongoose.model('Questionario', questionarioSchema);