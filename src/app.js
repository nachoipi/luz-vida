const express = require('express');
const app = express();

/*TEMPLATE CONFIG*/
app.set('views', join(__dirname,'./views'));
app.set('view engine','ejs')

/*PORT CONFIG*/
const {port,start} = require('./modules/server')
app.listen(port,start())

/*STATICS CONFIG*/
const {join} = require('path');
const statics = require('./modules/static');
app.use(statics(join(__dirname,'../public')));

let rutasMain = require('./routes/main.js')

/*ROUTES*/
app.use(require('./routes/productos.routes'));
app.use('/', rutasMain);
