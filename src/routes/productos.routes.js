const {Router} = require('express');
let router = Router();

const controller = require('../controllers/products.controller');
router.get('/productos', controller.index);

module.exports = router;