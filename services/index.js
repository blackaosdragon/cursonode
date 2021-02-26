'use strict'

const jsonWebToken = require('jwt-simple');
const fecha = require("./fecha.js");
const config = require("../config.js");
const status = require('../status.js')

const createToken = usuario => {
    const payload = {
        sub: usuario._id,
        iat: fecha.obtenerFecha(),
        exp: fecha.obtenerFecha(14,"dias")
    }
    return jsonWebToken.encode(payload,config.SECRET_TOKEN)
}
const decodeToken = token => {
    const decode = new Promise( (res,rej)=>{
        try{
            const payload = jsonWebToken.decode(token,config.SECRET_TOKEN);

            if (payload.exp < fecha.obtenerFecha()){
                return (rej({
                    status: status.unauthorized,
                    ok: 0,
                    message: "Token caducado"
                }))
            }

        } catch {
            rej({
                status: status.failed,
                message: 'Token invalido'
            })            
        }
    })
}

module.exports = {
    createToken,
    decodeToken
}