const {body} = require('express-validator');

let email = body('email').notEmpty().withMessage('Email no puede quedar vacío').bail().
    isEmail().withMessage('Debe completar con un email válido').custom((value,{req}) => {
        let users = index();
        let listOfEmails = users.map(user => user.email)
        if(!listOfEmails.indexOf(value) == -1) {
            throw new Error ('Email no encontrado')
        }
        return true
    });

let password = body('password').notEmpty().withMessage('Contraseña no válida').bail().
    isLength({min:5}).withMessage('Mínimo 5 caracteres').custom((value,{req}) => {
        let users = index();
        let result = users.find(user => user.email == req.body.email)
        if(!result) {
            throw new Error ('Credenciales inválidas')
        }
        if(result.password != value) {
            throw new Error ('La contraseña es incorrecta')
        }
        return true
    });

let validaciones = [email,password];

module.exports = validaciones;