const {all,one,generate,write} = require('../models/products.model')
const {join} = require('path');
const {unlinkSync} = require('fs');

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
        let allProducts = all();
        let updatedProducts = allProducts.map(element => {
            if (element.sku == req.body.sku) {
                element.name = req.body.name;
                element.price = parseInt(req.body.price);
                element.category = req.body.category;
                element.image = req.files && req.files.length > 0 ? req.files[0].filename : element.image;
            }
            return element
        })
        write(updatedProducts)
        return res.redirect('/productos/')
    },
    remove: (req,res) => {
        let product = one(req.body.sku)
        if(product.image != 'default.png') {
            let file = join(__dirname, '..','..','public','products', product.image)
            unlinkSync(file)
        }
        let allProducts = all();
        let nonDeletedProducts = allProducts.filter(element => element.sku != req.body.sku);
        write(nonDeletedProducts)
        return res.redirect('/productos/')
    }
};

module.exports = controller;