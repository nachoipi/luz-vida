const express = require('express');
const app = express();

/*PORT CONFIG*/
const {port,start} = require('./modules/server')
app.listen(port,start())

/*STATICS CONFIG*/
const {join} = require('path');
const statics = require('./modules/static');
app.use(statics(join(__dirname,'../public')));

/*ROUTES*/
let rutasProductos = require('./routes/productos.routes.js')
let rutasMain = require('./routes/main.js')

/*USE*/
app.use(require('./routes/productos.routes'));
app.use('/', rutasMain);
