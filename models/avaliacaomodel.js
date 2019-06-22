var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = require("./usuariomodel").schema;


var avaliacaoSchema = new Schema(
    {
        usuario: usuarioSchema,
        nota: Number,
        comentario: String
    }
);

module.exports = mongoose.model('Avaliacao', avaliacaoSchema);