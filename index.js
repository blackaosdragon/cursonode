'use strict'

const mongoose = require('mongoose');

const server = require('./app');



const puerto = 5003;

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


