var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arquivoSchema = new Schema(
    {
        titulo: String,
        link: String,
    }
);

module.exports = mongoose.model('Arquivo', arquivoSchema);