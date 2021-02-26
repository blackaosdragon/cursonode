'use strict'

const express = require('express');
const controllers = require('../controllers/product.js');
const auth = require('../middelwares/auth.js');

const api = express.Router();

api.get(`/product`, controllers.getProducts);
api.get(`/product/:productID`, controllers.getProduct);
api.post('/product', controllers.saveProduct);
api.put(`/product/:productID`, controllers.updateProduct)
api.delete(`/product/:productID`, controllers.deleteProduct);
//api.get("/private",)

module.exports = api