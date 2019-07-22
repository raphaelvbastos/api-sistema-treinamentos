var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = require("./usuariomodel").schema;

var InscricaoSchema = new Schema(
    {
        usuario: usuarioSchema
        // percentualAndamento: Number,
        // percentualAcertos: Number,
        // gerouCertificado: Boolean,
        // aprovado: Boolean
    }
);

module.exports = mongoose.model('Inscricao', InscricaoSchema);