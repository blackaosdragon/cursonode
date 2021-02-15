'use strict'

const express = require('express');

const server = express();

const puerto = process.env.PORT || 5003;

const mensaje = {
    respuesta: "Hola mundo"
}

server.listen(puerto,()=>{
    console.log(`Escuchando por el puerto ${puerto}`);
})


server.get('/home/:name', (req,res) => {
    let respuesta = {
        respuesta: `Hola ${req.params.name}`
    }
    res.send(respuesta)
})

