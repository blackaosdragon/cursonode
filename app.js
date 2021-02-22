'use strict'

const express = require('express');
const api = require("./rutas/index.js")

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use('/api',api)



module.exports = server