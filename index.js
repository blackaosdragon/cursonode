'use strict'

const moment = require('moment')

const mongoose = require('mongoose');
const server = require('./app');
const config = require('./config.js');
const fechas = require('./services/fecha.js');

//let fechaActual = fechas.obtenerFecha();
//console.log(fechaActual);

console.log(fechas.obtenerFecha());
console.log(fechas.obtenerFecha(43,'dias'));

mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error',(err)=>console.log('Error al iniciar la conexcion a la base de datos: ',err));
db.once('open', () => {
    console.log('Conexion exitosa a la base de datos')
    server.listen(config.port,()=>{
        console.log(`Escuchando por el puerto ${config.port}`);
    })
})



