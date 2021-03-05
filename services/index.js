'use strict'

const jsonWebToken = require('jwt-simple');
const fecha = require("./fecha.js");
const config = require("../config.js");
const status = require('../status.js')

const createToken = usuario => {
    const payload = {
        sub: usuario._id,
        emision: fecha.obtenerFecha(),
        exexpiracionp: fecha.obtenerFecha(14,"dias")
    }
    let codificado = jsonWebToken.encode(payload,config.SECRET_TOKEN)
    //console.log("Token creado: ",codificado);
    //let decodificado = jsonWebToken.decode(codificado,config.SECRET_TOKEN)
    //console.log("Decodificado: ",decodificado);
    return jsonWebToken.encode(payload,config.SECRET_TOKEN)
}
const decodeToken = token => {
    
    const decode = new Promise( (res,rej)=>{
        //console.log("En la promesa el token: ",token)        
        //const payloadTest = jsonWebToken.decode(token,config.SECRET_TOKEN);
        //console.log(payloadTest)
        try{
            const payload = jsonWebToken.decode(token,config.SECRET_TOKEN);
            
            if (payload.exp < fecha.obtenerFecha()){
                console.log("Falla en el tiempo")
                rej({
                    status: status.unauthorized,
                    ok: 0,
                    message: "Su sesión ha caducado"
                }) 
            } else {
                console.log("Respuesta satisfactoria")
                res(payload.sub);
            }
            
           console.log(payload);


        } catch (err){
            //console.log("Fallo en el try catch");
            rej({
                status: status.failed,
                message: 'Token invalido'
            })            
        }
    })
    return decode
}
const createNewToken = user => {
    return new Promise( (resolve,reject) => {
        let payload = {
            user: user._id,
            iat: fecha.obtenerFecha(),
            exp: fecha.obtenerFecha(14,"dias")
        }
        const token = jsonWebToken.encode(payload,config.SECRET_TOKEN);
        console.log("Token codificado: ",token);
        if(token){
            resolve(token);
        } else {
            reject();
        }
    })
}

module.exports = {
    createToken,
    decodeToken,
    createNewToken
}