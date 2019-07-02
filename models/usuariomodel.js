var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioTipoSchema = require("./usuariotipomodel").schema;

var usuarioSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        tipo: usuarioTipoSchema
    }
);

module.exports = mongoose.model('Usuario', usuarioSchema);