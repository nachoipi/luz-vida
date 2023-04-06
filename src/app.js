const { urlencoded } = require('express');
const express = require('express');
const methodOverride = require('method-override');
const {join} = require('path');
const session = require('express-session');
const cookie = require('cookie-parser');
const app = express();

/*TEMPLATE CONFIG*/
app.set('views', join(__dirname,'./views'));
app.set('view engine','ejs')

/*PORT CONFIG*/
const {port,start} = require('./modules/server')
app.listen(port,start())

/*STATICS CONFIG*/
const statics = require('./modules/static');
app.use(statics(join(__dirname,'../public')));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('m'));
app.use(session({
    secret:'express-secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookie());

app.use(require('./middlewares/user'));

/*ROUTES*/
app.use(require('./routes/productos.routes'));
app.use(require('./routes/main.routes'));
app.use('/users', require('./routes/users.routes'));