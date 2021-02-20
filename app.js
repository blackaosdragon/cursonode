'use strict'

const express = require('express');
const controllers = require('./controllers/product.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get(`/api/product`, controllers.getProducts);
server.get(`/api/product/:productID`, controllers.getProduct);
server.post('/api/product', controllers.saveProduct);
server.put(`/api/product/:productID`, controllers.updateProduct)
server.delete(`/api/product/:productID`, controllers.deleteProduct)

module.exports = server