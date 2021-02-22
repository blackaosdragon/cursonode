'use strict'

const mongoose = require('mongoose');
const server = require('./app');
const config = require('./config.js')
const puerto = 5003;

mongoose.connect(config.db, (err,res)=>{
    if(err){
        console.log(err);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
    server.listen(config.port,()=>{
        console.log(`Escuchando por el puerto ${puerto}`);
    })
})


