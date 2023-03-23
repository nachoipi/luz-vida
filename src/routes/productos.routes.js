const {Router} = require('express');
const route = Router();
const controller = require('../controllers/products.controller');
const {join,extname} = require('path');
const {existsSync,mkdirSync} = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = join(__dirname,'..','..','public','products')
        if(!existsSync(folder)){
            mkdirSync(folder)
        }
        return cb(null,folder)
    },
    filename: function (req, file, cb) {
        let name = file.fieldname + '-' + Date.now() + extname(file.originalname)
        return cb(null,name)
    }
})

const upload = multer({storage: storage})

route.get('/productos/nuevo', controller.create);

route.post('/productos/guardar', upload.any(), controller.save)

route.get('/productos/:categoria?', controller.index);
route.get('/productos/detalle/:producto',controller.show);
route.get('/productos/editar/:producto',controller.edit);

route.put('/productos/actualizar', upload.any(), controller.update);

module.exports = route;