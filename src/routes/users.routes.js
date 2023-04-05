const {Router} = require('express');
const router = Router();
const { login,register,profile,save } = require('../controllers/users.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../uploads/users')});

const validator = require('../validations/register')

router.get('/login', login)
router.get('/register', register)
router.get('/profile', profile)

router.post('/save', upload.any(), validator, save)

module.exports = router;