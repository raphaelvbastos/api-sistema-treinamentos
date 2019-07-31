var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arquivoSchema = new Schema(
    {
        titulo: String,
        posicao: Number,
        url: String
    }
);

module.exports = mongoose.model('Arquivo', arquivoSchema);