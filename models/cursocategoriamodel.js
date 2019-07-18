var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cursoCategoriaSchema = new Schema(
    {
        nome: String
    }
);

module.exports = mongoose.model('CursoCategoria', cursoCategoriaSchema);