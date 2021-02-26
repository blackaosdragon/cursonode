'use strict'

const jsonWebToken = require('jwt-simple');

const fecha = require("../services/fecha.js")
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
    const payload = jsonWebToken.decode(token,config.SECRET_TOKEN);
    if (payload.exp < fecha.obtenerFecha()){
        return (res.status(status.unauthorized).send({
            message: "Su sesion ha expirado",
            ok: 3
        }))
    }
    req.user = payload.sub
    next()
}
module.exports = isAuth