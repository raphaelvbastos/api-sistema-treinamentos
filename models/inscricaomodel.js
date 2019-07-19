var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = require("./usuariomodel").schema;

var InscricaoSchema = new Schema(
    {
        usuario: usuarioSchema,
        percentualAndamento: any,
        percentualAcertos: any,
        gerouCertificado: boolean,
        aprovado: boolean
    }
);

module.exports = mongoose.model('Inscricao', InscricaoSchema);