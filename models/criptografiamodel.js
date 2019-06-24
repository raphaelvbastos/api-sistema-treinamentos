const bcrypt = require('bcryptjs');

class CriptografiaModel {

    criptografar(texto) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(texto, salt);
        return hash;
    }

    comparar(texto, hash) {
        return bcrypt.compareSync(texto, hash);
    }
}

module.exports = CriptografiaModel;