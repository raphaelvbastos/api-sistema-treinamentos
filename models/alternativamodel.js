var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alternativaSchema = new Schema(
    {
        alternativa: String,
        correta: { type: Boolean, default: false }
    }
);

module.exports = mongoose.model('Alternativa', alternativaSchema);