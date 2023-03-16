const { urlencoded } = require('express');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const {join} = require('path');

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

/*ROUTES*/
app.use(require('./routes/productos.routes'));
app.use(require('./routes/main.routes'));
