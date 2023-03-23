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
        if(req.files && req.files.length > 0){
            req.body.image = req.files[0].filename
        } else {
            req.body.image = 'default.png'
        }
        let newProduct = generate(req.body)
        let allProducts = all()
        allProducts.push(newProduct)
        write(allProducts)
        return res.redirect('/productos/')
    },
    edit: (req,res) => {
        let product = one(req.params.producto)
        return res.render('edit',{product})

    },
    update: (req, res) => {
        if(req.files && req.files.length > 0){
            return res.send({archivos:req.files})
        }
        let allProducts = all();
        let updatedProducts = allProducts.map(element => {
            if (element.sku == req.body.sku) {
                element.name = req.body.name;
                element.price = parseInt(req.body.price);
                element.category = req.body.category;
            }
            return element
        })
        write(updatedProducts)
        return res.redirect('/productos/')
    }
};

module.exports = controller;