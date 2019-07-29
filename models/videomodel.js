var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = require("./usuariomodel").schema;

var videoSchema = new Schema(
    {
        titulo: String,
        posicao: Number,
        url: String,
        vistoPor: [usuarioSchema],
    }
);

module.exports = mongoose.model('Video', videoSchema);