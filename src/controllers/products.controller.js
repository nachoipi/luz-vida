const {all,one} = require('../models/products.model')

const controller = {
    
    index: (req,res) => {
        let products = all()

        if(req.params.categoria){
            products = products.filter(e => e.category == req.params.categoria)
            return res.send(products)
        }

        return res.send(products)
    },
    
    show: (req,res) => {
        let product = one(req.params.producto)
        if(product) {
            return res.send(product)
        }

        return res.send('No existe tal producto')
    }
};

module.exports = controller;