'use strict'

const express = require('express');
const mongoose = require('mongoose');
const Product = require("./modelos/modelo.js")

const server = express();

const puerto = 5003;

const mensaje = {
    respuesta: "Hola mundo"
}
mongoose.connect('mongodb://localhost:27017/makristrally', (err,res)=>{
    if(err){
        console.log(err)
    } else {
        console.log('Conexion exitosa a la base de datos')
    }
    server.listen(puerto,()=>{
        console.log(`Escuchando por el puerto ${puerto}`);
    })
})


server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get(`/api/product`,(req,res) => {
     res.send(200,{producto: []})
})
server.get(`/api/product/:productID`, (req,res) => {

})
server.post('/api/product', (req,res) => {
    console.log(req.body)
    let product = new Product();
    product.id = req.body.id
    product.nombre = req.body.nombre
    product.precio = req.body.precio
    product.collecion = req.body.collection 
    product.description = req.body.description

    product.save( (err, productStorage) => {
        if (err){
            console.log(err)
            res.status(500).send( 
                {
                    message: `Error al guardar en la base de datos. Error ${err}`,
                    ok: 0
                }
            )
        } else {
            res.status(200).send( 
                {
                    ok: 1,
                    message: `${productStorage}`
                }
            )

        }
    })
    
    res.status(200).send({ message: `El producto se ha recibido`})
})
server.put(`/api/product/:productID`, (req,res) => {

})
server.delete(`/api/product:productID`, (req,res) => {

})

