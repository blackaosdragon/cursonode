'use strict'
const mongose = require('mongoose')
const Schema = mongose.Schema

const UsuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        
    }
})
