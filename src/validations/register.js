const {body} = require('express-validator');

let email = body('email').notEmpty().withMessage('Email no puede quedar vacío').bail().
    isEmail().withMessage('Debe completar con un email válido');
let password = body('password').notEmpty().withMessage('Contraseña no válida').bail().
    isLength({min:5}).withMessage('Mínimo 5 caracteres');

let validaciones = [email,password];

module.exports = validaciones;