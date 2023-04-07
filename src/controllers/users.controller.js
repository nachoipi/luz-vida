const {index, write} = require('../models/users.model');
const { validationResult } = require('express-validator');
const { hashSync } = require('bcrypt');

const usersController = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/register'),
    profile: (req,res) => res.render('users/profile'),
    save: (req,res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let errors = result.mapped();
            return res.render('users/register',{
                style: 'register',
                errors: errors,
                data: req.body
            })
        }
        let all = index();
        req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
        req.body.id = all.length > 0 ? index().pop().id + 1 : 1
        req.body.password = hashSync(req.body.password,10);
        let user = {...req.body};
        all.push(user)
        write(all)
        return res.redirect('/users/login')
    },
    access: (req,res) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let errors = result.mapped();
            return res.render('users/login',{
                style: 'login',
                errors: errors,
                data: req.body
            })
        }
        res.cookie('user',req.body.email,{maxAge: 3000})
        let all = index();
        req.session.user = all.find(user => user.email == req.body.email)
        return res.redirect('/')
    },
    logout: (req,res) => {
        delete req.session.user
        res.cookie('user',null,{maxAge: -1})
        return res.redirect('/')
    }
}

module.exports = usersController;