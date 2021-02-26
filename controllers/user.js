'use strict'

const mongose = require('mongoose');
const User = require("../modelos/user.js");
const status = require('../status.js')
const service = require("../services/index.js");
const user = require('../modelos/user.js');

const singUp = (req,res) => {
    const {email,name} = req.body
    const user = new User({
        email: email,
        displayName: name,
    })
    user.save( (err,userStorage)=>{
        if(err){
            console.log(err);
            res.status(status.failed).send({
                message: "Error al segistrar al usuario intente de nuevo",
                ok: 0
            })
        } else {
            res.status(status.ok),send({
                token: service.createToken(user),
                message: "usuario registraod con éxito",
                ok: 1
            })
        }        
    })
}
const singIn = (req,res) => {
    user.find( { email: req.body.email},(err,usuario)=>{
        if(err){
            res.status(status.failed).send({
                message: "Error, vuelva a intentarlo más tarde",
                ok: 0
            })
        } else if(!user){
            res.status(status.unknow).send({
                message: "Usuario no encontrado",
                ok: 0
            })            
        } else {
            req.user = user;
            res.status(status.ok).send({
                message: "Logueado correctamente",
                ok: 1,
                token: service.createToken(user)
            })
        }
    })
}

module.exports = {
    singIn,
    singUp
}