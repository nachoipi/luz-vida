const {index} = require('../models/users.model');

const middleware = (req,res,next) => {
    let user = null;
    if (req.cookies && req.cookies.user) {
        let users = index();
        let result = users.find(user=>user.email==req.cookies.user)
        req.session.user = result
    }

    if (req.session && req.session.user) {
        user = req.session.user
    }

    res.locals.user = user
    return next()
};

module.exports = middleware;