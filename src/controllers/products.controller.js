const {all,one,generate,write} = require('../models/products.model')

const controller = {
    
    index: (req,res) => {

        let products = all()

        if(req.params.categoria){
            products = products.filter(e => e.category == req.params.categoria)
            return res.render('list',{products})
        }

        return res.render('list',{products})
    },
    
    show: (req,res) => {
        let product = one(req.params.producto)
        if(product) {
            return res.render('detail',{product})
        }

        return res.render('detail',{product:null})
    },
    create: (req,res) => {
        return res.render('create');
    },
    save: (req,res) => {
        let newProduct = generate(req.body)
        let allProducts = all()
        allProducts.push(newProduct)
        write(allProducts)
        return res.redirect('/productos/')
    }
};

module.exports = controller;