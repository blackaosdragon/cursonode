'use strict'

const jsonWebToken = require('jwt-simple');
const fecha = require("../services/fecha.js")
const service = require('../services/index.js')
const status = require("../status.js");
const config = require("../config.js")

const isAuth = (req,res,next) => {
    if(!req.headers.authorization){
        res.status(status.prohibido).send({
            message: "No esta autorizado",
            ok: 2
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    /*
    const payload = jsonWebToken.decode(token,config.SECRET_TOKEN);

    if(payload.exp <= fecha.obtenerFecha()){
        return res.status(status.unauthorized).send({
            message: "El token ha expirado",
            ok:0
        })
    }
    req.user = payload.sub
    
    next()
    */
    
    service.decodeToken(token).then( respuesta =>{
        req.user = respuesta
        next();
    })
    .catch( respuesta => {
        res.status(respuesta.status).send({
            message: 'Error al decodificar el token',
            error: respuesta,
            ok: 0
        })
    })
    
}
module.exports = isAuth