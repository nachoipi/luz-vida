const express = require('express');
const app = express();
const port = 3000;
const {join} = require('path');
const start = () => console.log('Starting server...');

app.listen(port,start())

/*ROUTES*/

const public = join(__dirname, '../public')
const statics = express.static(public);
app.use(statics);

app.get('/',(req,res) => {
    res.sendFile(join(__dirname,'./views/index.html'));
})