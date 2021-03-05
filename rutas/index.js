'use strict'

const express = require('express');
const controllers = require('../controllers/product.js');
const auth = require('../middelwares/auth.js');
const status = require('../status.js')
const useCtrl = require("../controllers/user");
///////


///////

const api = express.Router();

api.get(`/product`,auth, controllers.getProducts);
api.get(`/product/:productID`, controllers.getProduct);
api.post('/product', controllers.saveProduct);
api.put(`/product/:productID`, controllers.updateProduct)
api.delete(`/product/:productID`, controllers.deleteProduct);
api.get('/private',auth,(req,res)=> {
    res.status(status.ok).send({
        message: "Acceso concedido"
    })
})
api.post('/singup',useCtrl.singUp)
api.post('/login',useCtrl.singIn)
api.get('/usuarios',useCtrl.getUsers)
api.post('/test',useCtrl.registro)

module.exports = api