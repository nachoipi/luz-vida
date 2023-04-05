const fs = require('fs');
const {resolve} = require('path');

const index = () => JSON.parse(fs.readFileSync(resolve(__dirname,'..','data')))
const one = id => index().find(e=>e.id==id)
const write = data => fs.writeFileSync(resolve(__dirname,'..','data'))

module.exports = {index,one,write};