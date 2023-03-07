let express = require('express');
let router = express.Router();
const {join} = require('path');

router.get('/',(req,res) => {
    res.sendFile(join(__dirname,'./views/index.html'));
})

module.exports = router;

//./views/index.html