'use sctrict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema =  Schema({
    id: String,
    nombre: String,
    precio: Number,
    collecion: { type: String, enum: ['LoL','Haikyuu','BnH','Percy']},
    description: String
})

mongoose.model('Pulseras',ProductSchema)