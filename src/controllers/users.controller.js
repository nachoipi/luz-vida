const {index, write} =require('../models/users.model');
const { validationResult } = require('express-validator');

const usersController = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/register'),
    profile: (req,res) => res.render('users/profile'),
    save: (req,res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let errors = result.mapped();
            return res.render('register',{
                style: 'register',
                errors: errors,
                data: req.body
            })
        }

        let all = index();
        req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
        req.body.id = all.length > 0 ? all.pop().id + 1 : 1
        let user = {...req.body};
        all.push(user)
        write(all)
        return res.redirect('/users/login')
    },

}

module.exports = usersController;