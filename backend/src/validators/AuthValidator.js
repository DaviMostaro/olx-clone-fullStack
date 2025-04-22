const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: {min: 2}
            },
            errorMessage: 'Nome inválido'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {min: 6}
            },
            errorMessage: 'A senha deve conter no mínimo 6 caracteres'
        },
        state: {
            notEmpty: true,
            errorMessage: 'Selecione um estado'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            isLength: {
                options: {min: 6}
            },
            errorMessage: 'A senha deve conter no mínimo 6 caracteres'
        }
    })
}