'use strict'

const mongose = require('mongoose');
const User = require("../modelos/user.js");
const status = require('../status.js')

const singUp = (req,res) => {
    const {email,name,password} = req.body
    const user = new User({
        email: email,
        displayName: name
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

}

module.exports = {
    singIn,
    singUp
}