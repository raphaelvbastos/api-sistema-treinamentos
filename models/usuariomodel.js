var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema(
    {
        nome: String,
        email: String,
        senha: String,
        tipo: String
    }
);

module.exports = mongoose.model('Usuario', usuarioSchema);