var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioTipoSchema = new Schema(
    {
        tipo: String
    }
);

module.exports = mongoose.model('UsuarioTipo', usuarioTipoSchema);