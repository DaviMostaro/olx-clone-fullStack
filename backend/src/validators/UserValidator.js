const { checkSchema } = require('express-validator');

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome inválido'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: {min: 6}
            },
            errorMessage: 'A senha deve conter no mínimo 6 caracteres'
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Selecione um estado'
        }
    })
}