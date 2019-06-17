var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var videoSchema = require("./videomodel").schema;
var arquivoSchema = require("./arquivomodel").schema;
var questionarioSchema = require("./questionariomodel").schema;

var unidadeSchema = new Schema(
    {
        titulo: String,
        videos: [videoSchema],
        arquivos: [arquivoSchema],
        questionarios: [questionarioSchema],

    }
);

module.exports = mongoose.model('Unidade', unidadeSchema);